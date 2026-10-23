/**
 * 书籍合集页的「阅读进度尺」客户端逻辑
 *
 * 三件事：
 * 1. 记录读到哪了 —— 文章页被打开时，把当前章写进 localStorage
 * 2. 侧栏刻度的 scroll-spy —— 滚动时高亮当前章，并给刻度加 aria-current
 * 3. 「继续阅读」入口 —— 从 localStorage 读出上次位置
 *
 * 一次性注册（window 级监听 + document 委托），swup 切页后无需重新初始化：
 * 每次滚动都重新查询当前 DOM 里的章节卡，因此换页后自动跟上。
 */

const STORAGE_KEY = "book-reading-position";

export interface BookReadingPosition {
	/** 章节锚点 id，如 ch-01 */
	anchor: string;
	/** 章节序号（1 起） */
	index: number;
	/** 章节标题 */
	title: string;
	/** 记录时间 */
	at: number;
}

interface BookChapterMeta {
	anchor: string;
	index: number;
	title: string;
}

declare global {
	interface Window {
		__bookProgressTracker?: boolean;
	}
}

/** 章节元数据由书页写在页面内的隐藏节点上（swup 换页后重新查询即可） */
function readChapterMeta(): BookChapterMeta[] {
	const el = document.querySelector("[data-book-chapters]");
	if (!el?.textContent) return [];
	try {
		return JSON.parse(el.textContent) as BookChapterMeta[];
	} catch {
		return [];
	}
}

export function getBookReadingPosition(): BookReadingPosition | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as BookReadingPosition;
		return parsed && typeof parsed.anchor === "string" ? parsed : null;
	} catch {
		return null;
	}
}

export function setBookReadingPosition(pos: BookReadingPosition): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
	} catch {
		/* 隐私模式下 localStorage 可能不可用，静默降级 */
	}
}

/** 文章页被打开时记录进度：URL 的 slug 对上章节锚点即写入 */
function recordFromLocation(): void {
	const chapters = readChapterMeta();
	if (!chapters.length) return;
	const slug = decodeURIComponent(window.location.pathname.replace(/^\/posts\//, "").replace(/\/$/, ""));
	if (!slug) return;
	const hit = chapters.find((c) => c.anchor === `ch-${slug}` || c.anchor === slug);
	if (!hit) return;
	const prev = getBookReadingPosition();
	if (prev && prev.anchor === hit.anchor) return;
	setBookReadingPosition({
		anchor: hit.anchor,
		index: hit.index,
		// 去掉「第 N 章 · 」前缀：CTA 文案里会写「继续阅读 · …」
		title: hit.title.replace(/^第\s*\d+\s*章\s*·\s*/, ""),
		at: Date.now(),
	});
}

/** 找到当前阅读线（视口上方 140px）之上最后一个章节卡 */
function findCurrentChapter(): BookChapterMeta | null {
	const cards = document.querySelectorAll<HTMLElement>("[data-book-chapter]");
	if (!cards.length) return null;
	const line = window.scrollY + 140;
	let current: BookChapterMeta | null = null;
	cards.forEach((el) => {
		const top = el.getBoundingClientRect().top + window.scrollY;
		if (top <= line) {
			current = {
				anchor: el.dataset.bookChapter || "",
				index: Number(el.dataset.bookIndex || 0),
				title: el.dataset.bookTitle || "",
			};
		}
	});
	// 滚到底部时强制高亮最后一条
	if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
		const last = cards[cards.length - 1];
		current = {
			anchor: last.dataset.bookChapter || "",
			index: Number(last.dataset.bookIndex || 0),
			title: last.dataset.bookTitle || "",
		};
	}
	return current;
}

/**
 * 更新侧栏目录的当前项。
 *
 * 侧栏用的是母版 SidebarTOC 的外链模式，样式与交互都在母版里；
 * 这里只做一件事：把「当前读到哪一章」标到对应的目录项上
 * （加 .toc-item-active + aria-current，与母版页内目录的当前项同一套表现）。
 */
function updateScale(): void {
	const toc = document.querySelector<HTMLElement>("#book-toc-content");
	if (!toc) return;
	const current = findCurrentChapter();
	const anchor = current?.anchor ?? "";

	toc.querySelectorAll<HTMLElement>(".toc-item[data-anchor]").forEach((row) => {
		const isCurrent = row.dataset.anchor === anchor;
		row.classList.toggle("toc-item-active", isCurrent);
		if (isCurrent) row.setAttribute("aria-current", "true");
		else row.removeAttribute("aria-current");
	});
}

/** 初始化：一次性注册，滚动与切页都自动跟上 */
export function initBookProgressTracker(): void {
	if (window.__bookProgressTracker) return;
	window.__bookProgressTracker = true;

	let ticking = false;
	const onScroll = () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			ticking = false;
			updateScale();
		});
	};

	window.addEventListener("scroll", onScroll, { passive: true });
	document.addEventListener("swup:contentReplaced", () => {
		recordFromLocation();
		updateScale();
	});

	recordFromLocation();
	updateScale();
}
