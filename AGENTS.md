# Repository Guidelines

## Project Structure & Module Organization

Firefly is an Astro 7 site with Svelte islands and TypeScript configuration. Main source code lives in `src/`: routes in `src/pages`, layouts in `src/layouts`, reusable UI in `src/components`, styles in `src/styles`, content in `src/content`, helpers in `src/utils`, and Markdown/HTML plugins in `src/plugins`. Site configuration is split across `src/config` with matching type definitions in `src/types`; prefer imports from `@/config` when available. Static files served directly belong in `public`, source-managed images in `src/assets`, docs in `docs` and `Firefly-Docs`, and automation in `scripts`.

## Build, Test, and Development Commands

Use `pnpm`; the `preinstall` script enforces it.

- `pnpm dev` or `pnpm start`: run the local Astro dev server.
- `pnpm check`: run Astro diagnostics.
- `pnpm type-check`: run TypeScript with `--noEmit`.
- `pnpm format`: format `src` with Biome.
- `pnpm lint`: run Biome checks and safe fixes on `src`.
- `pnpm build`: generate icons, LQIPs, the Astro build, font subsets, and Pagefind search output in `dist`.
- `pnpm preview`: preview the production build locally.
- `pnpm new-post`: scaffold a new content post.

## Coding Style & Naming Conventions

Biome is the formatter and linter. It uses tabs for indentation and double quotes for JavaScript/TypeScript strings. Keep Astro and Svelte components in `PascalCase` (`PostCard.astro`, `Search.svelte`), config modules in `camelCase` ending with `Config.ts`, and utilities in descriptive kebab case such as `date-utils.ts`. Keep `src/types` aligned with `src/config`. Avoid unrelated formatting churn.

## Testing Guidelines

There is no dedicated unit-test framework configured. Before submitting changes, run `pnpm check`, `pnpm type-check`, and `pnpm build` for rendering, content, or generated asset work. For visual or interactive changes, verify with `pnpm dev` or `pnpm preview` and include screenshots in the PR. Name future tests near the feature they cover, using the local file name as the stem.

## Commit & Pull Request Guidelines

Use Conventional Commits, matching the current history: `feat: ...`, `fix: ...`, and `chore: ...`. Keep commits and PRs focused on one concern. PRs should include a concise summary, linked issues when relevant, validation commands run, and screenshots for UI changes. Discuss major features or design changes in an issue or discussion before implementation.

## Security & Configuration Tips

Do not commit secrets, tokens, or service keys in config files. Keep deployment-specific settings in the target platform environment, and review generated files such as `dist`, `src/constants/lqips.json`, and `src/constants/icons.ts` before committing them.

## 部署策略（2026-11-07 起）

**默认只本地提交，不推送、不部署。**

- 改完代码/内容，`git commit` 就停在本地，**不要 `git push`**
- Cloudflare Pages 绑着 `pitaya-shanfeng/shanfeng-blog` 的 `main`，一推就会自动构建部署（一次要几分钟）
- 等用户明说「更新」「发布」「推上去」时，才 `git push origin master:main`，然后验证线上
- 原因：备案审核中，自定义域名暂停解析，只能走 pages.dev，没必要每次都部署

### 部署目标（补充说明）

Cloudflare Pages 只是**备案期间的临时预览通道**，不是最终形态。

- 最终部署在**腾讯云**（轻量应用服务器 `lhins-qoawfaso`，上海；备案挂在腾讯云）
- ICP 备案下来后：域名解析切回、站点挂在腾讯云上、页脚填备案号
- 因此 **Cloudflare Pages 单次部署 20,000 文件的上限不必再纠结**：
  不要再为这个上限去删原型、拆项目或压缩内容；该加的原型照加
- 真正需要留意的是腾讯云那台机器的资源（2 核 2G、3 Mbps、40G 盘）与访问速度

## 文章版式约定（2026-11-10 起）

各合集的文章详情页布局不统一，按下面来，别随手给文章加 `hideSidebar: true`：

| 合集 | 左侧栏（头像 / 音乐 / 目录 / 相关文章） | frontmatter |
|---|---|---|
| 方法沉淀 | **保留** | 不写 `hideSidebar`（默认显示） |
| 调研分析 | 保留 | 不写 |
| 学习思考 | 保留 | 不写 |
| 实战 | 不显示 | `hideSidebar: true` |

- 实战要让位给原型 iframe 和 PPT 切换器，正文需要更宽，所以隐藏侧栏
- 方法沉淀是纯文字/表格长文，读者需要目录跳转，必须保留左侧栏
- 忘了写会默认显示侧栏——只在「实战」这类宽内容文章上显式关掉

### 合集排序

| 合集 | 排序 | 说明 |
|---|---|---|
| 实战 | `sort: "asc"` + 每篇写 `order` | 位次固定，1 = 第一篇 |
| 方法沉淀 | `sort: "asc"` | 写了 `order` 的排最前，其余按发布时间从早到晚 |
| 调研分析 | 默认 `desc`（新的在前） | — |
| 学习思考 | 正序（`asc`） | — |

### 文章页左侧栏内容

| 合集 | 头像 | 音乐 | 目录 | 相关文章 |
|---|---|---|---|---|
| 方法沉淀 | ✓ | ✓ | ✓ | ✗（`relatedPosts.excludeCategories` 里排除了） |
| 调研分析 / 学习思考 | ✓ | ✓ | ✓ | ✓ |
| 实战 | 不显示侧栏 | | | |

- 方法沉淀的文章页，左栏最后一块是**目录**，不要接「相关文章」（推荐阅读是首页/合集页的事）
- 想调整：`src/config/sidebarConfig.ts` → `relatedPosts.specificConfig.relatedPosts.excludeCategories`

### PPT / PDF 转图（有 SVG 时要先处理）

有些 PPT 的图是 **SVG-only**（`<a:blip>` 里只有 `asvg:svgBlip`，没有 PNG 兜底），
Keynote 导入会**整张图丢掉**——导出的 PDF 里那页只剩文字，看着像「图缺失」。

处理办法（实测有效）：

1. 解压 pptx，把 `ppt/slides/media/` 里的资源拷到 `ppt/media/`，
   并把 `ppt/slides/_rels/*.rels` 里的 `Target="media/…"` 改成 `Target="../media/…"`
2. 用 Chrome 把每个 `.svg` 栅格化成 2 倍 PNG（保持原 viewBox 比例）
3. 把 slide xml 里 `<a:blip><a:extLst>…svgBlip…</a:extLst></a:blip>`
   换成 `<a:blip r:embed="同 id"/>`，并把 rels 目标从 `.svg` 改成 `.png`
4. 重新打包成 pptx，再用 Keynote 导出 PDF

另外：替换已上线图片时换一个目录（如 `decks/main` → `decks/main2`），
不要覆盖同名文件——COS 的 7 天缓存不会立刻失效。

### 正文里内嵌大段 HTML 的三个坑

1. **HTML 块遇空行就结束**：md 里 `<div>…</div>` 中间有空白行，后面半截会被当 markdown（缩进 4 空格的还会变代码块）。
   → 生成时先把整块压成**一行**再嵌入（`re.sub(r">\s+<", "><", doc)` 之后再去掉多余空白），最稳。
2. **站点的列表样式会把 ul/li 压平**：文章里的要点别用 `<ul>/<li>`，用 `div` + `::before` 画圆点。
3. **`<style>` 要跟着一起内嵌**，并且改样式后要重新嵌入整块；只改生成脚本不改 md，页面不会有变化。
