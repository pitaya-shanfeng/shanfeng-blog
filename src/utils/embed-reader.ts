/**
 * 站内外链阅读器（.embed-reader）的交互
 *
 * 转载类文章里有一个「内置浏览器」面板：顶栏 + iframe。
 * 顶栏三个按钮——刷新、全屏、新窗口——只有刷新和全屏需要脚本，
 * 新窗口就是一个普通 <a target="_blank">，留着让它在没有 JS 时也能用。
 *
 * 为什么写在全局脚本里（Layout.astro 装载）：
 * swup 换页只替换容器 HTML，不会执行新页面的 module 脚本。面板挂在文章页，
 * 从首页点进来时组件内的 <script> 一行都不会跑。
 *
 * 绑定方式用事件委托，不逐面板 addEventListener：
 * 切页后面板是新的 DOM，委托挂在 document 上一次就够，不需要在
 * swup:page:view 里重新绑定，也不会重复绑定。
 *
 * 全屏用 fixed 覆盖视口，而不是 requestFullscreen：
 * 后者在 iframe 里、在部分浏览器下会退化成整块黑屏，且退出后要重新布局。
 */
const FULLSCREEN_CLASS = "is-fullscreen";

/** 打开全屏时锁住 body 滚动，否则背景会跟着滚，视觉上像两层页面叠着 */
let scrollLockY = 0;

function lockScroll(): void {
	const body = document.body;
	scrollLockY = window.scrollY;
	body.style.position = "fixed";
	body.style.top = `-${scrollLockY}px`;
	body.style.left = "0";
	body.style.right = "0";
	body.style.overflow = "hidden";
}

function unlockScroll(): void {
	const body = document.body;
	// 没锁过就别动：切页钩子会无条件调一次，若此时没有锁，
	// 还原成 scrollLockY（旧值）会把读者莫名拉回老位置
	if (body.style.position !== "fixed") return;
	body.style.position = "";
	body.style.top = "";
	body.style.left = "";
	body.style.right = "";
	body.style.overflow = "";
	window.scrollTo(0, scrollLockY);
}

function closeAll(): void {
	const open = document.querySelectorAll<HTMLElement>(
		`.embed-reader.${FULLSCREEN_CLASS}`,
	);
	open.forEach((el) => el.classList.remove(FULLSCREEN_CLASS));
	if (open.length) unlockScroll();
}

export function initEmbedReader(): void {
	document.addEventListener("click", (event) => {
		const target = event.target as HTMLElement | null;
		if (!target) return;

		// 全屏 / 退出全屏
		const fsBtn = target.closest<HTMLElement>("[data-er-fullscreen]");
		if (fsBtn) {
			const panel = fsBtn.closest<HTMLElement>(".embed-reader");
			if (!panel) return;
			const willOpen = !panel.classList.contains(FULLSCREEN_CLASS);
			closeAll();
			if (willOpen) {
				panel.classList.add(FULLSCREEN_CLASS);
				lockScroll();
			}
			return;
		}

		// 刷新：把 src 重置一次。用 removeAttribute + setAttribute，
		// 直接赋同一个 src 在部分浏览器里不会触发重载。
		const reloadBtn = target.closest<HTMLElement>("[data-er-reload]");
		if (reloadBtn) {
			const panel = reloadBtn.closest<HTMLElement>(".embed-reader");
			const frame = panel?.querySelector<HTMLIFrameElement>("iframe");
			if (!frame) return;
			const src = frame.getAttribute("src");
			if (!src) return;
			frame.removeAttribute("src");
			frame.setAttribute("src", src);
			panel?.classList.remove("is-blocked");
			return;
		}
	});

	// Esc 退出全屏
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closeAll();
	});

	// 切页时可能还停在全屏态：容器被换掉，锁会挂在 body 上不释放
	["swup:page:view", "swup:contentReplaced", "swup:content:replace"].forEach(
		(name) => {
			document.addEventListener(name, () => {
				document
					.querySelectorAll<HTMLElement>(`.embed-reader.${FULLSCREEN_CLASS}`)
					.forEach((el) => el.classList.remove(FULLSCREEN_CLASS));
				unlockScroll();
			});
		},
	);
}
