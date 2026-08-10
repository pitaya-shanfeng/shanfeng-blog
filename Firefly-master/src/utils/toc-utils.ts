/**
 * TOC (Table of Contents) 工具类
 * 用于 SidebarTOC 和 FloatingTOC 的共享逻辑
 */

import I18nKey from "@/i18n/i18nKey";
import { i18n } from "@/i18n/translation";
import {
	computeTocItems,
	renderTocItemHTML,
	type TocInput,
} from "@/utils/toc-shared";

export interface TOCConfig {
	contentId: string;
	indicatorId: string;
	maxLevel?: number;
	scrollOffset?: number;
}

interface TOCHeadingRef {
	id: string;
	depth: number;
	text: string;
	element: HTMLElement;
	frame?: HTMLIFrameElement;
}

interface DocumentTocEntry {
	id?: string;
	page?: number;
	title?: string;
}

export class TOCManager {
	private tocItems: HTMLElement[] = [];
	private observer: IntersectionObserver | null = null;
	private maxLevel: number;
	private scrollTimeout: number | null = null;
	private contentId: string;
	private indicatorId: string;
	private scrollOffset: number;
	private scrollTrackingHandler: (() => void) | null = null;
	private clickTrackingHandler: ((event: Event) => void) | null = null;
	private iframeRefreshCleanups: Array<() => void> = [];

	constructor(config: TOCConfig) {
		this.contentId = config.contentId;
		this.indicatorId = config.indicatorId;
		this.maxLevel = config.maxLevel || 3;
		this.scrollOffset = config.scrollOffset || 80;
	}

	/**
	 * 查找文章内容容器
	 */
	private getContentContainer(): Element | null {
		return (
			document.querySelector(".custom-md") ||
			document.querySelector(".prose") ||
			document.querySelector(".markdown-content")
		);
	}

	/**
	 * 查找当前文章正文里的 Markdown/MDX 标题
	 */
	private getPageHeadings(): HTMLElement[] {
		const contentContainer = this.getContentContainer();
		if (!contentContainer) {
			return [];
		}
		return Array.from(
			contentContainer.querySelectorAll("h1, h2, h3, h4, h5, h6"),
		);
	}

	/**
	 * 查找 HTML 报告 iframe。报告放在本站 public 目录下时为同源 iframe，
	 * 可读取内部 DOM，用来补齐外层文章目录。
	 */
	private getReportIframes(): HTMLIFrameElement[] {
		const contentContainer = this.getContentContainer();
		if (!contentContainer) return [];
		return Array.from(
			contentContainer.querySelectorAll<HTMLIFrameElement>(
				"iframe[data-auto-height]",
			),
		);
	}

	private getCurrentPostCategory(): string {
		return (
			document
				.getElementById("swup-container")
				?.getAttribute("data-current-post-category") || ""
		).trim();
	}

	private getCurrentPostTitle(): string {
		const titleEl = document.querySelector<HTMLElement>(
			'[data-pagefind-meta="title"]',
		);
		return (titleEl?.textContent || "").trim();
	}

	private normalizeTitle(value: string): string {
		return value.replace(/\s+/g, "").trim();
	}

	private formatDocumentPageId(page: number): string {
		return `document-page-${String(page).padStart(2, "0")}`;
	}

