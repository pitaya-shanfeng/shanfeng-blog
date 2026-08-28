export function getCategoryDisplayName(category?: string | null) {
	if (!category) return category || "";
	if (category.trim() === "见山") return "写作";
	return category;
}
