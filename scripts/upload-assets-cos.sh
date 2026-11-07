#!/usr/bin/env bash
#
# 把 public/assets 上传到腾讯云 COS（正文图片走对象存储，不进仓库/产物）。
#
# 用法：
#   export COS_BUCKET=shanfeng-assets-1524458506
#   ./scripts/upload-assets-cos.sh            # 上传全部（约 800 MB）
#   ./scripts/upload-assets-cos.sh library    # 只传某个子目录
#
# 前置：
#   pip3 install coscmd --user
#   coscmd config -a <SecretId> -s <SecretKey> -b <桶名> -r ap-shanghai
#
# 上传后：把 src/config/assetsConfig.ts 的 ASSETS_CDN_BASE 填成
#   https://<桶名>.cos.ap-shanghai.myqcloud.com
#   （备案通过、挂上 CDN 后换成 https://img.shanfengpm.com）
set -euo pipefail

BUCKET="${COS_BUCKET:-}"
SRC="$(cd "$(dirname "$0")/.." && pwd)/public/assets"
SUBDIR="${1:-}"

if [ -z "$BUCKET" ]; then
	echo "请先设置：export COS_BUCKET=shanfeng-assets-1524458506" >&2
	exit 1
fi
if ! command -v coscmd >/dev/null 2>&1; then
	echo "缺少 coscmd：pip3 install coscmd --user" >&2
	exit 1
fi

# 图片给长缓存（内容不变），文件名带 hash 的可以更久；这里统一一年
HEADER='{"Cache-Control":"public, max-age=31536000"}'

if [ -n "$SUBDIR" ]; then
	echo "→ 上传 assets/$SUBDIR ..."
	coscmd upload -r "$SRC/$SUBDIR/" "/assets/$SUBDIR/" -H "$HEADER"
else
	echo "→ 上传 assets/（全部）..."
	coscmd upload -r "$SRC/" "/assets/" -H "$HEADER"
fi

echo "✓ 完成"
echo "自测：https://${BUCKET}.cos.ap-shanghai.myqcloud.com/assets/library/notes/3c-rental/cover.webp"
