export default class videoGalleryCarousel {
  constructor(el) {
    this.el = el;

    this.carouselWrap = el.querySelector('.media-carousel-component--items'),
    this.sliderItems = el.querySelectorAll('.media-carousel-component--items .media-carousel-component--item'),
    this.customNavWrap = el.querySelector('.js--media-carousel-component--header--nav');

    this.init();
  }

  init() {
    console.log('init videoGalleryCarousel');
    this.initOwlCarousel();
    this.initMediaElement();
  }

  initMediaElement() {
    [...this.sliderItems].forEach((link, index) => {
        const video = link.querySelector('video');

        const player = new MediaElementPlayer(video, {
          success: function(mediaElement, originalNode, instance) {
          }
        });
    });
  }

  initOwlCarousel() {
    if (this.sliderItems.length > 0) {
      $(this.carouselWrap).owlCarousel({
          items: 1,
          loop: false,
          autoplay: false,
          mouseDrag: true,
          navContainer: $(this.customNavWrap),
          nav: true,
          navText: '',
          dots: false,
          autoHeight: true,
          autoHeightClass: 'owl-height',
          video: false,
          videoWidth: false,
          videoHeight: false,
          lazyLoad: false,
          margin: 30,
          stagePadding: 0,
          responsive: {
              0: {
                  margin: 0,
              },
              475: {
                  items: 2,
                  margin: 20,
              },
              768: {
                  items: 3,
                  margin: 30,
              },
              992: {
                  items: 3,
                  margin: 50,
              }
          },
      });
    }


  }



}
