import $ from '../../../node_modules/jquery/dist/jquery'

const $document = $(document);
const $window = $(window);
const $html = $(document.documentElement);
const $body = $(document.body);
 window.$ = $

const minWidth = 1024;

export { $document, $window, $html, $body };