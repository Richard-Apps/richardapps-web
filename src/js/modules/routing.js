import { openPost } from './blog.js';
import { changeTab } from './navigation.js';

const DEFAULT_HASH = '#home';

export function routing(hash) {
	const [route, query] = hash.slice(1).split('?');
	const params = new URLSearchParams(query);

	if (route === 'blog' && params.has('id')) {
		openPost(params.get('id'));
	}

	location.hash = route;
	changeTab(route);
}

export function defaultHash() {
	location.hash = DEFAULT_HASH;
}

export function initRouting() {
	window.addEventListener('hashchange', function () {
		routing(location.hash);
	});
	routing(location.hash || DEFAULT_HASH);
}
