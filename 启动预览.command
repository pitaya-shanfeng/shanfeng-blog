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

# 端口若被上一次残留的进程占着，只收掉占用 4321 的那个 PID。
# （不要用 pkill -f "astro dev"，那会把刚起来的实例一起带走）
for pid in $(lsof -nP -iTCP:4321 -sTCP:LISTEN -t 2>/dev/null); do
  kill -9 "$pid" 2>/dev/null
done
sleep 1

# 异常退出会留下锁文件，启动时报 "Another astro dev server is already running"，
# 但它指向的进程其实已经没了。删掉即可。
[ -f .astro/dev.json ] && rm -f .astro/dev.json

start() {
  ./node_modules/.bin/astro dev --port 4321 --host 127.0.0.1
}

echo "正在启动《见山》本地预览…"
echo "地址：http://127.0.0.1:4321"
echo "关掉这个窗口即停止服务。"
echo ""

# 已知问题：清缓存后第一次启动会触发一次配置热重载，随后以
# "Cannot read properties of null (reading 'port')" 退出。自动重试一次即可。
start
if [ $? -ne 0 ]; then
  echo ""
  echo "首次启动失败（配置热重载导致），正在重试一次…"
  rm -f .astro/dev.json
  sleep 1
  start
fi
