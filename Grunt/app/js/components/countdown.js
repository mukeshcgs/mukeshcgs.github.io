const anims = require("./animations.js");

export default class countdown {
    constructor(el) {
    this.el = el;
    this.init();
  }

  init() {
    console.log("countdown component init.");
    this.initTimer();
  }

  initTimer() {
    const timeEl = this.el.querySelector(".countdown-info--timer-value"),
          endTime = Date.parse(timeEl.innerText.trim()),
          now = Date.now(),
          delta = Math.abs(endTime - now) / 1000;

    console.log("timeEl2");
    console.log("'" + timeEl.innerText.trim() + "'");
    console.log(endTime);

    let clockHolder = document.createElement("div");
    clockHolder.classList.add("countdown-info--timer-clock");
    timeEl.innerHTML = "";
    timeEl.appendChild(clockHolder);
    let clock = new FlipClock($(clockHolder), delta, {
      clockFace: 'DailyCounter',
      autoStart: true,
      countdown: true
    });
  }

}
