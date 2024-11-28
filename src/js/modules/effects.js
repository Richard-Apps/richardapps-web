import { CONFIG } from '../config.js';

const EFFECTS_CSS_URL = '/assets/css/effects.css';

if (CONFIG.effectsDisabledByDefault && !('effectsDisabled' in localStorage)) {
	localStorage.setItem('effectsDisabled', true);
}

let effectsDisabled = localStorage.getItem('effectsDisabled') === 'true';

let effectsStyle = document.createElement('link');
effectsStyle.rel = 'stylesheet';
effectsStyle.type = 'text/css';
effectsStyle.href = EFFECTS_CSS_URL;

function updateEffectsState() {
	if (!effectsDisabled) {
		document.head.appendChild(effectsStyle);
	}
}

function toggleEffects() {
	effectsDisabled = !effectsDisabled;
	localStorage.setItem('effectsDisabled', effectsDisabled);
	updateEffectsState();
	location.reload();
}

export function getEffectsDisabledState() {
	return effectsDisabled;
}

export function initEffectsToggle() {
	// Dynamic toggle link
	if (!CONFIG.displayEffectsSwitch) {
		document.getElementById('toggle-effects').style.display = 'none';
	} else {
		const nfbText = document.getElementById('toggle-effects');
		nfbText.innerHTML = `Don't like the effects? Click <a id="toggle-effects-link" href="#">HERE</a> to turn them ${
			effectsDisabled ? 'on' : 'off'
		}.`;

		document.getElementById('toggle-effects-link').addEventListener('click', (event) => {
			event.preventDefault();
			toggleEffects();
		});
	}
}

export function initEffects() {
	if (
		window.matchMedia('(max-width: 767px)').matches &&
		!('effectsDisabled' in localStorage) &&
		CONFIG.effectsDisabledByDefaultMobile
	) {
		effectsDisabled = true;
	}

	updateEffectsState();
}
