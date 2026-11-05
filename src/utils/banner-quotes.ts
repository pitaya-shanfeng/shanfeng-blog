/**
 * 合集页 banner 右侧的金句（逐字打出，每次打开换一条）
 *
 * 三件事自己做，母版不管：
 * 1) 文字层挂到 #banner-overlay-container —— 内容区被进场动画的 transform
 *    包成了独立层叠上下文，z-index 给到 21 也压不过 banner
 *    （实测 elementFromPoint 命中的仍是图片）；
 * 2) 壁纸区在 swup 容器之外、切页不重建，所以每换一页都要重读一次金句数据；
 * 3) 金句数据来自 .col-page 的 data-quotes —— 它在 swup 容器内，随页替换。
 *
 * **照片上不铺任何压暗层**：字直接压在画面上，可读性靠字自己的描边阴影。
 * 铺一层渐变挡在照片上，无论多淡，右侧都会整体发灰，和左侧的亮部对不上。
 *
 * **不轮播**：一句打完就停在那儿。换句只发生在重新打开页面时，靠 sessionStorage
 * 里的一个洗好的牌堆（shuffle bag）实现——45 条挨个发一遍才会重洗，所以连续刷新
 * 看到的永远是没出现过的句子，而不是随机撞车。
 *
 * 为什么写在全局脚本里（Layout.astro 装载），而不是组件里的 <script>：
 * swup 换页只替换容器 HTML，不会执行新页面的 module 脚本。组件脚本只在
 * 「直接打开该页」时加载，从首页点导航进合集页时一行都不会跑。
 *
 * 打字机的实现要点：
 * 每个字符都是一个 span，**一开始就全部占好位置**（opacity 0），点亮只是加
 * class。这样右对齐的段落从第一个字到最后一个字，行宽和断行位置全程不变。
 * 若改成往容器里一个个 append 字符，每加一个字整块都会重新折行，右对齐的
 * 文字会左右抽搐。
 *
 * 逐字推进不用 N 个 setTimeout，而是一个 rAF 循环按 elapsed 算应显示到第几个字。
 * 定时器一多（45 条 × 50 字）切页时必然漏清理，rAF 只需要 cancel 一次。
 */

import type { BannerQuote } from "./banner-quotes-data";

const STAGE_ID = "col-quote-stage";
/** 发牌用的牌堆，放在 sessionStorage：刷新还在，关标签页就重来 */
const BAG_KEY = "jianshan-quote-bag";

/** 每个字的间隔：68ms ≈ 每秒 15 字，比真实手写快、比逐字打印慢 */
const CHAR_MS = 68;
/** 标点后多停一拍，读起来才有换气 */
const PUNCT_PAUSE = 200;
const PUNCT = new Set(["。", "，", "、", "；", "：", "？", "！", "」", "…", "—"]);

/** 淡入之后才开始打字，否则头几个字会和淡入叠在一起 */
const LEAD_IN_MS = 260;

/**
 * 金句整体再往左让出的距离。
 *
 * 默认右边缘与刊头卡片对齐，但那个位置正好压住照片里的笔尖和手指，
 * 字贴着画面主体走会很吵。让出 72px 之后，字落在手背和桌面上，安静得多。
 */
const SHIFT_LEFT_PX = 72;

/**
 * 金句最多两行。
 *
 * 长句子在两行里放不下时，**往左加宽**而不是缩字号、也不是截断加省略号：
 * 字小到 20px 以下，压在照片上就散了；截断更是把话截掉一半。
 * 右边缘钉住不动，宽度只向左长，视觉上像是文字从右侧往左铺开。
 */
const MAX_LINES = 2;
/** 加宽时左边至少留出的视口比例，别让一行字横穿整条 banner */
const LEFT_KEEP_RATIO = 0.14;
/** 加宽上限：不超过 banner 宽度的六成，再宽就盖住画面主体了 */
const MAX_WIDTH_RATIO = 0.58;
/** 加宽的粗调步长：24px 约一个字，先试到能装进两行 */
const WIDEN_STEP_PX = 24;
/** 挑断点时的细调步长：一格 22px 的字，步长必须比字窄才对准得上标点 */
const FINE_STEP_PX = 4;

interface PlayState {
	index: number;
	line: HTMLElement;
	chars: HTMLElement[];
	/** 每个字符出现的时刻（相对 startedAt） */
	starts: number[];
	typeEnd: number;
	startedAt: number;
	typed: number;
	caretAt: number;
}

