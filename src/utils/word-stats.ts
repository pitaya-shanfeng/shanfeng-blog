import { readFileSync, readdirSync, statSync } from "node:fs";
import { countWords } from "../plugins/word-count.mjs";

/**
 * 全站统一的「字数 / 页数 / 阅读时长」口径（2026-11-10 改）。
 *
 *   字数 = 正文 markdown 的字数 + 内嵌 HTML / PPT / PDF 里的文字（能取到才算）
 *   页数 = 原型页 + 内嵌 PPT / PDF 页
 *   时长 = 正文字数/150 + 页数×2 + 正文图片×2，最少 1 分钟
 *
 * 注意：PPT 的文字只进「字数」，不再额外计时——页数×2 已经把读这一页的开销算进去了，
 * 再加一次就重复了。
 */

const ROOT = "public/proto";
const SHELL_FILES = /^(index|entry|start)/;

/** 一页原型 / PPT / PDF 折算的分钟数 */
export const MINUTES_PER_PAGE = 2;

/** 正文里一张图折算的分钟数（与 word-count.mjs 保持一致） */
export const MINUTES_PER_IMAGE = 2;

/** 剥掉 script / style / 标签，只留人眼能看到的文字 */
export function htmlToText(html: string): string {
	let s = html;
	s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
	s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
	s = s.replace(/<!--[\s\S]*?-->/g, " ");
	s = s.replace(/<br\s*\/?>/gi, " ");
	s = s.replace(/<\/(p|div|li|tr|td|th|h[1-6]|table|section|span)>/gi, " ");
	s = s.replace(/<[^>]+>/g, " ");
	s = s
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#\d+;/g, " ");
	return s.replace(/[ \t]+/g, " ").trim();
}

const htmlWordCache = new Map<string, number>();

/** 数一个 HTML 文件里的字数（带缓存，构建期同一文件只读一次） */
function wordsInHtmlFile(path: string): number {
	const hit = htmlWordCache.get(path);
	if (hit !== undefined) return hit;
	let n = 0;
	try {
		n = countWords(htmlToText(readFileSync(path, "utf-8")));
	} catch {
		n = 0;
	}
	htmlWordCache.set(path, n);
	return n;
}

const protoWordCache = new Map<string, number>();

/**
 * 数一个原型目录（public/proto/<dir>/）里所有页面 HTML 的字数。
 * 只读页面文件，跳过入口/外壳与资源目录；文件太大的（>1.5MB）按资源跳过，避免拖慢构建。
 */
export function countPrototypeWords(dir: string): number {
	if (!dir) return 0;
	const hit = protoWordCache.get(dir);
	if (hit !== undefined) return hit;

	let total = 0;
	try {
		const base = `${ROOT}/${dir}`;
		for (const f of readdirSync(base)) {
			if (!f.endsWith(".html")) continue;
			if (SHELL_FILES.test(f)) continue;
			const p = `${base}/${f}`;
			try {
				if (statSync(p).size > 1_500_000) continue;
			} catch {
				continue;
			}
			total += wordsInHtmlFile(p);
		}
	} catch {
		total = 0;
	}
	protoWordCache.set(dir, total);
	return total;
}

export interface PageStats {
	/** 正文 markdown 字数 */
	docWords: number;
	/** 内嵌原型 / PPT / PDF 里的字数 */
	embedWords: number;
	/** 合计字数（页面上显示的「N 字」） */
	words: number;
	/** 原型页 + PPT/PDF 页 */
	pages: number;
	/** 阅读分钟数 */
	minutes: number;
	/** 正文里的内容图（PPT/PDF 页不算在内，它们按页数算） */
	images: number;
}

/**
 * 汇总一篇文章的字数 / 页数 / 时长。
 *
 * @param docWords    remark 插件算出的正文净字数（已剥掉 HTML 标签与脚本）
 * @param images      正文里的内容图数量
 * @param options.prototypeDir     public/proto 下的原型目录名
 * @param options.prototypePages   手工指定的原型页数
 * @param options.deckPages        PPT / PDF 页数
 * @param options.deckWords        从 PPT / PDF 里抽出来的字数（导入时写进 frontmatter）
 */
export function computePageStats(
	docWords: number,
	images: number,
	options: {
		prototypeDir?: string;
		prototypePages?: number;
		deckPages?: number;
		deckWords?: number;
		documentPages?: number;
	} = {},
): PageStats {
	const protoPages =
		options.prototypePages && options.prototypePages > 0
			? options.prototypePages
			: countPrototypePagesFromDir(options.prototypeDir ?? "");
	const deckPages = options.deckPages && options.deckPages > 0 ? options.deckPages : 0;
	// 文档类文章（PDF / 图片页流）用 documentPages 记页数
	const docPages = options.documentPages && options.documentPages > 0 ? options.documentPages : 0;
	// deckPages 与 documentPages 是同一份内嵌文档的两种记法，同时出现时取较大值，别相加
	const pages = protoPages + Math.max(deckPages, docPages);

	const protoWords = countPrototypeWords(options.prototypeDir ?? "");
	const embedWords = protoWords + (options.deckWords ?? 0);
	const words = (docWords || 0) + embedWords;

	// 平铺的 PPT 页在正文里就是 N 张 <img>，已经按「页数×2」算过一遍；
	// 再当图片算一次会翻倍，所以先把这部分图从图片里扣掉。
	const deckImages = Math.min(images || 0, Math.max(deckPages, docPages));
	const otherImages = Math.max(0, (images || 0) - deckImages);

	const minutes = Math.max(
		1,
		Math.round(
			words / 150 + pages * MINUTES_PER_PAGE + otherImages * MINUTES_PER_IMAGE,
		),
	);

	return { docWords: docWords || 0, embedWords, words, pages, minutes, images: images || 0 };
}

/** 仅供内部使用：数原型目录页数（避免和 prototype-pages.ts 循环依赖） */
function countPrototypePagesFromDir(dir: string): number {
	if (!dir) return 0;
	try {
		return readdirSync(`${ROOT}/${dir}`)
			.filter((f) => f.endsWith(".html"))
			.filter((f) => !SHELL_FILES.test(f)).length;
	} catch {
		return 0;
	}
}