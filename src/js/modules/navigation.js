import { writeAnimation, tabAnimation } from './animations.js';
import { defaultHash } from './routing.js';
import { CONFIG } from '../config.js';

const CANVAS = document.getElementById('canvas');

export function changeTab(newTab) {
	if (newTab === 'home') {
		window.scrollTo(0, 0);
	} else {
		document.getElementById('nav-tabs').scrollIntoView({ behavior: 'smooth' });
	}

	// update active tab indicator
	document.querySelectorAll('.tab-switcher').forEach((element) => {
		element.classList.remove('tab-active');
	});
	try {
		document.getElementById(newTab + '-tab').classList.add('tab-active');
		if (CONFIG.animationOnTabChange) {
			tabAnimation(newTab);
		}
	} catch (error) {
		defaultHash();
	}
}

function changePictureColl(event, coll) {
	document.querySelectorAll('.pic-coll').forEach((element) => {
		element.style.display = 'none';
	});
	document.getElementById(coll).style.display = 'block';
	document.querySelectorAll('.pic-coll-tabs').forEach((element) => {
		element.classList.remove('tab-active');
	});
	event.target.classList.add('tab-active');
	document.getElementById('nav-tabs').scrollIntoView({ behavior: 'smooth' });
}

export function initPictureColl() {
	document.querySelectorAll('.pic-coll-tabs').forEach((element) => {
		element.addEventListener('click', (event) => changePictureColl(event, element.dataset.id));
	});
}
