/**
 * 「每日行业动态」摘要
 *
 * 首页刊头那块日历卡要用，HomeLanding 的日报卡也用，抽成一处以免两处解析不一致。
 * 数据源：category 含「行业动态」的最新一篇；要点从正文 `## 今日总览` 的加粗导语里取。
 */
import { getSortedPosts } from "@/utils/content-utils";
import { getPostUrlBySlug } from "@/utils/url-utils";

export type DailyBrief = {
	title: string;
	description: string;
	href: string;
	/** 这一期的日期，用于「不是今天」时提示 */
	issue: string;
	/** 今日总览里的加粗导语，最多 3 条 */
	points: string[];
};

export async function getDailyBrief(): Promise<DailyBrief | null> {
	const all = await getSortedPosts();
	const hot = all
		.filter((p) => (p.data.category ?? "").includes("行业动态"))
		.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())[0];
	if (!hot) return null;

	const body = hot.body ?? "";
	const section = body.split(/^##\s+今日总览/m)[1]?.split(/^##\s+/m)[0] ?? "";
	const points = [...section.matchAll(/\*\*(.+?)[：:]\*\*/g)]
		.map((m) => m[1].trim())
		.filter(Boolean)
		.slice(0, 3);

	const d = hot.data.published;
	return {
		title: hot.data.title,
		description: hot.data.description,
		href: getPostUrlBySlug(hot.data.slug ?? hot.id),
		issue: `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`,
		points,
	};
}
