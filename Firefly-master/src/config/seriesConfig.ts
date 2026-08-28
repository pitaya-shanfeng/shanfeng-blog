export type SeriesConfigItem = {
	slug: string;
	name: string;
	description: string;
	groups?: string[];
};

export const seriesConfig: SeriesConfigItem[] = [
	{
		slug: "growth-hacking",
		name: "增长黑客",
		description:
			"围绕增长认知与增长方法，整理一条从理解增长、判断问题到拆解路径和找到发力点的系统阅读路径。",
		groups: ["增长黑客之“道”", "增长黑客之“法”"],
	},
	{
		slug: "jianshan",
		name: "见山",
		description:
			"围绕产品经理的认知、判断与系统能力，整理一条从认知困局、产品观到平台架构的完整阅读路径。",
	},
];

export function getSeriesBySlug(slug: string) {
	return seriesConfig.find((series) => series.slug === slug);
}

export function getSeriesByName(name?: string) {
	if (!name) return undefined;
	return seriesConfig.find((series) => series.name === name);
}

export function getSeriesUrl(name?: string) {
	const series = getSeriesByName(name);
	return series ? `/series/${series.slug}/` : "/series/";
}
