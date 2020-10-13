export default class Footer {
  constructor(el) {
    this.el = el;

    this.init();
  }

  init() {
    console.log("Footer module init");
    this.handleCountrySelectorClicks();
  }

  handleCountrySelectorClicks() {
    const el = this.el.querySelector(".market-selector"),
          linkTarget = document.querySelector("header .js-country-link"),
          event = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": true
          });

    if (el != null) {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Dispatch click to country selector");
            linkTarget.dispatchEvent(event);
        });
    }
  }
}
