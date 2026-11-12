/**
 * 「思路 / 调研 / 案例」三栏的合集页配置
 *
 * 这几栏原来没有页面，二级菜单曾直接落归档筛选；归档页下线后统一走合集页。
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
	/** 副题：标题下面那行短标签（层级感，如「方法沉淀」） */
	subtitle?: string;
	/** 一句话定位 */
	lead: string;
	/** 说明段：只讲这一页能替读者做什么 */
	desc: string;
	/** 空态标题下方的说明 */
	emptyHint: string;
	/** 刊头图；不传则回落全局壁纸 */
	banner?: string;
	/** 多张刊头：每次进页面随机取一张 */
	banners?: string[];
	/** 图标（astro-icon 名） */
	icon: string;
	/** 盘口单位 */
	unit?: string;
	/**
	 * 列表顺序：正序（老的在上面，新文章默认接在最后）或倒序（默认）。
	 * 产品设计这类按系列读的栏目用正序，读者从第 1 篇往下走。
	 */
	sort?: "asc" | "desc";
}

export const topicPages: TopicPageConfig[] = [
	{
		slug: "fangfa-chendian",
		name: "思路",
		group: "",
		category: "思路",
		subtitle: "方法沉淀",
		lead: "一次做对之后，想办法让下次也做对。",
		desc: "需求、设计、增长、分析工具，写的是「下次还能照着做」的那一层：边界在哪、代价是什么、什么时候不该用。",
		emptyHint: "陆续整理中：先把已经跑通的几套方法写出来。",
		banners: [
			"/assets/images/topics/idea-banner-01.webp",
			"/assets/images/topics/idea-banner-02.webp",
			"/assets/images/topics/idea-banner-03.webp",
			"/assets/images/topics/idea-banner-04.webp",
			"/assets/images/topics/idea-banner-05.webp",
		],
		banner: "/assets/images/topics/idea-banner-01.webp",
		// 方法按发布正序排：最早写的《PRD 的那些事》排第一，读起来像一条成长线
		sort: "asc",
		icon: "material-symbols:menu-book-rounded",
	},
	{
		slug: "diaoyan-fenxi",
		name: "调研",
		group: "",
		category: "调研",
		subtitle: "事实与证据",
		lead: "在相信一个结论之前，先看看它是怎么来的。",
		desc: "每次调研留一份可复核的记录：问了谁、怎么问、哪些答案互相矛盾。结论可以变，过程要能追溯。",
		emptyHint: "还在做第一份。等数据齐了再落笔。",
		banners: [
			"/assets/images/topics/research-banner-01.webp",
			"/assets/images/topics/research-banner-02.webp",
			"/assets/images/topics/research-banner-03.webp",
			"/assets/images/topics/research-banner-04.webp",
			"/assets/images/topics/research-banner-05.webp",
		],
		banner: "/assets/images/topics/research-banner-01.webp",
		icon: "material-symbols:description-rounded",
	},
	{
		slug: "chanpin-sheji",
		name: "案例",
		group: "",
		category: "案例",
		subtitle: "工程与落地",
		lead: "项目结束之后，才看得清当初该停在哪儿。",
		desc: "从结构、流程到交互，讲一个产品怎么从「想清楚了」变成「用起来顺手」；项目收尾后再回头找那条回头路——哪些判断对、哪些只是运气、下次该在哪个节点停下来。不堆方法论，只写每次取舍的代价。",
		emptyHint: "第一篇大概会从一次结构重写开始：为什么推倒，重写后哪些问题消失了。",
		banners: [
			"/assets/images/topics/case-banner-01.webp",
			"/assets/images/topics/case-banner-02.webp",
			"/assets/images/topics/case-banner-03.webp",
			"/assets/images/topics/case-banner-04.webp",
			"/assets/images/topics/case-banner-05.webp",
		],
		banner: "/assets/images/topics/case-banner-01.webp",
		icon: "material-symbols:widgets-rounded",
		sort: "asc",
	},
];
