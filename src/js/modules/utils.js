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

export function initTooltips() {
	const tooltipElement = document.createElement('div');
	tooltipElement.classList.add('tooltip');
	tooltipElement.style.display = 'none';
	document.body.appendChild(tooltipElement);

	const tooltips = document.querySelectorAll('[data-tooltip]');
	tooltips.forEach((tooltip) => {
		tooltip.addEventListener('mouseenter', () => {
			const tooltipText = tooltip.getAttribute('data-tooltip');
			tooltipElement.textContent = tooltipText;
			tooltipElement.style.display = 'block';
		});

		tooltip.addEventListener('mousemove', (event) => {
			const tooltipElement = document.querySelector('.tooltip');
			tooltipElement.style.top = `${event.clientY + 10}px`;
			tooltipElement.style.left = `${event.clientX + 10}px`;
		});

		tooltip.addEventListener('mouseleave', () => {
			tooltipElement.style.display = 'none';
		});
	});
}
