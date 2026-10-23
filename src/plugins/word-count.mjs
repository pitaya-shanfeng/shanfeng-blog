/**
 * 全站字数 / 字符数统计（飞书口径）
 *
 * 依据飞书文档的统计规则：
 *
 * 【计入字数】
 *   - 文档内文本类内容：标题、有序/无序/任务列表、引用、代码块、高亮块、表格中的文字
 *   - 标点符号：一个中文标点计为一个字数
 * 【不计入字数】
 *   - 嵌入内容：@人员、@云文档、群名片、电子表格、多维表格、思维导图、流程图、UML 图、日期提醒、卡片
 *
 * 【总字数 vs 总字符数】
 *   总字数   = 汉字 + 单词 + 数字 + 中文标点     → 关注语义单位
 *             例「一个苹果是 an apple。」= 5 汉字 + 2 英文单词 + 1 中文标点 = 8 字
 *   总字符数 = 汉字 + 英文字母 + 数字 + 中英文标点 → 关注字符单位
 *             同一句 = 5 汉字 + 7 英文字母 + 1 中文标点 = 13 字符（英文句号也计入）
 *   补充：中文标点既计入字数也计入字符；英文标点不计入字数、计入字符；空格两者都不计。
 *
 * 【关键规则】
 *   - 连续的字母与数字算「一个」词（an apple = 2，2023 = 1）
 *   - 英文标点（. , ! ? : ; ' "）不算字数
 *
 * 本文件是纯 JS（.mjs）：Astro 的 remark 插件在构建期由 Node 加载，import 不了 .ts。
 */

const HAN = "\\p{Script=Han}";

/**
 * 中文标点：
 *   \u3000-\u303F  CJK 符号与标点（、。〈〉《》「」『』【】…—～·）
 *   \u2018\u2019\u201C\u201D  中文单双引号
 *   \u2026         省略号
 *   \uFF01-\uFF0F  全角 ！？＂＇（），．
 *   \uFF1A-\uFF20  全角 ：；＜＝＞＠
 *   \uFF3B-\uFF40  全角 ［＼］＾＿｀
 *   \uFF5B-\uFF65  全角 ｛｜｝～｟｠｡｢｣､･
 */
const CJK_PUNCT = "[\\u3000-\\u303F\\u2018\\u2019\\u201C\\u201D\\u2026"
	+ "\\uFF01-\\uFF0F\\uFF1A-\\uFF20\\uFF3B-\\uFF40\\uFF5B-\\uFF65]";

/**
 * 总字数：汉字（每个 1）+ 字母数字串（整串 1）+ 中文标点（每个 1）
 * 英文标点、空格、嵌入内容均不计入
 */
export function countWords(text) {
	if (!text) return 0;
	const re = new RegExp(`${HAN}|[A-Za-z0-9]+|${CJK_PUNCT}`, "gu");
	const m = text.match(re);
	return m ? m.length : 0;
}

/**
 * 总字符数：去掉所有空白后的字符数（汉字 + 英文字母 + 数字 + 中英文标点都算）
 * 空格 / 换行 / 制表符不计入
 *
 * 目前只入库（schema 的 chars 字段），页面上一律显示「字数」，不显示字符数。
 */
export function countChars(text) {
	if (!text) return 0;
	return text.replace(/\s/g, "").length;
}

/**
 * 阅读速度：150 字/分钟。
 *
 * 这个数字指的是**深度阅读**，不是通读：产品方法论这类内容，读一段要停下来
 * 想一下、必要时回看上一节，速度上不去。常见参照：
 *   通读 300–400 字/分 ｜ 一般技术阅读 200–250 ｜ 深度阅读（含回看与笔记）120–150
 * 原来用 200（沿用母版 reading-time 的 200 词/分，但那是英文单词口径，
 * 换到中文偏快），24 万字的书只算出 20 小时，没把理解的成本算进去。
 */
export const WORDS_PER_MINUTE = 150;

/** 由总字数换算阅读分钟数，最少 1 分钟 */
export function countMinutes(words) {
	return Math.max(1, Math.round((words || 0) / WORDS_PER_MINUTE));
}

/** 一次性拿到三个值 */
export function measure(text) {
	const words = countWords(text);
	return {
		words,
		chars: countChars(text),
		minutes: countMinutes(words),
	};
}