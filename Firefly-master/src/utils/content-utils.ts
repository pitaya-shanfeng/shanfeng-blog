import { type CollectionEntry, getCollection } from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@utils/url-utils";

// // Retrieve posts and sort them by publication date
async function getRawSortedPosts() {
	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const sorted = allBlogPosts.sort((a, b) => {
		// 首先按置顶状态排序，置顶文章在前
		if (a.data.pinned && !b.data.pinned) return -1;
		if (!a.data.pinned && b.data.pinned) return 1;

		// 如果置顶状态相同，则按发布日期排序
		const dateA = new Date(a.data.published);
		const dateB = new Date(b.data.published);
		return dateA > dateB ? -1 : 1;
	});
	return sorted;
}

export async function getSortedPosts() {
	const sorted = await getRawSortedPosts();

	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = sorted[i - 1].id;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = sorted[i + 1].id;
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	return sorted;
}

export async function getHomeSortedPosts() {
	const posts = await getRawSortedPosts();
	const jianshanPosts = posts
		.filter((post) => post.data.category === "见山")
		.sort((a, b) => a.data.published.getTime() - b.data.published.getTime());
	const otherPosts = posts
		.filter((post) => post.data.category !== "见山")
		.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());

	return [...jianshanPosts, ...otherPosts];
}

export type PostForList = {
	id: string;
	data: CollectionEntry<"posts">["data"];
};
export async function getSortedPostsList(): Promise<PostForList[]> {
	const sortedFullPosts = await getRawSortedPosts();

	// delete post.body
	const sortedPostsList = sortedFullPosts.map((post) => ({
		id: post.id,
		data: post.data,
	}));

	return sortedPostsList;
}
export type Tag = {
	name: string;
	count: number;
};

export async function getTagList(): Promise<Tag[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const countMap: { [key: string]: number } = {};
	allBlogPosts.forEach((post: { data: { tags: string[] } }) => {
		post.data.tags.forEach((tag: string) => {
			if (!countMap[tag]) countMap[tag] = 0;
			countMap[tag]++;
		});
	});

	// sort tags
	const keys: string[] = Object.keys(countMap).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	return keys.map((key) => ({ name: key, count: countMap[key] }));
}

export type Category = {
	name: string;
	count: number;
	url: string;
};

export async function getCategoryList(): Promise<Category[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
	const count: { [key: string]: number } = {};
	allBlogPosts.forEach((post: { data: { category: string | null } }) => {
		if (!post.data.category) {
			const ucKey = i18n(I18nKey.uncategorized);
			count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
			return;
		}

		const categoryName =
			typeof post.data.category === "string"
				? post.data.category.trim()
				: String(post.data.category).trim();

		count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
	});

	const lst = Object.keys(count).sort((a, b) => {
		return (
			count[b] - count[a] || a.toLowerCase().localeCompare(b.toLowerCase())
		);
	});

	const ret: Category[] = [];
	for (const c of lst) {
		ret.push({
			name: c,
			count: count[c],
			url: getCategoryUrl(c),
		});
	}
	return ret;
}

/**
 * 对文章文本分词，支持中英文混合。
 * 用于标题、摘要和正文的主题相似度计算。
 */
function tokenizeText(text: string): Set<string> {
	const tokens = new Set<string>();
	const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
	for (const { segment, isWordLike } of segmenter.segment(text)) {
		if (!isWordLike) continue;
		const normalized = segment.toLowerCase().trim();
		if (normalized.length > 1) tokens.add(normalized);
	}
	return tokens;
}

/**
 * 计算两个集合的 Jaccard 相似度
 */
function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
	if (a.size === 0 && b.size === 0) return 0;
	let intersection = 0;
	for (const item of a) {
		if (b.has(item)) intersection++;
	}
	const union = a.size + b.size - intersection;
	return union === 0 ? 0 : intersection / union;
}

/**
 * 获取相关文章推荐（合集文章由详情页单独处理）。
 * 推荐优先考虑主题相关性，再用栏目、置顶和新鲜度做辅助排序。
 */
export async function getRelatedPosts(
	currentPost: CollectionEntry<"posts">,
	maxCount = 5,
): Promise<PostForList[]> {
	const allPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	// 排除自身和加密文章
	const candidates = allPosts.filter(
		(p) => p.id !== currentPost.id && !p.data.password,
	);

	const currentTags = new Set(currentPost.data.tags || []);
	const currentTitleTokens = tokenizeText(currentPost.data.title);
	const currentContextTokens = tokenizeText(
		`${currentPost.data.title} ${currentPost.data.description || ""} ${(currentPost.body || "").slice(0, 8000)}`,
	);
	const currentCategory = currentPost.data.category || "";
	const now = Date.now();
	const genericTags = new Set(["案例研究", "产品", "运营", "互联网", "方法论"]);
	const growthTopicWords = [
		"增长",
		"转化",
		"留存",
		"拉新",
		"用户",
		"实验",
		"裂变",
		"复购",
		"流量",
		"推荐",
		"运营",
		"成交",
	];
	const currentTopicText =
		`${currentPost.data.title} ${currentPost.data.description || ""} ${(currentPost.body || "").slice(0, 12000)}`.toLowerCase();
	const currentGrowthTopicScore = growthTopicWords.reduce(
		(score, word) => score + (currentTopicText.includes(word) ? 1 : 0),
		0,
	);

	const scored = candidates.map((post) => {
		const postTags = new Set(post.data.tags || []);
		const sharedTags = [...currentTags].filter((tag) => postTags.has(tag));
		const tagMatchScore = sharedTags.reduce(
			(score, tag) => score + (genericTags.has(tag) ? 4 : 14),
			0,
		);

		const postTitleTokens = tokenizeText(post.data.title);
		const postContextTokens = tokenizeText(
			`${post.data.title} ${post.data.description || ""} ${(post.body || "").slice(0, 8000)}`,
		);
		const titleSimilarityScore =
			jaccardSimilarity(currentTitleTokens, postTitleTokens) * 20;
		const contextSimilarityScore =
			jaccardSimilarity(currentContextTokens, postContextTokens) * 15;

		const daysSincePublished =
			(now - new Date(post.data.published).getTime()) / (1000 * 60 * 60 * 24);
		const timeFreshnessScore = 5 * Math.exp((-Math.LN2 * daysSincePublished) / 365);

		const postCategory = post.data.category || "";
		const categoryBonus = currentCategory && postCategory === currentCategory ? 3 : 0;
		const pinnedBonus = post.data.pinned ? 10 : 0;
		const postTopicText =
			`${post.data.title} ${post.data.description || ""} ${(post.body || "").slice(0, 12000)} ${post.data.series || ""}`.toLowerCase();
		const postGrowthTopicScore = growthTopicWords.reduce(
			(score, word) => score + (postTopicText.includes(word) ? 1 : 0),
			0,
		);
		const growthSeriesBonus =
			currentGrowthTopicScore >= 2 &&
			(post.data.series === "增长黑客" || postGrowthTopicScore >= 2)
				? post.data.series === "增长黑客"
					? 60
					: 25
				: 0;

		const totalScore =
			tagMatchScore +
			titleSimilarityScore +
			contextSimilarityScore +
			categoryBonus +
			timeFreshnessScore +
			pinnedBonus +
			growthSeriesBonus;

		return {
			post,
			totalScore,
			tagMatchScore,
			contextSimilarityScore,
			timeFreshnessScore,
			categoryBonus,
		};
	});

	scored.sort((a, b) => b.totalScore - a.totalScore);
	return scored.slice(0, maxCount).map(({ post }) => ({
		id: post.id,
		data: post.data,
	}));
}
