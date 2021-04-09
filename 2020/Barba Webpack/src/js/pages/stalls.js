import gsap from 'gsap';

class Stalls {
	namespace = 'stalls';
	beforeEnter = data => {
		console.log(data, 'on Stalls page');
	};
	beforeLeave = data => {
		console.log(data, 'on Stalls page');
		// const cols = data.current.container.querySelectorAll('.column');
		// return gsap.from(cols, {
		// 	duration: 0.7,
		// 	autoAlpha: 0,
		// 	scale: 0,
		// 	ease: 'power1.out'
		// });
	};
}
export default new Stalls();
