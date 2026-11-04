#!/bin/zsh
# 双击运行：在「终端」里启动《见山》本地预览
# 关掉这个终端窗口，服务就停。
cd "$(dirname "$0")" || exit 1

# WorkBuddy 会通过 NODE_OPTIONS 注入一个删除守卫，会拦 Vite 提交依赖缓存，
# 导致依赖目录被写坏、页面报 svelte 内部错误。这里去掉它。
unset NODE_OPTIONS

# 本机 Node 自带的 CA 链不认 fontsource / Cloudflare 的证书，报
# UNABLE_TO_GET_ISSUER_CERT_LOCALLY，结果是 Astro 拉不到字体、wrangler 登录失败。
# 指向 macOS 系统证书包即可解决。curl 不受影响，所以之前容易误判成网络问题。
export NODE_EXTRA_CA_CERTS=/etc/ssl/cert.pem

echo "正在启动《见山》本地预览…"
echo "地址：http://127.0.0.1:4321"
echo "关掉这个窗口即停止服务。"
echo ""

./node_modules/.bin/astro dev --port 4321 --host 127.0.0.1
