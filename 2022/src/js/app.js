import '../scss/app.scss';
import html from "../about.html";
/* Your JS Code goes here */

/* Demo JS */
import './demo.js';
import './pixi_sketch.js';
/**
 * Animation API
 */
const item = document.querySelector(".my-name");
item.animate([
    { transform: 'translateX(0px)' },
    { transform: 'translateX(10px)' },
], {
    duration: 1000,
    easing: 'ease-in-out',
    direction: 'alternate',
    iterations: Infinity
})