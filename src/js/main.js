import { CONFIG } from './config.js';
import { initTheme, addThemeList } from './modules/theme.js';
import { initEffects, initEffectsToggle } from './modules/effects.js';
import { initPosts } from './modules/blog.js';
import { initPictureColl } from './modules/navigation.js';
import { initRouting } from './modules/routing.js';

document.addEventListener('DOMContentLoaded', () => {
	addThemeList();
	initTheme();
	initEffects();
	initEffectsToggle();
	initPosts();
	initPictureColl();
	initRouting();

	// Close details-tags on default for mobile devices to reduce large amount of text on home-tab
	if (window.matchMedia('(max-width: 767px)').matches) {
		document.querySelectorAll('details').forEach((details) => {
			details.removeAttribute('open');
		});
	}

	// Special config cases
	if (CONFIG.crtEffect) {
		document.getElementById('canvas').classList.add('crt-effect');
	}
	if (!CONFIG.noiseEffect) {
		document.getElementById('noise-overlay').style.display = 'none';
	}
	if (!CONFIG.grungeOverlay) {
		document.getElementById('grunge-overlay').style.display = 'none';
	}
});