let quotes: BannerQuote[] = [];
let signature = "";
let state: PlayState | null = null;
let rafId = 0;
let lastTick = 0;
let started = false;

/* ------------------------------------------------------------------ 容器 */

function ensureStage(host: HTMLElement): HTMLElement {
	let stage = document.getElementById(STAGE_ID);

	// 切页时壁纸区会被整体换掉，旧 stage 会跟着旧容器一起脱离文档。
	// 这时候 getElementById 仍能拿到它（同一个 JS 对象），但已经不在页面上，
	// 必须扔掉重建——否则新容器里永远挂着一个空壳。
	if (stage && stage.parentElement !== host) {
		stage.remove();
		stage = null;
	}

	if (!stage) {
		stage = document.createElement("div");
		stage.id = STAGE_ID;
		stage.setAttribute("aria-hidden", "true");
		host.appendChild(stage);
	}
	return stage;
}

/**
 * 把金句右边缘对齐到下方刊头卡片的右边缘，再整体往左让 SHIFT_LEFT_PX。
 *
 * 不能用固定的 right 值：内容区在不同视口下宽度会变（1280 时卡片右边距 36px、
 * 1440 时 66px、1920 时 168px），写死 6rem 就会在小屏悬空、大屏越界。
 *
 * 锚点由页面自己用 data-quote-anchor 标出来（合集页是 .col-board、
 * 行业动态是 .hn-board、书卷页是 .scroll），类名各不相同，统一成一个属性
 * 才不会每加一页就往这儿补一个选择器。
 */
function alignStage(stage: HTMLElement, host: HTMLElement): void {
	// 书页这类「页面自己画的 hero」：外框本身就和导航栏同一套宽度算法，
	// 右边缘已经对齐，不需要再按卡片量一次
	if (host.hasAttribute("data-quote-host")) return;

	const card = document.querySelector<HTMLElement>("[data-quote-anchor]");
	if (!card) return;

	const offset = host.getBoundingClientRect().right - card.getBoundingClientRect().right;
	if (offset >= 0) {
		stage.style.right = `${Math.round(Math.max(offset, 16) + SHIFT_LEFT_PX)}px`;
	}
}

/**
 * 数一行文字实际被折成了几行。
 *
 * 不能用 el.getClientRects()：块级元素只返回一个边框盒。用 Range 框住文字内容，
 * 才会按行盒一块一块地返回。
 */
function countLines(el: HTMLElement): number {
	const range = document.createRange();
	range.selectNodeContents(el);
	const rects = Array.from(range.getClientRects());
	range.detach();

	if (rects.length === 0) return 1;

	let lines = 1;
	let top = rects[0].top;
	for (const rect of rects) {
		// 行高 1.8、字号 22px，同一行内的矩形 top 完全一致，差 2px 才算换行
		if (Math.abs(rect.top - top) > 2) {
			lines += 1;
			top = rect.top;
		}
	}
	return lines;
}

/**
 * 第一行末尾停在这些标点后面时，断句才是完整的。
 *
 * 中文没有词边界，浏览器按字宽硬折，很容易把「而是」拆成「而 / 是」——
 * 两行都读得懂，但一眼就看出是机器折的。既然宽度是我们自己给的，
 * 就多试几档，让断点落在标点后面。
 */
const BREAK_AFTER = new Set(["，", "、", "：", "；", "。", "！", "？", "」", "…"]);

/** 第二行从第几个字开始；没换行返回 0 */
function secondLineStart(line: HTMLElement): number {
	const chars = Array.from(line.querySelectorAll<HTMLElement>(".qch"));
	if (chars.length === 0) return 0;

	const firstTop = chars[0].getBoundingClientRect().top;
	for (let i = 1; i < chars.length; i += 1) {
		if (Math.abs(chars[i].getBoundingClientRect().top - firstTop) > 2) return i;
	}
	return 0;
}

/**
 * 两行装不下就把宽度往左长，直到装得下。
 *
 * 先按 CSS 给的默认宽度量一次，已经 ≤2 行就什么都不做——大多数句子都走这条路，
 * 版式与改动前完全一致。只有三行及以上的长句才逐档加宽（每次 24px），
 * 加宽量受 banner 宽度和左侧留白双重限制。
 *
 * 加宽到「刚能两行」的那个宽度往往正好把某个词劈开，所以再往后试几档，
 * 优先选第一行停在标点后面的宽度；实在没有，就退回刚能两行的宽度。
 */
