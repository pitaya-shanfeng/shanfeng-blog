/**
 * 原型托管配置
 *
 * 原型是「整套 Axure 导出」，一套几十 MB，不适合进 git 仓库，也不该跟着博客
 * 一起构建部署。正常做法是放到对象存储 + CDN，博客只引用它的地址。
 *
 * 这里留一个基准地址：
 * - 留空 → 走站内 /proto/<dir>/（本地开发、或还没迁到 CDN 时）
 * - 填上 → 文章里的 iframe 直接指向 CDN，仓库里不用再放这些文件
 *
 * 例：export const PROTOTYPE_CDN_BASE = "https://proto.shanfengpm.com";
 */
export const PROTOTYPE_CDN_BASE = "";

/** 某个原型目录的入口地址（带不带 CDN 都走这里，调用方不用关心） */
export function prototypeEntryUrl(dir: string): string {
	if (!dir) return "";
	const base = PROTOTYPE_CDN_BASE.replace(/\/+$/, "");
	return base ? `${base}/${dir}/entry.html` : `/proto/${dir}/entry.html`;
}
