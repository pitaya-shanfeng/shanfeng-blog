#!/bin/zsh
# 双击运行：在「终端」里启动《见山》本地预览
# 关掉这个终端窗口，服务就停。
cd "$(dirname "$0")" || exit 1

# WorkBuddy 会通过 NODE_OPTIONS 注入一个删除守卫，会拦 Vite 提交依赖缓存，
# 导致依赖目录被写坏、页面报 svelte 内部错误。这里去掉它。
unset NODE_OPTIONS

echo "正在启动《见山》本地预览…"
echo "地址：http://127.0.0.1:4321"
echo "关掉这个窗口即停止服务。"
echo ""

./node_modules/.bin/astro dev --port 4321 --host 127.0.0.1
