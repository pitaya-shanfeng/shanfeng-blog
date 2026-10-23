import {
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/navBarConfig";
import { booksConfig } from "./booksConfig";

// ============================================================================
// 导航栏配置 - 根据顺序动态生成导航栏链接
// NavBar Configuration - Dynamically generate navigation bar links based on order
// ============================================================================
//
// 结构按内容体系组织：
//
//   主页
//   ├── 写作 → 见山 / 全部著作 / 增长三部曲
//   ├── 方法 → 产品思维 / 产品方法 / 产品架构 / 商业增长 / 组织协作
//   ├── 案例 → 项目复盘 / 调研报告 / 数据案例 / 原型设计
//   ├── 拾遗 → 论文阅读 / 认知与设计 / 学习笔记 / 读书报告
//   └── 关于 → 个人介绍 / 版权声明 / 书签导航 / 联系合作
//
// 二级项为什么指向 /archive/?category=&tag= ：
// 模板的分类没有独立页面（`getCategoryUrl` 同样指向归档页的筛选），而归档页的筛选支持
// `?category=` 与 `?tag=` **同时给出、取交集**（见 ArchivePanel 的 applyFilter）。
// 所以「分类当一级桶（如 方法沉淀）+ 标签当二级主题（如 数据分析）」就能精确落到子项：
//   全部方法 → /archive/?category=方法沉淀
//   数据分析 → /archive/?category=方法沉淀&tag=数据分析
// 这也意味着发文章时：**category 填一级桶名，tags 里带上对应的二级主题名**，导航才对得上。

/**
 * 内容分组：一级 = 内容来源，四栏互斥；二级 = 该栏的索引项。
 *
 *   首页
 *   ├── 写作   → 见山 / 全部著作 / 增长三部曲   我写的书
 *   ├── 方法   → 产品思维 / 产品方法 / …     可复用的做法
 *   ├── 案例   → 项目复盘 / 调研报告 / …     做过的项目
 *   ├── 拾遗   → 论文阅读 / 认知与设计 / …   外部的输入
 *   └── 关于   → 个人介绍 / 版权声明 / …      我是谁
 *
 * 菜单是**内容规划**：条目代表打算写的方向，即使内容还没写出来也先留位，
 * 让人一眼看出这个站在往哪儿走。空位点进去会是空列表，属预期。
 *
 * ⚠️ 母版的一条硬约束：`resolveNavMenuLinks` 里
 * 「一级项只剩一个子项时，直接把子项提到一级」（父项名消失）。
 * 所以每个一级项**至少要有两个子项**，否则一级名根本显示不出来。
 * 「写作」因此配了「见山 + 全部著作」两项。
 *
 * 二级项一律**只按 tag 筛**（`/archive/?tag=xxx`），不按 category：
 * 站里文章的 category 是「著书立说 / 论文阅读 / 认知与设计」三种，
 * 与栏目不是一一对应；而 tag 才是稳定的索引维度。
 * 归档页的 category 与 tag 同时给出时取交集（见 ArchivePanel 的 applyFilter），
 * 这里只给 tag，避免筛出空列表。
 */

/** 归档页按标签筛选（只给 tag，避开 category 的交集） */
const archiveByTag = (tag: string): string =>
	`/archive/?${new URLSearchParams({ tag }).toString()}`;

/** 归档页按分类筛选（用于「全部著作」——《见山》24 章的 category 就是「著书立说」） */
const archiveByCategory = (category: string): string =>
	`/archive/?${new URLSearchParams({ category }).toString()}`;

/** 二级项：书名走书页，主题走标签筛选 */
interface TopicRef {
	name: string;
	/** 标签（与分类筛选二选一） */
	tag?: string;
	/** 分类（与标签筛选二选一） */
	category?: string;
	/** 对应 booksConfig 里的书（直接进书页） */
	book?: string;
}

interface ContentGroupConfig {
	name: string;
	/** 一级项图标：块状语汇里不用图标，留空即可 */
	icon?: string;
	topics: TopicRef[];
}

const CONTENT_GROUPS: ContentGroupConfig[] = [
	{
		name: "写作",
		topics: [
			{ name: "见山", book: "见山" },
			// 「书章列表」＝按文章列表看这一书（分类「著书立说」即这 24 章）
			{ name: "书章列表", category: "著书立说" },
			// 《增长三部曲》还在写，菜单先留位
			{ name: "增长三部曲", tag: "增长三部曲" },
		],
	},
	{
		name: "方法",
		// 显示名与标签解耦：原来的「产品架构」「商业增长」与《见山》三、四篇完全同名，
		// 读者按篇名找却点出一堆散章 —— 显示名改成主题域的说法，URL 仍走原标签。
		topics: [
			{ name: "认知与判断", tag: "产品思维" },
			{ name: "需求与方案", tag: "产品方法" },
			{ name: "建模与架构", tag: "产品架构" },
			{ name: "商业与增长", tag: "商业增长" },
			{ name: "组织与协作", tag: "组织协作" },
		],
	},
	{
		name: "案例",
		// 这一栏是内容规划，实战类文章还在写，菜单先留位
		topics: [
			{ name: "项目复盘", tag: "项目复盘" },
			{ name: "调研报告", tag: "调研报告" },
			{ name: "数据案例", tag: "数据案例" },
			{ name: "原型设计", tag: "原型设计" },
		],
	},
	{
		name: "拾遗",
		topics: [
			{ name: "论文阅读", tag: "论文阅读" },
			{ name: "认知与设计", tag: "认知与设计" },
			// 以下两类还在写，菜单先留位
			{ name: "学习笔记", tag: "学习笔记" },
			{ name: "读书报告", tag: "读书报告" },
		],
	},
];

/** 内容分组 → 导航项（一级 = 分组，二级 = 各索引项） */
const buildContentGroup = (group: ContentGroupConfig): NavBarLink => ({
	name: group.name,
	url: "#",
	icon: group.icon,
	children: group.topics.map((topic) => {
		// 二级项如果对应一本已配置的书，直接进书页；否则按标签退回归档筛选
		const book = topic.book
			? booksConfig.find((item) => item.title === topic.book)
			: undefined;
		return {
			name: topic.name,
			url: book
				? `/books/${book.id}/`
				: topic.category
					? archiveByCategory(topic.category)
					: archiveByTag(topic.tag ?? topic.name),
		};
	}),
});

/** 关于分组 */
const ABOUT_GROUP: NavBarLink = {
	name: "关于",
	url: "#",
	children: [
		{ name: "个人介绍", url: "/about/" },
		{ name: "版权声明", url: "/privacy/" },
		{ name: "书签导航", url: "/booknav/" },
		{ name: "联系合作", url: "/contact/" },
	],
};

const getDynamicNavBarConfig = (): NavBarConfig => {
	const links: NavBarLink[] = [
		// 主页
		LinkPresets.Home,

		// 四个内容分组（著书立说 / 方法沉淀 / 实战复盘 / 学海拾遗）
		...CONTENT_GROUPS.map(buildContentGroup),

		// 关于
		ABOUT_GROUP,
	];

	// 说明：模板原有的「文章」（归档/分类/标签/系列）、「社交」（友链/留言）、「我的」
	// （动态/项目/相册）三组已从导航中撤下 —— 页面本身都还在，直接访问 URL 不受影响。
	// 想加回来的话，按下面的写法插到 links 里即可：
	//
	// links.splice(1, 0, {
	// 	name: "浏览",
	// 	url: "#",
	// 	icon: "material-symbols:article",
	// 	children: [LinkPresets.Archive, LinkPresets.Categories, LinkPresets.Tags, LinkPresets.Series],
	// });
	//
	// 自定义外链同理（原模板此处的「链接」菜单指向模板作者，已移除）：
	// { name: "GitHub", url: "https://github.com/你的账号", external: true, icon: "fa7-brands:github" }

	return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

// ============================================================================
// 链接预设 - 可自由自定义导航栏链接的名称、图标和URL
// Link Presets - Allows free customization of the name, icon, and URL of navigation bar links
// ============================================================================
export const LinkPresets: Record<string, NavBarLink> = {
	Home: {
		name: "主页",
		url: "/",
	},
	Archive: {
		name: "归档",
		url: "/archive/",
		icon: "material-symbols:archive",
	},
	Categories: {
		name: "分类",
		url: "/categories/",
		icon: "material-symbols:folder-open-rounded",
	},
	Tags: {
		name: "标签",
		url: "/tags/",
		icon: "material-symbols:tag-rounded",
	},
	Series: {
		name: "系列",
		url: "/series/",
		icon: "material-symbols:layers",
	},
	Friends: {
		name: "友链",
		url: "/friends/",
		icon: "material-symbols:link-2-rounded",
		pageKey: "friends",
	},
	Guestbook: {
		name: "留言",
		url: "/guestbook/",
		icon: "material-symbols:chat",
		pageKey: "guestbook",
	},
	Dynamic: {
		name: "动态",
		url: "/dynamic/",
		icon: "material-symbols:forum-rounded",
		pageKey: "dynamic",
	},
	Projects: {
		name: "项目",
		url: "/projects/",
		icon: "material-symbols:rocket-launch",
		pageKey: "projects",
	},
	Gallery: {
		name: "相册",
		url: "/gallery/",
		icon: "material-symbols:photo-library",
		pageKey: "gallery",
	},
	Booknav: {
		name: "书签导航",
		url: "/booknav/",
		icon: "material-symbols:bookmarks",
		pageKey: "booknav",
	},
	Bilibili: {
		name: "哔哩哔哩",
		url: "/bilibili/",
		icon: "fa7-brands:bilibili",
		pageKey: "bilibili",
	},
	Bangumi: {
		name: "番组计划",
		url: "/bangumi/",
		icon: "material-symbols:movie",
		pageKey: "bangumi",
	},
	VNDB: {
		name: "VNDB",
		url: "/vndb/",
		icon: "material-symbols:chrome-reader-mode-rounded",
		pageKey: "vndb",
	},
	MAL: {
		name: "AnimeList",
		url: "/myanimelist/",
		icon: "material-symbols:menu-book",
		pageKey: "mal",
	},
	Sponsor: {
		name: "打赏",
		url: "/sponsor/",
		icon: "material-symbols:favorite",
		pageKey: "sponsor",
	},
	About: {
		name: "关于我",
		url: "/about/",
		icon: "material-symbols:person",
	},
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
