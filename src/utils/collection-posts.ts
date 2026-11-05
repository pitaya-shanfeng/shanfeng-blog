/**
 * 合集页（拾遗各栏）的取数与归类判定。
 *
 * 抽出来的原因：分页要求「取数发生在页面层」——`getStaticPaths` 里要先拿到
 * 完整列表才能 `paginate()`，而渲染又需要同一份列表算盘口字数。两边必须用
 * 同一个判定函数，否则分页切出来的页数和列表里的条目会对不上。
 */

import { getCollection } from "astro:content";

type AnyPost = Awaited<ReturnType<typeof getCollection<"posts">>>[number];

/** 合集页列表项：md 文章与 HTML 文章共用（loader 写出的 data 形状一致） */
export type CollectionPost = AnyPost;

/**
 * 归类命中判定：等值 / 路径拆段 / tags 三种都收。
 *
 * 等值是本项目的原始约定（见山那批用 category: 写作，二级主题走 tags）。
 * 但实际写稿时，很自然会照着导航「拾遗 → 学习笔记」两级把归类写成
 * 路径式 category: 拾遗/学习笔记 —— 这个写法有信息量（卡片底部能看出
 * 归属），却会让等值匹配一条都收不到，栏目页白白空着。
 * 所以按「/」拆段后任一段相等即算命中，两种写法都能进，不必回头改稿。
 * 拆段而非取末段：将来写成「拾遗/学习笔记/Prompt」也照样命中。
 */
export function makeCategoryFilter(category: string) {
	return ({
		data,
	}: {
		data: { draft?: boolean; category?: string | null; tags?: string[] };
	}): boolean => {
		if (data.draft || !category) return false;
		if ((data.tags ?? []).includes(category)) return true;
		const raw = data.category?.trim();
		if (!raw) return false;
		// 整体相等也算命中：方法 / 实战两栏的专题页（topicsConfig）传的是两级全称
		// 「实战/调研报告」，只比拆段的话一条都收不到，栏目页会一直空着。
		if (raw === category) return true;
		return raw
			.split("/")
			.some((segment) => segment.trim() === category);
	};
}

/**
 * 取某个栏目的全部文章，按发布时间倒序。
 *
 * 两个集合合并：HTML 文章与 md 文章在列表里应当无差别。
 * htmlPosts 的 entry 类型与 posts 不同，但 loader 写出的 data 形状一致
 * （content.config.ts 里两个 collection 共用 postSchema），这里 cast 一次。
 */
export async function getCollectionPosts(
	category: string,
): Promise<CollectionPost[]> {
	const inCategory = makeCategoryFilter(category);
	const mdPosts = await getCollection("posts", inCategory);
	const htmlPosts = await getCollection("htmlPosts", inCategory);
	return [...mdPosts, ...(htmlPosts as unknown as typeof mdPosts)].sort(
		(a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
	);
}
