#!/usr/bin/env node
/**
 * 构建后处理：把 dist 里 HTML/CSS 中的 /assets/... 改写到 CDN 地址。
 *
 * 为什么放在构建之后而不是组件里改：
 * 图片引用散落在 markdown 正文、封面组件、页脚配置、内联样式里，逐个改
 * 很容易漏；构建产物已经是最终 HTML，统一按前缀替换最稳，也不会影响
 * 本地开发（ASSETS_CDN_BASE 为空时脚本直接跳过）。
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONFIG = "src/config/assetsConfig.ts";
const DIST = "dist";

const base = (() => {
	try {
		const src = readFileSync(CONFIG, "utf8");
		const m = src.match(/ASSETS_CDN_BASE\s*=\s*"([^"]*)"/);
		return m ? m[1].replace(/\/+$/, "") : "";
	} catch {
		return "";
	}
})();

if (!base) {
	console.log("[assets-cdn] ASSETS_CDN_BASE 为空，跳过改写");
	process.exit(0);
}

// 注意：只改真正的引用，别把 data-* 或注释里的文本也带走
const RULES = [
	// 属性名可能带前缀（data-qr-src、data-src 之类），统一按「以 src/href 结尾」匹配
	[/(\s[\w-]*(?:src|href)=")\/assets\//g, `$1${base}/assets/`],
	[/(\ssrcset=")([^"]*)/g, null], // srcset 单独处理
	[/(url\()\/assets\//g, `$1${base}/assets/`],
	[/(\sdata-src=")\/assets\//g, `$1${base}/assets/`],
];

function rewriteSrcset(html) {
	return html.replace(/(\ssrcset=")([^"]*)"/g, (_m, head, value) => {
		const next = value.replace(
			/(^|,\s*)\/assets\//g,
			(_x, sep) => `${sep}${base}/assets/`,
		);
		return `${head}${next}"`;
	});
}

function walk(dir, out = []) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walk(p, out);
		else out.push(p);
	}
	return out;
}

let changed = 0;
for (const file of walk(DIST)) {
	if (!/\.(html|css|xml|json)$/.test(file)) continue;
	const before = readFileSync(file, "utf8");
	let after = before;
	for (const [re, rep] of RULES) {
		if (!rep) continue;
		after = after.replace(re, rep);
	}
	after = rewriteSrcset(after);
	if (after !== before) {
		writeFileSync(file, after);
		changed += 1;
	}
}

console.log(`[assets-cdn] 已把 ${changed} 个文件的 /assets/ 指向 ${base}/assets/`);
