import barba from '@barba/core';
import barbaRouter from '@barba/router';
import Home from './pages/home';
import DetailPage from './pages/detail-page';
import About from './pages/about';
import gsap from 'gsap';
import "babel-polyfill";

import { SwiperSlider, about, workScript, workScript2, revealProject, leaveToProject, leaveFromProject, animationEnterMask, animationLeaveMask } from './animations';

// define your routes
const myRoutes = [{
	path: '/work.html',
	name: 'work'
}, {
	path: '/work2.html',
	name: 'work2'
},];
// tell Barba to use the router with your routes
barba.use(barbaRouter, {
	routes: myRoutes
});
const resetActiveLink = () => gsap.set('.menus ul li.is-active span', {
	xPercent: -100,
	transformOrigin: 'left',
});

barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});

barba.init({
	debug: true,
	views: [Home, About],
	transitions: [
		{
			name: 'general-transition',
			once: ({ next }) => {
				SwiperSlider(next.container)

				resetActiveLink();
				gsap.from('.menus ul li', {
					duration: 0.6,
					yPercent: -50,
					stagger: 0.2,
					opacity: 0,
					ease: 'power1.out',
					onComplete: () => animationEnterMask(next.container)
				});
				gsap.from('.media ul li', {
					duration: 0.6,
					yPercent: -100,
					stagger: 0.2,
					opacity: 0,
					ease: 'power1.out',
				});
				gsap.from('main', {
					duration: 1,
					yPercent: 2,
					opacity: 0,
					ease: 'power1.out',
				});
			},
			leave: ({ current }) => animationLeaveMask(current.container),
			enter: ({ next }) => {
				animationEnterMask(next.container)
				SwiperSlider(next.container)
			}
		},
		{
			name: 'work',
			route: ['work'],
			to: {
				namespace: ['work']
			},
			once: ({ next }) => {
				revealProject(next.container);
				workScript(next.container);
			},
			leave: ({ current }) => leaveToProject(current.container),
			enter: ({ next }) => {
				revealProject(next.container)
				workScript(next.container)
			}
		},
		{
			name: 'work2',
			route: ['work2'],
			to: {
				namespace: ['work2']
			},
			once: ({ next }) => {
				revealProject(next.container);
				workScript2(next.container);
			},
			leave: ({ current }) => leaveToProject(current.container),
			enter: ({ next }) => {
				revealProject(next.container)
				workScript2(next.container)
			}
		},
		{
			name: 'detail',
			to: {
				namespace: ['detail']
			},
			once: ({ next }) => {
				revealProject(next.container);
			},
			leave: ({ current }) => leaveToProject(current.container),
			enter: ({ next }) => {
				revealProject(next.container)
			}
		}, {
			name: 'about',
			to: {
				namespace: ['about']
			},
			once: ({ next }) => {
				about(next.container);
			},
			leave: ({ current }) => leaveToProject(current.container),
			enter: ({ next }) => {
				about(next.container)
			}
		}, {
			name: 'from-detail',
			from: {
				namespace: ['detail']
			},
			to: {
				namespace: ['home', 'architecture']
			},
			leave: ({ current }) => leaveFromProject(current.container),
			enter: ({ next }) => {
				resetActiveLink();
				gsap.from('.menus ul li', {
					duration: 0.6,
					yPercent: 100,
					stagger: 0.2,
					ease: 'power1.out'
				});
				animationEnterMask(next.container);
			}
		}
	]
});