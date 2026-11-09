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

/**
 * 把 md 里直接写的 HTML 块变成「可见文字」再统计。
 *
 * 原来直接用 toString(tree)，html 节点的 value 是**原始源码**，
 * <div class="callout"> 里的 div / class / callout 会被当英文单词数进去，
 * 内嵌文档（OneID、订单路由、乐乐茶方案）的 style/script 也一并算，
 * 字数会虚高。这里先剥掉标签、样式与脚本，只留人眼能看到的字。
 */
function stripHtml(value) {
	let s = value;
	s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
	s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
	s = s.replace(/<br\s*\/?>/gi, " ");
	s = s.replace(/<\/(p|div|li|tr|h[1-6]|table|section)>/gi, " ");
	s = s.replace(/<[^>]+>/g, " ");
	s = s
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"');
	return s.replace(/[ \t]+/g, " ");
}

/** 深拷贝一份树，仅把 html 节点换成纯文本，其余原样 */
function textOnlyTree(node) {
	if (!node || typeof node !== "object") return node;
	if (node.type === "html" && typeof node.value === "string") {
		return { ...node, value: stripHtml(node.value) };
	}
	if (Array.isArray(node.children)) {
		return { ...node, children: node.children.map(textOnlyTree) };
	}
	return node;
}

export function remarkReadingTime() {
	return (tree, { data }) => {
		const textOnPage = toString(textOnlyTree(tree));
		const images = countImages(tree);
		const m = measure(textOnPage, images);
		data.astro.frontmatter.images = images;
		data.astro.frontmatter.words = m.words;
		data.astro.frontmatter.chars = m.chars;
		data.astro.frontmatter.minutes = m.minutes;
	};
}
