import type { SidebarLayoutConfig } from "../types/sidebarConfig";

/**
 * 侧边栏布局配置
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// 是否启用侧边栏功能
	enable: true,

	// 侧边栏位置：
	// left: 仅显示左侧边栏
	// right: 仅显示右侧边栏
	// both: 双侧边栏，1280px以上同时显示左右，769-1279px根据tabletSidebar配置显示其中一侧
	// 文章页用 both：左＝相关文章，右＝文章目录（目录回到它原本的右侧、且保持粘性跟随滚动）
	position: "both",

	// 平板端(769-1279px)显示哪侧侧边栏，仅position为both时生效
	// left: 平板端显示左侧边栏
	// right: 平板端显示右侧边栏
	tabletSidebar: "left",

	// 文章详情页隐藏侧边栏，设为 true 则只在首页等非文章页显示
	hideSidebarOnPostPage: false,

	// 本页没有侧栏列时，内容栏占「侧栏 + 内容栏」总宽的比例（0–1），不设置或 ≥1 则铺满
	noSidebarContentWidth: 0.6,

	// 左侧边栏组件配置列表
	//
	// 2026-10-22：公告 / 音乐 / 最新动态 / 分类 / 标签 五块全部关闭（enable: false）。
	// 理由：这五块在本站要么是模板演示内容（公告还是示例文案、音乐是演示曲、动态是 2026-07 的占位），
	// 要么与内容体系对不上（分类只剩「论文阅读 / 认知与设计」，标签 24 个全是论文技术词，
	// 与导航那套业务主题是两套体系）。关掉后非文章页左栏只剩作者卡。
	// 要恢复某一项：把它自己的 enable 改回 true 即可，配置项都还留着。

	// 组件的渲染顺序完全取决于它们在配置数组中出现的顺序，但top的组件会优先于sticky位置的组件渲染
	// type 组件类型
	// enable 是否启用该组件
	// showTitle 是否显示该组件标题，默认true
	// position 组件位置：top固定顶部，sticky粘性定位(会跟随页面滚动)
	// showOnPostPage 是否在文章详情页显示该组件
	// hideOnNonPostPage 是否在非文章详情页隐藏该组件（true=仅文章详情页显示）
	// specificConfig 组件专属配置
	leftComponents: [
		{
			// 组件类型：用户资料组件
			type: "profile",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示（文章页专注正文，仅保留文章目录）
			showOnPostPage: false,
		},
		{
			// 组件类型：公告组件
			type: "announcement",
			// 是否启用该组件
			enable: false,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: false,
		},
		{
			// 组件类型：音乐播放器
			type: "music",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: false,
		},
		{
			// 组件类型：最新动态组件（原在右侧栏，因改为单侧布局移到这里）
			type: "dynamic",
			// 是否启用该组件
			enable: false,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: false,
			// 组件专属配置
			specificConfig: {
				dynamic: {
					// 显示的最新动态数量
					limit: 2,
				},
			},
		},
		{
			// 组件类型：分类组件
			type: "categories",
			// 是否启用该组件
			enable: false,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: false,
			// 组件专属配置
			specificConfig: {
				// 折叠阈值：当分类数量超过>5个时自动折叠
				collapseThreshold: 5,
			},
		},
		{
			// 组件类型：标签组件
			type: "tags",
			// 是否启用该组件
			enable: false,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: false,
			// 组件专属配置
			specificConfig: {
				// 折叠阈值：当标签数量超过>10个时自动折叠
				collapseThreshold: 10,
			},
		},
		{
			// 组件类型：本书阅读进度尺（书籍合集页专属）
			type: "bookProgress",
			// 是否启用该组件
			enable: true,
			// 组件位置
			position: "sticky",
			// 只在书籍合集页（/books/…）显示
			hideOnNonBookPage: true,
		},
		{
			// 组件类型：侧边栏目录组件（文章页左侧）
			type: "sidebarToc",
			// 是否启用该组件
			enable: true,
			// 组件位置：sticky = 页面下滑时吸顶
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 是否在非文章详情页隐藏
			hideOnNonPostPage: true,
		},
	],

	// 右侧边栏组件配置列表
	// 文章页：左＝文章目录，右＝相关文章，两块都粘性吸顶
	// 模板自带的 stats / siteInfo / calendar 已停用 —— 它们 showOnPostPage 为 false，
	// 若保持启用会在**非文章页**冒出右栏（首页等也变成两列），而这里只想要文章页两列
	rightComponents: [
		{
			// 组件类型：相关文章组件（文章页右侧；数据由文章页计算后透传）
			type: "relatedPosts",
			// 是否启用该组件
			enable: true,
			// 组件位置：sticky = 页面下滑时吸顶
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 是否在非文章详情页隐藏
			hideOnNonPostPage: true,
			// 组件专属配置
			specificConfig: {
				relatedPosts: {
					// 最多显示多少篇
					limit: 10,
				},
			},
		},
		{
			// 组件类型：站点统计组件（模板自带，已停用）
			type: "stats",
			// 是否启用该组件
			enable: false,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: false,
		},
		{
			// 组件类型：站点信息组件（模板自带，已停用）
			type: "siteInfo",
			// 是否启用该组件
			enable: false,
			// 组件位置
			position: "top",
			// 是否在文章详情页显示
			showOnPostPage: false,
			// 组件专属配置
			specificConfig: {
				siteInfo: {
					// 未能识别的构建平台回退显示文本，可自定义
					unknownBuildPlatform: "Unknown CI",
				},
			},
		},
		{
			// 组件类型：日历组件（模板自带，已停用）
			type: "calendar",
			// 是否启用该组件
			enable: false,
			// 是否显示组件标题
			showTitle: false,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: false,
			// 组件专属配置
			specificConfig: {
				calendar: {
					// 是否显示年度文章热力图
					showHeatmap: true,
				},
			},
		},
		{
			// 组件类型：广告栏组件 1
			type: "advertisement",
			// 是否启用该组件
			enable: false,
			// 是否显示组件标题
			showTitle: false,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置（广告内容直接在此配置）
			specificConfig: {
				ad: {
					image: {
						src: "/assets/images/ad/ad1.webp",
						alt: "广告横幅",
						link: "https://haoka.lot-ml.com/plugreg.html?agentid=1423316",
						external: true,
					},
					// 是否允许关闭广告
					closable: false,
					// 显示次数限制，-1为无限制
					displayCount: -1,
					// 组件内边距配置
					padding: {
						all: "1rem",
					},
				},
			},
		},
		{
			// 组件类型：广告栏组件 2
			type: "advertisement",
			// 是否启用该组件
			enable: false,
			// 组件位置
			position: "sticky",
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置（广告内容直接在此配置）
			specificConfig: {
				ad: {
					title: "支持博主",
					content:
						"如果您觉得本站内容对您有帮助，欢迎支持我们的创作！您的支持是我们持续更新的动力。",
					link: {
						text: "支持一下",
						url: "about/",
						external: false,
					},
					closable: false,
					displayCount: -1,
				},
			},
		},
	],

	// 移动端底部组件配置列表（与桌面端保持一致：同样关掉公告 / 分类 / 标签 / 动态）
	// 这些组件只在移动端(<768px)显示在页面底部，独立于左右侧边栏配置
	mobileBottomComponents: [
		{
			// 组件类型：用户资料组件
			type: "profile",
			// 是否启用该组件
			enable: true,
			// 是否在文章详情页显示（与桌面端一致：文章页不展示）
			showOnPostPage: false,
		},
		{
			// 组件类型：公告组件
			type: "announcement",
			// 是否启用该组件
			enable: false,
			// 是否在文章详情页显示
			showOnPostPage: false,
		},
		{
			// 组件类型：分类组件
			type: "categories",
			// 是否启用该组件
			enable: false,
			// 是否在文章详情页显示
			showOnPostPage: false,
			// 组件专属配置
			specificConfig: {
				// 折叠阈值：当分类数量超过5个时自动折叠
				collapseThreshold: 5,
			},
		},
		{
			// 组件类型：标签组件
			type: "tags",
			// 是否启用该组件
			enable: false,
			// 是否在文章详情页显示
			showOnPostPage: false,
			// 组件专属配置
			specificConfig: {
				// 折叠阈值：当标签数量超过20个时自动折叠
				collapseThreshold: 10,
			},
		},
		{
			// 组件类型：最新动态组件
			type: "dynamic",
			// 是否启用该组件
			enable: false,
			// 是否在文章详情页显示
			showOnPostPage: false,
			// 组件专属配置
			specificConfig: {
				dynamic: {
					// 显示的最新动态数量
					limit: 2,
				},
			},
		},
		{
			// 组件类型：站点统计组件
			type: "stats",
			// 是否启用该组件
			enable: false,
			// 是否在文章详情页显示
			showOnPostPage: true,
		},
		{
			// 组件类型：站点信息组件
			type: "siteInfo",
			// 是否启用该组件
			enable: false,
			// 是否在文章详情页显示
			showOnPostPage: true,
			// 组件专属配置
			specificConfig: {
				siteInfo: {
					// 未能识别的构建平台回退显示文本，可自定义
					unknownBuildPlatform: "Unknown CI",
				},
			},
		},
	],
};
