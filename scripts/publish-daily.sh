#!/usr/bin/env bash
#
# 每日发布：把「行业日报」里新增的文章同步进站，构建并部署到腾讯云
#
# 用法：
#   ./scripts/publish-daily.sh            # 同步 + 构建 + 部署
#   ./scripts/publish-daily.sh --dry-run  # 只看同步结果，不构建
#
# 建议交给 launchd / cron 每天 10:40 跑一次（见 docs/deploy/daily-publish.md）
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

LOG_DIR="$ROOT/.logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/daily-$(date +%Y-%m-%d).log"
exec >>"$LOG" 2>&1

echo "==== $(date '+%F %T') 开始 ===="

if [ -f .deploy.env ]; then
	# shellcheck disable=SC1091
	source .deploy.env
fi

node scripts/sync-hotnews.mjs "$@"

if git diff --quiet -- src/content/posts/hotnews && git diff --cached --quiet -- src/content/posts/hotnews; then
	if ! git status --porcelain -- src/content/posts/hotnews | grep -q .; then
		echo "没有新日报，结束"
		exit 0
	fi
fi

if [ "${1:-}" = "--dry-run" ]; then
	echo "[dry-run] 跳过提交与部署"
	exit 0
fi

TODAY=$(date +%F)
git add src/content/posts/hotnews
git commit -q -m "content: 每日行业日报 $TODAY（自动同步）" || echo "没有需要提交的改动"

echo "开始构建"
unset NODE_OPTIONS
export NODE_EXTRA_CERTS=/etc/ssl/cert.pem
export NODE_EXTRA_CA_CERTS=/etc/ssl/cert.pem
./node_modules/.bin/astro build
node scripts/rewrite-assets-cdn.mjs

echo "部署到腾讯云"
rsync -az --delete -e "ssh -i ${DEPLOY_KEY:-$HOME/Downloads/root.pem} -o StrictHostKeyChecking=no" \
	dist/ "${DEPLOY_USER:-ubuntu}@${DEPLOY_HOST:?缺少 DEPLOY_HOST}:${DEPLOY_PATH:-/var/www/shanfeng}/"

echo "推送仓库"
git push origin master:main || echo "推送失败（不影响线上）"

echo "==== $(date '+%F %T') 完成 ===="
