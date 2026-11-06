/**
 * 侧栏「推荐阅读」的名单。
 *
 * 不是按时间排，也不是按点击排——是手工挑的 10 篇：看三件事
 * ① 有没有把一件事讲到底（页数 / 字数撑得住）② 有没有落到具体业务
 * ③ 现在读还站不站得住。所以名单是静态的，改这里就换推荐。
 *
 * note 是「为什么值得读」，鼠标悬停可见，不在版面上占位置。
 */

export interface RecommendedItem {
	/** 文章 slug（与 src/content/posts 下的 id 一致） */
	slug: string;
	/** 一句话推荐理由 */
	note?: string;
}

export const RECOMMENDED_READING: RecommendedItem[] = [
	{
		slug: "2026-11-05-weishang-tools",
		note: "84 页，把微商工具链扫了一遍：工具是怎么被业务逼出来的",
	},
	{
		slug: "2026-11-06-build-scene",
		note: "讲「场」由什么构成，场景设计里少见的成体系写法",
	},
	{
		slug: "2026-11-06-content-direction",
		note: "内容体系怎么排兵布阵：选题、分工、分发一条线",
	},
	{
		slug: "2026-11-05-chanpin-chuanboli",
		note: "传播不是投放，是产品本身带的自传播结构",
	},
	{
		slug: "2026-11-05-watsons",
		note: "38 页线下零售样本：会员、货架、门店怎么配合",
	},
	{
		slug: "2026-11-05-pinxiang-huasheng",
		note: "社交电商两种模式的完整拆解，适合对照着看",
	},
	{
		slug: "2026-11-05-alipay-wufu",
		note: "一个活动案例追到底：玩法、成本、留存怎么算",
	},
	{
		slug: "2026-11-06-membership-report",
		note: "会员制的账怎么算，别再只看会员数",
	},
	{
		slug: "2026-11-04-rag-data-pipeline",
		note: "从数据到落地最完整的一篇实践，含电商客服全链路",
	},
	{
		slug: "2026-11-04-agent-skill",
		note: "智能体能力边界在哪，从用法一路讲到原理",
	},
];