function fitStageWidth(stage: HTMLElement, line: HTMLElement): void {
	const host = stage.parentElement;
	if (!host) return;

	// 回到默认宽度再量，否则上一次加宽的结果会留下来
	stage.style.width = "";
	if (countLines(line) <= MAX_LINES) return;

	const hostRect = host.getBoundingClientRect();
	const baseRect = stage.getBoundingClientRect();
	const roomToLeft = baseRect.right - hostRect.left - hostRect.width * LEFT_KEEP_RATIO;
	const maxWidth = Math.min(hostRect.width * MAX_WIDTH_RATIO, roomToLeft);

	if (maxWidth <= baseRect.width) return;

	// 第一遍：找到「刚能装进两行」的最小宽度
	let minWidth = 0;
	for (let width = baseRect.width + WIDEN_STEP_PX; width <= maxWidth; width += WIDEN_STEP_PX) {
		stage.style.width = `${Math.round(width)}px`;
		if (countLines(line) <= MAX_LINES) {
			minWidth = width;
			break;
		}
	}

	// 到上限仍是三行：停在上限。不缩字号、不截断，宁可多一行也要把话说完
	if (minWidth === 0) {
		stage.style.width = `${Math.round(maxWidth)}px`;
		return;
	}

	// 第二遍：在整个可用区间里试，挑一个让第一行停在标点后面、且两行最接近等长的宽度。
	// 起点比 minWidth 再退一档：个别句子在稍窄处反而更均衡，别被「刚能两行」框死
	const text = line.textContent ?? "";
	const half = text.length / 2;
	const limit = Math.min(maxWidth, minWidth + WIDEN_STEP_PX * 10);
	const startFrom = Math.max(baseRect.width + WIDEN_STEP_PX, minWidth - WIDEN_STEP_PX * 5);

	// 首选「停在标点后」的；一句标点都没有（或都够不着）时，退而求最均衡的那个
	let punctWidth = 0;
	let punctScore = Number.POSITIVE_INFINITY;
	let anyWidth = 0;
	let anyScore = Number.POSITIVE_INFINITY;

	for (let width = startFrom; width <= limit; width += FINE_STEP_PX) {
		stage.style.width = `${Math.round(width)}px`;
		if (countLines(line) > MAX_LINES) continue;

		const start = secondLineStart(line);
		if (start <= 0) continue;

		const score = Math.abs(start - half);
		// 越接近正中越均衡；同样均衡时取窄的，少占画面
		if (score < anyScore) {
			anyScore = score;
			anyWidth = width;
		}
		if (BREAK_AFTER.has(text[start - 1]) && score < punctScore) {
			punctScore = score;
			punctWidth = width;
		}
	}

	stage.style.width = `${Math.round(punctWidth || anyWidth || minWidth)}px`;
}

/* -------------------------------------------------------------- 发牌（换句） */

/**
 * 从剩下的牌堆里抽一张。
 *
 * 用洗好的牌堆而不是每次 Math.random：随机抽 45 条里的一条，连续两次撞上同一句
 * 的概率接近 1/45，用户会觉得「没换」；牌堆保证每一条都轮过一遍才重洗。
 */
function pickIndex(count: number): number {
	let bag: number[] = [];

	try {
		const raw = sessionStorage.getItem(BAG_KEY);
		const parsed: unknown = raw ? JSON.parse(raw) : null;
		if (Array.isArray(parsed)) {
			bag = parsed.filter(
				(item): item is number =>
					typeof item === "number" && Number.isInteger(item) && item >= 0 && item < count,
			);
		}
	} catch {
		bag = [];
	}

	if (bag.length === 0) {
		bag = Array.from({ length: count }, (_, i) => i);
		// Fisher–Yates
		for (let i = bag.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			[bag[i], bag[j]] = [bag[j], bag[i]];
		}
	}

	const picked = bag.pop() ?? 0;
	try {
		sessionStorage.setItem(BAG_KEY, JSON.stringify(bag));
	} catch {
		// 隐私模式下 sessionStorage 会抛异常，退化成纯随机也不影响显示
	}
	return picked;
}

/* ------------------------------------------------------------------ 数据 */

