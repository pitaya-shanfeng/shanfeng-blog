# 部署到腾讯云（线上状态：2026-11-16 已上线）

- 服务器：`124.220.166.185`（轻量应用服务器，Ubuntu 22.04，2C1.9G）
- 域名：`shanfengpm.com`（DNS 在阿里云，A 记录指向该 IP）
- 站点根：`/var/www/shanfeng`
- 凭据：SSH 用户是 `ubuntu`（密钥文件本地叫 root.pem，名字有误导性）

## 当前线上形态

| 项 | 说明 |
|---|---|
| HTTPS | ✅ Let's Encrypt 证书，DNS-01 签发，2027-02-14 到期 |
| HTTP(80) | ⚠️ 腾讯云「未备案接入」拦截中；备案订单管局状态同步后自动解除，届时靠 80 做跳转 |
| 素材 | 全部走 COS（构建时改写），服务器只放 HTML/CSS/JS |

## 每次发版

```bash
./scripts/deploy-tencent.sh
```

`pnpm build`（含 CDN 改写与产物瘦身）→ `rsync dist/` → `nginx -t && reload`。

## 证书

首次用 DNS-01（因为 80 被拦）：`certbot certonly --manual --preferred-challenges dns`，
配合 `/usr/local/bin/acme-dns-wait.sh`（轮询 TXT 是否生效，避免手动回车）。

**备案同步、80 端口解除拦截后，建议把续期方式换成 HTTP-01**（全自动）：

```bash
sudo certbot renew --cert-name shanfengpm.com --preferred-challenges http
# 或在 renew 前删掉 manual 的 authenticator 配置：
sudo certbot certonly --nginx -d shanfengpm.com   # 走 HTTP 验证
```

## 已知待办

1. `www.shanfengpm.com` 还没进证书（当前 443 用主域证书，浏览器会报不匹配）——
   80 解除后跑 `certbot --nginx -d shanfengpm.com -d www.shanfengpm.com --expand`
2. 公安联网备案：管局通过后 30 天内去 beian.mps.gov.cn 办理，拿到「公网安备 XXXXXXXX 号」后加到页脚
3. Cloudflare Pages 的旧项目（shanfeng-blog）可以下线了
