import 'babel-polyfill';
import '../css/main.scss';
// import '../css/styles.css';

/* jshint esnext: true */
import {
	$document,
	$window,
	$html,
	$body
} from './utils/environment';
import {
	getNodeData
} from './utils/html';

// Global functions and tools
import globals from './utils/globals';

// Basic modules
import * as modules from './modules';

class App {
	constructor() {
		this.modules = modules;
		this.currentModules = [];
		$document.on('initModules.App', (event) => {
			this.initGlobals(event.firstBlood)
				.deleteModules()
				.initModules();
		});
	}

	/**
	 * Destroy all existing modules
	 * @return  {Object}  this  Allows chaining
	 */

	deleteModules() {
		// oop modules
		var i = this.currentModules.length;

		// Destroy all modules
		while (i--) {
			this.currentModules[i].destroy();
			this.currentModules.splice(i);
		}

		return this;
	}

	/**
	 * Execute global functions and settings
	 * Allows you to initialize global modules only once if you need
	 * (ex.: when using Barba.js or SmoothState.js)
	 * @return  {Object}  this  Allows chaining
	 */
	initGlobals(firstBlood) {
		globals(firstBlood);
		return this;
	}

	/**
	 * Find modules and initialize them
	 * @return  {Object}  this  Allows chaining
	 */
	initModules(scope) {
		if (!scope) {
			scope = document;
		}
		// Elements with module
		var moduleEls = scope.querySelectorAll('[data-module]');

		// Loop through elements
		var i = 0;
		var elsLen = moduleEls.length;

		for (; i < elsLen; i++) {

			// Current element
			let el = moduleEls[i];

			// All data- attributes considered as options
			let options = getNodeData(el);

			// Add current DOM element and jQuery element
			options.el = el;
			options.$el = $(el);

			// Module does exist at this point
			let attr = options.module;

			// Splitting modules found in the data-attribute
			let moduleIdents = attr.replace(/\s/g, '').split(',');

			// Loop modules
			let j = 0;
			let modulesLen = moduleIdents.length;

			for (; j < modulesLen; j++) {
				let moduleAttr = moduleIdents[j];

				if (typeof this.modules[moduleAttr] === 'function') {
					let module = new this.modules[moduleAttr](options);
					this.currentModules.push(module);
				}
			}
		}

		return this;
	}
}

// IIFE for loading the application
// ==========================================================================
(function () {
	let loaded = false;
	let maxLoad = 3000;

	// On load
	// ==========================================================================
	$window.on('load', function () {
		if (!loaded) {
			loaded = true;
			load();
		}
	});

	// Maximum load
	// ==========================================================================
	setTimeout(function () {
		if (!loaded) {
			loaded = true;
			load();
		}
	}, maxLoad);

	// Load
	// ==========================================================================
	function load() {
		window.App = new App();
		$document.trigger({
			type: 'initModules.App',
			firstBlood: true
		});

		if (window.navigator.userAgent.match(/Edge/) || window.navigator.userAgent.match(/Trident/)) {
			$body.addClass('is-ie');
		}
	}

	if (window.matchMedia("(max-width: 1199px)").matches) {
		addLoadClass();
	} else if (window.matchMedia("(min-width: 1200px)").matches) {
		$document.on('SmoothScroll.isReady', (event) => {
			addLoadClass();
		});
	}

	function addLoadClass() {
		$body.addClass('is-loaded');

		setTimeout(function () {
			$body.addClass('is-animated');
		}, 600);
	}
})();