/**
 * HTML 文章解析工具。
 *
 * 用途：把一份 `.html` 文件变成能直接进内容集合的文章 —— 读出元信息（标题/描述/标签/分类/日期/封面）、
 * 拆出正文与自带 CSS、抽出标题层级（供侧栏目录用）、统计字数与阅读时长、并提取 banner 金句。
 *
 * 约定（三种来源都能用）：
 *   1. 完整 HTML 文档（`<!DOCTYPE html>` + `<head>` + `<body>`）—— 直接用，只取 body 内容
 *   2. HTML 片段（只有正文标签）—— 自动包成文档后同样处理
 *   3. 顶部可选写一段 YAML frontmatter（`---` 包裹）—— 与 md 文章写法一致，优先级最高
 *
 * 元信息的读取优先级：frontmatter > `<meta>` / `<title>` > 兜底（文件名、正文首段等）
 */

import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { toText } from "hast-util-to-text";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";
import { measure } from "@/plugins/word-count.mjs";
import { visit } from "unist-util-visit";

/** 收集到的文章元信息（未填的交给集合 schema 的默认值） */
export interface HtmlPostMeta {
	title?: string;
	description?: string;
	/** 详情页 banner 金句；不填则用正文首个引用块 */
	quote?: string;
	tags?: string[];
	category?: string;
	published?: Date;
	image?: string;
	draft?: boolean;
	pinned?: boolean;
	author?: string;
	/** 自定义 URL slug；不写则用文件相对路径 */
	slug?: string;
}

export interface HtmlPostParseResult {
	meta: HtmlPostMeta;
	/** 正文 HTML（标题已补好 id，便于目录跳转） */
	bodyHtml: string;
	/** 正文自带 CSS（未加作用域，交给 scopeCss 处理） */
	css: string;
	/** 供侧栏目录使用的标题列表，结构与 md 文章 render() 返回的 headings 一致 */
	headings: Array<{ depth: number; slug: string; text: string }>;
	words: number;
	chars: number;
	minutes: number;
	excerpt: string;
	quote: string;
}

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

/**
 * 页面编辑器留下的锚点属性（`data-page-node-id` / `data-pnid-children`）。
 * 它们不属于文章内容，还会把内部节点 ID 带到发布产物里 —— 统一清掉。
 * hast 里 camelCase（dataPageNodeId）与原始写法（data-page-node-id）都能命中。
 */
const EDITOR_ATTR_PATTERN = /^data[-_]?(page[-_]?node[-_]?id|pnid)/i;

/** 摘掉编辑器锚点：属性与 `<!--pnid:…-->` 注释 */
function stripEditorArtifacts(tree: unknown): void {
	visit(
		tree as never,
		"element",
		(node: { properties?: Record<string, unknown> }) => {
			if (!node.properties) return;
			for (const key of Object.keys(node.properties)) {
				if (EDITOR_ATTR_PATTERN.test(key)) delete node.properties[key];
			}
		},
	);
	visit(
		tree as never,
		"comment",
		(
			node: { value: string },
			index: number | undefined,
			parent: { children: unknown[] } | undefined,
		) => {
			if (index === undefined || !parent) return;
			if (/^\s*pnid:/.test(node.value)) parent.children.splice(index, 1);
		},
	);
}

/** 从 meta 标签名取内容（同时支持 name= 与 property=，大小写不敏感） */
function pickMeta(metas: Map<string, string>, ...keys: string[]): string {
	for (const key of keys) {
		const value = metas.get(key.toLowerCase());
		if (value && value.trim()) return value.trim();
	}
	return "";
}

/** "a, b；c" → ["a","b","c"] */
function splitList(raw: string): string[] {
	return raw
		.split(/[,，;；]/)
		.map((item) => item.trim())
		.filter(Boolean);
}

