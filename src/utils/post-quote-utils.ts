/**
 * 从 Markdown 正文中提取「金句」，供文章页 banner 展示。
 *
 * 规则：取正文里**第一个引用块（blockquote）的第一段**，去掉行内 Markdown 标记。
 * 没有引用块时返回空字符串，由调用方决定兜底文案（如 frontmatter 的 description）。
 */

/** 去掉行内 Markdown 标记，保留纯文本 */
function stripInlineMarkdown(text: string): string {
	return text
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // 图片 → alt
		.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // 链接 → 文字
		.replace(/\*\*([^*]+)\*\*/g, "$1") // 粗体
		.replace(/__([^_]+)__/g, "$1") // 粗体（下划线式）
		.replace(/\*([^*]+)\*/g, "$1") // 斜体
		.replace(/_([^_]+)_/g, "$1") // 斜体（下划线式）
		.replace(/`([^`]+)`/g, "$1") // 行内代码
		.replace(/<[^>]+>/g, "") // 残留的 HTML 标签
		.replace(/\s+/g, " ")
		.trim();
}

export function extractPostQuote(body?: string): string {
	if (!body) return "";

	const lines = body.split("\n");
	const paragraphs: string[] = [];
	let current: string[] = [];
	let seenQuote = false;

	for (const line of lines) {
		const match = line.match(/^\s*>\s?(.*)$/);

		if (match) {
			seenQuote = true;
			const content = match[1];
			if (content.trim() === "") {
				// 引用块内的空行 = 段落分隔
				if (current.length) {
					paragraphs.push(current.join(" "));
					current = [];
				}
			} else {
				current.push(content);
			}
			continue;
		}

		// 已经进入过引用块，遇到非引用行说明引用块结束
		if (seenQuote) break;
	}

	if (current.length) paragraphs.push(current.join(" "));

	const firstParagraph = paragraphs[0];
	if (!firstParagraph) return "";

	return stripInlineMarkdown(firstParagraph);
}
