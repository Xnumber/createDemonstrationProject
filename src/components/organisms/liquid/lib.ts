export function isInViewport(element: HTMLElement | null) {
	if (element) {
		const rect = element.getBoundingClientRect();
		// return (
		// 	rect.top >= 0 &&
		// rect.left >= 0 &&
		// rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		// rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		// );
			
		if (rect.bottom <= 0) {
			return false;
		}
		
		if (rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
			return true;
		}

	}

	return false;
}
