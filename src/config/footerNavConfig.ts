/**
 * 页脚「资源导航」数据。
 *
 * 原来页脚里放的是「版权声明 / 书签导航 / 友情链接」三个二级页面的入口，
 * 二级页没人点、内容也薄；改成直接把链接铺在页脚，按用途分组。
 * 加一组、删一条都只动这里，Footer.astro 不用改。
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
			{
				name: "七麦数据",
				href: "https://www.qimai.cn/",
				hint: "iOS/安卓榜单与 ASO，看竞品下载与排名",
			},
			{
				name: "QuestMobile",
				href: "https://www.questmobile.com.cn/",
				hint: "移动端用户与赛道流量大盘",
			},
			{
				name: "巨量算数",
				href: "https://trendinsight.oceanengine.com/",
				hint: "抖音搜索指数与内容趋势",
			},
			{ name: "艾瑞咨询", href: "https://www.iresearch.com.cn/", hint: "行业研究报告库" },
			{ name: "Similarweb", href: "https://www.similarweb.com/", hint: "网站/App 流量来源拆解" },
			{ name: "增长黑盒", href: "https://growthbox.net/", hint: "私域与增长实战拆解" },
		],
	},
	{
		title: "产品社区",
		links: [
			{ name: "人人都是产品经理", href: "https://www.woshipm.com/", hint: "国内最大 PM 社区，模板与干货" },
			{ name: "PMCAFF", href: "https://www.pmcaff.com/", hint: "PM 垂直社区，案例与求职讨论" },
			{ name: "36氪", href: "https://36kr.com/", hint: "创投与产品动态" },
			{ name: "鸟哥笔记", href: "https://www.niaogebiji.com/", hint: "运营推广实操" },
		],
	},
	{
		title: "运营增长",
		links: [
			{ name: "新榜", href: "https://www.newrank.cn/", hint: "内容榜单与投放参考" },
			{ name: "飞瓜数据", href: "https://www.feigua.cn/", hint: "直播电商与达人数据" },
			{ name: "运营研究社", href: "https://www.yysxy.com/", hint: "增长体系化内容" },
			{ name: "Optimizely", href: "https://www.optimizely.com/", hint: "A/B 实验国际头部工具" },
		],
	},
	{
		title: "效率协作",
		links: [
			{ name: "飞书", href: "https://www.feishu.cn/", hint: "文档/多维表格/项目一体" },
			{ name: "语雀", href: "https://www.yuque.com/", hint: "结构化知识库" },
			{ name: "墨刀", href: "https://modao.cc/", hint: "国产原型设计，上手快" },
			{ name: "Axure / Figma", href: "https://www.figma.com/", hint: "专业原型与协作设计" },
			{ name: "ProcessOn", href: "https://www.processon.com/", hint: "在线流程图与脑图" },
			{ name: "Notion", href: "https://www.notion.so/", hint: "国际化知识库与数据库" },
		],
	},
	{
		title: "前沿资讯",
		links: [
			{ name: "量子位", href: "https://www.qbitai.com/", hint: "AI 前沿资讯" },
			{ name: "极客公园", href: "https://www.geekpark.net/", hint: "科技产品观察" },
			{ name: "虎嗅", href: "https://www.huxiu.com/", hint: "商业与产品深度" },
		],
	},
	{
		title: "灵感设计",
		links: [
			{ name: "站酷", href: "https://www.zcool.com.cn/", hint: "国内设计师社区，找视觉参考" },
			{ name: "Dribbble / Behance", href: "https://dribbble.com/", hint: "国际设计灵感" },
			{ name: "UI中国", href: "https://www.ui.cn/", hint: "国内 UI 设计" },
		],
	},
	{
		title: "国际方法",
		links: [
			{ name: "Product Hunt", href: "https://www.producthunt.com/", hint: "海外每日新品，看产品趋势" },
			{ name: "NN/g", href: "https://www.nngroup.com/", hint: "用户体验权威方法论" },
			{ name: "Mind the Product", href: "https://www.mindtheproduct.com/", hint: "全球 PM 社区与大会" },
		],
	},
	{
		title: "AI 工具",
		links: [
			{ name: "ChatGPT / Claude", href: "https://chatgpt.com/", hint: "通用底座：方案起草、需求拆解、竞品分析" },
			{ name: "Cursor", href: "https://cursor.com/", hint: "AI 编程，PM 自写原型、脚本、抓数" },
			{ name: "NotebookLM", href: "https://notebooklm.google.com/", hint: "把资料变问答/播客" },
			{ name: "Dify / Coze", href: "https://dify.ai/", hint: "搭 AI 工作流与智能体" },
			{ name: "v0 / Lovable", href: "https://v0.dev/", hint: "自然语言生成前端原型" },
			{ name: "秘塔 AI 搜索", href: "https://metaso.cn/", hint: "带引用的调研检索" },
			{ name: "Midjourney / 即梦", href: "https://www.midjourney.com/", hint: "配图与视觉生成" },
		],
	},
	{
		title: "国内大模型",
		links: [
			{ name: "Kimi", href: "https://kimi.moonshot.cn/", hint: "长文本与本土化" },
			{ name: "通义千问", href: "https://tongyi.aliyun.com/", hint: "长文本与本土化" },
			{ name: "豆包", href: "https://www.doubao.com/", hint: "长文本与本土化" },
			{ name: "智谱", href: "https://chatglm.cn/", hint: "长文本与本土化" },
		],
	},
];
