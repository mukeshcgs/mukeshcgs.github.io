
import gsap from 'gsap';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
const workScript = (container) => {
    console.log("WORKSCRIPT");
    var $activeSlide = $(document).find('.active'),
        $homeSlide = $(document).find(".slide"),
        $slideNavPrev = $(document).find("#prev"),
        $slideNavNext = $(document).find("#next");

    function init() {
        gsap.set($homeSlide.not($activeSlide), { autoAlpha: 0 });
        gsap.set($slideNavPrev, { autoAlpha: 0.5 });
    }

    init();

    function goToNextSlide(slideOut, slideIn, slideInAll) {
        var t1 = gsap.timeline({ defaults: { duration: 0.65, ease: 'power4.easeIn' } }),
            slideOutContent = slideOut.find('.card-content'),
            slideInContent = slideIn.find('.card-content'),
            slideOutImg = slideOut.find('.card-img'),
            slideInImg = slideIn.find('.card-img'),
            cardHeaderIn = slideIn.find('.card-header'),
            cardHeaderOut = slideOut.find('.card-header'),
            index = slideIn.index(),
            size = $homeSlide.length;
        console.log(index);

        if (slideIn.length !== 0) {
            t1
                .set(slideIn, { autoAlpha: 1, className: 'active slide' })
                .set(slideOut, { className: 'slide' })
                .to(slideOutContent, 0.65, { y: "+=40px", ease: 'power4.easeInOut' }, 0)
                .to(slideOutImg, 0.65, { backgroundPosition: 'bottom', ease: 'power4.easeInOut' }, 0)
                .to(cardHeaderOut, 0.65, { opacity: 1, ease: 'power4.easeInOut' }, 0)
                .to(slideInAll, 1, { y: "-=100%", ease: 'power4.easeInOut' }, 0)
                .fromTo(slideInContent, 0.65, { y: '-=40px' }, { y: 0, ease: 'power4.easeInOut' }, "-=0.7")
                .fromTo(slideInImg, 0.65, { backgroundPosition: 'top' }, { backgroundPosition: 'bottom', ease: 'power4.easeInOut' }, '-=0.7')
                .fromTo(cardHeaderIn, 0.65, { opacity: 0, ease: 'power1.easeInOut' }, 0)
        }

        gsap.set($slideNavPrev, { autoAlpha: 1 });

        if (index === size - 1) {
            gsap.to($slideNavNext, 0.3, { autoAlpha: 0.5, ease: 'power4.easeInOut' });
        }
    };

    $slideNavNext.on("click", function (e) {
        e.preventDefault();

        var slideOut = $('.slide.active'),
            slideIn = $('.slide.active').next('.slide'),
            slideInAll = $('.slide');

        goToNextSlide(slideOut, slideIn, slideInAll);

    });

    function goToPrevSlide(slideOut, slideIn, slideInAll) {
        var t1 = gsap.timeline({ defaults: { duration: 0.65, ease: 'power4.easeIn' } }),
            slideOutContent = slideOut.find('.card-content'),
            slideInContent = slideIn.find('.card-content'),
            slideOutImg = slideOut.find('.card-img'),
            slideInImg = slideIn.find('.card-img'),
            index = slideIn.index(),
            size = $homeSlide.length;

        if (slideIn.length !== 0) {
            t1
                .set(slideIn, { autoAlpha: 1, className: 'active slide' })
                .set(slideOut, { className: 'slide' })
                .to(slideOutContent, 0.65, { y: "-=40px", ease: 'power4.easeInOut' }, 0)
                .to(slideOutImg, 0.65, { backgroundPosition: 'top', ease: 'power4.easeInOut' }, 0)
                .to(slideInAll, 1, { y: "+=100%", ease: 'power4.easeInOut' }, 0)
                .fromTo(slideInContent, 0.65, { y: '+=40px' }, { y: 0, ease: 'power4.easeInOut' }, "-=0.7")
                .fromTo(slideInImg, 0.65, { backgroundPosition: 'bottom' }, { backgroundPosition: 'top', ease: 'power4.easeInOut' }, '-=0.7')
        }

        gsap.set($slideNavPrev, { autoAlpha: 1 });

        if (index === 0) {
            gsap.to($slideNavPrev, 0.3, { autoAlpha: 0.5, ease: 'power4.easeInOut' });
        }
    };

    $slideNavPrev.on("click", function (e) {
        e.preventDefault();

        var slideOut = $('.slide.active'),
            slideIn = $('.slide.active').prev('.slide'),
            slideInAll = $('.slide');

        goToPrevSlide(slideOut, slideIn, slideInAll);

    });
}

export default workScript;