import type { ProfileConfig } from "../types/profileConfig";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/avatar.avif",

	// 名字
	name: "余涛（山风）",

	// 个人签名
	bio: "12年产品经理经验，持续记录产品思考、业务设计、数据分析和团队管理实践。",

	// 联系方式：卡片底部直接写出微信与邮箱，不再用两个图标入口
	contact: {
		wechat: "pitaya_yutou",
		wechatQr: "/assets/images/contact/wechat-qr.webp",
		qq: "1315643567",
		qqQr: "/assets/images/contact/qq-qr.webp",
		email: "yt_pitaya@126.com",
	},

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		// 原模板这里挂了两个指向模板作者的链接（GitHub 指向 CuteLeaf、Email 指向 xiaye@msn.com），
		// 已移除，避免访客点进去是模板作者。等你补上自己的账号/邮箱时按下面写法加回来：
		//
		// {
		// 	name: "GitHub",
		// 	icon: "fa7-brands:github",
		// 	url: "https://github.com/你的账号",
		// 	showName: false,
		// },
		// {
		// 	name: "Email",
		// 	icon: "fa7-solid:envelope",
		// 	url: "mailto:你的邮箱",
		// 	showName: false,
		// },
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
		{
			name: "Atom",
			icon: "fa7-solid:atom",
			url: "/atom/",
			showName: false,
		},
	],
};
