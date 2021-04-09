import gsap from 'gsap';

const revealProject = (container) => {
	const images = container.querySelectorAll('.image');
	const content = container.querySelectorAll('.content');
	const img = container.querySelectorAll('.pro-img');
	const hero = container.querySelector('.hero');
	const tl = gsap.timeline({
		defaults: {
			duration: 1.2, ease: 'power4.out'
		}
	});
	tl
		.set(hero, { autoAlpha: 1 })
		.from(images, { xPercent: -101, stagger: 0.1 }, 0)
		.from(img, {
			xPercent: 101,
			stagger: 0.1
		}, 0)
		.from(content, { autoAlpha: 0, y: 20 }, 0.2);
	return tl;
}

export default revealProject;