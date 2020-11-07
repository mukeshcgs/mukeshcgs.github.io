import gsap from 'gsap';

const animationEnterMask = (container) => {
	const activeLink = container.querySelector('.menus ul li.is-active span');
	const projects = container.querySelectorAll('.project');
	const images = container.querySelectorAll('.image');
	const img = container.querySelectorAll('.pro-img');
	const pageHeading = container.querySelectorAll('.page-heading');
	const bgText = container.querySelectorAll('.bg-text');
	const main = document.getElementsByTagName("main");
	
	var docIcon = container.querySelector('.doc-icon');
	var menu = container.querySelector('.menus');
	var btn2 = container.querySelector('.btn2');
	// Using a class instead, see note below.


	const tl = gsap.timeline({
		// onStart: () => console.log('starting animationEnter'),
		onComplete: () => {
			console.log('completed animationEnter');
			docIcon.addEventListener("click", (event) => {
				event.preventDefault();
				menu.classList.toggle('open');
				btn2.classList.toggle('open');
			});
			console.log("MENU");
		},
		defaults: {
			duration: 0.7, ease: 'power4.out'
		}
	});
	tl
		.set(projects, { autoAlpha: 1 })
		.from(pageHeading, { autoAlpha: 0, x: -20 }, 0.2)
		.from(bgText, { autoAlpha: 0, y: 20 }, 0.2)
		.from(main, { autoAlpha: 0, y: 20 }, 0.2)
		.fromTo(activeLink, { xPercent: -101 }, { duration: 0.9, xPercent: 0, transformOrigin: 'left' }, 0)
		.from(images, { xPercent: -101, stagger: 0.1 }, 0)
		.from(img, { xPercent: 101, stagger: 0.1 }, 0);

	return tl;
}

export default animationEnterMask;