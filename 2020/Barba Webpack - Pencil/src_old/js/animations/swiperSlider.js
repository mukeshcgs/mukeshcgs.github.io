
import gsap from 'gsap';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
const swiperSlider = (container) => {

    var $activeSlide = $(container).find('.active');
    var ss = $(container).find('.js-slider-home-slide');
    let currentSlide = 1;
    let isAnimating = false;
    let animationDuration = 1200;
    let autoplaySpeed = 10000;
    let interval;
    let maxSlide = $(container).find($('.js-slider-home-slide')).length;
    let $controls = $(container).find('.js-slider-home-button');

    function init() { 
        // $(container).on('click', '.js-slider-home-next', (event) => nextSlide());
        // $(container).on('click', '.js-slider-home-prev', (event) => prevSlide());
        startAutoplay();
    }

    init();
    // Next slide
    // ==========================================================================
    function nextSlide() {
        preventClick();

        if (currentSlide === maxSlide) {
            currentSlide = 0;
        }

        currentSlide++;
        $(container).find('.js-slider-home-slide.is-prev').removeClass('is-prev').addClass('is-next');
        $(container).find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-prev');
        $(container).find('.js-slider-home-slide[data-slide="' + currentSlide + '"]').removeClass('is-next').addClass('is-current');
    }

    // Prev slide
    // ==========================================================================
    function prevSlide() {
        preventClick();

        if (currentSlide === 1) {
            currentSlide = maxSlide + 1;
        }

        currentSlide--;
        $(container).find('.js-slider-home-slide.is-next').removeClass('is-next').addClass('is-prev');
        $(container).find('.js-slider-home-slide.is-current').removeClass('is-current').addClass('is-next');
        $(container).find('.js-slider-home-slide[data-slide="' + currentSlide + '"]').removeClass('is-prev').addClass('is-current');
    }

    // Prevent click
    // ==========================================================================
    function preventClick() {
        isAnimating = true;
        $controls.prop('disabled', true);
        clearInterval(interval);

        setTimeout(() => {
            isAnimating = false;
            $controls.prop('disabled', false);
            startAutoplay();
        }, animationDuration);
    }

    // Start autoplay
    // ==========================================================================
    function startAutoplay() {
        interval = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 10000);
    }

    ///////////////////////////////////////////////////////////////////////////////////////

    // function goToNextSlide(slideOut, slideIn, slideInAll) { };

    // $slideNavNext.on("click", function (e) {
    //     e.preventDefault();
    //     goToNextSlide(slideOut, slideIn, slideInAll);
    // });

    // function goToPrevSlide(slideOut, slideIn, slideInAll) { };

    // $slideNavPrev.on("click", function (e) {
    //     e.preventDefault();
    //     goToPrevSlide(slideOut, slideIn, slideInAll);
    // });
}

export default swiperSlider;