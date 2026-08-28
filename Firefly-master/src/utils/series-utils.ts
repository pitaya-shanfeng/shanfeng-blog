import type { CollectionEntry } from "astro:content";

type PostEntry = CollectionEntry<"posts">;

export function sortPostsBySeriesOrder(posts: PostEntry[]) {
	return [...posts].sort((a, b) => {
		const orderA = a.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
		const orderB = b.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
		if (orderA !== orderB) return orderA - orderB;
		return a.data.published.getTime() - b.data.published.getTime();
	});
}
