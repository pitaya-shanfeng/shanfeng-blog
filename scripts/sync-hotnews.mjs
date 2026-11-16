#!/usr/bin/env node
/**
 * 把桌面的「行业日报」同步成站内文章
 *
 * 源：~/Desktop/知识沉淀/行业日报/每日动态日报-YYYY-MM-DD.md
 *     结构是 `# 标题` + `---` + `## 今日总览 …`，没有 frontmatter
 * 目标：src/content/posts/hotnews/，补上 title / published / description /
 *       quote / category / tags / slug / banner 八个字段
 *
 * 用法：
 *   node scripts/sync-hotnews.mjs             # 只同步新文件
 *   node scripts/sync-hotnews.mjs --dry-run   # 只看会做什么
 *   node scripts/sync-hotnews.mjs --force     # 覆盖已存在的同日文件
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// 可用 HOTNEWS_SRC / HOTNEWS_DST 覆盖，方便本地演练（正式运行用默认值）
const SRC_DIR = process.env.HOTNEWS_SRC ?? join(homedir(), "Desktop", "知识沉淀", "行业日报");
const DST_DIR = process.env.HOTNEWS_DST ?? "src/content/posts/hotnews";
const BANNER = "/assets/images/hotnews-banner.webp";
const DRY = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");

const FILE_RE = /^每日动态日报-(\d{4}-\d{2}-\d{2})\.md$/;

/** 取「今日总览」里的加粗导语：返回 [{ head, text }] */
function parseOverview(body) {
	const section = body.split(/^##\s+今日总览/m)[1]?.split(/^##\s+/m)[0] ?? "";
	return [...section.matchAll(/\*\*(.+?)[：:]\*\*\s*([\s\S]*?)(?=\n\*\*|\n---|\n*$)/g)]
		.map((m) => ({
			head: m[1].trim(),
			text: m[2].replace(/\s+/g, " ").replace(/\*\*/g, "").trim(),
		}))
		.filter((x) => x.head);
}

/** 摘要：把前几条导语的正文截出来拼成一段，控制在 220 字内 */
function buildDescription(items) {
	let out = "";
	for (const item of items) {
		const sentence = item.text.split(/(?<=[。！？])/)[0] ?? "";
		if (!sentence) continue;
		if ((out + sentence).length > 220) break;
		out += sentence;
	}
	return out;
}

if (!existsSync(SRC_DIR)) {
	console.error(`源目录不存在：${SRC_DIR}`);
	process.exit(1);
}

const files = readdirSync(SRC_DIR).filter((f) => FILE_RE.test(f)).sort();
let created = 0;
let skipped = 0;

for (const file of files) {
	const [, date] = FILE_RE.exec(file);
	const dst = join(DST_DIR, file);
	if (existsSync(dst) && !FORCE) {
		skipped += 1;
		continue;
	}

	const raw = readFileSync(join(SRC_DIR, file), "utf8");
	const title = /^#\s+(.+)$/m.exec(raw)?.[1]?.trim();
	if (!title) {
		console.warn(`跳过（没有 # 标题）：${file}`);
		continue;
	}
	// 去掉源文件的一级标题，正文从「今日总览」开始
	const body = raw.replace(/^#\s+.+\n+/, "").replace(/^\s*---\s*\n+/, "").trimStart();
	const items = parseOverview(body);
	const quote = items[0]?.head ? `${items[0].head}。` : title;
	const description = buildDescription(items) || title;

	const frontmatter = [
		"---",
		`title: ${title}`,
		`published: ${date}`,
		`description: ${description}`,
		`quote: ${quote}`,
		"category: 行业动态",
		"tags: [行业日报]",
		`slug: hotnews-${date}`,
		`banner: ${BANNER}`,
		"---",
		"",
	].join("\n");

	if (DRY) {
		console.log(`[dry-run] 会写入 ${dst}（标题：${title}）`);
	} else {
		writeFileSync(dst, frontmatter + body + "\n");
		console.log(`写入 ${dst}（标题：${title}）`);
	}
	created += 1;
}

console.log(`\n源文件 ${files.length} 篇：新增/覆盖 ${created}，已存在跳过 ${skipped}`);
