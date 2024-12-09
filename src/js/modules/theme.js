import { CONFIG } from '../config.js';
import { snowAnimation } from './animations.js';

// tip: add "editor.defaultColorDecorators": true to your VSCode settings.json file to make the color-picker work
const THEMES = {
	ocean: {
		bgColor: 'rgb(15, 129, 236)',
		mainColor: '#72b6ff',
		selection: '#3b6d8b',
	},
	terminal: {
		bgColor: 'rgb(61, 150, 51)',
		mainColor: '#6dfd60',
		selection: '#3b8b42',
	},
	cherry: {
		bgColor: 'rgb(192, 63, 63)',
		mainColor: '#fd6060',
		selection: '#8b3b3b',
	},
	amber: {
		bgColor: 'rgb(179, 105, 21)',
		mainColor: '#fda93c',
		selection: '#946612',
	},
	deepsea: {
		bgColor: 'rgb(9, 95, 92)',
		mainColor: '#cbe9d1',
		selection: '#56705a',
	},
	rainy: {
		bgColor: 'rgb(15, 129, 236)',
		mainColor: '#a4cdf8',
		selection: '#3b6d8b',
	},
	winter: {
		bgColor: 'rgb(150, 150, 150)',
		mainColor: '#c0c0c0',
		selection: '#a0a0a0',
	},
};

function removeRGB(rgb) {
	return rgb
		.replace(/rgb\(|\)/g, '')
		.split(',')
		.map((n) => parseInt(n));
}

export function changeTheme(theme, save = true) {
	const settings = THEMES[theme];
	if (!settings) return;

	const rawBG = removeRGB(settings.bgColor);

	document.documentElement.style.setProperty('--bg-color', rawBG.join(', '));
	document.documentElement.style.setProperty('--selection', settings.selection);
	document.documentElement.style.setProperty('--main-color', settings.mainColor);
	document.documentElement.style.setProperty('--main-color-40', settings.mainColor + '66'); // main-color with 40% opacity (Adding hex alpha AA (66 for 40% in this case) to #RRGGBB)

	if (save) {
		localStorage.setItem('theme', theme);
	}

	// special cases
	const rainVideo = document.getElementById('rain-vid');
	const snowContainer = document.getElementById('snow-container');
	rainVideo.style.display = 'none';
	snowContainer.innerHTML = '';
	switch (theme) {
		case 'rainy':
			rainVideo.style.display = 'block';
			break;
		case 'winter':
			snowAnimation();
			break;
	}

	// update theme list by adding '>' and '<' to the current theme name and removing them from the others
	if (document.getElementById('theme-list')) {
		document.querySelectorAll('#theme-list p a').forEach((link) => {
			link.textContent = link.dataset.theme === theme ? `> ${theme} <` : link.dataset.theme;
		});
	}
}

export function addThemeList() {
	const THEME_LIST = document.getElementById('theme-list');
	THEME_LIST.innerHTML = '';

	if (THEME_LIST) {
		Object.keys(THEMES).forEach((theme) => {
			const link = document.createElement('a');
			link.href = '#';
			link.dataset.theme = theme;
			link.textContent = theme;
			link.addEventListener('click', (event) => {
				event.preventDefault();
				changeTheme(theme);
			});

			const wrapper = document.createElement('p');
			wrapper.appendChild(link);
			wrapper.id = theme;

			THEME_LIST.appendChild(wrapper);
		});
	}

	// separate special cases
	if (document.getElementById('rainy')) {
		const rainy = document.getElementById('rainy');
		rainy.style.marginTop = '1em';
	}
}

export function initTheme() {
	// check if theme in local storage is available
	if (!Object.keys(THEMES).includes(localStorage.getItem('theme'))) {
		localStorage.removeItem('theme');
	}

	// check if config default theme is available
	if (!Object.keys(THEMES).includes(CONFIG.defaultTheme)) {
		console.error('Default theme set in /src/js/config.js invalid!');
	}

	let THEME =
		localStorage.getItem('theme') ||
		(Object.keys(THEMES).includes(CONFIG.defaultTheme) ? CONFIG.defaultTheme : Object.keys(THEMES)[0]);

	// seasonal default theme
	if (CONFIG.seasonalTheme && !localStorage.getItem('theme')) {
		const date = new Date();
		const month = date.getMonth(); // returns value between 0 and 11

		// winter
		if (month === 11 || month === 0) {
			THEME = Object.keys(THEMES).includes('winter') ? 'winter' : THEME;
		}
	}

	changeTheme(THEME, false);
}
