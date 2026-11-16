# HTTPS 证书：签发与自动续期

## 现状（2026-11-16）

- 证书：Let's Encrypt，`CN=shanfengpm.com` + SAN `www.shanfengpm.com`
- 到期：**2027-02-14**（90 天，certbot 会在到期前 30 天自动续）
- 验证方式：**DNS-01**（80 端口当时被备案拦截，HTTP-01 走不通）
- 自动续期：**已配好**，靠阿里云 DNS API 自动增删 TXT，不需要人工

## 组件

| 文件 | 作用 |
|---|---|
| `/etc/letsencrypt/aliyun.env` | 阿里云 RAM 子账号 AccessKey（600，root only） |
| `/usr/local/bin/acme-aliyun.py` | 调阿里云 DNS API 增/删 `_acme-challenge` TXT |
| `/usr/local/bin/acme-aliyun-add.sh` | certbot auth-hook：写入 TXT 后轮询权威 DNS 直到生效 |
| `/usr/local/bin/acme-aliyun-del.sh` | certbot cleanup-hook：验证完删除 TXT |
| `/etc/letsencrypt/renewal/shanfengpm.com.conf` | 已记录两个 hook，`certbot renew` 直接用 |

## 常用命令

```bash
# 看证书包含哪些域名、什么时候到期
sudo openssl x509 -in /etc/letsencrypt/live/shanfengpm.com/cert.pem -noout -dates -ext subjectAltName

# 演练续期（不消耗 Let's Encrypt 额度）
sudo certbot renew --dry-run --cert-name shanfengpm.com

# 真的续期（会调用 DNS 钩子，约 40 秒）
sudo certbot renew --cert-name shanfengpm.com
```

## 换 AccessKey 时

```bash
sudo nano /etc/letsencrypt/aliyun.env   # 改 ID / Secret
sudo certbot renew --dry-run --cert-name shanfengpm.com  # 验证可用
```

## 如果改回 HTTP-01

80 端口备案解除后，可以换成全自动的 HTTP 验证（不再依赖阿里云 API）：

```bash
sudo certbot certonly --nginx -d shanfengpm.com -d www.shanfengpm.com \
  --cert-name shanfengpm.com --force-renewal
```

换完后 renewal 配置里的 authenticator 会变成 nginx，DNS 钩子就不再需要。

## 注意

- AccessKey 只授了 `AliyunDNSFullAccess`，泄了最多被人改解析；出问题在 RAM 里禁用该用户即可
- `/etc/letsencrypt/aliyun.env` **不要进任何仓库**
