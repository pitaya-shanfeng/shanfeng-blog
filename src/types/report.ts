/**
 * 转载 / 收录类文章的「报告速览」数据
 *
 * 在文章 frontmatter 里写成 `report:` 一段，由 ReportBrief 组件渲染成
 * 文章详情页最前面那张卡。schema 定义在 src/content.config.ts（postSchema），
 * 两边必须是同一份形状，改字段时一起改。
 */
export interface ReportFact {
	/** 带单位的数值，例如 1.48 万亿元 / +87.5% / 31 家 */
	value: string;
	/** 这个数字说的是什么，一句话 */
	label: string;
}

export interface ReportBriefData {
	/** 来源机构 */
	source?: string;
	/** 报告类型，例如 行业研究 / 政策解读 / 数据报告 */
	type?: string;
	/** 报告自身的发布日期（字符串，可能是区间或只到月份） */
	released?: string;
	/** 篇幅（页） */
	pages?: number;
	/** 原文地址 */
	href?: string;
	/** 提炼出的关键事实，建议 3~6 条 */
	facts?: ReportFact[];
	/** 为什么值得读，一句话 */
	why?: string;
	/**
	 * 是否在正文之后挂「内置阅读器」（iframe 直接看原文）。
	 * 只有外链型文章需要；PDF 型文章正文本身就是页图，不挂。
	 */
	embed?: boolean;
}
