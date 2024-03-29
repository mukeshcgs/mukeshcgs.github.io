import gsap from 'gsap';

const animationEnterMask = (container) => {
	const activeLink = container.querySelector('.menus ul li.is-active span');
	const projects = container.querySelectorAll('.project');
	const images = container.querySelectorAll('.image');
	const img = container.querySelectorAll('.m-img');
	const tl = gsap.timeline({
		onStart: () => console.log('starting animationEnter'),
		onComplete: () => console.log('completed animationEnter'),
		defaults: {
			duration: 0.9, ease: 'power4.out'
		}
	});
	tl
		.set(projects, {autoAlpha: 1})
		.fromTo(activeLink, {xPercent: -101}, {duration: 0.9, xPercent: 0, transformOrigin: 'left'}, 0)
		.from(images, { xPercent: -101, stagger: 0.1 }, 0)
		.from(img, { 
			xPercent: 101,
			stagger: 0.1
		}, 0);
	return tl;
}

export default animationEnterMask;