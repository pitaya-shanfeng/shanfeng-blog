#!/usr/bin/env bash
#
# 把一套原型镜像上传到 Cloudflare R2（原型不进 git，放对象存储 + CDN）。
#
# 用法：
#   ./scripts/upload-proto-r2.sh cms-rms
#   ./scripts/upload-proto-r2.sh lego
#   ./scripts/upload-proto-r2.sh --all
#
# 前置（一次性）：
#   1. 建好 R2 桶，例如 shanfeng-proto
#   2. 桶绑定自定义域，例如 proto.shanfengpm.com
#   3. 装好 rclone 并配一个 r2 remote：
#        rclone config                       # 选 s3 → Cloudflare R2
#        endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
#   4. 在 src/config/prototypeConfig.ts 里填 PROTOTYPE_CDN_BASE
#
# 说明：R2 的出流量不收费，原型这种「体积大、访问少」的内容尤其合适。
set -euo pipefail

BUCKET="${R2_BUCKET:-shanfeng-proto}"
REMOTE="${R2_REMOTE:-r2}"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/proto"

if ! command -v rclone >/dev/null 2>&1; then
	echo "缺少 rclone。先安装并执行 rclone config 配好 R2 remote。" >&2
	exit 1
fi

sync_one() {
	local dir="$1"
	if [ ! -d "$SRC_DIR/$dir" ]; then
		echo "跳过：$SRC_DIR/$dir 不存在" >&2
		return
	fi
	echo "→ 上传 $dir ..."
	rclone sync "$SRC_DIR/$dir" "$REMOTE:$BUCKET/$dir" \
		--checksum \
		--header-upload "Cache-Control: public, max-age=604800" \
		--transfers 8 \
		--progress
	echo "✓ $dir 完成"
}

if [ "${1:-}" = "--all" ] || [ $# -eq 0 ]; then
	mapfile -t targets < <(find "$SRC_DIR" -mindepth 1 -maxdepth 1 -type d -exec basename {} \;)
else
	targets=("$@")
fi

for dir in "${targets[@]}"; do
	sync_one "$dir"
done

echo
echo "全部完成。访问示例：https://proto.shanfengpm.com/${targets[0]}/entry.html"
echo "记得在 src/config/prototypeConfig.ts 填 PROTOTYPE_CDN_BASE 后重新部署。"
