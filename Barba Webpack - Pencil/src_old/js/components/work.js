import gsap from 'gsap';
export default class Work {
	constructor(el) {
		this.el = el;
		this.slideNavPrev = document.getElementById("prev");
		this.slideNavNext = document.getElementById("next");
		this.init();
	}

	init() {
		const activeSlide = this.el.querySelector('.active');
		const homeSlide = this.el.querySelector('.slide');
		const homeSlideLength = this.el.querySelectorAll(".slide").length;
		gsap.set(this.slideNavPrev, { autoAlpha: 0.2 });

		// gsap.set(homeSlide.not(activeSlide), { autoAlpha: 0 });
		gsap.set(this.slideNavPrev, { autoAlpha: 0.2 });

		this.goToNextSlide();
		this.attachEventsNext();
		this.attachEventsPrev();
	}
	goToNextSlide(slideOut, slideIn, slideInAll) {
		let tl = gsap.timeline();
		if (slideOut && slideIn && slideInAll) {
			let slideOutContent = slideOut.querySelector(".card-content"),
				slideInContent = slideIn.querySelector(".card-content"),
				slideOutImg = slideOut.querySelector(".card-img"),
				slideInImg = slideIn.querySelector(".card-img"),
				index = [...slideIn.parentNode.children].indexOf(slideIn),
				size = this.el.querySelectorAll(".slide").length;
				console.log(index);
			if (slideIn.length !== 0) {

				tl
					.set(slideIn, { autoAlpha: 1, className: '+=active' })
					.set(slideOut, { className: '-=noActive' })
					.to(slideOutContent, 0.65, { y: "+=40px", ease: 'power4.out' }, 0)
					.to(slideOutImg, 0.65, { backgroundPosition: 'bottom', ease: 'power4.out' }, 0)
					.to(slideInAll, 1, { y: "-=100%", ease: 'power4.out' }, 0)
					.from(slideInContent, 0.65, { y: '-=40px' }, { y: 0, ease: 'power4.out' }, "-=0.7")
					.from(slideInImg, 0.65, { backgroundPosition: 'top' }, { backgroundPosition: 'bottom', ease: 'power4.out' }, '-=0.7')
			}

			gsap.set(this.slideNavPrev, { autoAlpha: 1 });

			if (index === size - 1) {
				gsap.to(this.slideNavNext, 0.3, { autoAlpha: 0.2, ease: 'power4.out' });
			}
		}
	}
	attachEventsNext() {
		const slideNavNext = document.getElementById("next"),
			that = this;
		slideNavNext.addEventListener("click", (event) => {
			event.preventDefault();
			let slideOut = this.el.querySelector('.slide.active'),
				slideIn = slideOut.nextElementSibling,
				slideInAll = this.el.querySelector('.slide');
			console.log("XXXXXXXXXXX", slideIn);
			that.goToNextSlide(slideOut, slideIn, slideInAll);
		});
	}
	///////////////////////////////////////////////////////////
	goToPrevSlide(slideOut, slideIn, slideInAll) {
		let tl = gsap.timeline();
		let slideOutContent = slideOut.querySelector(".card-content"),
			slideInContent = slideIn.querySelector(".card-content"),
			slideOutImg = slideOut.querySelector(".card-img"),
			slideInImg = slideIn.querySelector(".card-img"),
			index = [...slideIn.parentNode.children].indexOf(slideIn),
			size = this.el.querySelectorAll(".slide").length;
		console.log(index);

		if (slideIn.length !== 0) {
			tl
				.set(slideIn, { autoAlpha: 1, className: '+=active' })
				.set(slideOut, { className: '-=active' })
				.to(slideOutContent, 0.65, { y: "-=40px", ease: Power3.easeInOut }, 0)
				.to(slideOutImg, 0.65, { backgroundPosition: 'top', ease: Power3.easeInOut }, 0)
				.to(slideInAll, 1, { y: "+=100%", ease: Power3.easeInOut }, 0)
				.fromTo(slideInContent, 0.65, { y: '+=40px' }, { y: 0, ease: Power3.easeInOut }, "-=0.7")
				.fromTo(slideInImg, 0.65, { backgroundPosition: 'bottom' }, { backgroundPosition: 'top', ease: Power3.easeInOut }, '-=0.7')
		}
		gsap.set(this.slideNavPrev, { autoAlpha: 1 });

		if (index === 0) {
			gsap.to(this.slideNavNext, 0.3, { autoAlpha: 0.2, ease: 'power4.out' });
		}
	}
	attachEventsPrev() {
		const slideNavPrev = document.getElementById("prev"),
			that = this;
		slideNavPrev.addEventListener("click", (event) => {
			event.preventDefault();
			let slideOut = this.el.querySelector('.slide.active'),
				slideIn = this.el.querySelector('.slide.active').previousElementSibling,
				slideInAll = this.el.querySelector('.slide');
			that.goToPrevSlide(slideOut, slideIn, slideInAll);
		});
	}
}
