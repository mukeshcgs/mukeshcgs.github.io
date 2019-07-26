// export default function Navigation() {
//     var init, toggleNav;
//     console.log("ele");

//     init = function () {
//       $('.burger-icon').on('click', function () {
//         toggleNav($('nav'));
//         console.log(ele);
//       });
//     }

//     toggleNav = function (ele) {

//       const parent = $(ele).closest('.accordion');
//       closeOtherAccordions(parent);

//       if (parent.is('.is-active')) {
//         parent.removeClass('is-active');
//       } else {
//         parent.addClass('is-active');
//       }
//     }
//   };

import $ from '../../../node_modules/jquery/dist/jquery'

import AbstractModule from './AbstractModule';

export default class extends AbstractModule {
    constructor(options) {
        super(options);
        this.$el.on('click', '.burger-icon', (event) => this.toggleNav($('nav')));
    }

    // Toggle Navigation
    // ==========================================================================
    toggleNav() {
        if (this.$el.is('.is-active')) {
            this.$el.removeClass('is-active');
        } else {
            this.$el.addClass('is-active');
        }
    }

    // Destroy
    // ==========================================================================
    destroy() {
        this.$el.off();
    }

}