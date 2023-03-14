export const remToPx = (remValue?: string | number): number => {
	let rootFontSize =
		typeof window === 'undefined' ? 16 : parseFloat(window.getComputedStyle(document.documentElement).fontSize)

	return parseFloat(remValue as string) * rootFontSize
}
