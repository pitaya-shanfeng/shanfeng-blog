#!/usr/bin/env node
/**
 * 图库重压缩：public/assets/library 下的稿件页图（webp）
 *
 * 这些图当年是按「3200px 宽 + 接近无损」导出的，平均 317KB/张，全量 849MB；
 * 正文里实际展示宽度不到 700px，用 1600px + q80 完全够，肉眼无差。
 *
 * ⚠️ 2026-11-13 撤回默认参数：压到 1600px + q80 在长文表格上肉眼发糊，
 * 已用 _originals/library 全量还原。现在默认「不缩宽、q90」，只做轻微瘦身；
 * 真要压到 1600 再传 --small，但请先抽查含小字的页面。
 *
 * 用法：
 *   node scripts/recompress-library-images.mjs           # 保守压缩（不缩宽 / q90，原图备份到 _originals/）
 *   node scripts/recompress-library-images.mjs --small   # 激进压缩（1600px / q80，会损失清晰度）
 *   node scripts/recompress-library-images.mjs --dry-run # 只统计
 *
 * 压完记得重新上传 COS：
 *   coscmd upload -r public/assets/library /assets/library -H '{"Cache-Control":"public, max-age=604800"}'
 */
import { mkdirSync, copyFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { readdirSync } from "node:fs";
import sharp from "sharp";

const SRC = "public/assets/library";
const BAK = "_originals/library";
const SMALL = process.argv.includes("--small");
const MAX_W = SMALL ? 1600 : 4096; // 默认不缩宽（仅兜住超大图）
const QUALITY = SMALL ? 80 : 90;
const DRY = process.argv.includes("--dry-run");

function walk(dir, out = []) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walk(p, out);
		else if (p.endsWith(".webp")) out.push(p);
	}
	return out;
}

const files = walk(SRC);
let before = 0;
let after = 0;

for (const [i, file] of files.entries()) {
	const s0 = statSync(file).size;
	before += s0;

	let buf;
	try {
		buf = await sharp(file)
			.resize({ width: MAX_W, withoutEnlargement: true })
			.webp({ quality: QUALITY, effort: 6 })
			.toBuffer();
	} catch (error) {
		console.warn(`[skip] ${file}: ${error.message}`);
		after += s0;
		continue;
	}

	if (buf.length >= s0) {
		after += s0;
		continue;
	}
	if (!DRY) {
		const bak = join(BAK, relative(SRC, file));
		mkdirSync(dirname(bak), { recursive: true });
		try {
			statSync(bak);
		} catch {
			copyFileSync(file, bak);
		}
		writeFileSync(file, buf);
	}
	after += buf.length;

	if ((i + 1) % 200 === 0) {
		const saved = ((1 - after / before) * 100).toFixed(0);
		console.log(`  ${i + 1}/${files.length}  已省 ${saved}%`);
	}
}

const mb = (n) => (n / 1024 / 1024).toFixed(0);
console.log(
	`${DRY ? "[dry-run] " : ""}完成：${mb(before)}MB → ${mb(after)}MB，省 ${((1 - after / before) * 100).toFixed(1)}%`,
);
