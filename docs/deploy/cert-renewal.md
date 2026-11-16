# HTTPS 证书：签发与自动续期

## 现状（2026-11-16 备案通过后更新）

| 证书 | 域名 | 验证方式 | 到期 |
|---|---|---|---|
| `shanfengpm.com` | `shanfengpm.com` + `www` | **HTTP-01（nginx）** | 2027-02-14 |
| `umami.shanfengpm.com` | 子域 | **HTTP-01（nginx）** | 2027-02-14 |

- 全部通过 `certbot renew` 自动续期，**不需要人工介入**
- `certbot renew --dry-run` 已通过

## 备案通过后做的两件事

1. **80 端口解除拦截**：腾讯云不再返回 `dnspod webblock`，HTTP 正常 301 到 HTTPS
2. **续期方式从 DNS-01 换成 HTTP-01**：不再依赖阿里云 API，`renewal/*.conf` 里
   `authenticator = nginx`

## 阿里云 AccessKey 相关文件（现在已不需要）

备案期间 80 端口被拦，只能用 DNS-01，因此配过：

| 文件 | 用途 | 现在 |
|---|---|---|
| `/etc/letsencrypt/aliyun.env` | RAM 子账号 AccessKey | 可删 |
| `/usr/local/bin/acme-aliyun.py` | 增删 TXT | 可删 |
| `/usr/local/bin/acme-aliyun-{add,del}.sh` | certbot hooks | 可删 |

确认两个证书都切换到 nginx 验证后，这些文件可以删掉；RAM 里的那个子账号也建议禁用。

## 常用命令

```bash
# 看证书覆盖哪些域名、何时到期
sudo openssl x509 -in /etc/letsencrypt/live/shanfengpm.com/cert.pem -noout -dates -ext subjectAltName

# 演练（不消耗额度）
sudo certbot renew --dry-run

# 手动续（一般不用，systemd timer 会自动跑）
sudo certbot renew
```

## 新增子域时

```bash
# 先给子域加 A 记录，再签
sudo certbot --nginx -d new.shanfengpm.com
```
