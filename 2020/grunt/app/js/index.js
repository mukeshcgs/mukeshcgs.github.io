/**
 * Main entry point used by web pack in gulp
 *  - Require any other components using require in here
 *
 * Example of local standalone scripts:
 *  require('./jquery/components/test.js');
 * Examples of node module:
 *  require('bootstrap');
 * OR full path to specific js file
 *  require('../../node_modules/bootstrap/dist/js/bootstrap.min.js');
 */
alert()
import "babel-polyfill";
require('./components/utils');


// require standard modules
require('./components/countrySelectorColumns');
//require('./components/heroCarousel');
require('./components/industryCookie');
require('./components/mobileMenu');

require('./components/mainjs');

/**
 * Auto initialise modules that support it
 **/
const moduleElements = document.querySelectorAll('[data-module]')

for (var i = 0; i < moduleElements.length; i++) {
  const el = moduleElements[i]
  const name = el.getAttribute('data-module')
  const Module = require(`./components/${name}`).default
  new Module(el)
}
