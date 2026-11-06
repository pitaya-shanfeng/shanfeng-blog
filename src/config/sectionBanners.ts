/**
 * 栏目级 banner 兜底
 *
 * 文章 frontmatter 里写了 `banner` 就用文章自己的，没写才按 category 取这里的图。
 * 只影响「文章详情页顶部的横幅」，不动封面（frontmatter 的 image），也不动合集页——
 * 合集页的 banner 由各页自己传（拾遗两栏在 src/pages/{notes}.astro 与
 * hotnews.astro 里作为 banner 属性传给 CollectionPage 组件）。
 *
 * 加这一层是因为栏目级意图不该靠每篇手写：漏写一篇就会回落到全局壁纸，
 * 夹在栏目文章中间看，一眼就断。单篇要换图仍然在 frontmatter 里覆盖即可。
 *
 * 注意 category 可能写成路径式（如 `拾遗/学习笔记`），所以匹配走 bannerForCategory()
 * 而不是直接索引 —— 直接索引在这种写法下会静默落空，整栏文章都掉回全局壁纸。
 */
export const sectionBanners: Record<string, string> = {
	学习笔记: "/assets/images/notes-banner.webp",
	行业动态: "/assets/images/hotnews-banner.webp",
	// 转载精选还没有专属图，暂不登记 —— 漏登记会回落全局壁纸，
	// 出了图在这里补一行即可。
};

/**
 * 按 category 取栏目 banner：按 `/` 拆段后任一段命中即返回。
 * 与合集页取数（CollectionPage.astro）同一套规则，两处不会一个认一个不认。
 * 取不到返回 undefined，由调用方回落全局壁纸。
 */
export const bannerForCategory = (
	category?: string | null,
): string | undefined => {
	if (!category) return undefined;
	for (const seg of category.split("/")) {
		const hit = sectionBanners[seg.trim()];
		if (hit) return hit;
	}
	return undefined;
};
