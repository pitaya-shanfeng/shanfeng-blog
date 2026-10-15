import { getCollection } from "astro:content";
import { getRelatedPosts } from "@/utils/content-utils";

/**
 * 预生成「文章 → 相关文章 id」映射（构建期算一次）。
 *
 * 为什么要这么一个接口：侧栏位于 swup 容器之外，站内无刷新跳转时其 DOM 不会被替换。
 * 「相关文章」是与当前文章绑定的内容，跳转后必须重建；而重建需要全站文章数据 +
 * 与 SSR 完全一致的打分逻辑。把结果在构建期算好下发，客户端只做查表，
 * 就不用把那套推荐算法在客户端再实现一遍（避免两处逻辑漂移）。
 */
export async function GET(): Promise<Response> {
	const posts = await getCollection("posts", ({ data }) =>
		import.meta.env.PROD ? data.draft !== true : true,
	);

	const map: Record<string, string[]> = {};
	for (const post of posts) {
		// 加密文章不进候选，也不需要自己的映射
		if (post.data.password) continue;
		const related = await getRelatedPosts(post, 10);
		map[post.id] = related.map((item) => item.id);
	}

	return new Response(JSON.stringify(map), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	});
}
