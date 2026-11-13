#!/usr/bin/env node
/**
 * 生成「只含完整曲目」的本地歌单：src/config/musicPlaylist.generated.ts
 *
 * 背景：网易云歌单里混着完整曲目和 30 秒试听（约 470KB）。
 * 与其让读者点开发现只有 30 秒，不如在生成阶段就把试听筛掉。
 *
 * 用法：
 *   node scripts/gen-music-playlist.mjs 8597662201
 *
 * 流程：拉 meting 歌单 → 逐首 Range 探测音频体积 → >=600KB 视为完整 → 写 TypeScript。
 * 音频地址走 public Meting 接口（injiahw），它 302 到网易云 CDN。
 */
import { execFile } from "node:child_process";
import { writeFileSync } from "node:fs";
import { promisify } from "node:util";

const run = promisify(execFile);
const API = "https://api.injahow.cn/meting/";
const playlistId = process.argv[2];
if (!playlistId) {
	console.error("用法：node scripts/gen-music-playlist.mjs <网易云歌单ID>");
	process.exit(1);
}
const FULL_MIN = 600 * 1024;

const list = JSON.parse(
	(
		await run("curl", [
			"-s",
			"--max-time",
			"30",
			`${API}?server=netease&type=playlist&id=${playlistId}`,
		])
	).stdout,
);
console.log(`歌单 ${playlistId}：${list.length} 首`);

async function sizeOf(item) {
	try {
		const { stdout } = await run("curl", [
			"-s",
			"-o",
			"/dev/null",
			"-w",
			"%{size_download}",
			"-r",
			"0-99",
			"--max-time",
			"25",
			item.url,
		]);
		// size_download 只是 100 字节，拿不到总长；改用响应头
		const head = await run("curl", [
			"-sI",
			"-L",
			"--max-time",
			"25",
			item.url,
		]).catch(() => ({ stdout: "" }));
		const m = /content-range:\s*bytes\s+\d+-\d+\/(\d+)/i.exec(head.stdout);
		if (m) return Number(m[1]);
		const len = /content-length:\s*(\d+)/i.exec(head.stdout);
		return len ? Number(len[1]) : 0;
	} catch {
		return 0;
	}
}

const kept = [];
for (const [i, item] of list.entries()) {
	const size = await sizeOf(item);
	if (size >= FULL_MIN) kept.push(item);
	if ((i + 1) % 25 === 0) console.log(`  探测 ${i + 1}/${list.length}`);
}

const urlOf = (u) => `${API}?server=netease&type=url&id=${/id=(\d+)/.exec(u)?.[1]}`;
const picOf = (p) =>
	p ? `${API}?server=netease&type=pic&id=${/id=(\d+)/.exec(p)?.[1]}` : "";

const lines = [
	"/**",
	` * 网易云歌单 ${playlistId} 中「可完整播放」的曲目（自动生成，勿手改）`,
	" *",
	" * 生成方式：拉 meting 歌单 → 逐首探测音频体积 → 去掉 30 秒试听（约 470KB）。",
	" * 重新生成：node scripts/gen-music-playlist.mjs <歌单ID>",
	" * 音频地址走 public Meting 接口，它 302 到网易云 CDN；接口挂了要重跑。",
	" */",
	"export type LocalTrack = {",
	"\tname: string;",
	"\tartist: string;",
	"\turl: string;",
	"\tcover: string;",
	"\tlrc: string;",
	"};",
	"",
	"export const musicPlaylist: LocalTrack[] = [",
];
for (const item of kept) {
	lines.push(
		"\t{",
		`\t\tname: ${JSON.stringify(item.name)},`,
		`\t\tartist: ${JSON.stringify(item.artist ?? "")},`,
		`\t\turl: ${JSON.stringify(urlOf(item.url))},`,
		`\t\tcover: ${JSON.stringify(picOf(item.pic ?? item.cover ?? ""))},`,
		'\t\tlrc: "",',
		"\t},",
	);
}
lines.push("];", "");

writeFileSync("src/config/musicPlaylist.generated.ts", lines.join("\n"));
console.log(`保留 ${kept.length} 首完整曲目，已写入 src/config/musicPlaylist.generated.ts`);
