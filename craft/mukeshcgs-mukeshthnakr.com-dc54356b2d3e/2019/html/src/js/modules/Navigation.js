import AbstractModule from "./AbstractModule";
import { TimelineMax, Power4 } from 'gsap';
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';

import 'animation.gsap';
import 'debug.addIndicators'
// ==========================================================================
// Generic module
// ==========================================================================
export default class extends AbstractModule {
    constructor(options) {
        super(options);

        $(document).on("click", "#threeLines", event => this.toggleNav());

    }
    // Toggle nav
    // ==========================================================================
    toggleNav() {
        var $sidebarUl = $("#sidebar ul")
        var Wd = $sidebarUl.outerWidth();
        var Hi = $sidebarUl.outerHeight();
        console.log(Wd);
        // $sidebarUl.css("margin-left", -(Wd / 2));
        $sidebarUl.css("margin-top", -(Hi / 2));
        // $sidebarUl.css({ "margin-left", ""+ W/2 +"px" })

        if (this.$body.find("#sidebar").hasClass("open")) {
            this.$body.find("#sidebar").removeClass("open").addClass("close");
        } else {
            this.$body.find("#sidebar").removeClass("close").addClass("open");
        }

        //ANIMATION
        var controller = new ScrollMagic.Controller();
        var navLinks = new TimelineMax({ paused: false })
        navLinks.staggerFrom('#sidebar ul li', 1.5, { autoAlpha: 1, y: "50%", ease: Power4.easeOut }, 0.5)
    }


    // Destroy
    // ==========================================================================
    destroy() {
        this.$el.off();
    }
};


