// // typical import
// import gsap from "gsap";

// //get other plugins:
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Flip from "gsap/Flip";
// import Draggable from "gsap/Draggable";

// // or all tools are exported from the "all" file (excluding members-only plugins):
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, Flip, EaselPlugin, ScrollToPlugin, PixiPlugin } from "gsap/all";
//import ScrollMagic from 'scrollmagic'

// Available plugins
// * available to Club GreenSock members. greensock.com/club

// Draggable, DrawSVGPlugin*, EaselPlugin, Flip,
// GSDevTools*, InertiaPlugin*, MorphSVGPlugin*,
// MotionPathPlugin, MotionPathHelper*, Physics2DPlugin*,
// PhysicsPropsPlugin*, PixiPlugin, ScrambleTextPlugin*,
// ScrollToPlugin, ScrollTrigger, SplitText*, TextPlugin

// don't forget to register plugins
// Register GSAP plugins (once) before using them
gsap.registerPlugin(ScrollTrigger, EaselPlugin, Draggable, Flip, MotionPathPlugin, PixiPlugin, ScrollToPlugin);

//var controller = new ScrollMagic.Controller();