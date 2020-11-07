import Swiper from 'swiper';
import gsap from 'gsap';

class Home {
	namespace = 'home';
	beforeEnter = data => {
		console.log(data, 'on home page');
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: {
				delay: 5000,
			},
			on: {
				init: function () {
					console.log('swiper initialized');
				},
			},
		});

		mySwiper.on('slideChange', function () {
			gsap.from(".swiper-slide-next", {
				duration: 0.7,
				autoAlpha: 0,
				scale: .50,
				y: 100,
				stagger: 0.03,
				ease: 'power1.out'
			});
		});

		mySwiper.on('slideChangeTransitionStart', function () {
			console.log('slideChangeTransitionStart');
		});

		mySwiper.on('slideChangeTransitionEnd', function () {
			console.log('slideChangeTransitionEnd');
		});
	};
}

export default new Home();
