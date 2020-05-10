console.log("Navigation");

import AbstractModule from "./AbstractModule";

// ==========================================================================
// Generic module
// ==========================================================================
export default class extends AbstractModule {
    constructor(options) {
        super(options);
        $("#threeLines").click(event => this.toggleNav());
    }
    // Toggle nav
    // ==========================================================================
    toggleNav() {
        console.log("Navigation");
        if (this.$body.find("#sidebar").hasClass("close")) {
            this.$body.find("#sidebar").removeClass("close");
        } else {
            this.$body.find("#sidebar").removeClass("close").addClass("open");
        }
    }
    // Destroy
    // ==========================================================================
    destroy() {
        this.$el.off();
    }
};