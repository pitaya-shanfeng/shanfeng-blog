/**
 * 书籍（丛书）配置。
 *
 * 一本书是「内容之上的一层」：书名、简介、篇/章大纲都放这里；
 * 正文仍在文章里（frontmatter 的 `series` + `seriesOrder` 指到对应条目），
 * 书页按 `order` 把两边对上 —— 目录来自本文件，链接与字数来自文章。
 *
 * 为什么章节标题要在这里再写一遍：
 * ① 目录要能一次画全（将来有「只有标题、还没写」的条目时，没有文章也得显示）；
 * ② 篇的归属没法放在文章上 —— postSchema 里没有 part 字段，硬塞会被 zod 丢掉。
 * 现在全书都写完了，两处标题一致；改标题时以文章为准，这里只是兜底。
 *
 * 新增一本书：在 booksConfig 里加一项，然后给文章写上 series / seriesOrder 即可，
 * 页面（/books/<id>/）会自动生成。
 */

export interface BookEntry {
	/** 与文章 frontmatter 的 seriesOrder 对应；可以带小数（如附表用 5.5 排在两章之间） */
	order: number;
	/** 目录里显示的编号：序 / 第 01 章 / 附 / 后记 */
	label: string;
	title: string;
	/** 标题下一行的一句话摘要 */
	summary?: string;
}

export interface BookPart {
	/** 第一篇 */
	name: string;
	/** 认知篇 */
	title: string;
	/** 篇副标题，取自该书原稿的篇首语标题 */
	subtitle: string;
	/** 篇首语所在的 spec 条目 id —— 篇首语没有详情页，只在书页内折叠展开 */
	introId: string;
	entries: BookEntry[];
}

export interface BookConfig {
	/** 路由用：/books/<id>/ */
	id: string;
	title: string;
	/** 书名字上方那行小字 */
	kicker: string;
	/** 一句话定位（大字） */
	lead: string;
	/** 简介 */
	description: string;
	/** 封面图；留空则用排版封面（竖排书名） */
	cover?: string;
	preface?: BookEntry;
	parts: BookPart[];
	afterword?: BookEntry;
}

