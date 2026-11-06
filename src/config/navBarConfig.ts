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
//   ├── 写作 → 见山 / 增长黑客
//   ├── 方法 → 需求洞察 / 产品设计 / 商业增长
//   ├── 实战 → 调研报告 / 方案设计 / 项目复盘
//   ├── 拾遗 → 学习笔记 / 行业动态 / 转载精选
//   └── 关于 → 个人介绍 / 版权声明 / 书签导航 / 联系合作
//
// 二级项的落点有三种，取决于这一栏的内容形态：
//   1. 成书的（写作）→ 直接进书页 /books/<id>/
//   2. 已在做合集页的（拾遗两栏）→ 进自建页 /hotnews/ /notes/
//   3. 还没做页面的（方法 / 实战）→ 先用归档页的分类筛选兜住：
//        /archive/?category=方法/需求洞察
//      归档页的 category 筛选是**精确匹配**，所以文章的 category 必须
//      逐字写成「一级/二级」两级，导航才对得上。
//
// 发文约定（2026-10-29 定）：**每一个二级菜单就是一个分类**，
// category 一律两级写法 —— `方法/需求洞察`、`实战/项目复盘`、`拾遗/学习笔记`。
// 卡片上的「写作/见山」「拾遗 / 学习笔记」就是这同一个东西拼出来的，
// 没有第二套分类概念。
//
// 以后每个二级分类单独做「见山式」合集页时，只需把该项从 `category:` 换成
// `url:`（指向新页面），导航与分类栏会自动跟着走，不用改别处。

/**
 * 内容分组：一级 = 内容来源，四栏互斥；二级 = 该栏的索引项。
 *
 *   首页
 *   ├── 写作   → 见山 / 增长黑客            我写的书
 *   ├── 方法   → 需求洞察 / 产品设计 / …     可复用的做法
 *   ├── 实战   → 调研报告 / 方案设计 / …     做过的项目
 *   ├── 拾遗   → 学习笔记 / 行业动态 / …     外部的输入
 *   └── 关于   → 个人介绍 / 版权声明 / …      我是谁
 *
 * 菜单是**内容规划**：条目代表打算写的方向，即使内容还没写出来也先留位，
 * 让人一眼看出这个站在往哪儿走。空位点进去会是空列表，属预期。
 *
 * ⚠️ 母版的一条硬约束：`resolveNavMenuLinks` 里
 * 「一级项只剩一个子项时，直接把子项提到一级」（父项名消失）。
 * 所以每个一级项**至少要有两个子项**，否则一级名根本显示不出来。
 */

/** 归档页按标签筛选（只给 tag，避开 category 的交集） */
const archiveByTag = (tag: string): string =>
	`/archive/?${new URLSearchParams({ tag }).toString()}`;

/** 归档页按分类筛选（方法 / 实战两栏在做出合集页之前用它兜底） */
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
	/**
	 * 直接给一个自建页面（优先级最高）。
	 * 用于「有独立合集页、但不该走归档筛选」的栏目，比如 /hotnews/ 这种时间线页
	 * —— 归档筛选只能按 tag/category 取交集，表达不了「按时间倒序的合集」。
	 */
	url?: string;
}

interface ContentGroupConfig {
	/** 单级栏目：一级项直接指向页面，不出下拉（如「方法沉淀」「学习思考」） */
	single?: boolean;
	name: string;
	/** 一级项图标：块状语汇里不用图标，留空即可 */
	icon?: string;
	topics: TopicRef[];
}

const CONTENT_GROUPS: ContentGroupConfig[] = [
	{
		name: "书籍写作",
		// 两本书：一本已成书，一本在写。
		topics: [
			{ name: "见山", book: "见山" },
			{ name: "增长黑客", book: "增长黑客" },
		],
	},
	{
		name: "方法沉淀",
		// 单级：一级项直接指向合集页，没有下拉。靠 tag 做细分，不再开二级。
		single: true,
		topics: [{ name: "方法沉淀", category: "方法沉淀", url: "/topics/fangfa-chendian/" }],
	},
	{
		name: "落地实战",
		topics: [
			{ name: "调研分析", category: "落地实战/调研分析", url: "/topics/diaoyan-fenxi/" },
			{ name: "产品设计", category: "落地实战/产品设计", url: "/topics/chanpin-sheji/" },
			{ name: "项目复盘", category: "落地实战/项目复盘", url: "/topics/xiangmu-fupan/" },
		],
	},
	{
		name: "学习思考",
		// 单级：学习笔记与转载精选合并，靠 tag 区分。
		single: true,
		topics: [{ name: "学习思考", category: "学习思考", url: "/notes/" }],
	},
];

/**
 * 二级项落点解析：书 → 书页；给了自建页面 → 直接用；否则退回归档筛选。
 * 导航菜单与分类栏共用这一处，避免两边算出不同的地址。
 */
const resolveTopicUrl = (topic: TopicRef): string => {
	// 二级项如果对应一本已配置的书，直接进书页；否则按标签退回归档筛选
	const book = topic.book
		? booksConfig.find((item) => item.title === topic.book)
		: undefined;
	if (topic.url) return topic.url;
	if (book) return `/books/${book.id}/`;
	if (topic.category) return archiveByCategory(topic.category);
	return archiveByTag(topic.tag ?? topic.name);
};

/**
 * 内容分类的扁平结构：一级是「栏」，二级是「栏目」。
 *
 * 导航菜单与首页分类栏都从这里取，**一份配置两处消费**。
 * 文章侧与它对齐的方式是 category 写成两级（`方法/需求洞察`），
 * 所以文章的 category 就是分类本身，导航是它的索引，两者不是两套东西。
 */
export interface NavCategoryItem {
	name: string;
	url: string;
}

export interface NavCategoryGroup {
	name: string;
	items: NavCategoryItem[];
}

export const navCategoryGroups: NavCategoryGroup[] = CONTENT_GROUPS.map(
	(group) => ({
		name: group.name,
		items: group.topics.map((topic) => ({
			name: group.single ? group.name : topic.name,
			url: resolveTopicUrl(topic),
		})),
	}),
);

/**
 * 内容分组 → 导航项。
 *
 * 普通分组：一级是下拉容器，children 是各索引项。
 * 单级分组（single）：一级直接指向那个页面 —— 不能给 children，
 * 否则「只剩一个子项」会被 resolveNavMenuLinks 提级、把一级名吃掉。
 */
const buildContentGroup = (group: ContentGroupConfig): NavBarLink =>
	group.single
		? { name: group.name, url: resolveTopicUrl(group.topics[0]), icon: group.icon }
		: {
				name: group.name,
				url: "#",
				icon: group.icon,
				children: group.topics.map((topic) => ({
					name: topic.name,
					url: resolveTopicUrl(topic),
				})),
			};

const getDynamicNavBarConfig = (): NavBarConfig => {
	const links: NavBarLink[] = [
		// 主页
		LinkPresets.Home,

		// 四个内容入口（书籍写作 / 方法沉淀 / 落地实战 / 学习思考）
		...CONTENT_GROUPS.map(buildContentGroup),
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
		name: "首页",
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
