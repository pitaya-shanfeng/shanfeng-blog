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
//   ├── 著书立说 → 见山 / 增长三部曲
//   ├── 方法沉淀 → 全部方法 / 数据分析 / 用户调研 / 需求分析 / 项目管控 / 团队管理
//   ├── 实战复盘 → 全部复盘 / 项目复盘 / 调研报告 / 数据案例 / 原型设计
//   ├── 学海拾遗 → 全部拾遗 / 转载精选 / 学习笔记 / 读书报告 / 行业报告
//   └── 关于山风 → 个人介绍 / 版权声明 / 书签导航 / 联系合作
//
// 二级项为什么指向 /archive/?category=&tag= ：
// 模板的分类没有独立页面（`getCategoryUrl` 同样指向归档页的筛选），而归档页的筛选支持
// `?category=` 与 `?tag=` **同时给出、取交集**（见 ArchivePanel 的 applyFilter）。
// 所以「分类当一级桶（如 方法沉淀）+ 标签当二级主题（如 数据分析）」就能精确落到子项：
//   全部方法 → /archive/?category=方法沉淀
//   数据分析 → /archive/?category=方法沉淀&tag=数据分析
// 这也意味着发文章时：**category 填一级桶名，tags 里带上对应的二级主题名**，导航才对得上。

/** 归档页筛选链接（category 与 tag 同时给出时取交集） */
const archiveFilter = ({ category, tag }: { category?: string; tag?: string }): string => {
	const params = new URLSearchParams();
	if (category) params.set("category", category);
	if (tag) params.set("tag", tag);
	return `/archive/?${params.toString()}`;
};

/** 内容分组：category = 一级桶，topics = 二级主题（存成标签） */
interface ContentGroupConfig {
	name: string;
	icon: string;
	category: string;
	/** 「全部 XX」入口的文案；不填则不生成该入口（如「著书立说」下都是具体的书） */
	allLabel?: string;
	topics: string[];
}

const CONTENT_GROUPS: ContentGroupConfig[] = [
	{
		name: "著书立说",
		icon: "material-symbols:menu-book",
		category: "著书立说",
		// 见山 / 增长三部曲 是「书」，先按标签落；将来若要做「篇 / 章」两层，
		// 需要单独改 series 机制（模板的 series 只有一层扁平集合）
		topics: ["见山", "增长三部曲"],
	},
	{
		name: "方法沉淀",
		icon: "material-symbols:handyman",
		category: "方法沉淀",
		allLabel: "全部方法",
		topics: ["数据分析", "用户调研", "需求分析", "项目管控", "团队管理"],
	},
	{
		name: "实战复盘",
		icon: "material-symbols:fact-check",
		category: "实战复盘",
		allLabel: "全部复盘",
		topics: ["项目复盘", "调研报告", "数据案例", "原型设计"],
	},
	{
		name: "学海拾遗",
		icon: "material-symbols:school",
		category: "学海拾遗",
		allLabel: "全部拾遗",
		topics: ["转载精选", "学习笔记", "读书报告", "行业报告"],
	},
];

/** 内容分组 → 导航项（一级 = 分组，二级 =「全部」+ 各主题） */
const buildContentGroup = (group: ContentGroupConfig): NavBarLink => ({
	name: group.name,
	url: "#",
	icon: group.icon,
	children: [
		...(group.allLabel
			? [{ name: group.allLabel, url: archiveFilter({ category: group.category }) }]
			: []),
		...group.topics.map((topic) => {
			// 二级项如果对应一本已配置的书，直接进书页；否则退回归档筛选
			const book = booksConfig.find((item) => item.title === topic);
			return {
				name: topic,
				url: book
					? `/books/${book.id}/`
					: archiveFilter({ category: group.category, tag: topic }),
			};
		}),
	],
});

/** 关于分组 */
const ABOUT_GROUP: NavBarLink = {
	name: "关于山风",
	url: "#",
	icon: "material-symbols:person",
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
		icon: "material-symbols:home",
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
