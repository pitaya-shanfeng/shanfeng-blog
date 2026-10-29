/**
 * banner 金句数据
 *
 * 源文件是 `src/data/banner-quotes.md`，与《产品经理金句集》原文保持一致，
 * 构建期解析成数组。改金句只改那个 md，不用碰页面和脚本。
 *
 * 原文格式：`1. 「正文」——署名`
 * 正文内部允许出现书名号与引号（如「用「做没做」替代「值不值得做」」），
 * 所以正文用贪婪匹配到 `——` 之前最后一个 `」`，不能写成非贪婪。
 *
 * 用 `?raw` 让 Vite 在打包时把 md 内联成字符串，而不是运行时 fs 读文件：
 * 之前用 `fs.readFileSync(new URL(...))`，`astro build` 的预渲染阶段
 * import.meta.url 指向 `dist/.prerender/`，那里没有 md → 整站构建报
 * ENOENT: dist/.prerender/data/banner-quotes.md。dev 下正常，只有构建才炸。
 */

import rawQuotes from "../data/banner-quotes.md?raw";

export interface BannerQuote {
	/** 金句正文，不含书名号与署名 */
	text: string;
	/** 署名；原文缺署名时为空串 */
	author: string;
}

function parseQuotes(raw: string): BannerQuote[] {
	const result: BannerQuote[] = [];

	for (const rawLine of raw.split(/\r?\n/)) {
		// 只要有序号的行，标题、空行、子标题一律跳过
		const item = rawLine.match(/^\s*\d+\s*[.、]\s*(.+?)\s*$/);
		if (!item) continue;

		const body = item[1];
		const quoted = body.match(/^「(.+)」\s*(?:——|--|—)\s*(.*)$/);
		if (!quoted) continue;

		const text = quoted[1].trim();
		const author = quoted[2].trim();
		if (text) result.push({ text, author });
	}

	return result;
}

export const bannerQuotes: BannerQuote[] = parseQuotes(rawQuotes);
