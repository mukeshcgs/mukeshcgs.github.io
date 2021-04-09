'use strict';
/*$(function() {
    var curPos = 0;
    var slideHeight = $('.fl-slide').height();
    var slides = $('.fl-slide');
    var numOfSlides = slides.length;
    slides.wrapAll('<div id="slidesHolder"></div>')
    slides.css({
        //        'float': 'left'
    });
    //$('#slidesHolder').prepend('<span class="nav" id="leftNav">Move Left</span>')
    // .append('<span class="nav" id="rightNav">Move Right</span>');
    $('.nav').bind('click', function() {
        if (($(this).attr('id') == 'rightNav')) {

            if (curPos == curPos) {
                curPos = curPos + 1
                if (curPos > numOfSlides - 1) {
                    //alert("slide finish");
                    curPos = numOfSlides - 1
                }
            }
        }
        if (($(this).attr('id') == 'leftNav')) {
            if (curPos == curPos) {
                curPos = curPos - 1
                if (curPos < 0) {
                    //alert("slide finish");
                    curPos = 0
                }
            }
        }
        moveSlide();
    });

    function moveSlide() {
        $('#slideshow ').animate({
            'marginTop': slideHeight * (-curPos)
        });
    };
});
*/
// JavaScript Document
$.fn.preloader = function(options) {

    var defaults = {
        delay: 200,
        preload_parent: "a",
        check_timer: 300,
        ondone: function() {},
        oneachload: function(image) {},
        fadein: 500
    };

    // variables declaration and precaching images and parent container
    var options = $.extend(defaults, options),
        root = $(this),
        images = root.find("img").css({
            "visibility": "hidden",
            opacity: 0
        }),
        timer, counter = 0,
        i = 0,
        checkFlag = [],
        delaySum = options.delay,

        init = function() {

            timer = setInterval(function() {

                if (counter >= checkFlag.length) {
                    clearInterval(timer);
                    options.ondone();
                    return;
                }

                for (i = 0; i < images.length; i++) {
                    if (images[i].complete == true) {
                        if (checkFlag[i] == false) {
                            checkFlag[i] = true;
                            options.oneachload(images[i]);
                            counter++;

                            delaySum = delaySum + options.delay;
                        }

                        $(images[i]).css("visibility", "visible").delay(delaySum).animate({
                                opacity: 1
                            }, options.fadein,
                            function() {
                                $(this).parent().removeClass("preloader");
                            });
                    }
                }

            }, options.check_timer)


        };

    images.each(function() {

        if ($(this).parent(options.preload_parent).length == 0)
            $(this).wrap("<a class='preloader' />");
        else
            $(this).parent().addClass("preloader");

        checkFlag[i++] = false;


    });
    images = $.makeArray(images);


    var icon = jQuery("<img />", {

        id: 'loadingicon',
        src: '../images/img-loader.gif'

    }).hide().appendTo("body");



    timer = setInterval(function() {

        if (icon[0].complete == true) {
            clearInterval(timer);
            init();
            icon.remove();
            return;
        }

    }, 100);

}
