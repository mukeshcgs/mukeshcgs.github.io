
//AFTER LOAD
$(function () {
    var $body = $('body');
    var $sidebar = $body.find("#sidebar");
    var $menuBtn = $body.find("#menu-btn");
    var $mainNav = $body.find(".main-nav");

    $("#threeLines").click(function () {

        if ($mainNav.hasClass("active")) {
            $mainNav.removeClass("active");
            $(this).removeClass("active");
        } else {
            $mainNav.addClass("active");
            $(this).addClass("active");
        }
    });

    //SMOOTH SCROLL
    $('.main-nav ul li a').click(function (event) {
        event.preventDefault();
        var link = this;
        $.smoothScroll({
            scrollTarget: link.hash
        });
    });

    $('#change-speed').bind('click', function () {
        var $p1 = $('ul.mainnav a').first();
        var p1Opts = $p1.smoothScroll('options') || {};

        p1Opts.speed = p1Opts.speed === 1400 ? 400 : 1400;
        $p1.smoothScroll('options', p1Opts);
    });

    $(".main-nav ul li").click(function () {
        event.preventDefault();
        if ($mainNav.hasClass("active")) {
            $mainNav.removeClass("active");
            $("#threeLines").removeClass("active");
        } else {
            $mainNav.addClass("active");
            $("#threeLines").addClass("active");
        }
    });

});
