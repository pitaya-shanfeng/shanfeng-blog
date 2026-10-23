/**
 * HTML 文章 loader —— 让 `.html` 文件直接成为一篇博客文章。
 *
 * 与 md 文章放在同一个目录（默认 `src/content/posts`），所以直接把 html 丢进去就能用；
 * 集合本身是独立的（`htmlPosts`），但数据形状与 `posts` 完全一致，
 * 取数时在 getSortedPosts() 里合并，列表页 / 分类 / 标签 / 归档 / RSS / 相关文章都会自动带上它们。
 *
 * 元信息从 HTML 自身读取（<title> / <meta>），详见 html-post-utils.ts。
 */

import fs from "node:fs/promises";
import path from "node:path";
import type { Loader } from "astro/loaders";
import { HTML_POST_CONTENT_CLASS, parseHtmlPost, scopeCss } from "./html-post-utils";

/** 递归找出所有 .html 文件（跳过隐藏目录与 node_modules） */
async function findHtmlFiles(dir: string): Promise<string[]> {
	const found: string[] = [];
	let entries: Awaited<ReturnType<typeof fs.readdir>>;
	try {
		entries = await fs.readdir(dir, { withFileTypes: true });
	} catch {
		return found;
	}
	for (const entry of entries) {
		if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			found.push(...(await findHtmlFiles(full)));
		} else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
			// 下划线开头的文件当作「模板/草稿」跳过，不发布（例如 _html-article-template.html）
			if (entry.name.startsWith("_")) continue;
			found.push(full);
		}
	}
	return found;
}

export function htmlPostsLoader(options: { base: string }): Loader {
	const baseDir = path.resolve(process.cwd(), options.base);

	return {
		name: "html-posts-loader",
		load: async ({ store, parseData, generateDigest, logger, watcher }) => {
			const load = async () => {
				const files = (await findHtmlFiles(baseDir)).sort();
				store.clear();

				for (const file of files) {
					const raw = await fs.readFile(file, "utf-8");
					const stat = await fs.stat(file);
					const rel = path.relative(baseDir, file).split(path.sep).join("/");
					// Astro 要求 filePath 相对站点根目录，不能给绝对路径
					const filePath = path.relative(process.cwd(), file).split(path.sep).join("/");
					const parsed = parseHtmlPost(raw, {
						title: path.basename(file, path.extname(file)),
						date: stat.mtime,
					});

					// URL slug：优先 frontmatter/meta 里的 slug，否则用相对路径。
					// id 保留 .html 扩展名，与 md 文章（id 带 .md）保持一致，
					// 取 URL 时由 removeFileExtension 统一去掉。
					const id = (parsed.meta.slug || rel).replace(/^\/+|\/+$/g, "");

					const data = await parseData({
						id,
						data: {
							...parsed.meta,
							// 标记文章格式，供页面区分渲染方式
							format: "html",
							// 阅读时长 / 字数与 md 文章口径一致（同一个 reading-time 实现）
							words: parsed.words,
							chars: parsed.chars,
							minutes: parsed.minutes,
						},
						filePath,
					});

					// 自带 CSS 加作用域后内联到正文最前面：
					// 这样它的 body / * 这类规则不会污染整页，也避免再往页面里塞第二个出口
					const scopedCss = scopeCss(parsed.css, `.${HTML_POST_CONTENT_CLASS}`);
					const bodyHtml = scopedCss
						? `<style>${scopedCss}</style>\n${parsed.bodyHtml}`
						: parsed.bodyHtml;

					store.set({
						id,
						data,
						body: bodyHtml,
						filePath,
						digest: generateDigest(raw),
						// 关键：提供 rendered.html + headings，
						// 这样 render(entry) 与 <Content /> 对 HTML 文章同样可用，
						// 上方整条链路（文章页 / 卡片 / RSS）都不用为 HTML 单独分支
						rendered: {
							html: bodyHtml,
							headings: parsed.headings,
							metadata: {
								words: parsed.words,
							chars: parsed.chars,
								minutes: parsed.minutes,
								excerpt: parsed.excerpt,
								quote: parsed.quote,
							},
						},
					});
				}

				if (files.length > 0) {
					logger.info(`已载入 ${files.length} 篇 HTML 文章`);
				}
			};

			await load();

			// 开发环境下编辑 html 文件后自动重载
			if (watcher) {
				watcher.add(baseDir);
				watcher.on("change", async (changedPath: string) => {
					if (changedPath.toLowerCase().endsWith(".html")) await load();
				});
				watcher.on("unlink", async (changedPath: string) => {
					if (changedPath.toLowerCase().endsWith(".html")) await load();
				});
				watcher.on("add", async (changedPath: string) => {
					if (changedPath.toLowerCase().endsWith(".html")) await load();
				});
			}
		},
	};
}