	private getDocumentTocData(): DocumentTocEntry[] {
		const dataEl = document.getElementById("document-toc-data");
		if (!dataEl?.textContent) return [];

		try {
			const parsed = JSON.parse(dataEl.textContent);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}

	/**
	 * PDF/PPT 页流文章没有 Markdown 标题，正文主体是一组页面图片。
	 * 仅在文章 frontmatter 提供 documentToc 时生成一级目录。
	 * 不再用“第 N 页”兜底，避免目录被低信息量占位项污染。
	 */
	private getDocumentPageHeadingRefs(): TOCHeadingRef[] {
		const contentContainer = this.getContentContainer();
		if (!contentContainer) return [];

		const images = Array.from(
			contentContainer.querySelectorAll<HTMLImageElement>(
				".document-page-stream img",
			),
		);
		if (images.length === 0) return [];

		const tocData = this.getDocumentTocData();
		if (tocData.length === 0) return [];

		return tocData.flatMap((item, index) => {
			const page = item.page || index + 1;
			const title = item.title?.trim();
			const image = images[page - 1];
			if (!image || !title) return [];

			const id = item.id || this.formatDocumentPageId(page);
			image.id = id;
			image.setAttribute("data-toc-title", title);

			return [{
				id,
				depth: 2,
				text: title,
				element: image,
			}];
		});
	}

	private shouldSkipJianshanTitleHeading(heading: TOCHeadingRef): boolean {
		if (this.getCurrentPostCategory() !== "见山") return false;

		const postTitle = this.normalizeTitle(this.getCurrentPostTitle());
		const headingText = this.normalizeTitle(heading.text);
		return !!postTitle && headingText.startsWith(postTitle);
	}

	/**
	 * 为没有 id 的 iframe 内标题生成稳定锚点
	 */
	private ensureHeadingId(
		heading: HTMLElement,
		usedIds: Set<string>,
		prefix: string,
		index: number,
	): string {
		const existingId = heading.id?.trim();
		if (existingId && !usedIds.has(existingId)) {
			usedIds.add(existingId);
			return existingId;
		}

		const text = this.getCleanTextContent(heading).trim();
		const slug = text
			.toLowerCase()
			.replace(/[^\p{Letter}\p{Number}]+/gu, "-")
			.replace(/^-+|-+$/g, "");
		const base = `${prefix}-${slug || index + 1}`;
		let id = base;
		let counter = 2;
		while (usedIds.has(id)) {
			id = `${base}-${counter}`;
			counter++;
		}

		heading.id = id;
		usedIds.add(id);
		return id;
	}

	/**
	 * 读取 iframe 内部标题。
	 * HTML 报告目录只展示一级章节标题，避免右侧目录过长。
	 * 优先取 h2；如果报告没有 h2，再退回取 h1。
	 */
	private getIframeHeadingRefs(): TOCHeadingRef[] {
		const refs: TOCHeadingRef[] = [];
		const usedIds = new Set<string>();

		this.getReportIframes().forEach((frame, frameIndex) => {
			try {
				const doc = frame.contentDocument || frame.contentWindow?.document;
				if (!doc) return;

				let headings = Array.from(
					doc.body?.querySelectorAll<HTMLElement>("h2") || [],
				);

				// 兼容少数报告只使用 h1 的情况
				if (headings.length === 0) {
					headings = Array.from(
						doc.body?.querySelectorAll<HTMLElement>("h1") || [],
					);
				}

				headings.forEach((heading, headingIndex) => {
					const text = this.getCleanTextContent(heading)
						.replace(/#+\s*$/, "")
						.trim();
					if (!text) return;

					const depth = Number.parseInt(heading.tagName.charAt(1), 10);
					const id = this.ensureHeadingId(
						heading,
						usedIds,
						`html-report-${frameIndex + 1}`,
						headingIndex,
					);

					refs.push({
						id,
						depth,
						text,
						element: heading,
						frame,
					});
				});
			} catch {
				// 跨域 iframe 无法读取内部标题，保持空目录即可。
			}
		});

		return refs;
	}

	/**
	 * 查找所有可用于目录的标题。
	 * 普通文章：使用外层 Markdown 标题。
	 * HTML 报告文章：外层没有标题时，读取 iframe 内部章节标题。
	 */
	private getAllHeadingRefs(): TOCHeadingRef[] {
		const pageHeadings = this.getPageHeadings();
		if (pageHeadings.length > 0) {
			const refs = pageHeadings.map((heading) => {
				const depth = Number.parseInt(heading.tagName.charAt(1), 10);
				const text = this.getCleanTextContent(heading)
					.replace(/#+\s*$/, "")
					.trim();
				return {
					id: heading.id,
					depth,
					text,
					element: heading,
				};
			});
			return refs.length > 0 && this.shouldSkipJianshanTitleHeading(refs[0])
				? refs.slice(1)
				: refs;
		}

		const documentPageHeadings = this.getDocumentPageHeadingRefs();
		if (documentPageHeadings.length > 0) {
			return documentPageHeadings;
		}

		return this.getIframeHeadingRefs();
	}

	/**
	 * 获取标题的纯文本内容（排除 script/style 标签的文本）
	 */
	private getCleanTextContent(element: HTMLElement): string {
		const clone = element.cloneNode(true) as HTMLElement;
		for (const el of clone.querySelectorAll("script, style")) {
			el.remove();
		}
		return clone.textContent || "";
	}

	/**
	 * 空状态文案
	 */
	private getEmptyStateHTML(): string {
		return `<div class="text-center py-8 text-gray-500 dark:text-gray-400"><p>${i18n(I18nKey.tocEmpty)}</p></div>`;
	}

	/**
	 * 将 DOM 标题转换为与服务端一致的 TocInput
	 */
	private domHeadingsToInputs(headings: TOCHeadingRef[]): TocInput[] {
		return headings.map((heading) => {
			let text = heading.text;

			// 空文本回退（例如动态副标题）
			if (!text) {
				const dataSubtitles = heading.element.getAttribute("data-subtitles");
				if (dataSubtitles) {
					try {
						const subtitles = JSON.parse(dataSubtitles);
						text = Array.isArray(subtitles) ? subtitles[0] : subtitles;
					} catch {
						// ignore
					}
				}
			}

			return { depth: heading.depth, slug: heading.id, text };
		});
	}

	/**
	 * 生成TOC HTML（客户端 fallback 路径，与服务端 SSR 输出保持一致）
	 */
	public generateTOCHTML(): string {
		const headings = this.getAllHeadingRefs();

		if (headings.length === 0) {
			return this.getEmptyStateHTML();
		}

		const items = computeTocItems(this.domHeadingsToInputs(headings), {
			maxLevel: this.maxLevel,
		});

		if (items.length === 0) {
			return this.getEmptyStateHTML();
		}

		let tocHTML = "";
		for (const item of items) {
			tocHTML += renderTocItemHTML(item);
		}

		tocHTML += `<div id="${this.indicatorId}" style="opacity: 0;" class="toc-active-indicator"></div>`;

		return tocHTML;
	}

	/**
	 * 更新TOC内容（重建，DOM 遍历路径）
	 */
	public updateTOCContent(): void {
		const tocContent = document.getElementById(this.contentId);
		if (!tocContent) return;

		tocContent.innerHTML = this.generateTOCHTML();
		this.tocItems = Array.from(
			document.querySelectorAll(`#${this.contentId} a`),
		);
	}

	/**
	 * 获取可见的标题ID
	 */
	private getHeadingViewportRect(heading: TOCHeadingRef): DOMRect | null {
		if (!heading.frame) return heading.element.getBoundingClientRect();

		const frameRect = heading.frame.getBoundingClientRect();
		const headingRect = heading.element.getBoundingClientRect();

		return {
			top: frameRect.top + headingRect.top,
			bottom: frameRect.top + headingRect.bottom,
			left: frameRect.left + headingRect.left,
			right: frameRect.left + headingRect.right,
			width: headingRect.width,
			height: headingRect.height,
			x: frameRect.left + headingRect.left,
			y: frameRect.top + headingRect.top,
			toJSON: () => ({}),
		} as DOMRect;
	}

	private findHeadingRefById(id: string): TOCHeadingRef | null {
		return this.getAllHeadingRefs().find((heading) => heading.id === id) || null;
	}

	private getHeadingAbsoluteTop(heading: TOCHeadingRef): number {
		if (!heading.frame) {
			return heading.element.getBoundingClientRect().top + window.pageYOffset;
		}

		const frameTop =
			heading.frame.getBoundingClientRect().top + window.pageYOffset;
		let headingTopInFrame = 0;
		let current: HTMLElement | null = heading.element;
		while (current) {
			headingTopInFrame += current.offsetTop;
			current = current.offsetParent as HTMLElement | null;
		}

		return frameTop + headingTopInFrame;
	}

	private getVisibleHeadingIds(): string[] {
		const headings = this.getAllHeadingRefs();
		const visibleHeadingIds: string[] = [];

		headings.forEach((heading) => {
			if (heading.id) {
				const rect = this.getHeadingViewportRect(heading);
				if (!rect) return;
				const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

				if (isVisible) {
					visibleHeadingIds.push(heading.id);
				}
			}
		});

		// 如果没有可见标题，选择最接近屏幕顶部的标题
		if (visibleHeadingIds.length === 0 && headings.length > 0) {
			let closestHeading: string | null = null;
			let minDistance = Number.POSITIVE_INFINITY;

			headings.forEach((heading) => {
				if (heading.id) {
					const rect = this.getHeadingViewportRect(heading);
					if (!rect) return;
					const distance = Math.abs(rect.top);

					if (distance < minDistance) {
						minDistance = distance;
						closestHeading = heading.id;
					}
				}
			});

			if (closestHeading) {
				visibleHeadingIds.push(closestHeading);
			}
		}

		return visibleHeadingIds;
	}

	/**
	 * 更新活动状态
	 */
	public updateActiveState(): void {
		if (!this.tocItems || this.tocItems.length === 0) return;

		// 移除所有活动状态
		this.tocItems.forEach((item) => {
			item.classList.remove("visible");
		});

		const visibleHeadingIds = this.getVisibleHeadingIds();

		// 找到对应的TOC项并添加活动状态
		const activeItems = this.tocItems.filter((item) => {
			const headingId = item.dataset.headingId;
			return headingId && visibleHeadingIds.includes(headingId);
		});

		// 添加活动状态
		activeItems.forEach((item) => {
			item.classList.add("visible");
		});

		// 更新活动指示器
		this.updateActiveIndicator(activeItems);
	}

	/**
	 * 更新活动指示器
	 */
	private updateActiveIndicator(activeItems: HTMLElement[]): void {
		const indicator = document.getElementById(this.indicatorId);
		if (!indicator || !this.tocItems.length) return;

		if (activeItems.length === 0) {
			indicator.style.opacity = "0";
			return;
		}

		const tocContent = document.getElementById(this.contentId);
		if (!tocContent) return;

		const contentRect = tocContent.getBoundingClientRect();
		const firstActive = activeItems[0];
		const lastActive = activeItems[activeItems.length - 1];

		const firstRect = firstActive.getBoundingClientRect();
		const lastRect = lastActive.getBoundingClientRect();

		const top = firstRect.top - contentRect.top;
		const height = lastRect.bottom - firstRect.top;

		indicator.style.top = `${top}px`;
		indicator.style.height = `${height}px`;
		indicator.style.opacity = "1";

		// 自动滚动到活动项
		if (firstActive) {
			this.scrollToActiveItem(firstActive);
		}
	}

	/**
	 * 滚动到活动项
	 */
	private scrollToActiveItem(activeItem: HTMLElement): void {
		if (!activeItem) return;

		const tocContainer = document
			.querySelector(`#${this.contentId}`)
			?.closest(".toc-scroll-container");
		if (!tocContainer) return;

		// 清除之前的定时器
		if (this.scrollTimeout) {
			clearTimeout(this.scrollTimeout);
		}

		// 使用节流机制
		this.scrollTimeout = window.setTimeout(() => {
			const containerRect = tocContainer.getBoundingClientRect();
			const itemRect = activeItem.getBoundingClientRect();

			// 只在元素不在可视区域时才滚动
			const isVisible =
				itemRect.top >= containerRect.top &&
				itemRect.bottom <= containerRect.bottom;

			if (!isVisible) {
				const itemOffsetTop = (activeItem as HTMLElement).offsetTop;
				const containerHeight = tocContainer.clientHeight;
				const itemHeight = activeItem.clientHeight;

				// 计算目标滚动位置，将元素居中显示
				const targetScroll =
					itemOffsetTop - containerHeight / 2 + itemHeight / 2;

				tocContainer.scrollTo({
					top: targetScroll,
					behavior: "smooth",
				});
			}
		}, 100);
	}

	/**
	 * 处理点击事件
	 */
	public handleClick(event: Event, sourceLink?: HTMLAnchorElement): void {
		event.preventDefault();
		event.stopPropagation();
		if (typeof event.stopImmediatePropagation === "function") {
			event.stopImmediatePropagation();
		}
		const target = sourceLink || (event.currentTarget as HTMLAnchorElement);
		const rawId =
			target.dataset.headingId ||
			target.getAttribute("href")?.substring(1) ||
			"";
		const id = decodeURIComponent(rawId);
		const targetElement = document.getElementById(id);

		if (targetElement) {
			const targetTop =
				targetElement.getBoundingClientRect().top +
				window.pageYOffset -
				this.scrollOffset;

			window.scrollTo({
				top: targetTop,
				behavior: "smooth",
			});
			return;
		}

		const iframeHeading = this.findHeadingRefById(id);
		if (iframeHeading) {
			const targetTop =
				this.getHeadingAbsoluteTop(iframeHeading) - this.scrollOffset;

			window.tocInternalNavigation = true;
			window.scrollTo({
				top: Math.max(0, targetTop),
				behavior: "smooth",
			});
			window.setTimeout(() => this.updateActiveState(), 350);
		}
	}

	/**
	 * 设置IntersectionObserver
	 */
	public setupObserver(): void {
		const headings = this.getAllHeadingRefs();

		if (this.observer) {
			this.observer.disconnect();
		}

		this.setupScrollTracking();

		this.observer = new IntersectionObserver(
			() => {
				this.updateActiveState();
			},
			{
				rootMargin: "0px 0px 0px 0px",
				threshold: 0,
			},
		);

		headings.forEach((heading) => {
			if (heading.id && !heading.frame) {
				this.observer?.observe(heading.element);
			}
		});
	}

	private setupScrollTracking(): void {
		if (!this.scrollTrackingHandler) {
			this.scrollTrackingHandler = () => {
				window.requestAnimationFrame(() => this.updateActiveState());
			};
			window.addEventListener("scroll", this.scrollTrackingHandler, {
				passive: true,
			});
			window.addEventListener("resize", this.scrollTrackingHandler);
		}
	}

	private clearIframeRefreshHandlers(): void {
		this.iframeRefreshCleanups.forEach((cleanup) => cleanup());
		this.iframeRefreshCleanups = [];
	}

	private setupIframeRefresh(): void {
		this.clearIframeRefreshHandlers();

		this.getReportIframes().forEach((iframe) => {
			const handler = () => {
				window.setTimeout(() => {
					this.render();
				}, 100);
			};
			iframe.addEventListener("load", handler);
			this.iframeRefreshCleanups.push(() => {
				iframe.removeEventListener("load", handler);
			});
		});
	}

	/**
	 * 绑定点击事件
	 */
	public bindClickEvents(): void {
		const tocContent = document.getElementById(this.contentId);
		if (!tocContent) return;

		if (this.clickTrackingHandler) {
			tocContent.removeEventListener("click", this.clickTrackingHandler);
		}

		this.clickTrackingHandler = (event: Event) => {
			const target = event.target as Element | null;
			const link = target?.closest<HTMLAnchorElement>("a.toc-item");
			if (!link || !tocContent.contains(link)) return;

			this.handleClick(event, link);
		};

		tocContent.addEventListener("click", this.clickTrackingHandler, true);
	}

	/**
	 * 清理
	 */
	public cleanup(): void {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}
		if (this.scrollTrackingHandler) {
			window.removeEventListener("scroll", this.scrollTrackingHandler);
			window.removeEventListener("resize", this.scrollTrackingHandler);
			this.scrollTrackingHandler = null;
		}
		if (this.clickTrackingHandler) {
			const tocContent = document.getElementById(this.contentId);
			tocContent?.removeEventListener("click", this.clickTrackingHandler, true);
			this.clickTrackingHandler = null;
		}
		this.clearIframeRefreshHandlers();
		if (this.scrollTimeout) {
			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = null;
		}
	}

	/**
	 * 重建目录（DOM 遍历生成列表）+ 绑定交互。
	 * 用于 fallback：加密文章解密后、空 SSR、或站内导航后侧栏 DOM 变旧时。
	 */
	public render(): void {
		this.updateTOCContent();
		this.setupIframeRefresh();
		this.bindClickEvents();
		this.setupObserver();
		this.updateActiveState();
	}

	/**
	 * 判断现有锚点是否与当前正文的目录完全一致（避免站内导航后侧栏 DOM 未被
	 * swup 替换、仍显示上一篇目录的情况）。用与 SSR 相同的算法从当前正文算出
	 * 期望 id 序列并逐一比对——不同文章即使共用个别标题名也不会误判。
	 */
	private anchorsMatchCurrentContent(anchors: HTMLElement[]): boolean {
		const expected = computeTocItems(
			this.domHeadingsToInputs(this.getAllHeadingRefs()),
			{ maxLevel: this.maxLevel },
		);
		if (expected.length !== anchors.length) return false;
		return expected.every(
			(item, i) => anchors[i].dataset.headingId === item.headingId,
		);
	}

	/**
	 * 附着到已有的服务端渲染锚点上（不重新生成列表），只绑定滚动高亮/点击。
	 * 若没有 SSR 锚点、或锚点属于上一篇文章（侧栏未被 swup 替换），回退到 render()。
	 */
	public attach(): void {
		const tocContent = document.getElementById(this.contentId);
		if (!tocContent) return;

		const anchors = Array.from(tocContent.querySelectorAll<HTMLElement>("a"));

		// 没有锚点（加密未解密/空）或锚点是上一篇的 → 重建
		if (anchors.length === 0 || !this.anchorsMatchCurrentContent(anchors)) {
			this.render();
			return;
		}

		this.tocItems = anchors;
		this.bindClickEvents();
		this.setupObserver();
		this.updateActiveState();
	}

	/**
	 * 初始化（向后兼容别名，等价于 render()）
	 */
	public init(): void {
		this.render();
	}
}

/**
 * 检查是否为文章页面
 */
export function isPostPage(): boolean {
	return window.location.pathname.includes("/posts/");
}
