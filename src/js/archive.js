import { CONFIG } from './config.js';
import { initTheme } from './modules/theme.js';
import { initEffects } from './modules/effects.js';

document.addEventListener('DOMContentLoaded', () => {
	initTheme();
	initEffects();

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
