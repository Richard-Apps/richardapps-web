import { copyClipboard } from './utils.js';
import { writeAnimation } from './animations.js';
import { CONFIG } from '../config.js';

const BLOG_URL = CONFIG.blogUrl;
const POSTS_CONTAINER = document.getElementById('blog-window');

export async function fetchPosts() {
	try {
		POSTS_CONTAINER.innerHTML = '<p>Loading posts...</p>';

		const response = await fetch(BLOG_URL);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}. Possible CORS issue or file not found.`);
		}

		const data = await response.text();

		const parser = new DOMParser();
		const xml = parser.parseFromString(data, 'text/xml');
		if (xml.querySelector('parsererror')) {
			throw new Error('Failed to parse XML: Malformed XML structure');
		}

		const posts = Array.from(xml.getElementsByTagName('post')).map((post) => ({
			id: post.getAttribute('id'),
			date: post.getElementsByTagName('date')[0].textContent,
			title: post.getElementsByTagName('title')[0].textContent,
			preview: post.getElementsByTagName('preview')[0].textContent,
			content: post.getElementsByTagName('content')[0].textContent,
			tags: Array.from(post.getElementsByTagName('tag')).map((tag) => tag.textContent),
		}));

		// sort by newest date first
		posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return posts;
	} catch (error) {
		POSTS_CONTAINER.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
		console.error(error);
	}
}

function createPostElement(post) {
	return `
		<div class="post" data-id="${post.id}" onclick="location.hash = '#blog?id=${post.id}'">
			<div class="post-header">
				<em class="post-date">[${post.date}]</em>
				<span class="post-title">${post.title}</span>
			</div>
			<div class="post-content">
				<span>${post.preview}</span>
				<hr class="dotted">
				<div class="tag-list">
				${post.tags.map((tag) => `<span class="tag">#${tag}</span>`).join('')}
				</div>
			</div>
		</div>
	`;
}

export function initPosts() {
	fetchPosts()
		.then((posts) => (POSTS_CONTAINER.innerHTML = posts.map(createPostElement).join('')))
		.catch((error) => console.error(error));
}

export function openPost(postId) {
	fetchPosts()
		.then((posts) => {
			const post = posts.find((p) => p.id === postId);
			if (post) {
				POSTS_CONTAINER.innerHTML = `
                <hr class="dotted">
                <div class="post-header">
                    <em class="post-date">[${post.date}]</em>
                    <span class="post-title">${post.title}</span>
                </div>
                <div>
                    <p id="post-content-full">${post.content}</p>
                </div>
                <hr class="dotted">
                <div class="post-actions"><a class="post-action-btn" id="post-back-btn">&lt; Back to posts</a><a class="post-action-btn" id="post-share-btn">Share</a></div>
            `;
				const postShareBtn = document.getElementById('post-share-btn');
				postShareBtn.addEventListener('click', () => {
					copyClipboard(window.location.href + `?id=${post.id}`, postShareBtn, 'Link copied!');
				});
				document.getElementById('post-back-btn').addEventListener('click', () => {
					initPosts();
				});
				if (CONFIG.writeAnimationOnPostOpen) {
					writeAnimation(document.getElementById('post-content-full'), 7, 250, true);
				}
			} else {
				console.error('Post not found');
			}
		})
		.catch((error) => console.error(error));
}
