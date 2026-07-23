import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "公告",

	// 公告内容
	content:
		"欢迎来到我的博客！我将竭力帮助产品人夯实需求拆解、方案设计、项目管控、数据决策的核心专业能力，精准把握行业趋势与技术脉搏，在复杂商业场景中实现产品价值的精准锚定与高效落地，共攀产品专业主义的进阶之巅。",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "了解更多",
		// 链接 URL
		url: "/about/",
		// 内部链接
		external: false,
	},
};
