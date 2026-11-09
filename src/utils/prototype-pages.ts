import { readdirSync } from "node:fs";

/**
 * 一页原型按几分钟估算。
 * 原型是扫一眼就往下翻的，不是逐字读的文档，2~3 分钟一页更贴近实际；
 * 取 3 分钟（组件页信息密度偏高，纯图页会偏保守，整体误差可接受）。
 */
export const MINUTES_PER_PROTOTYPE_PAGE = 3;

const ROOT = "public/proto";

/** 原型目录的页面 HTML：排除入口与外壳文件，剩下的一页一个文件 */
const SHELL_FILES = /^(index|entry|start)/;

/**
 * 数某个原型镜像目录里的页面数（public/proto/<dir>/）。
 * Axure 发布时一页对应一个 HTML，所以文件数就是页数。
 * 目录不存在或读不到时返回 0，调用方按「非原型文章」处理。
 */
export function countPrototypePages(
	dir: string,
	/** 手工指定的页数：目录里混了未发布/草稿页时以手工值为准 */
	override?: number,
): number {
	if (typeof override === "number" && override > 0) return override;
	if (!dir) return 0;
	try {
		return readdirSync(`${ROOT}/${dir}`)
			.filter((f) => f.endsWith(".html"))
			.filter((f) => !SHELL_FILES.test(f)).length;
	} catch {
		return 0;
	}
}

/**
 * 「页内容」总数 = 原型页 + 内嵌 PPT / 长图页。
 *
 * 有些文章既有可交互原型，又挂了 PPT 切换器（比如商品中心建设：44 页原型 + 9 页 KO），
 * 只算原型会把 PPT 漏掉；所以两边都算进来，页数口径才一致。
 */
export function countContentPages(options: {
	dir?: string;
	prototypePages?: number;
	deckPages?: number;
}): { prototype: number; deck: number; total: number } {
	const prototype = countPrototypePages(options.dir ?? "", options.prototypePages);
	const deck = options.deckPages && options.deckPages > 0 ? options.deckPages : 0;
	return { prototype, deck, total: prototype + deck };
}
