import type { ExpressiveCodeConfig } from "../types/expressiveCodeConfig";

/**
 * expressive-code配置
 * @see https://expressive-code.com/
 * 修改本配置后需要重启Astro开发服务器才能生效
 */

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 暗色主题（用于暗色模式）
	darkTheme: "one-dark-pro",

	// 亮色主题（用于亮色模式）
	lightTheme: "one-light",

	// 更多样式请看expressive-code的官方文档
	// https://expressive-code.com/guides/themes/

	// 代码块折叠插件配置
	pluginCollapsible: {
		enable: true, // 保留代码块原始样式与复制按钮
		lineThreshold: 9999, // 让大多数代码块都不会出现“展开”按钮
		previewLines: 8, // 折叠时显示前8行
		defaultCollapsed: false, // 保持默认展开
	},

	// 语言徽章插件配置
	pluginLanguageBadge: {
		// 是否启用语言徽章插件
		enable: false,
	},
};
