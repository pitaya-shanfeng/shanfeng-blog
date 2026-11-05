/**
 * 「方法 / 实战」两栏的二级合集页配置
 *
 * 这两栏原来没有页面，二级菜单直接落归档筛选（/archive/?category=…）。
 * 现在统一走和见山、拾遗同源的合集页（CollectionPage.astro）：
 * 刊头在 banner 上、说明卡、列表卡，全部三处一致。
 *
 * 每个二级菜单 = 一个分类，category 一律两级写法（方法/需求洞察）。
 * 加一个栏目只需在下面加一项，路由 /topics/<slug>/ 由 [topic].astro 自动生成。
 */
export interface TopicPageConfig {
	/** 路由用，全英文小写短横线 */
	slug: string;
	/** 栏目名（刊头大标题） */
	name: string;
	/** 上级栏目，刊头副题显示成「方法 · 需求洞察」 */
	group: string;
	/** 取数用的分类，两级写法 */
	category: string;
	/** 一句话定位 */
	lead: string;
	/** 说明段：只讲这一页能替读者做什么 */
	desc: string;
	/** 空态标题下方的说明 */
	emptyHint: string;
	/** 刊头图；不传则回落全局壁纸 */
	banner?: string;
	/** 图标（astro-icon 名） */
	icon: string;
	/** 盘口单位 */
	unit?: string;
}

export const topicPages: TopicPageConfig[] = [
	{
		slug: "xuqiu-dongcha",
		name: "需求洞察",
		group: "方法",
		category: "方法/需求洞察",
		lead: "先分清是谁的问题，再谈怎么解。",
		desc: "需求不是答案，是线索：把用户说出口的方案还原成背后的任务，再判断这件事值不值得做。这里写的是怎么问、听什么、在哪一步停下来复核。",
		emptyHint: "第一篇会从一个被误判的需求写起：当时怎么想的，后来在哪一步发现不对。",
		banner: "/assets/images/topics/xuqiu-dongcha-banner.webp",
		icon: "material-symbols:search-rounded",
	},
	{
		slug: "chanpin-sheji",
		name: "产品设计",
		group: "方法",
		category: "方法/产品设计",
		lead: "把判断落成能跑起来的东西。",
		desc: "从结构、流程到交互，讲一个产品怎么从「想清楚了」变成「用起来顺手」。不堆方法论，只写每次设计取舍的代价。",
		emptyHint: "第一篇大概会从一次结构重写开始：为什么推倒，重写后哪些问题消失了。",
		banner: "/assets/images/topics/chanpin-sheji-banner.webp",
		icon: "material-symbols:widgets-rounded",
	},
	{
		slug: "shangye-zengzhang",
		name: "商业增长",
		group: "方法",
		category: "方法/商业增长",
		lead: "增长不是把数字做大，是把账算清。",
		desc: "获客、留存、定价、渠道，每一环都写清前提和代价。谈增长先谈能撑住它的成本结构，否则只是把问题推到后面。",
		emptyHint: "第一篇会从一次失败的投放复盘开始：钱花在哪，为什么没回来。",
		banner: "/assets/images/topics/shangye-zengzhang-banner.webp",
		icon: "material-symbols:trending-up-rounded",
	},
	{
		slug: "diaoyan-baogao",
		name: "调研报告",
		group: "实战",
		category: "实战/调研报告",
		lead: "结论之前，先把事实摆全。",
		desc: "每次调研留一份可复核的记录：问了谁、怎么问、哪些答案互相矛盾。结论可以变，过程要能追溯。",
		emptyHint: "还在做第一份。等数据齐了再落笔。",
		banner: "/assets/images/topics/research-banner.webp",
		icon: "material-symbols:description-rounded",
	},
	{
		slug: "fangan-sheji",
		name: "方案设计",
		group: "实战",
		category: "实战/方案设计",
		lead: "方案要能被别人接着做。",
		desc: "一份方案的价值不在于写完，而在于别人能不能照着执行、能不能看出取舍在哪。这里收的是成稿的骨架与取舍说明。",
		emptyHint: "第一份方案整理中：目标、边界、代价三块先写清楚。",
		banner: "/assets/images/topics/fangan-sheji-banner.webp",
		icon: "material-symbols:account-tree-rounded",
	},
	{
		slug: "xiangmu-fupan",
		name: "项目复盘",
		group: "实战",
		category: "实战/项目复盘",
		lead: "复盘不是讲经过，是找那条回头路。",
		desc: "项目结束后回看：哪些判断对、哪些只是运气、下次在哪个节点该停下来。写的是可复用的判断，不是流水账。",
		emptyHint: "第一个项目刚收尾，等复盘的结论定了再发。",
		banner: "/assets/images/topics/xiangmu-fupan-banner.webp",
		icon: "material-symbols:replay-rounded",
	},
];
