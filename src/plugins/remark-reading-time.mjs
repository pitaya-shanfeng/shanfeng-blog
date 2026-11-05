// biome-ignore lint/suspicious/noShadowRestrictedNames: <toString from mdast-util-to-string>
import { toString } from "mdast-util-to-string";
import { measure } from "./word-count.mjs";

/** 正文里的内容图：markdown 的 image 节点，以及 md 里直接写的 <img> */
function countImages(node) {
	let n = 0;
	const walk = (n2) => {
		if (!n2 || typeof n2 !== "object") return;
		if (n2.type === "image") {
			n += 1;
			return;
		}
		if (n2.type === "html" && typeof n2.value === "string") {
			n += (n2.value.match(/<img\b/gi) || []).length;
			return;
		}
		if (Array.isArray(n2.children)) for (const c of n2.children) walk(c);
	};
	walk(node);
	return n;
}

/**
 * 字数 / 字符数 / 阅读时长。
 *
 * 口径见 `src/plugins/word-count.mjs`：飞书文档的统计规则 ——
 * 总字数 = 汉字 + 单词 + 数字 + 中文标点；总字符数 = 去掉空白后的字符数。
 * 时长 = 字数 / 150 字每分钟 + 内容图 × 2 分钟，最少 1 分钟。
 *
 * 纯文本由 mdast 树转出，已去掉标题/列表/表格/链接等 markdown 语法与脚注标记。
 */
export function remarkReadingTime() {
	return (tree, { data }) => {
		const textOnPage = toString(tree);
		const m = measure(textOnPage, countImages(tree));
		data.astro.frontmatter.words = m.words;
		data.astro.frontmatter.chars = m.chars;
		data.astro.frontmatter.minutes = m.minutes;
	};
}
