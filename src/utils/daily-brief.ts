/**
 * 「每日行业动态」摘要
 *
 * 首页刊头那块日历卡要用，HomeLanding 的日报卡也用，抽成一处以免两处解析不一致。
 * 数据源：category 含「行业动态」的最新一篇；内容从正文 `## 今日总览` 的加粗导语里取：
 *   **一条标题：** 一段说明……
 * 第一条做标题 + 摘要，其余几条做要点。
 */
import { getSortedPosts } from "@/utils/content-utils";
import { getPostUrlBySlug } from "@/utils/url-utils";

export type DailyBrief = {
	/** 整期的大标题（frontmatter title） */
	title: string;
	/** 整期摘要（frontmatter description） */
	description: string;
	href: string;
	/** 这一期的日期，如 11.11 */
	issue: string;
	/** 今日总览第一条的标题 */
	headline: string;
	/** 今日总览第一条的正文 */
	summary: string;
	/** 今日总览其余条目的标题，最多 3 条 */
	points: string[];
};

type Item = { head: string; text: string };

function parseOverview(body: string): Item[] {
	const section = body.split(/^##\s+今日总览/m)[1]?.split(/^##\s+/m)[0] ?? "";
	return [...section.matchAll(/\*\*(.+?)[：:]\*\*\s*([\s\S]*?)(?=\n\*\*|\n---|\n*$)/g)]
		.map((m) => ({
			head: m[1].trim().replace(/[：:]\s*$/, ""),
			text: m[2].replace(/\s+/g, " ").trim(),
		}))
		.filter((x) => x.head);
}

export async function getDailyBrief(): Promise<DailyBrief | null> {
	const all = await getSortedPosts();
	const hot = all
		.filter((p) => (p.data.category ?? "").includes("行业动态"))
		.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())[0];
	if (!hot) return null;

	const items = parseOverview(hot.body ?? "");
	const d = hot.data.published;

	return {
		title: hot.data.title,
		description: hot.data.description,
		href: getPostUrlBySlug(hot.data.slug ?? hot.id),
		issue: `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`,
		headline: items[0]?.head ?? hot.data.title,
		summary: items[0]?.text ?? hot.data.description,
		points: items.slice(1, 4).map((x) => x.head),
	};
}