import gsap from 'gsap';

const leaveToProject = (container) => {
	const navLinks = container.querySelectorAll('.menus ul li');
	const projects = container.querySelectorAll('.image');
	const images = container.querySelectorAll('.pro-img');
	const tl = gsap.timeline({
		onStart: () => console.log('starting animationLeave'),
		onComplete: () => console.log('completed animationLeave'),
		defaults: {
			duration: 0.4, ease: 'power1.in'
		}
	});
	tl
		.to(projects, { xPercent: 101, stagger: 0.05 }, 0)
		.to(images, {
			xPercent: -101,
			stagger: 0.05,
		}, 0);
	return tl;
}

export default leaveToProject;