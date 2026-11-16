# 部署到腾讯云（备案已通过：赣ICP备2026030773号）

## 一次性准备（在服务器上）

```bash
# 1. 目录
sudo mkdir -p /var/www/shanfeng /var/www/certbot
sudo chown -R $USER:$USER /var/www/shanfeng

# 2. Nginx
sudo apt install -y nginx
sudo cp nginx-shanfeng.conf /etc/nginx/conf.d/shanfeng.conf
sudo nginx -t

# 3. 证书（先临时注释 80 端口那段 return 301，才能过验证）
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d shanfengpm.com -d www.shanfengpm.com
# 成功后把 80 端口那段 return 301 取消注释，reload
```

## 每次发版（在本地）

```bash
cp .deploy.env.example .deploy.env   # 首次：填服务器 IP / 账号
./scripts/deploy-tencent.sh
```

脚本做三件事：`pnpm build`（含 CDN 改写与产物瘦身）→ `rsync dist/` → `nginx -t && reload`。

## 注意

- 图片与原型都在 COS，`dist` 只有约 70MB，3Mbps 上行也能几分钟传完
- DNS 切换前先把证书签发好，否则 https 会报错
- 切完在 Cloudflare 把旧项目下线，避免两个站点同时可访问
