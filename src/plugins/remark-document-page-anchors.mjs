import { visit } from "unist-util-visit";
import pdfTocs from "../constants/pdf-tocs.json";

/**
 * 给「文档流」文章的页图打上目录锚点。
 *
 * 这类文章把 PDF 按页转成 webp 顺序内嵌（`.document-page-stream` 里的
 * page-NN.webp），正文没有任何 h1~h6，侧栏目录因此是空的。
 *
 * 目录数据由 `scripts/gen_pdf_toc.py` 从 PDF 的字体层级提取，登记在
 * `src/constants/pdf-tocs.json`（key = 文章 slug）。本插件在编译期按 slug 查到
 * 该文的目录，给对应页图补三个属性：
 *
 *   id               锚点，目录点击后跳到这里
 *   data-toc-heading 层级数字（1=章，2=页标题），客户端 toc-utils 的 getAllHeadings
 *                    只认 h1~h6 和这个标记，漏了它站内跳转后重建目录会清空
 *   data-subtitles   标题文本；img 没有 textContent，toc-utils 取不到字时会回退读它
 *
 * 三处数据同源（都来自同一份 json），服务端 SSR 目录与客户端重建目录不会不一致。
 * 目录里没有的页码不动，已有 id 的尊重作者写法。
 */
const PAGE_IMG = /<img\b([^>]*?)\bsrc="([^"]*\/page-(\d+)\.webp)"([^>]*)>/gi;

function slugOf(file) {
	const fm = file?.data?.astro?.frontmatter?.slug;
	if (typeof fm === "string" && fm.trim()) return fm.trim();
	const path = file?.history?.[0] || file?.path || "";
	return (path.split("/").pop() || "").replace(/\.(md|mdx|markdown)$/i, "");
}

export function remarkDocumentPageAnchors() {
	return (tree, file) => {
		const toc = pdfTocs[slugOf(file)];
		if (!toc) return;

		const bySlug = new Map(toc.map((item) => [item.slug, item]));

		visit(tree, "html", (node) => {
			if (typeof node.value !== "string" || !node.value.includes("<img")) return;
			node.value = node.value.replace(
				PAGE_IMG,
				(match, before, src, num, after) => {
					const id = `page-${num}`;
					const item = bySlug.get(id);
					if (!item) return match;
					if (/\bid\s*=/.test(before + after)) return match;
					// data-subtitles 由客户端 JSON.parse，标题里的单引号必须转义
					const subtitles = JSON.stringify([item.text]).replace(/'/g, "&#39;");
					return `<img${before}src="${src}" id="${id}" data-toc-heading="${item.depth}" data-subtitles='${subtitles}'${after}>`;
				},
			);
		});
	};
}
