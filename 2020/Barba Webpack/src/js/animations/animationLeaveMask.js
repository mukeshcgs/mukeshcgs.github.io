import gsap from 'gsap';

const animationLeaveMask = (container) => {
	const activeLink = container.querySelector('.menus ul li.is-active span');
	const projects = container.querySelectorAll('.image');
	const images = container.querySelectorAll('.pro-img');
	// const home = container.querySelectorAll('.about-text');
	const pageHeading = container.querySelectorAll('.page-heading');
	const bgText = container.querySelectorAll('.bg-text');
	const main = document.getElementsByTagName("main");
	

	const tl = gsap.timeline({
		// onStart: () => console.log('starting animationLeave'),
		// onComplete: () => console.log('completed animationLeave'),
		defaults: {
			duration: 0.5, ease: 'power1.in'
		}
	});
	tl
		.to(activeLink, { xPercent: 101 }, 0)
		.to(pageHeading, { autoAlpha: 0, x: 20 }, 0.2)
		.to(bgText, { autoAlpha: 0, y: -20 }, 0.2)
		.to(main, { autoAlpha: 0, y: -20 }, 0.2)
		.to(projects, { xPercent: 101, stagger: 0.05 }, 0)
		// .to(home, { yPercent: 10, stagger: 0.1 }, 0)
		.to(images, {xPercent: -101,stagger: 0.05,}, 0);
	return tl;
}

export default animationLeaveMask;