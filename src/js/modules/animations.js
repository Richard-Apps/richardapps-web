import { CONFIG } from '../config.js';
import { getEffectsDisabledState } from './effects.js';

/**
 * Animates the text content of an element by fading in each letter.
 *
 * @param {HTMLElement} element - The DOM element whose text content will be animated.
 * @param {number} [delay=5] - The delay in milliseconds between each letter's animation.
 * @param {number} [fadeDuration=250] - The duration in milliseconds for the fade-in effect.
 * @param {boolean} [blur=false] - Whether to apply a blur effect to the letters during the animation.
 */
export function writeAnimation(element, delay = 5, fadeDuration = 250, blur = false) {
	const content = element.textContent;
	element.textContent = '';

	// wrapper to maintain the original layout
	const wrapper = document.createElement('span');
	wrapper.style.display = 'inline-block';
	element.appendChild(wrapper);

	// skip animation on click
	document.getElementById('canvas').addEventListener('click', () => {
		wrapper.textContent = content;
	});

	for (let i = 0; i < content.length; i++) {
		const letter = document.createElement('span');
		letter.textContent = content[i];
		letter.style.opacity = '0';
		if (blur) {
			letter.style.filter = 'blur(5.5px)';
		}
		letter.style.transition = `opacity ${fadeDuration}ms ease-in-out, filter ${fadeDuration}ms ease-in-out`;
		wrapper.appendChild(letter);

		setTimeout(() => {
			letter.style.opacity = '1';
			if (blur) {
				letter.style.filter = 'blur(0px)';
			}
		}, i * delay);
	}

	// replace span-elements with text content after animation
	setTimeout(() => {
		element.textContent = content;
	}, content.length * delay + fadeDuration);
}

export function tabAnimation(tab, fadeInDelay = 16) {
	const effectsDisabled = getEffectsDisabledState();

	document.querySelectorAll('.fade-in.visible').forEach((element) => {
		element.classList.remove('visible');
		element.classList.remove('fade-in-anim');
	});

	let elements = document.getElementById(tab).querySelectorAll('*');

	if (!effectsDisabled) {
		let delay = 0;
		// skip animation on click
		document.getElementById('canvas').addEventListener('click', () => {
			Array.from(elements).forEach((element) => {
				element.classList.add('visible');
				element.classList.add('fade-in-anim');
			});
		});

		Array.from(elements).forEach((element) => {
			element.classList.add('fade-in');
			setTimeout(function () {
				element.classList.add('visible');
				element.classList.add('fade-in-anim');
			}, delay);
			delay += fadeInDelay;

			// add write-animation to text elements
			if (
				CONFIG.writeAnimationOnTabChange &&
				(element.tagName === 'P' ||
					element.tagName === 'A' ||
					element.tagName === 'H1' ||
					element.tagName === 'H2' ||
					element.tagName === 'H3' ||
					element.tagName === 'H4' ||
					element.tagName === 'H5' ||
					element.tagName === 'H6' ||
					element.tagName === 'EM') &&
				!element.innerHTML.includes('<')
			) {
				writeAnimation(element, 7, 250, true);
			}
		});
	} else {
		Array.from(elements).forEach((element) => {
			element.classList.add('visible');
		});
	}
}

export function snowAnimation() {
	const effectsDisabled = getEffectsDisabledState();

	if (!effectsDisabled) {
		const snowflakeContainer = document.getElementById('snow-container');
		const snowflakeCount = 90;
		const snowflakeSize = 6;
		const snowflakeDuration = 15;

		for (let i = 0; i < snowflakeCount; i++) {
			const snowflake = document.createElement('div');
			snowflake.classList.add('snowflake');

			let size = Math.random() * snowflakeSize + 0.25;
			snowflake.style.width = `${size}px`;
			snowflake.style.height = `${size}px`;

			snowflake.style.left = `${Math.random() * 100}vw`;
			snowflake.style.top = `${Math.random() * -20}vh`;

			snowflake.style.opacity = Math.random() * 0.6 + 0.1;

			snowflake.style.animation = `snowflake-fall ${snowflakeDuration + Math.random() * 10}s linear infinite`;
			if (Math.random() > 0.3) {
				const horizontalAnimation = Math.random() > 0.5 ? 'snowflake-fall-horizontal-1' : 'snowflake-fall-horizontal-2';
				snowflake.style.animation = `${horizontalAnimation} ${snowflakeDuration + Math.random() * 10}s linear infinite`;
			}

			snowflake.style.animationDelay = `-${(snowflakeDuration + Math.random() * 50) / 4}s`; // randomize start

			snowflakeContainer.appendChild(snowflake);
		}
	}
}
