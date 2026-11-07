import { readdirSync } from "node:fs";

/** 一页原型按几分钟估算（与原型的交互复杂度对齐，5 分钟够把一页看明白） */
export const MINUTES_PER_PROTOTYPE_PAGE = 5;

const ROOT = "public/proto";

/** 原型目录的页面 HTML：排除入口与外壳文件，剩下的一页一个文件 */
const SHELL_FILES = /^(index|entry|start)/;

/**
 * 数某个原型镜像目录里的页面数（public/proto/<dir>/）。
 * Axure 发布时一页对应一个 HTML，所以文件数就是页数。
 * 目录不存在或读不到时返回 0，调用方按「非原型文章」处理。
 */
export function countPrototypePages(dir: string): number {
	if (!dir) return 0;
	try {
		return readdirSync(`${ROOT}/${dir}`)
			.filter((f) => f.endsWith(".html"))
			.filter((f) => !SHELL_FILES.test(f)).length;
	} catch {
		return 0;
	}
}
