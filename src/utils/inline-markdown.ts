function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

export function renderInlineMarkdown(text: string): string {
	return escapeHtml(text).replace(/\*(.+?)\*/g, "<em>$1</em>");
}
