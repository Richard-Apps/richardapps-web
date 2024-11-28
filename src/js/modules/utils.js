export function copyClipboard(text, element = null, copyIndicator = 'Copied!') {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			if (element) {
				const originalText = element.textContent;
				element.textContent = copyIndicator;
				element.style.pointerEvents = 'none';

				setTimeout(() => {
					element.textContent = originalText;
					element.style.pointerEvents = 'auto';
				}, 1500);
			}
		})
		.catch((error) => console.error(error));
}
