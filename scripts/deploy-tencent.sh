#!/usr/bin/env bash
#
# 部署到腾讯云轻量服务器（lhins-qoawfaso）
#
# 用法：
#   ./scripts/deploy-tencent.sh            # 构建 → 同步到服务器 → 重载 nginx
#   ./scripts/deploy-tencent.sh --no-build # 跳过构建，直接同步现有 dist
#
# 需要在同目录放一份 .deploy.env（不进仓库），内容例如：
#   DEPLOY_HOST=43.xxx.xxx.xxx
#   DEPLOY_USER=ubuntu
#   DEPLOY_PATH=/var/www/shanfeng
#
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ -f .deploy.env ]; then
	# shellcheck disable=SC1091
	source .deploy.env
fi

: "${DEPLOY_HOST:?缺少 DEPLOY_HOST（见脚本头注释）}"
: "${DEPLOY_USER:=ubuntu}"
: "${DEPLOY_PATH:=/var/www/shanfeng}"

if [ "${1:-}" != "--no-build" ]; then
	echo "== 构建 =="
	pnpm build
fi

if [ ! -d dist ]; then
	echo "dist 不存在，先构建" >&2
	exit 1
fi

# 素材已走 CDN，产物只有 HTML/CSS/JS 与 og 图，几十 MB
echo "== 同步 dist 到 $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH =="
rsync -az --delete --human-readable \
	-e "ssh -o StrictHostKeyChecking=accept-new" \
	dist/ "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/"

echo "== 重载 nginx =="
ssh -o StrictHostKeyChecking=accept-new "$DEPLOY_USER@$DEPLOY_HOST" \
	"sudo nginx -t && sudo systemctl reload nginx"

echo "== 完成：https://shanfengpm.com =="
