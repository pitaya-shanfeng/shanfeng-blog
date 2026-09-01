export function countMarkdownWords(body?: string) {
	if (!body) return 0;

	const text = body
		.replace(/!\[[^\]]*\]\([^)]+\)/g, "")
		.replace(/\[[^\]]+\]\([^)]+\)/g, "")
		.replace(/<[^>]+>/g, "")
		.replace(/[>#*_~|`]/g, "");

	const chineseChars = text.match(/[\u4e00-\u9fff]/g) || [];
	const englishWords = text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || [];
	const punctuationChars = text.match(/[.,!?;:，。！？；：、~～…\-—（）()【】\[\]{}<>《》“”"']/g) || [];

	return chineseChars.length + englishWords.length + punctuationChars.length;
}