/** 尽量把各种写法解析成 Date；失败返回 undefined */
function parseDate(raw: string): Date | undefined {
	if (!raw) return undefined;
	const normalized = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T00:00:00` : raw;
	const date = new Date(normalized);
	return Number.isNaN(date.getTime()) ? undefined : date;
}

/** 截断文本，避免 excerpt 过长 */
function clamp(text: string, max = 140): string {
	const clean = text.replace(/\s+/g, " ").trim();
	return clean.length > max ? `${clean.slice(0, max)}…` : clean;
}

/**
 * 解析一份 HTML 文章。
 * @param raw      .html 文件原文
 * @param fallback 兜底信息（文件名派生的标题与日期）
 */
export function parseHtmlPost(
	raw: string,
	fallback: { title?: string; date?: Date } = {},
): HtmlPostParseResult {
	// 顶部的 YAML frontmatter 是可选增强，剥掉后剩下的才是 HTML
	let frontmatter: Record<string, unknown> = {};
	let html = raw;
	if (/^\s*---\r?\n/.test(raw)) {
		const parsed = matter(raw);
		frontmatter = parsed.data ?? {};
		html = parsed.content;
	}

	const tree = fromHtml(html, { fragment: false });
	const slugger = new GithubSlugger();

	// 先清掉编辑器锚点，再收集内容 —— 否则属性与注释会跟着进正文
	stripEditorArtifacts(tree);

	// ---- 收集 head 里的 meta / title / style，以及 body 内容 ----
	const metas = new Map<string, string>();
	const cssParts: string[] = [];
	const headStyles: Array<{ type: string }> = [];
	let titleTag = "";

	const root = tree as unknown as { children: Array<{ type: string; tagName?: string; children?: unknown[] }> };
	const htmlNode = root.children.find((node) => node.tagName === "html") ?? root;

	for (const section of (htmlNode.children ?? []) as Array<{ tagName?: string; children?: unknown[] }>) {
		if (section.tagName !== "head" && section.tagName !== "body") continue;
		visit(section as never, "element", (node: { tagName: string; properties?: Record<string, unknown>; children?: unknown[] }) => {
			if (node.tagName === "meta") {
				const props = node.properties ?? {};
				const key = String(props.name ?? props.property ?? props.itemprop ?? "").toLowerCase();
				const content = props.content === undefined ? "" : String(props.content);
				if (key && content) metas.set(key, content);
			}
			if (node.tagName === "title" && !titleTag) {
				titleTag = toText(node as never).trim();
			}
			if (node.tagName === "style") {
				cssParts.push(toText(node as never));
				headStyles.push(node as { type: string });
			}
		});
	}

	// body 的子节点即正文；正文里的 <style> / <script> 一并去掉
	// —— 自带样式由 scopeCss 统一处理，自带脚本不在博客里执行（否则会动到宿主页面，且站内跳转后不会重新执行）
	const bodyNode = (htmlNode.children ?? []).find(
		(node: { tagName?: string }) => node.tagName === "body",
	) as { children: Array<{ tagName?: string }> } | undefined;
	// ⚠️ 有些导出（资料库页面）**没有 <body> 标签**，正文直接跟在 </head> 之后；
	// 这时取 <html> 下除 <head> 以外的全部子节点，否则正文会是空的
	const rawChildren = (bodyNode
		? (bodyNode.children ?? [])
		: (htmlNode.children ?? []).filter(
				(node: { tagName?: string }) => node.tagName !== "head",
			)) as Array<{ tagName?: string }>;
	const contentChildren = rawChildren.filter(
		(node) => node.tagName !== "style" && node.tagName !== "script",
	);

	// `<meta name="blog-remove" content="bar,toolbar">`：按类名从正文里摘掉元素。
	// 给「只在原页面里有意义、进了博客就没用」的东西留一个自声明的出口
	// （例如靠自带脚本驱动的工具栏 —— 脚本不执行，按钮就成了死键）。
	const removeClasses = splitList(pickMeta(metas, "blog-remove")).map((name) =>
		name.toLowerCase(),
	);
	if (removeClasses.length > 0) {
		visit(
			{ type: "root", children: contentChildren } as never,
			"element",
			(
				node: { properties?: Record<string, unknown> },
				index: number | undefined,
				parent: { children: unknown[] } | undefined,
			) => {
				if (index === undefined || !parent) return;
				const raw = node.properties?.className;
				const list = Array.isArray(raw)
					? raw.map(String)
					: typeof raw === "string"
						? raw.split(/\s+/)
						: [];
				if (list.some((name) => removeClasses.includes(name.toLowerCase()))) {
					parent.children.splice(index, 1);
				}
			},
		);
	}

	// ---- 给标题补 id（已有 id 的尊重作者写法），并产出目录用的 headings ----
	//
	// 标题来源有两种，一次遍历同时处理，天然保持文档顺序：
	//   1. 常规的 h1~h6
	//   2. `<meta name="blog-heading" content="claim">` 声明的类名（可选写 `claim:3` 指定层级）
	//      —— 有些导出文档根本不用 h1~h6，章节标题放在自定义类名的 div 上，不声明的话侧栏目录会是空的。
	//      ⚠️ 这类**只补 id、不改标签**，所以文档自己的样式一点不受影响。
	const headingClasses = new Map<string, number>();
	for (const entry of splitList(pickMeta(metas, "blog-heading"))) {
		const [name, depth] = entry.split(":");
		const parsed = Number(depth);
		headingClasses.set(
			name.trim().toLowerCase(),
			Number.isFinite(parsed) && parsed > 0 ? parsed : 3,
		);
	}

	const headings: HtmlPostParseResult["headings"] = [];
	visit({ type: "root", children: contentChildren } as never, "element", (node: { tagName: string; properties?: Record<string, any>; children?: unknown[] }) => {
		let depth = HEADING_TAGS.includes(node.tagName) ? Number(node.tagName.slice(1)) : 0;
		let fromClass = false;
		if (!depth && headingClasses.size > 0) {
			const raw = node.properties?.className;
			const list = Array.isArray(raw)
				? raw.map(String)
				: typeof raw === "string"
					? raw.split(/\s+/)
					: [];
			for (const name of list.map((item) => item.toLowerCase())) {
				const declared = headingClasses.get(name);
				if (declared !== undefined && (!depth || declared < depth)) {
					depth = declared;
					fromClass = true;
				}
			}
		}
		if (!depth) return;

		const text = toText(node as never).replace(/\s+/g, " ").trim();
		if (!text) return;
		node.properties = node.properties ?? {};
		const existing = typeof node.properties.id === "string" ? node.properties.id.trim() : "";
		const id = existing || slugger.slug(text);
		if (existing) slugger.slug(existing); // 让后续标题避开已占用的 id
		else node.properties.id = id;
		headings.push({ depth, slug: id, text });

		// 非 h1~h6 的标题元素打个标记：
		// 客户端目录脚本会从正文 DOM 重新采集标题（站内跳转后重建用），而它只认 h1~h6，
		// 不标记的话这类文档的目录会在重建时被清空。见 utils/toc-utils.ts 的 getAllHeadings
		if (fromClass) node.properties.dataTocHeading = String(depth);
	});

	// ---- 元信息 ----
	const fm = frontmatter as Record<string, any>;
	const fmTags = fm.tags ?? fm.keywords;
	const tags = Array.isArray(fmTags)
		? fmTags.map((item: unknown) => String(item).trim()).filter(Boolean)
		: typeof fmTags === "string"
			? splitList(fmTags)
			: splitList(pickMeta(metas, "keywords", "tag", "article:tag"));

	const firstParagraph = (() => {
		let found = "";
		visit({ type: "root", children: contentChildren } as never, "element", (node: { tagName: string }) => {
			if (found) return;
			if (node.tagName === "p") {
				const text = toText(node as never).replace(/\s+/g, " ").trim();
				if (text) found = text;
			}
		});
		return found;
	})();

	const firstQuote = (() => {
		let found = "";
		visit({ type: "root", children: contentChildren } as never, "element", (node: { tagName: string }) => {
			if (found || node.tagName !== "blockquote") return;
			const text = toText(node as never).replace(/\s+/g, " ").trim();
			if (text) found = text;
		});
		return found;
	})();

	const plainText = toText({ type: "root", children: contentChildren } as never);
	const reading = measure(plainText);

	const published =
		parseDate(String(fm.published ?? fm.date ?? "")) ??
		parseDate(pickMeta(metas, "date", "article:published_time", "published")) ??
		fallback.date;

	const meta: HtmlPostMeta = {
		title: String(fm.title ?? "").trim() || titleTag || fallback.title || "",
		description:
			String(fm.description ?? "").trim() ||
			pickMeta(metas, "description", "og:description") ||
			clamp(firstParagraph),
		tags,
		category: String(fm.category ?? "").trim() || pickMeta(metas, "category", "article:section"),
		published,
		image: String(fm.image ?? "").trim() || pickMeta(metas, "image", "og:image"),
		draft: fm.draft === true || /^(true|1|yes)$/i.test(pickMeta(metas, "draft")),
		pinned: fm.pinned === true || /^(true|1|yes)$/i.test(pickMeta(metas, "pinned")),
		author: String(fm.author ?? "").trim() || pickMeta(metas, "author"),
		slug: String(fm.slug ?? "").trim() || pickMeta(metas, "slug"),
		quote: String(fm.quote ?? "").trim() || clamp(firstQuote, 200),
	};

	return {
		meta,
		bodyHtml: toHtml({ type: "root", children: contentChildren } as never),
		css: cssParts.join("\n"),
		headings,
		words: reading.words,
		chars: reading.chars,
		minutes: reading.minutes,
		excerpt: clamp(firstParagraph || meta.description || ""),
		quote: clamp(firstQuote, 200),
	};
}

/** 单个选择器加作用域前缀；:root / html / body 直接换成容器选择器 */
function scopeOneSelector(selector: string, rootSelector: string): string {
	const sel = selector.trim();
	if (!sel) return sel;
	if (/^:root\b/.test(sel)) return sel.replace(/^:root/, rootSelector);
	if (/^html\b/i.test(sel)) return sel.replace(/^html/i, rootSelector);
	if (/^body\b/i.test(sel)) return sel.replace(/^body/i, rootSelector);
	return `${rootSelector} ${sel}`;
}

/** 选择器是否指向文档的「页面级」根（:root / html / body） */
function isPageLevelSelector(selector: string): boolean {
	const sel = selector.trim();
	return /^(:root|html|body)\b/i.test(sel);
}

/**
 * 页面级盒模型与背景属性。
 *
 * 文档是整页导出的，它的 `body { padding: 36px 16px; background: #f3f7f5 }` 描述的是「自己是一个页面」，
 * 而博客里的正文是嵌在卡片中的一段内容 —— 这层留白与底色套上去就成了卡片内的一圈空框。
 * 因此重写 `:root` / `html` / `body` 时剥掉这些属性；字号、字体、行高、颜色等排版属性保留。
 * 自定义属性（`--x`）一律保留，它们是文档自己的设计变量。
 */
const PAGE_CHROME_PROP =
	/^(?:-webkit-)?(?:margin|padding|background|height|min-height|max-height|width|min-width|max-width|overflow)(?:-|$)/i;

/**
 * 给文章自带 CSS 加作用域，避免它的 `body {}`、`* {}` 这类规则污染整页。
 *
 * - 常规规则：每个选择器加容器前缀（`:root` / `html` / `body` 换成容器本身，
 *   并剥掉页面级留白/底色，见 PAGE_CHROME_PROP）
 * - `@keyframes` 内部的帧选择器（`0%` / `from`）**不能**加前缀，整段原样保留
 * - `@media` / `@supports` / `@layer` 会递归进去处理
 * - `@import` / `@charset` / `@font-face` 原样保留
 */
export function scopeCss(css: string, rootSelector: string): string {
	if (!css.trim()) return "";
	const root = postcss.parse(css);

	root.walkRules((rule) => {
		const parentName = (rule.parent as { name?: string } | undefined)?.name ?? "";
		if (/keyframes/i.test(parentName)) return; // 关键帧内部选择器不加前缀
		const parts: string[] = [];
		selectorParser((selectors) => {
			selectors.each((sel) => {
				parts.push(sel.toString().trim());
			});
		}).processSync(rule.selector);

		const cleaned = parts.filter(Boolean);
		// 整条规则的选择器都指向页面根时，才当作页面级规则处理（混合选择器保守跳过）
		const allPageLevel = cleaned.length > 0 && cleaned.every(isPageLevelSelector);

		rule.selector = cleaned
			.map((part) => scopeOneSelector(part, rootSelector))
			.join(", ");

		if (allPageLevel) {
			rule.walkDecls((decl) => {
				if (PAGE_CHROME_PROP.test(decl.prop)) decl.remove();
			});
			// 剥完没有剩下任何声明，整条规则也就没意义了
			if (!rule.nodes || rule.nodes.length === 0) rule.remove();
		}
	});

	return root.toString();
}

/**
 * HTML 文章正文容器上的类名（样式作用域的锚点）。
 * loader 会把自带 CSS 的作用域限定在这个类下；文章页在渲染 HTML 文章时把该类加到正文容器上。
 */
export const HTML_POST_CONTENT_CLASS = "html-post-content";
