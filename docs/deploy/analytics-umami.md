# 访问统计：自建 Umami

## 看数据

```
https://umami.shanfengpm.com
账号：admin
密码：ShanfengPM2026!     ← 首次登录后请在 Settings → Profile 改掉
```

站点：山风Blog（domain `shanfengpm.com`，websiteId `3dcbe81d-27aa-4f0f-a819-aee24af0791f`）

## 部署形态

服务器同机跑两个容器（`/opt/umami/docker-compose.yml`）：

| 容器 | 作用 |
|---|---|
| `umami_umami_1` | Umami 本体（Next.js，监听 127.0.0.1:3000） |
| `umami_umami-db_1` | PostgreSQL 16，数据在 volume `umami_umami-db-data` |

nginx 反代：`/etc/nginx/sites-available/umami.conf`（证书 `/etc/letsencrypt/live/umami.shanfengpm.com/`）。

密码、APP_SECRET 存在 `/opt/umami/.env`（600）。

## 站点侧接入

`src/config/analyticsConfig.ts`：

```ts
umamiAnalytics: {
  websiteId: "3dcbe81d-27aa-4f0f-a819-aee24af0791f",
  scriptUrl: "https://umami.shanfengpm.com/script.js",
  ...
}
```

每页只加载一个 ~2KB 脚本，请求打到自己服务器，不经过任何第三方。

## 常用命令

```bash
cd /opt/umami
sudo docker-compose ps          # 状态
sudo docker-compose logs -f umami
sudo docker-compose restart umami
```

## 备份

数据都在 Postgres volume 里，建议每周导出一次（待接进定时任务）：

```bash
sudo docker exec umami_umami-db_1 pg_dump -U umami umami | gzip > /var/backups/umami-$(date +%F).sql.gz
```

## 排错备忘

- **headless 浏览器访问不会被记录**：Umami 会过滤 bot UA，用正常浏览器或带正常 UA 才能验证
- 脚本 200 但数据为 0，先看 `/api/send` 是否 204/200，再看 `website_event` 表有没有行
- 镜像来自 `ghcr.m.daocloud.io`（GitHub 容器仓库在国内走加速）
