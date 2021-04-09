const anims = require("./animations.js");

export default class CookieBanner {
  constructor(el) {
    this.el = el;
    this.init();
  }

  init() {
    console.log("init cookie banner.");
    this.checkCookieState()
      .then(() => this.displayCookieBanner())
      .then(() => this.attachEvents())
      .catch(err => {
        console.log("Cookies already accepted. Terminating.");
      })
  }

  checkCookieState() {
    return new Promise((resolve, reject) => {
      if (document.cookie.replace(/(?:(?:^|.*;\s*)jcb-cookie-policy\s*\=\s*([^;]*).*$)|^.*$/, "$1").indexOf("true") < 0) {
        console.log("Cookies not accepted. Proceeding to next step.");
        resolve(true);
      }
    });
  }

  displayCookieBanner() {
    return new Promise((resolve, reject) => {
      this.el.style.display = "block";
      resolve(true);
    });
  }

  attachEvents() {
    const button = this.el.querySelector(".jcb-btn-primary-sm"),
          that = this;

    button.addEventListener("click", (event) => {
      console.log("Cookies accepted by user. Proceeding.");
      that.setCookie();
      that.hideCookieBanner();
    });
  }

  setCookie() {
      document.cookie = `jcb-cookie-policy=true; domain=${document.domain}; expires=Sun, 16 Jul 3567 06:23:41 GMT`;
  }

  hideCookieBanner() {
    anims.slideUp(this.el);
  }

}
