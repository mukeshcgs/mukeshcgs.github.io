import barba from '@barba/core';
import barbaRouter from '@barba/router';
import gsap from 'gsap';

import {
	revealProject,
	leaveToProject,
	leaveFromProject,
	animationEnterMask,
	animationLeaveMask,
	revealConnect,
	leaveToConnect,
	leaveFromConnect,
	workScript,
	brandingScript,
	connectScript,
	revealHome,
	leaveToHome,
	leaveFromHome,

} from './animations';

// define your routes
const myRoutes = [{
	path: '/index.html',
	name: 'home'
},
{
	path: '/stalls.html',
	name: 'stalls'
},

{
	path: '/interior.html',
	name: 'interior'
},
{
	path: '/branding.html',
	name: 'branding'
},
{
	path: '/visual-merchandising.html',
	name: 'visual-merchandising'
},
{
	path: '/digital.html',
	name: 'digital'
},
{
	path: '/connect.html',
	name: 'connect'
},
{
	path: '/work.html',
	name: 'work'
},
];
// tell Barba to use the router with your routes
barba.use(barbaRouter, {
	routes: myRoutes
});

const resetActiveLink = () => {
	gsap.set('.menus ul li.is-active span', {
		xPercent: -100,
		transformOrigin: 'left',
	});
}


barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
var timelinePromise = function (timeline) {
	return new Promise(function (resolve) {
		//alternate syntax for adding a callback
		timeline.eventCallback("onComplete", function () {
			console.log('on complete resolving')
			resolve(true)
		})
	});
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

barba.init({
	debug: true,
	views: [{
		namespace: 'branding',
		beforeEnter() { },
		afterEnter() {
			brandingScript();
		}
	},
	{
		namespace: 'work',
		beforeEnter() { },
		afterEnter() {
			// refresh the parallax based on new page content
			workScript();
		}
	},
	{
		namespace: 'connect',
		beforeEnter() { },
		afterEnter() {
			// refresh the parallax based on new page content
			connectScript();
		}
	}
	],
	transitions: [
		{
			name: 'general-transition',
			once: ({ next }) => {
				resetActiveLink();

				gsap.from('.menus ul li', {
					duration: 0.6,
					yPercent: -50,
					stagger: 0.2,
					opacity: 0,
					ease: 'power1.out',
				});
				gsap.from('.media ul li', {
					duration: 0.6,
					yPercent: -100,
					stagger: 0.2,
					opacity: 0,
					ease: 'power1.out',
				});

				animationEnterMask(next.container)
			},
			leave: function ({ current }) {
				var done = this.async();
				timelinePromise(animationLeaveMask(current.container)).then(function (res) {
					console.log('promise resolved')
					done();
				});
			},
			enter: ({ next }) => {
				animationEnterMask(next.container)
				$(document).find(".doc-icon");
				$("form").on("click", function (event) {
					var docIcon = document.querySelector('.doc-icon');
					var menu = document.querySelector('.menus');
					var btn2 = document.querySelector('.btn2');
					// Using a class instead, see note below.
					// docIcon.addEventListener("click", (event) => {
					event.preventDefault();
					menu.classList.toggle('open');
					btn2.classList.toggle('open');
					// });
					console.log("MENU222");
				})
			}
		},
		// {
		// 	name: 'home',
		// 	route: ['home'],
		// 	once({ next }) {
		// 		resetActiveLink(next.container);
		// 		revealHome(next.container);
		// 	},
		// 	leave: ({ current }) => {
		// 		leaveFromHome(current.container);
		// 	},
		// 	enter({ next }) {
		// 		animationEnterMask(next.container);
		// 		revealHome(next.container);
		// 	}
		// },
		// {
		// 	name: 'connect',
		// 	route: ['connect'],

		// 	once({ next }) {
		// 		resetActiveLink(next.container);
		// 		revealConnect(next.container);
		// 	},
		// 	leave: ({ current }) => {
		// 		leaveFromConnect(current.container);
		// 		animationLeaveMask(current.container);
		// 	},
		// 	enter({ next }) {
		// 		animationEnterMask(next.container);
		// 		revealConnect(next.container);
		// 	}
		// },
		// {
		// 	name: 'stalls',
		// 	route: ['stalls'],
		// 	// to: {
		// 	// 	namespace: ['stalls']
		// 	// },
		// 	once: ({ next }) => {
		// 		revealProject(next.container);
		// 		workScript(next.container);
		// 	},
		// 	leave: ({ current }) => leaveToProject(current.container),
		// 	enter: ({ next }) => {
		// 		revealProject(next.container)
		// 		workScript(next.container)
		// 	}
		// },
		// {
		// 	name: 'work',
		// 	route: ['work'],
		// 	// to: {
		// 	// 	namespace: ['stalls']
		// 	// },
		// 	once: ({ next }) => {
		// 		revealProject(next.container);
		// 		workScript(next.container);
		// 	},
		// 	leave: ({ current }) => leaveToProject(current.container),
		// 	enter: ({ next }) => {
		// 		animationEnterMask(next.container);

		// 		revealProject(next.container)
		// 		workScript(next.container)
		// 	}
		// },
		// {
		// 	name: 'branding',
		// 	route: ['branding'],
		// 	to: {
		// 		namespace: ['branding']
		// 	},
		// 	once: ({ next }) => {
		// 		revealProject(next.container);
		// 		branding(next.container);
		// 	},
		// 	leave: ({ current }) => leaveToProject(current.container),
		// 	enter: ({ next }) => {
		// 		animationEnterMask(next.container);

		// 		revealProject(next.container)
		// 		branding(next.container)
		// 	}
		// },
		// {
		// 	name: 'digital',
		// 	route: ['digital'],
		// 	to: {},
		// 	once: ({ next }) => { },
		// 	leave: ({ current }) => leaveToProject(current.container),
		// 	enter: ({ next }) => { }
		// },
		{
			name: 'detail',
			route: ['detail'],
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
		},
		// {
		// 	name: 'from-detail',
		// 	from: {
		// 		namespace: ['detail']
		// 	},
		// 	to: {
		// 		namespace: ['home']
		// 	},
		// 	leave: ({ current }) => leaveFromProject(current.container),
		// 	enter: ({ next }) => {
		// 		resetActiveLink();
		// 		gsap.from('.menus ul li', {
		// 			duration: 0.6,
		// 			yPercent: 100,
		// 			stagger: 0.2,
		// 			ease: 'power1.out'
		// 		});
		// 		animationEnterMask(next.container);
		// 	}
		// }
	]
});

