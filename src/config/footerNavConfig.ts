/**
 * 页脚「书签导航」数据。
 *
 * 分组只影响页脚抽屉里的列，改链接只动这份文件，Footer.astro 不用改。
 * hint 是「这个站拿来干什么」，鼠标悬停可见，不在版面上占位置。
 */

export interface ResourceLink {
	/** 站点名 */
	name: string;
	/** 链接地址 */
	href: string;
	/** 一句话用途，鼠标悬停可见；不在版面上占位置 */
	hint?: string;
}

export interface ResourceGroup {
	/** 分组名 */
	title: string;
	links: ResourceLink[];
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
	{
		title: "行业调研",
		links: [
			{ name: "七麦数据", href: "https://www.qimai.cn/", hint: "App Store 榜单与 ASO，看竞品排名" },
			{ name: "QuestMobile", href: "https://www.questmobile.com.cn/", hint: "移动端用户与赛道流量大盘" },
			{ name: "SimilarWeb", href: "https://www.similarweb.com/", hint: "网站/App 流量来源拆解" },
			{ name: "飞瓜数据", href: "https://www.feigua.cn/", hint: "抖音/快手电商与短视频数据" },
			{ name: "艾瑞数据", href: "https://www.iresearch.com.cn/", hint: "互联网行业研究报告" },
		],
	},
	{
		title: "产品社区",
		links: [
			{ name: "人人都是产品经理", href: "https://www.woshipm.com/", hint: "国内最大 PM 学习社区" },
			{ name: "36氪", href: "https://36kr.com/", hint: "创投与产品动态" },
			{ name: "起点课堂", href: "https://www.qidianla.com/", hint: "产品/运营技能培训" },
		],
	},
	{
		title: "运营增长",
		links: [
			{ name: "新榜", href: "https://www.newrank.cn/", hint: "公众号/抖音/快手内容榜单" },
			{ name: "粮仓", href: "https://www.liangcang.cc/", hint: "企业微信私域运营助手" },
			{ name: "易企秀", href: "https://www.eqxiu.com/", hint: "H5/海报营销物料" },
			{ name: "Optimizely", href: "https://www.optimizely.com/", hint: "A/B 实验与个性化" },
		],
	},
	{
		title: "效率协作",
		links: [
			{ name: "飞书", href: "https://www.feishu.cn/", hint: "文档/表格/会议/项目一体" },
			{ name: "语雀", href: "https://www.yuque.com/", hint: "结构化知识库" },
			{ name: "墨刀", href: "https://modao.cc/", hint: "在线原型与协作设计" },
			{ name: "Figma", href: "https://www.figma.com/", hint: "协作式 UI 设计" },
			{ name: "Notion", href: "https://www.notion.so/", hint: "国际化知识库与数据库" },
		],
	},
	{
		title: "前沿资讯",
		links: [
			{ name: "极客公园", href: "https://www.geekpark.net/", hint: "科技产品与创新" },
			{ name: "虎嗅", href: "https://www.huxiu.com/", hint: "商业科技深度" },
			{ name: "钛媒体", href: "https://www.tmtpost.com/", hint: "科技财经资讯" },
			{ name: "品玩", href: "https://www.pingwest.com/", hint: "全球化科技内容" },
		],
	},
	{
		title: "灵感设计",
		links: [
			{ name: "站酷", href: "https://www.zcool.com.cn/", hint: "国内设计师社区" },
			{ name: "Dribbble", href: "https://dribbble.com/", hint: "全球设计作品分享" },
			{ name: "UI中国", href: "https://www.ui.cn/", hint: "国内 UI 设计社区" },
			{ name: "Awwwards", href: "https://www.awwwards.com/", hint: "网页设计奖项与灵感" },
		],
	},
	{
		title: "国际方法",
		links: [
			{ name: "Product Hunt", href: "https://www.producthunt.com/", hint: "海外每日新品发现" },
			{ name: "NN/g", href: "https://www.nngroup.com/", hint: "用户体验权威方法论" },
			{ name: "Mind the Product", href: "https://www.mindtheproduct.com/", hint: "全球 PM 社区" },
			{ name: "Hacker News", href: "https://news.ycombinator.com/", hint: "硅谷技术新闻" },
		],
	},
	{
		title: "AI 对话",
		links: [
			{ name: "ChatGPT", href: "https://chatgpt.com/", hint: "OpenAI 通用对话底座" },
			{ name: "Claude", href: "https://claude.ai/", hint: "长文本与推理强" },
			{ name: "DeepSeek", href: "https://www.deepseek.com/", hint: "国产开源大模型" },
			{ name: "豆包", href: "https://www.doubao.com/", hint: "字节旗下 AI 助手" },
			{ name: "Kimi", href: "https://kimi.moonshot.cn/", hint: "长上下文" },
		],
	},
	{
		title: "AI 编程",
		links: [
			{ name: "Cursor", href: "https://cursor.com/", hint: "AI 编程编辑器" },
			{ name: "GitHub Copilot", href: "https://github.com/features/copilot", hint: "主流 IDE 编程助手" },
			{ name: "通义灵码", href: "https://lingma.aliyun.com/", hint: "阿里 AI 编程" },
			{ name: "Windsurf", href: "https://windsurf.com/", hint: "AI 原生编辑器" },
		],
	},
	{
		title: "AI 设计",
		links: [
			{ name: "Midjourney", href: "https://www.midjourney.com/", hint: "高质量 AI 绘画" },
			{ name: "即梦", href: "https://jimeng.jianying.com/", hint: "字节 AI 图像/视频" },
			{ name: "通义万相", href: "https://tongyi.aliyun.com/wanxiang/", hint: "阿里 AI 绘画" },
			{ name: "Stable Diffusion", href: "https://stability.ai/", hint: "开源图像生成" },
		],
	},
	{
		title: "AI 视频音频",
		links: [
			{ name: "Runway", href: "https://runwayml.com/", hint: "国际 AI 视频头部" },
			{ name: "可灵", href: "https://klingai.com/", hint: "快手 AI 视频" },
			{ name: "海螺 AI", href: "https://hailuoai.com/", hint: "MiniMax AI 视频" },
			{ name: "Suno", href: "https://suno.com/", hint: "AI 音乐生成" },
		],
	},
	{
		title: "AI 搜索办公",
		links: [
			{ name: "Perplexity", href: "https://www.perplexity.ai/", hint: "带引用的 AI 搜索" },
			{ name: "秘塔 AI 搜索", href: "https://metaso.cn/", hint: "国内 AI 搜索" },
			{ name: "NotebookLM", href: "https://notebooklm.google.com/", hint: "资料变问答/播客" },
			{ name: "Gamma", href: "https://gamma.app/", hint: "AI 生成 PPT/文档" },
		],
	},
];
