// biome-ignore lint/suspicious/noShadowRestrictedNames: <toString from mdast-util-to-string>
import { toString } from "mdast-util-to-string";
import { measure } from "./word-count.mjs";

/**
 * 字数 / 字符数 / 阅读时长。
 *
 * 口径见 `src/plugins/word-count.mjs`：飞书文档的统计规则 ——
 * 总字数 = 汉字 + 单词 + 数字 + 中文标点；总字符数 = 去掉空白后的字符数。
 * 时长按 200 字/分钟折算，最少 1 分钟。
 *
 * 纯文本由 mdast 树转出，已去掉标题/列表/表格/链接等 markdown 语法与脚注标记。
 */
export function remarkReadingTime() {
	return (tree, { data }) => {
		const textOnPage = toString(tree);
		const m = measure(textOnPage);
		data.astro.frontmatter.words = m.words;
		data.astro.frontmatter.chars = m.chars;
		data.astro.frontmatter.minutes = m.minutes;
	};
}
