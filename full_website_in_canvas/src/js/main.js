import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, Flip } from "gsap/all";
 // don't forget to register plugins
gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin);
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
  width:window.innerWidth,
  height:window.innerHeight,
  backgroundColor:0xAAAAAA,
});

// event.preventDefault prevents document scroll from scrolling when scrolling on the canvas
document.body.addEventListener("wheel", function(event) {
  event.preventDefault()
});

document.body.appendChild(app.view);


// Add a display element
const graphic = new PIXI.Graphics()
  .beginFill(0xFF0000)
  .drawRect(0, 0, 200, 200);

graphic.interactive = true; // <-- required
graphic.on('scroll', (ev) => {
  graphic.y -= ev.wheelDelta;
});

const text = new PIXI.Text("Mousewheel over box,\nthe main document scroll \nwon't scroll while scrolling\non the canvas", {
  fontSize: 20,
  fontWeight: 'bold',
  fill: 0xffffff
});
text.x = 220;

app.stage.addChild(graphic, text);

// cache a global mouse position to keep from
// creating a point every mousewheel event
const mousePosition = new PIXI.Point();

// Listen for global events on the <canvas> element
// and convert those into scroll event
app.view.addEventListener('wheel', (ev) => {
  mousePosition.set(ev.clientX, ev.clientY); // get global position

  // returns element directly under mouse
  const found = app.renderer.plugins.interaction.hitTest(
    mousePosition,
    app.stage
  );

  // Dispatch scroll event
  if (found) {
    found.emit('scroll', ev);
  }
});
