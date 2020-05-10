//Libs
import 'gsap'
import { Tone } from 'tone';
import { TimelineMax, Power4 } from 'gsap';
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';

import 'animation.gsap';
import 'debug.addIndicators';

(function ($) {
    var winW = $(window).width();
    var $title = $(".title");
    var $titleWrapper = $('.title-wrapper')
    var titleWidth = $title.width();
    var fSize = 0;

    for (let i = 0; i < winW; i++) {
        var TL = $(document).find(".title");
        var TW = TL.width();
        var TH = TL.height();
        fSize = fSize + 1;
        if (TW >= winW - 10) {
            return false
        }
        $('.title').css("margin-top", -(TH / 2));
        $('.title').css("font-size", fSize + "px");
    }

})(jQuery);
const trigger = [...document.getElementsByClassName("title-wrapper")];
const triggerHeight = $(".title").height();
const triggerWrapperHeight = $(".title-wrapper").height();
$('.title-wrapper').css("margin-top", -(triggerWrapperHeight / 2));

trigger.forEach.call(trigger, el => {
    el.addEventListener("mouseover", e => {
        TweenMax.to(trigger, 0.25, { height: triggerHeight, marginTop: -(triggerHeight / 2), ease: Power1.easeOut, yPercent: 1 });
    });
});

trigger.forEach.call(trigger, el => {
    el.addEventListener("mouseout", e => {
        TweenMax.to(trigger, 0.25, { height: 10, marginTop: -10, ease: Power1.easeOut, yPercent: 1 });
    });
});



//Get parameter
// Eg.http://localhost:8080/say-hi?tab=22
// tab=22
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
getUrlParameter("tab");
// will return 22

//Get parameter
// Eg.http://localhost:8080/projets/massakali?tab=22
var urlArr = (window.location.pathname).split("/");
// console.log(urlArr.length); //2
// console.log(urlArr[urlArr.length - 2]); // -2 = "projets"
// console.log(urlArr[urlArr.length - 1]); //-1 = "massakali"
for (let i = urlArr.length; i > 0; i--) {
    console.log(urlArr[urlArr.length - i]);
}
// scroll to
// scrollTo(el, targetEl, scrollDuration) {
//     const scrollTarget = targetEl.offsetTop;
//     $(el).animate({ scrollTop: scrollTarget }, scrollDuration, 'swing');
// }


// console.log("%cMade with ❤︎️ by Mukesh — Designer by profession, an artist by passion. — mukeshthankar.com", "background:#000;color:#fff;padding:0.5em 1em;line-height:2;");
