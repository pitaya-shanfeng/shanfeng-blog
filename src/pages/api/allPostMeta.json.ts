import { getSortedPostsList } from "@/utils/content-utils";

export async function GET(): Promise<Response> {
	// 必须含丛书与 HTML 文章：relatedPosts 下发的 id 里两者都有，
	// 这里若用「列表视角」的 getSortedPosts()（过滤了丛书），
	// 客户端查不到《见山》的章，整列会被过滤掉，表现为「暂无相关文章」。
	const posts = await getSortedPostsList(true);

	const allPostsData = posts
		.map((post) => ({
			id: post.id,
			title: post.data.title,
			description: post.data.description,
			published: post.data.published.getTime(),
			category: post.data.category || "",
			// 「推荐阅读」按篇幅排序用：documentPages 是文档类文章的实际页数，
			// words 只有 HTML 文章才有；md 文章的 words 走 remark，不在 data 上。
			// 两者都是 loader 写进 data 的扩展字段，schema 类型里没有，这里放宽读一次
			pages: (post.data as { documentPages?: number }).documentPages ?? 0,
			tags: post.data.tags ?? [],
			words: (post.data as { words?: number }).words ?? 0,
			password: !!post.data.password,
		}))
		// 日历按纯日期排序，忽略置顶
		.sort((a, b) => b.published - a.published);

	return new Response(JSON.stringify(allPostsData), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			// 同 relatedPosts：开发期不缓存，避免沿用旧数据
			"Cache-Control": import.meta.env.DEV
				? "no-store"
				: "public, max-age=600",
		},
	});
}
