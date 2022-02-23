// console.log("Environment");

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

const $document = $(document);
const $window = $(window);
const $html = $(document.documentElement);
const $body = $(document.body);

const minWidth = 1024;

export {
    $document,
    $window,
    $html,
    $body
};
