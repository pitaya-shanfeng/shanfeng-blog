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
