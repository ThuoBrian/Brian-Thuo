/*
	Portfolio interactions — premium, lightweight edition
	- Fixed nav scroll state
	- Mobile menu toggle
	- Smooth scroll + active section highlight
	- Reduced-motion aware
*/

(function () {
	'use strict';

	var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function initNav() {
		var nav = document.querySelector('.nav');
		var toggle = document.querySelector('.nav-toggle');
		var menu = document.querySelector('.nav-menu');
		var links = document.querySelectorAll('.nav-link');
		var sections = document.querySelectorAll('section[id], header[id], footer[id]');

		function onScroll() {
			if (window.scrollY > 20) {
				nav.classList.add('scrolled');
			} else {
				nav.classList.remove('scrolled');
			}

			var scrollPos = window.scrollY + 120;
			sections.forEach(function (section) {
				var top = section.offsetTop;
				var bottom = top + section.offsetHeight;
				var id = section.getAttribute('id');
				if (scrollPos >= top && scrollPos < bottom) {
					links.forEach(function (link) {
						link.classList.toggle('active', link.getAttribute('href') === '#' + id);
					});
				}
			});
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		if (toggle && menu) {
			toggle.addEventListener('click', function () {
				var expanded = toggle.getAttribute('aria-expanded') === 'true';
				toggle.setAttribute('aria-expanded', !expanded);
				menu.classList.toggle('open');
			});

			links.forEach(function (link) {
				link.addEventListener('click', function () {
					toggle.setAttribute('aria-expanded', 'false');
					menu.classList.remove('open');
				});
			});
		}

		document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
			anchor.addEventListener('click', function (e) {
				var href = this.getAttribute('href');
				if (href === '#') return;
				var target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
				}
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initNav);
	} else {
		initNav();
	}
})();
