#!/usr/bin/env node
/**
 * 构建后处理：把 dist 里 HTML/CSS 中的 /assets/... 改写到 CDN 地址。
 *
 * 为什么放在构建之后而不是组件里改：
 * 图片引用散落在 markdown 正文、封面组件、页脚配置、内联样式里，逐个改
 * 很容易漏；构建产物已经是最终 HTML，统一按前缀替换最稳，也不会影响
 * 本地开发（ASSETS_CDN_BASE 为空时脚本直接跳过）。
 */
import {
	readFileSync,
	readdirSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
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
	// 可交互原型**不要**指向 COS：腾讯云 COS 默认域名对 html 强制下载
	// （Content-Disposition: attachment），iframe 会变空白。
	// 原型改由本站同源提供（/proto/ 由 nginx 从磁盘发，或反代回 COS）。
];

function rewriteSrcset(html) {
	return html.replace(/(\ssrcset=")([^"]*)"/g, (_m, head, value) => {
		const next = value
			.replace(/(^|,\s*)\/assets\//g, (_x, sep) => `${sep}${base}/assets/`)
			;
		return `${head}${next}"`;
	});
}

/**
 * 兜底：把还剩下的 /assets/ 与 /proto/ 也指向 CDN。
 * 配置里的音乐、图集是以 JSON 字符串嵌进页面的（\"src\":\"/assets/…），
 * 按属性名匹配抓不到，这里统一处理。
 *
 * 已经指向 CDN 的地址先抽成占位符存起来，替换完再放回去——
 * 直接标记的话，占位符后面的 /proto/ 会被二次拼接，出现 base+base 的结果。
 */
function rewriteLeftovers(text) {
	const store = [];
	const withMarks = text.replace(
		new RegExp(`${base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`, "g"),
		(m) => {
			store.push(m);
			return `\u0000${store.length - 1}\u0000`;
		},
	);
	const replaced = withMarks
		.replace(/\/assets\//g, `${base}/assets/`)
		;
	const restored = replaced.replace(
		/\u0000(\d+)\u0000/g,
		(_m, i) => store[Number(i)],
	);

	// 有一类引用是「站点域名 + 相对路径」拼出来的（结构化数据里的图片地址），
	// 路径被换成 CDN 后会变成 https://站点https://CDN/…，这里把前面那段剥掉。
	const baseEsc = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const dup = new RegExp(`https?://[^"'\\s]*?${baseEsc}`, "g");
	return restored.replace(dup, base);
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
	after = rewriteLeftovers(after);
	if (after !== before) {
		writeFileSync(file, after);
		changed += 1;
	}
}

console.log(`[assets-cdn] 已把 ${changed} 个文件的 /assets/ 指向 ${base}/assets/`);

/**
 * 改写完成后，dist 里的 /assets 与 /proto 副本就没有任何引用了：
 * - assets 已经在 COS（图片、字体、音乐）
 * - proto 已经在 COS（原型目录）
 * 留着只会让产物从 ~50MB 涨到 1.7GB，部署时白传一遍。
 */
const PRUNE_DIRS = ["assets", "proto"];

function pruneCopies() {
	for (const name of PRUNE_DIRS) {
		const dir = join(DIST, name);
		try {
			if (statSync(dir).isDirectory()) {
				rmSync(dir, { recursive: true, force: true });
				console.log(`[assets-cdn] 已从产物移除 ${name}/（改由 CDN 提供）`);
			}
		} catch {
			// 目录不存在就算了
		}
	}
}

pruneCopies();
