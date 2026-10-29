// 组件配置类型定义
export type WidgetComponentType =
	| "profile"
	| "announcement"
	| "categories"
	| "tags"
	| "sidebarToc"
	| "advertisement"
	| "stats"
	| "calendar"
	| "music"
	| "siteInfo"
	| "dynamic"
	| "relatedPosts"
	| "bookProgress"
	| "hotnewsIndex";

export type WidgetComponentConfig = {
	type: WidgetComponentType; // 组件类型
	enable: boolean; // 是否启用该组件
	showTitle?: boolean; // 是否显示该组件标题，默认true
	// 组件位置：
	//   top    渲染在列首（常规流）
	//   sticky 渲染在粘性容器里（跟随滚动），排在 top 之后
	//   bottom 渲染在粘性容器之后（常规流），滚动时会滑到粘性组下面
	position: "top" | "sticky" | "bottom";
	showOnPostPage?: boolean; // 是否在文章详情页显示
	hideOnNonPostPage?: boolean; // 是否在非文章详情页隐藏
	/** 是否只在书籍合集页（/books/…）显示 */
	hideOnNonBookPage?: boolean;
	specificConfig?: WidgetSpecificConfig;
	customProps?: Record<string, unknown>; // 自定义属性，用于扩展组件功能
};

export type MobileBottomComponentConfig = {
	type: WidgetComponentType; // 组件类型
	enable: boolean; // 是否启用该组件
	showTitle?: boolean; // 是否显示该组件标题，默认true
	showOnPostPage?: boolean; // 是否在文章详情页显示
	hideOnNonPostPage?: boolean; // 是否在非文章详情页隐藏
	specificConfig?: WidgetSpecificConfig;
	customProps?: Record<string, unknown>; // 自定义属性，用于扩展组件功能
};

// 组件通用专属配置
export type WidgetSpecificConfig = {
	collapseThreshold?: number; // 折叠阈值
	calendar?: CalendarConfig; // 日历组件专用配置
	ad?: AdConfig; // 广告组件专用配置
	siteInfo?: SiteInfoConfig; // 站点信息组件专用配置
	dynamic?: DynamicWidgetConfig; // 最新动态组件专用配置
	relatedPosts?: RelatedPostsWidgetConfig; // 相关文章组件专用配置
};

export type RelatedPostsWidgetConfig = {
	limit?: number; // 最多显示多少篇，默认 10
	/**
	 * 这些分类下的文章详情页不显示「相关文章」整块。
	 * 例：["行业动态"] —— 日报是当天的事，串成推荐列表反而把「最新」稀释掉。
	 * 服务端据此给组件加 hidden（避免闪），客户端按 `[data-post-page]` 的分类再校一次
	 * （侧栏是 swup 静态容器，切页不重渲染，只靠服务端会残留）。
	 */
	excludeCategories?: string[];
};

export type DynamicWidgetConfig = {
	limit?: number; // 显示的最新动态数量，默认 3
};

// 站点信息组件专用配置
export type SiteInfoConfig = {
	unknownBuildPlatform?: string; // 未识别的构建平台显示文本，默认 "Unknown CI"
};

// 日历组件专用配置
export type CalendarConfig = {
	// 是否显示年度文章热力图
	showHeatmap: boolean;
};

// 广告栏配置
export type AdConfig = {
	title?: string; // 广告栏标题
	content?: string; // 广告栏文本内容
	image?: { src: string; alt?: string; link?: string; external?: boolean }; // 广告图片
	link?: { text: string; url: string; external?: boolean }; // 广告链接按钮
	padding?: {
		top?: string;
		right?: string;
		bottom?: string;
		left?: string;
		all?: string;
	}; // 内边距
	closable?: boolean; // 是否可关闭
	displayCount?: number; // 显示次数限制，-1为无限制
	expireDate?: string; // 过期时间 (ISO 8601 格式)
};

export type SidebarLayoutConfig = {
	enable: boolean; // 是否启用侧边栏
	position: "left" | "right" | "both"; // 侧边栏位置：左侧、右侧或双侧
	tabletSidebar?: "left" | "right"; // 平板端(769-1279px)显示哪侧侧边栏，仅position为both时生效，默认left
	hideSidebarOnPostPage?: boolean; // 文章详情页隐藏侧边栏，设为 true 则只在首页等非文章页显示，默认 false
	noSidebarContentWidth?: number; // 本页没有侧栏列时内容栏占包裹层总宽的比例（0–1），不设置则铺满
	leftComponents: WidgetComponentConfig[]; // 左侧边栏组件配置列表
	rightComponents: WidgetComponentConfig[]; // 右侧边栏组件配置列表
	mobileBottomComponents: MobileBottomComponentConfig[]; // 移动端底部组件配置列表（<768px显示）
};
