import { defineCollection } from "astro:content";
import type { CollectionConfig } from "astro/content/config";
import { glob } from "astro/loaders";
import { type ZodType, z } from "astro/zod";
import { htmlPostsLoader } from "./utils/html-posts-loader";

type PostData = {
	title: string;
	published: Date;
	updated?: Date;
	draft: boolean;
	description: string;
	image: string;
	tags: string[];
	category: string | null;
	lang: string;
	pinned: boolean;
	author: string;
	sourceLink: string;
	licenseName: string;
	licenseUrl: string;
	comment: boolean;
	password: string;
	passwordHint: string;
	series: string;
	seriesOrder?: number;
	/** 转载类文章的报告速览（见 src/types/report.ts） */
	report?: import("./types/report").ReportBriefData;
	/** 文章格式：md 为默认；.html 文件由 htmlPosts loader 标记为 html */
	format?: "md" | "html";
	/** 字数 / 阅读时长：md 文章走 remark 插件（不落 data），HTML 文章由 loader 写入 */
	words?: number;
	minutes?: number;
	prevTitle: string;
	prevSlug: string;
	nextTitle: string;
	nextSlug: string;
};

type DynamicData = {
	published: Date;
	pinned: boolean;
	location: string;
};

type ProjectLink = {
	label: string;
	icon: string;
	value: string;
};

type ProjectData = {
	title: string;
	published: Date;
	draft: boolean;
	order?: number;
	description: string;
	image: string;
	tags: string[];
	link: ProjectLink[];
	status: string;
	lang: string;
};

type ContentCollection<T> = CollectionConfig<
	ZodType<T>,
	ReturnType<typeof glob>
>;

/** 文章字段定义：md 文章与 HTML 文章共用同一套（保证取数时两者形状一致） */
const postSchema = z.object({
	title: z.string(),
	published: z.date(),
	updated: z.date().optional(),
	draft: z.boolean().optional().default(false),
	description: z.string().optional().default(""),
	image: z.string().optional().default(""),
	/** 文章自己的 banner 壁纸（覆盖全局）。给某章单独做一张横幅时用 */
	banner: z.string().optional().default(""),
	/** 详情页藏掉侧栏、正文铺满。给原型/全宽内容这类文章用 */
	hideSidebar: z.boolean().optional().default(false),
	/** 原型文章：指向 public/proto/<dir>/，构建时数出页数用于盘口 */
	prototypeDir: z.string().optional().default(""),
	tags: z.array(z.string()).optional().default([]),
	category: z.string().optional().nullable().default(""),
	lang: z.string().optional().default(""),
	pinned: z.boolean().optional().default(false),
	author: z.string().optional().default(""),
	sourceLink: z.string().optional().default(""),
	licenseName: z.string().optional().default(""),
	licenseUrl: z.string().optional().default(""),
	comment: z.boolean().optional().default(true),
	password: z.string().optional().default(""),
	passwordHint: z.string().optional().default(""),
	series: z.string().optional().default(""),
	seriesOrder: z.number().optional(),

	/** 文章格式：md 为默认；.html 文件由 htmlPosts loader 标记为 html */
	format: z.enum(["md", "html"]).optional().default("md"),
	/**
	 * 字数与阅读时长。md 文章由 remark 插件写进 remarkPluginFrontmatter，不进 data；
	 * HTML 文章没有 markdown 渲染流程，由 loader 在这里给出（口径同为 reading-time）。
	 */
	words: z.number().optional(),
	/** 总字符数（飞书口径）。目前只入库、不在页面展示 */
	chars: z.number().optional(),
	minutes: z.number().optional(),
	/** 金句：从原文摘的一句话，渲染在正文引言的引用块里 */
	quote: z.string().optional(),

	/**
	 * 转载 / 收录类文章的「报告速览」：文章详情页正文之前那张关键信息卡。
	 * 形状与 src/types/report.ts 一致，改字段两边一起改。
	 * 没有该字段的文章不渲染任何东西。
	 */
	report: z
		.object({
			source: z.string().optional().default(""),
			type: z.string().optional().default(""),
			released: z.string().optional().default(""),
			pages: z.number().optional(),
			href: z.string().optional().default(""),
			facts: z
				.array(z.object({ value: z.string(), label: z.string() }))
				.optional()
				.default([]),
			why: z.string().optional().default(""),
			embed: z.boolean().optional().default(false),
		})
		.optional(),

	/* For internal use */
	prevTitle: z.string().default(""),
	prevSlug: z.string().default(""),
	nextTitle: z.string().default(""),
	nextSlug: z.string().default(""),
});

const postsCollection: ContentCollection<PostData> = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: postSchema,
});

/**
 * HTML 文章集合：与 md 文章**放在同一个目录**（src/content/posts），
 * 所以直接把 .html 丢进内容目录就能发布；元信息由 loader 从 HTML 自身读取。
 * 数据形状与 posts 完全一致，取数时在 getSortedPosts() 合并。
 */
const htmlPostsCollection = defineCollection({
	loader: htmlPostsLoader({ base: "./src/content/posts" }),
	schema: postSchema,
});

const specCollection: ContentCollection<Record<string, never>> =
	defineCollection({
		loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/spec" }),
		schema: z.object({}),
	});

const dynamicCollection: ContentCollection<DynamicData> = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/dynamic" }),
	schema: z.object({
		published: z.date(),
		pinned: z.boolean().optional().default(false),
		location: z.string().optional().default(""),
	}),
});

const projectsCollection: ContentCollection<ProjectData> = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		draft: z.boolean().optional().default(false),
		order: z.number().optional(),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		link: z
			.array(
				z.object({
					label: z.string(),
					icon: z.string().optional().default(""),
					value: z.string(),
				}),
			)
			.optional()
			.default([]),
		status: z.string().optional().default(""),
		lang: z.string().optional().default(""),
	}),
});

export const collections: {
	dynamic: typeof dynamicCollection;
	posts: typeof postsCollection;
	htmlPosts: typeof htmlPostsCollection;
	spec: typeof specCollection;
	projects: typeof projectsCollection;
} = {
	dynamic: dynamicCollection,
	posts: postsCollection,
	htmlPosts: htmlPostsCollection,
	spec: specCollection,
	projects: projectsCollection,
};