function readQuotes(): BannerQuote[] {
	// 页面上任何挂 data-quotes 的元素都行：合集页挂在 .col-page 上，
	// 行业动态挂在 .hotnews-page 上，书卷页挂在 .book-page 上。
	const page = document.querySelector<HTMLElement>("[data-quotes]");
	if (!page?.dataset.quotes) return [];

	try {
		const parsed: unknown = JSON.parse(page.dataset.quotes);
		if (!Array.isArray(parsed)) return [];

		return parsed
			.map((item): BannerQuote | null => {
				// 兼容老写法：一条纯字符串，没有署名
				if (typeof item === "string") {
					const text = item.trim();
					return text ? { text, author: "" } : null;
				}
				if (item && typeof item === "object" && "text" in item) {
					const record = item as Partial<BannerQuote>;
					const text = String(record.text ?? "").trim();
					const author = String(record.author ?? "").trim();
					return text ? { text, author } : null;
				}
				return null;
			})
			.filter((item): item is BannerQuote => item !== null);
	} catch {
		return [];
	}
}

/* ------------------------------------------------------------------ 打字 */

function buildLine(quote: BannerQuote): {
	line: HTMLElement;
	chars: HTMLElement[];
	sign: HTMLElement | null;
} {
	const line = document.createElement("p");
	line.className = "col-quote-line";

	// 用 Array.from 而不是 split("")：代理对（表情等）不会被劈成两个半字
	const chars = Array.from(quote.text).map((ch) => {
		const span = document.createElement("span");
		span.className = "qch";
		span.textContent = ch;
		line.appendChild(span);
		return span;
	});

	let sign: HTMLElement | null = null;
	if (quote.author) {
		sign = document.createElement("div");
		sign.className = "col-quote-sign";
		sign.textContent = `—— ${quote.author}`;
	}

	return { line, chars, sign };
}

function schedule(chars: HTMLElement[]): { starts: number[]; typeEnd: number } {
	const starts: number[] = [];
	let t = 0;

	for (let i = 0; i < chars.length; i += 1) {
		starts.push(t);
		t += CHAR_MS;
		if (PUNCT.has(chars[i].textContent ?? "")) t += PUNCT_PAUSE;
	}

	return { starts, typeEnd: t };
}

function revealTo(st: PlayState, target: number): void {
	while (st.typed < target && st.typed < st.chars.length) {
		st.chars[st.typed].classList.add("is-on");
		st.typed += 1;
	}

	// 光标跟着最后一个已打出的字走，打完了就收掉
	const caretAt = st.typed > 0 && st.typed < st.chars.length ? st.typed - 1 : -1;
	if (caretAt === st.caretAt) return;

	if (st.caretAt >= 0) st.chars[st.caretAt].classList.remove("is-caret");
	if (caretAt >= 0) st.chars[caretAt].classList.add("is-caret");
	st.caretAt = caretAt;
}

function reducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function startQuote(stage: HTMLElement, index: number): void {
	const quote = quotes[index];
	if (!quote) return;

	const animate = !reducedMotion();
	const { line, chars, sign } = buildLine(quote);
	stage.replaceChildren(line);
	if (sign) stage.appendChild(sign);

	// 字全部就位之后再量行数：每个字的 span 一开始就占着位置，此刻的断行
	// 就是最终断行，不会因为后面逐字点亮而变化
	fitStageWidth(stage, line);

	const { starts, typeEnd } = schedule(chars);

	const st: PlayState = {
		index,
		line,
		chars,
		starts,
		// 降级时不该再等「打完」的时间，直接全部亮起
		typeEnd: animate ? typeEnd : 0,
		startedAt: performance.now() + (animate ? LEAD_IN_MS : 0),
		typed: 0,
		caretAt: -1,
	};

	state = st;
	stage.classList.add("is-on");

	// 楷体是按 unicode-range 分片、点开页面才拉的，首帧很可能还在用回退字体量宽度。
	// 换行位置一旦按回退字体算错，字体到位后会重新折行、可能变成三行。
	// 这里不打断打字，只在字体就位后重量一次宽度。
	void document.fonts?.ready.then(() => {
		if (state === st) fitStageWidth(stage, line);
	});

	if (!animate) {
		chars.forEach((ch) => ch.classList.add("is-on"));
		st.typed = chars.length;
		sign?.classList.add("is-on");
	}
}

function stop(): void {
	if (rafId) cancelAnimationFrame(rafId);
	rafId = 0;
	lastTick = 0;
	state = null;
}

