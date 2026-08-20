export function countMarkdownWords(body?: string) {
	if (!body) return 0;

	const text = body
		.replace(/!\[[^\]]*\]\([^)]+\)/g, "")
		.replace(/\[[^\]]+\]\([^)]+\)/g, "")
		.replace(/<[^>]+>/g, "")
		.replace(/[>#*_~|]/g, "")
		.replace(/\s+/g, " ")
		.trim();

	const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
	const englishChars = text.match(/[a-zA-Z]/g) || [];

	return chineseChars.length + englishChars.length;
}
