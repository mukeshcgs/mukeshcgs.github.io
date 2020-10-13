// utils

import "whatwg-fetch";
import Promise from 'promise-polyfill';
import "element-qsa-scope";


// add promise polyfill to global scope in case it is needed
if (!window.Promise) {
  window.Promise = Promise;
}


// polyfill pointer-events: none for browsers which don't support it
// (including IE11 on win 7, apparently!)
var element = document.createElement('x');
element.style.cssText = 'pointer-events:auto';
if (element.style.pointerEvents !== 'auto') {
    console.log("pointer-event support broken. Adding polyfill.");

    document.addEventListener("click", e => {
        const clicked = e.target;
        const ignoreClicks = window.getComputedStyle(clicked, null).getPropertyValue("pointer-events") == "none";

        if (ignoreClicks) {
            //pass the event up the chain
            const parent = clicked.parentElement;
            const event = new MouseEvent("click", {
                "view": window,
                "bubbles": true,
                "cancelable": true
            });
            parent.dispatchEvent(event);
            return false;
        }

        return true;
    })
}


// element.closest polyfill
if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
    Element.prototype.closest = function(s) {
        var el = this;
        var ancestor = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (ancestor.matches(s)) return ancestor;
            ancestor = ancestor.parentElement;
        } while (ancestor !== null);
        return null;
    };


// next element sibling polyfill
// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/nextElementSibling/nextElementSibling.md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('nextElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'nextElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        var el = this;
        while (el = el.nextSibling) {
          if (el.nodeType === 1) {
              return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);


// MouseEvent polyfill for good old IE
(function (window) {
  try {
    new MouseEvent('test');
    return false; // No need to polyfill
  } catch (e) {
    // Need to polyfill - fall through
  }

  // Polyfills DOM4 MouseEvent

  var MouseEvent = function (eventType, params) {
    params = params || { bubbles: false, cancelable: false };
    var mouseEvent = document.createEvent('MouseEvent');
    mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    return mouseEvent;
  }

  MouseEvent.prototype = Event.prototype;

  window.MouseEvent = MouseEvent;
})(window);