export const booksConfig: BookConfig[] = [
	{
		id: "jianshan",
		title: "见山",
		kicker: "系列 · 长篇写作 · 产品思维",
		lead: "在复杂之后，重新看见问题本身。",
		description:
			"这个系列记录我在产品工作里反复遇到的一个问题：如何在信息不完整、目标还在变化的时候，把问题看清楚——从提问、拆解到判断，尽量把过程写完整。",
		cover: "",
		preface: {
			order: 0,
			label: "序",
			title: "为什么叫《见山》",
			summary: "从「见山是山」到「见山还是山」：这本书为什么叫这个名字",
		},
		parts: [
			{
				name: "第一篇",
				title: "认知篇",
				subtitle: "先把「产品经理到底在判断什么」说清楚",
				introId: "jianshan-part-1",
				entries: [
					{
						order: 1,
						label: "第 01 章",
						title: "认知困局——产品经理的思维陷阱",
						summary: "惯性、负债、跃迁、本质：为什么越资深越难跳出做功能",
					},
					{
						order: 2,
						label: "第 02 章",
						title: "产品观——产品思维的底层架构",
						summary: "辨别方案、明确边界、算清代价：产品思维的几个判断点",
					},
					{
						order: 3,
						label: "第 03 章",
						title: "需求观——从管理需求到定义价值",
						summary: "从需求池到过滤系统：需求不是答案，而是线索",
					},
					{
						order: 4,
						label: "第 04 章",
						title: "用户观——超越共情的深度理解",
						summary: "走到用户旁边：从「用功能」到「完成一件事」",
					},
					{
						order: 5,
						label: "第 05 章",
						title: "认知融合——在冲突中做产品判断",
						summary: "几种判断撞在一起：先保不可逆的损失，再谈权重",
					},
					{
						order: 5.5,
						label: "附",
						title: "认知篇自查表",
						summary: "把这一篇的判断要点做成可对照的清单",
					},
				],
			},
			{
				name: "第二篇",
				title: "方法论篇",
				subtitle: "判断，不是想清楚就够了",
				introId: "jianshan-part-2",
				entries: [
					{
						order: 6,
						label: "第 06 章",
						title: "问题定义——先看清问题，再做方案",
						summary: "先看原方案解释不了什么：问题定义五步法",
					},
					{
						order: 7,
						label: "第 07 章",
						title: "体验设计——好设计不等于好看",
						summary: "从页面路径到用户路径：让产品动作变轻",
					},
					{
						order: 8,
						label: "第 08 章",
						title: "数据证据——让产品判断可以被验证",
						summary: "不同数据承担不同证明任务：先约定证据，再看结果",
					},
					{
						order: 9,
						label: "第 09 章",
						title: "技术认知——承诺背后的技术代价",
						summary: "承诺就是代价的来源：把「重」拆成可判定的维度",
					},
					{
						order: 10,
						label: "第 10 章",
						title: "决策沟通——把判断变成组织的选择",
						summary: "先把争论改写成选择：让判断变成能拍的决定",
					},
					{
						order: 11,
						label: "第 11 章",
						title: "路线图与优先级——把选择变成持续行动",
						summary: "方向定了，取舍才刚开始：分段推进，边走边调",
					},
				],
			},
			{
				name: "第三篇",
				title: "产品架构篇",
				subtitle: "判断，要为还没发生的事负责",
				introId: "jianshan-part-3",
				entries: [
					{
						order: 12,
						label: "第 12 章",
						title: "场景建模——看见业务里的稳定结构",
						summary: "角色、动作、交接物：从业务现场里找到不变的对象",
					},
					{
						order: 13,
						label: "第 13 章",
						title: "能力抽象——从重复动作沉淀能力",
						summary: "重复出现不是偶然：稳定部分抽成能力，变量留给业务",
					},
					{
						order: 14,
						label: "第 14 章",
						title: "平台架构——统一什么，放手什么",
						summary: "边界不在做法，而在事实：统一的是什么",
					},
				],
			},
			{
				name: "第四篇",
				title: "商业与增长篇",
				subtitle: "判断，得看它还能不能继续",
				introId: "jianshan-part-4",
				entries: [
					{
						order: 15,
						label: "第 15 章",
						title: "商业思维——产品如何养活自己",
						summary: "收入、成本与风险不在同一时间发生：怎么算完整账",
					},
					{
						order: 16,
						label: "第 16 章",
						title: "市场分析——判断方向是否值得进入",
						summary: "规模只是起点：供需变化、缺口与竞品成立条件",
					},
					{
						order: 17,
						label: "第 17 章",
						title: "增长思维——增长要放大的是什么",
						summary: "增长要放大的到底是哪个变量：从拆解到验证",
					},
					{
						order: 18,
						label: "第 18 章",
						title: "产品运营——让用户持续用好产品",
						summary: "不同状态的用户需要不同做法：围绕关键行为安排",
					},
				],
			},
			{
				name: "第五篇",
				title: "组织与发展篇",
				subtitle: "判断，得经得住换一个人、换一段时间",
				introId: "jianshan-part-5",
				entries: [
					{
						order: 19,
						label: "第 19 章",
						title: "项目协作——复杂协作中，项目为什么会失控",
						summary: "同一套流程管不好所有项目：三种项目三种交付",
					},
					{
						order: 20,
						label: "第 20 章",
						title: "组织能力——团队如何形成稳定的判断与行动",
						summary: "方向、领域、授权、协同：让个人经验成为团队能力",
					},
					{
						order: 21,
						label: "第 21 章",
						title: "长期价值——产品经理靠什么继续往前走",
						summary: "什么能交出去、什么留得住：判断力的长期资产",
					},
				],
			},
		],
		afterword: {
			order: 99,
			label: "后记",
			title: "我仍然会做错判断",
			summary: "写完这本书，为什么我还是会说「我仍然会做错判断」",
		},
	},
];

export function getBook(id: string): BookConfig | undefined {
	return booksConfig.find((book) => book.id === id);
}

/** 全书条目总数（序 + 各篇章 + 附 + 后记），用于书页的「另附」统计 */
export function countBookEntries(book: BookConfig): number {
	return (
		(book.preface ? 1 : 0) +
		book.parts.reduce((sum, part) => sum + part.entries.length, 0) +
		(book.afterword ? 1 : 0)
	);
}
