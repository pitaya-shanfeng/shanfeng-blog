#!/usr/bin/env bash
#
# 把原型镜像上传到腾讯云 COS（原型不进 git，放对象存储 + CDN）。
#
# 用法：
#   ./scripts/upload-proto-cos.sh --all
#   ./scripts/upload-proto-cos.sh cms-rms lego
#
# 前置（一次性，约 10 分钟）：
#   1. 腾讯云 → 对象存储 → 创建存储桶：地域选「中国香港」（未备案只能选境外），
#      访问权限「公有读私有写」，记下桶名（形如 shanfeng-proto-1250000000）
#   2. 装 coscmd：
#        pip3 install coscmd --user
#        coscmd config -a <SecretId> -s <SecretKey> -b <桶名> -r ap-hongkong
#      SecretId/SecretKey 在「访问管理 → API 密钥管理」里建（建议只给该桶权限的子账号）
#   3. 填下面的 BUCKET / REGION，或在命令前用环境变量覆盖
#
# 上传后先用 COS 默认域名验证：
#   https://<桶名>.cos.<region>.myqcloud.com/cms-rms/entry.html
# 之后再挂 CDN 与自定义域名（proto.shanfengpm.com）。
set -euo pipefail

BUCKET="${COS_BUCKET:-}"
REGION="${COS_REGION:-ap-hongkong}"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/proto"
CACHE="Cache-Control:public, max-age=604800"

if [ -z "$BUCKET" ]; then
	echo "请先设置桶名：export COS_BUCKET=shanfeng-proto-1250000000" >&2
	exit 1
fi

if ! command -v coscmd >/dev/null 2>&1; then
	echo "缺少 coscmd：pip3 install coscmd --user" >&2
	exit 1
fi

sync_one() {
	local dir="$1"
	if [ ! -d "$SRC_DIR/$dir" ]; then
		echo "跳过：$SRC_DIR/$dir 不存在" >&2
		return
	fi
	echo "→ 上传 $dir ..."
	coscmd upload -r "$SRC_DIR/$dir/" "/$dir/" -H "{\"Cache-Control\":\"public, max-age=604800\"}"
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
echo "全部完成。默认域名自测："
echo "  https://${BUCKET}.cos.${REGION}.myqcloud.com/${targets[0]}/entry.html"
echo "确认能打开后，把 src/config/prototypeConfig.ts 的 PROTOTYPE_CDN_BASE 填上再部署。"
