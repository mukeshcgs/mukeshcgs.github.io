module.exports = {

  // fade out
  fadeOut(el){
    return new Promise((resolve, reject) => {
      //console.log(el);
      el.style.opacity = 1;
      (function fade() {
        if ((el.style.opacity -= .1) < 0) {
          el.style.display = "none";
          resolve(true);
        } else {
          requestAnimationFrame(fade);
        }
      })();
    })

  },

  // fade in
  fadeIn(el, display){
    return new Promise((resolve, reject) => {
      el.style.opacity = 0;
      el.style.display = display || "block";

      (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
          el.style.opacity = val;
          requestAnimationFrame(fade);
        } else {
          resolve(true);
        }
      })();
    });
  },

  // slide up
  slideUp(el) {
    return new Promise((resolve, reject) => {
      (function slide() {
        let height = el.offsetHeight;
        if(!((height -= 15) < 0)) {
          el.style.height = height + "px";
          requestAnimationFrame(slide);
        } else {
          el.style.height = "0";
          el.style.display = "none";
          resolve(true);
        }
      })();
    })
  },

  // scroll to
  scrollTo(el, targetEl, scrollDuration) {
    const scrollTarget = targetEl.offsetTop;
    $(el).animate({scrollTop: scrollTarget}, scrollDuration, 'swing');
  }

}
