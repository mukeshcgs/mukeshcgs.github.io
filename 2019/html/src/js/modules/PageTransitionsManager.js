/* jshint esnext: true */
import Barba from 'barba.js';
import {
	$document,
	$window,
	$html,
	$body
} from '../utils/environment';
import {
	transitions
} from '../global/PageTransitions';

export default class {
	constructor(options) {
		this.load();
	}

	load() {
		var self = this;
		//Init Barba JS
		Barba.Pjax.Dom.containerClass = 'js-barba-container';
		Barba.Pjax.Dom.wrapperId = 'js-barba-wrapper';

		Barba.Pjax.start();
		Barba.Prefetch.init();
		var mainTransition = Barba.BaseTransition.extend(transitions.mainTransition);
		var navTransition = Barba.BaseTransition.extend(transitions.navTransition);
		var sectionTransition = Barba.BaseTransition.extend(transitions.sectionTransition);
		Barba.Pjax.getTransition = function () {
			if (self.route === 'nav') {
				return navTransition;
			} else if (self.route == 'same-section') {
				return sectionTransition;
			} else {
				return mainTransition;
			}
		};
		Barba.Dispatcher.on('linkClicked', function (currentStatus, prevStatus, container) {
			console.log("linkClicked");
		});

		/**
		 * Execute any third party features.
		 */
		Barba.Dispatcher.on('newPageReady', function (currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {
			if (window.ga && !$html.data('debug')) {
				ga('send', {
					hitType: 'pageview',
					page: location.pathname,
					location: currentStatus.url,
					title: document.title
				});
			}

			var js = HTMLElementContainer.querySelector("script");
			if (js != null) {
				eval(js.innerHTML);
			}
		});
	}

	destroy() {
		this.$el.off();
	}
}