import { CONFIG } from '../config.js';

const THEMES = {
	ocean: {
		bgColor: '15, 129, 236',
		mainColor: '#72b6ff',
		selection: '#3b6d8b',
	},
	terminal: {
		bgColor: '61, 150, 51',
		mainColor: '#6dfd60',
		selection: '#3b8b42',
	},
	cherry: {
		bgColor: '192, 63, 63',
		mainColor: '#fd6060',
		selection: '#8b3b3b',
	},
	amber: {
		bgColor: '179, 105, 21',
		mainColor: '#fda93c',
		selection: '#946612',
	},
	deepsea: {
		bgColor: '9, 95, 92',
		mainColor: '#cbe9d1',
		selection: '#56705a',
	},
	rainy: {
		bgColor: '15, 129, 236',
		mainColor: '#a4cdf8',
		selection: '#3b6d8b',
	},
};

export function changeTheme(theme) {
	const settings = THEMES[theme];
	if (!settings) return;

	document.documentElement.style.setProperty('--bg-color', settings.bgColor);
	document.documentElement.style.setProperty('--selection', settings.selection);
	document.documentElement.style.setProperty('--main-color', settings.mainColor);
	document.documentElement.style.setProperty('--main-color-40', settings.mainColor + '66'); // main-color with 40% opacity (Adding hex alpha AA (66 for 40% in this case) to #RRGGBB)
	localStorage.setItem('theme', theme);

	// special cases
	const rainVideo = document.getElementById('rain-vid');
	if (theme === 'rainy') {
		rainVideo.style.display = 'block';
	} else {
		rainVideo.style.display = 'none';
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

			THEME_LIST.appendChild(wrapper);
		});
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

	const THEME =
		localStorage.getItem('theme') ||
		(Object.keys(THEMES).includes(CONFIG.defaultTheme) ? CONFIG.defaultTheme : Object.keys(THEMES)[0]);
	changeTheme(THEME);
}
