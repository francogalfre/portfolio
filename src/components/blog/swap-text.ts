/** Replaces an element's text with a short fade-in, so changes never look abrupt. */
export function swapText(element: Element | null, text: string) {
	if (!element || element.textContent === text) return;

	element.textContent = text;
	element.classList.remove("is-swapping");
	// Force a reflow so the animation restarts on every change
	void (element as HTMLElement).offsetWidth;
	element.classList.add("is-swapping");
}
