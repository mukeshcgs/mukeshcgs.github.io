export default class FixedOnScrollPast {
  constructor(el) {
    this.el = el;
    this.init();
  }

  init() {
    const el = this.el;

    //get height of child and set el height to match it to avoid jumping content
    el.style.height = el.children[0].clientHeight + "px";
    this.ifElementIsOffScreenToggleFixedClass(el);

    window.addEventListener('scroll', function () {
      this.ifElementIsOffScreenToggleFixedClass(el);
    }.bind(this));

    window.addEventListener('resize', function () {
      //get height of child and set el height to match it to avoid jumping content
      el.style.height = el.children[0].clientHeight + "px";
      this.ifElementIsOffScreenToggleFixedClass(el);
    }.bind(this));
  }

  ifElementIsOffScreenToggleFixedClass(el) {
    const className = "is-fixed";
    let isElOffTopOfScreen = el.getBoundingClientRect().top < 0;

    isElOffTopOfScreen ? el.classList.add(className) : el.classList.remove(className);    
  }
}