function tick(now: number): void {
	const st = state;
	if (!st) return;

	// 标签页在后台时 rAF 会被挂起，回来第一帧的 elapsed 会瞬跳几分钟。
	// 按两次真实回调的间隔把起点往后推，等于把这段空档从时间轴里剪掉。
	if (lastTick && now - lastTick > 900) st.startedAt += now - lastTick;
	lastTick = now;

	const stage = document.getElementById(STAGE_ID);
	if (!stage) {
		stop();
		return;
	}

	const elapsed = now - st.startedAt;

	if (elapsed >= 0 && st.typed < st.chars.length) {
		let target = 0;
		while (target < st.starts.length && st.starts[target] <= elapsed) target += 1;
		if (target > 0) revealTo(st, target);
	}

	if (elapsed >= st.typeEnd) {
		revealTo(st, st.chars.length);
		// revealTo 打满字数时已经摘掉光标，这里再兜一次：光标留在最后一个字上会闪个不停
		if (st.caretAt >= 0) st.chars[st.caretAt].classList.remove("is-caret");
		st.caretAt = -1;
		st.line.nextElementSibling?.classList.add("is-on");
		// 打完了就停在句子上，不再排下一帧：不轮播，也就没有需要清理的循环
		rafId = 0;
		lastTick = 0;
		return;
	}

	rafId = requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------ 挂载 */

function teardown(): void {
	stop();
	document.getElementById(STAGE_ID)?.remove();
	// 旧版本留下的压暗层也一并清掉：热更新时不会自己消失
	document.querySelector(".col-quote-scrim")?.remove();
}

function renderQuotes(): void {
	const list = readQuotes();

	// 非合集页（或该栏目还没配金句）：整层撤掉，别在壁纸区留空壳
	if (list.length === 0) {
		signature = "";
		teardown();
		return;
	}

	// 优先用页面自己给的挂载点（书页的 hero），否则回落到壁纸区
	const host =
		document.querySelector<HTMLElement>("[data-quote-host]") ??
		document.getElementById("banner-overlay-container");
	// 手机端壁纸模式是 none，容器高度 0 —— 没有 banner 就没有地方放金句。
	// 页面自己给的挂载点（书页 hero 的引文框）刚渲染时是空的、高度也是 0，
	// 它是被金句撑开的，不能按高度判断
	const isPageHost = host?.hasAttribute("data-quote-host") ?? false;
	if (!host || (!isPageHost && host.clientHeight === 0)) {
		teardown();
		return;
	}

	const next = JSON.stringify(list);
	const prevSignature = signature;

	quotes = list;
	signature = next;

	const stage = ensureStage(host);
	// 挂在 hero 里时换一套定位（见 banner-quote.css 的 .is-hero）
	stage.classList.toggle("is-hero", host.hasAttribute("data-quote-host"));
	alignStage(stage, host);

	// 窗口尺寸变了，可用宽度跟着变：正在播的那句要重新量一次，
	// 窄屏下三行、宽屏下可能就只要两行了
	if (state && stage.contains(state.line)) fitStageWidth(stage, state.line);

	// 同一组文案、且那句话还挂在这个 stage 里：不打断，否则每次切页回来都从
	// 第一个字重新数。判断必须放在 ensureStage 之后——壁纸区被换掉时 stage 会
	// 重建，只比文案的话，切过来就是一片空白，直到下次整页刷新。
	const sameQuotes =
		prevSignature === next && state !== null && stage.contains(state.line);

	if (sameQuotes) return;

	stop();
	// 每次打开页面发一张新牌，打完就停住，不再自动往下切
	lastTick = 0;
	startQuote(stage, pickIndex(list.length));
	rafId = requestAnimationFrame(tick);
}

export function initBannerQuotes(): void {
	if (started) return;
	started = true;

	["swup:page:view", "swup:contentReplaced", "swup:content:replace"].forEach((eventName) => {
		document.addEventListener(eventName, renderQuotes);
	});
	window.addEventListener("popstate", renderQuotes);

	// 跨断点时会从「有 banner」变成「没有 banner」，需要重跑一次决定建还是收
	let resizeTimer: number | undefined;
	window.addEventListener("resize", () => {
		window.clearTimeout(resizeTimer);
		resizeTimer = window.setTimeout(renderQuotes, 200);
	});

	renderQuotes();
}
