# 部署到 www.shanfengpm.com（Cloudflare Pages）

> 2026-11-03 定稿。目标：把重构后的新站部署上线，替换现有 Firefly v7.0.7 站点。

## 背景

| | 旧站（线上） | 新站（本仓库） |
|---|---|---|
| 源码 | `~/Documents/在线Blog/Firefly-master` | `~/Documents/产品专家/Blog构建` |
| 仓库 | `pitaya-shanfeng/shanfeng-blog`（main） | 无自有 remote（origin 仍指向上游 `CuteLeaf/Firefly`） |
| 托管 | Cloudflare Pages 项目 `shanfeng-blog` | — |
| 文章 | 94 篇 | 71 篇 |
| 域名 | `www.shanfengpm.com` → `shanfeng-blog.pages.dev` | — |

内容体系已整体重构：旧站平铺的文章改为「书稿 + 合集页」，因此两边 URL 只有 1 个重合。

## 已定决策

- **旧链接不保留**：接受 93 个旧 `/posts/*` 地址失效，不做 301 映射。
- **路线 B**：新建独立 Pages 项目先预览，验收后再切 DNS；旧项目保留用于回滚。

## 非目标

- 不修复现有的 `pnpm check`（37 个错误）/ `pnpm type-check`（13 个错误）。这些是既有基线，与部署解耦，上线后单独处理。
- 不做旧内容迁移、不改书稿与合集内容。
- 不动旧仓库代码。

## 前置条件（需要你本人操作）

1. **GitHub 登录**：本机 `gh` 的 token 已失效（`gh auth status` 报 invalid）。需要 `gh auth login -h github.com` 或在网页新建仓库后给我地址。
2. **Cloudflare 登录**：`wrangler whoami` 显示未认证。需要 `wrangler login`，或你直接在 Pages 控制台建项目并连仓库。

## 执行步骤

### 1. 修正站点地址

`src/config/siteConfig.ts` 的 `site_url` 当前是 `https://shanfengpm.com`（无 www），但顶域没有 DNS 记录。改为 `https://www.shanfengpm.com`，否则 canonical / RSS / sitemap 指向打不开的地址。

### 2. 本地构建验证

`pnpm build` 跑通再谈部署。当前 `dist` 为 1233 个文件 / 123 MB，远低于 Pages 的单次部署上限，不构成限制。

### 3. 切换到自有仓库

新建 `pitaya-shanfeng/shanfeng-blog-v2`（建议私有），把 `origin` 从上游模板改到新仓库，另加 `upstream` 保留与 `CuteLeaf/Firefly` 的同步能力。之后推送 main。

### 4. 新建 Pages 项目

- 名称：`shanfeng-blog-v2`，预览域 `shanfeng-blog-v2.pages.dev`
- 连接上一步的 GitHub 仓库，生产分支 `main`
- 框架预设 Astro / 构建命令 `pnpm build` / 输出目录 `dist`
- 环境变量：`NODE_VERSION=22.23.0`（package.json engines 要求 ≥22.23.0，本机是 22.16.0）、`PNPM_VERSION=11.22.0`
- 若构建镜像不认 pnpm 11，退化为 `npx pnpm@11.22.0 install && npx pnpm@11.22.0 build`

### 5. 预览验收

在 `shanfeng-blog-v2.pages.dev` 上逐项检查：首页、`/books/jianshan/`、`/books/zengzhang/`、`/notes/`、`/hotnews/`、`/picks/`、`/archive/`、md 文章页、html 文章页、搜索（Pagefind）、字体是否正常加载、RSS、sitemap、分享海报、移动端。

### 6. 切换域名

Cloudflare 不允许同一个自定义域同时绑定两个 Pages 项目，所以顺序只能是：

1. 在旧项目 `shanfeng-blog` 的 Custom domains 里移除 `www.shanfengpm.com`（旧站此时仍可在 `shanfeng-blog.pages.dev` 访问）
2. 在新项目 `shanfeng-blog-v2` 里添加 `www.shanfengpm.com`，Cloudflare 自动处理 CNAME 与证书
3. 等待证书签发与 DNS 生效，复查线上页面

## 回滚

反向执行第 6 步：新项目移除域名 → 旧项目重新添加。旧项目与旧仓库全程不删除、不改动，因此回滚不需要重新构建。切换窗口会有几分钟站点不可用的空档。

## 风险

| 风险 | 影响 | 应对 |
|---|---|---|
| Cloudflare 构建镜像不支持 pnpm 11.22.0 | 构建失败 | 改用 `npx pnpm@11.22.0` 固定版本 |
| 构建期需联网拉字体（Astro Font API） | 构建失败 | 首次上线时观察构建日志；必要时改为本地字体 |
| 93 个旧链接 404 | SEO 与外链损失 | 已接受；上线后在 Search Console 观察 404 报告 |
| 域名切换期间短暂不可访问 | 几分钟不可用 | 选低峰时段执行 |
| 类型检查未通过 | CI 红灯 | 不阻断上线，后续单独修 |
