/**
 * WARNING: DEPRACATED
 * This file is no longer used and has been left here purely as reference, should anything
 * go awry with the new megaNav.js, which replaces it.
 * DO NOT INCLUDE THIS FILE IN MAIN.JS
 **/

(function () {

    //slides the secondary navigation into view
    $(".dropdown-jcb").each(function () {
        $(this).on("click", function () {

            $(this).find(".dropdown-menu-jcb").addClass("active");
            $(".dropdown-jcb").not(this).find(".dropdown-menu-jcb").removeClass("active");
        });

    });


    //slides the third level navigation into view
    $(".mega-nav").each(function () {
        $(this).on("mouseenter", function () {

            $(this).find(".meganav-menu-jcb").addClass("active");
            $(".mega-nav").not(this).find(".meganav-menu-jcb").removeClass("active");

            // sets the meganav fixed height for transition purposes
            var meganavHeight = $(this).find(".meganav-menu-jcb .container-fluid").height();
            $(".meganav-menu-jcb").css("height", meganavHeight);

            $(".overlay-on-meganav").addClass("active");

        });

        $(this).on("mouseleave", function () {
            $(".overlay-on-meganav").removeClass("active");
            $(".meganav-menu-jcb").removeClass("active");
        });
    });

})();


// custom dropdown other industries
$(".meganav-dropdown-hover .dropdown-item-jcb").each(function () {
    $(this).click(function () {

        var changeIndustrySelector = $(this).children("a").text();
        $(".meganav-dropdown-hover-li > a > span").text(changeIndustrySelector);

    });
});

//slides the secondary dropdownnavigation into view
$(".dropdown-jcb-hover .dropdown-item-jcb").each(function () {
    $(this).click(function () {
        var dropdownMatch = $(this).attr("data-class");
        $("header ." + dropdownMatch).toggleClass("show-jcb-menu").siblings().removeClass("show-jcb-menu");
    });

});

$(".dropdown-item-jcb").each(function () {
    if (!$(this).attr("data-class")) {
        $(this).addClass("direct-secondary-link");
    }
});

$(".direct-secondary-link").each(function () {
    $(this).on("mouseenter", function () {
        $(".mega-nav-box").removeClass("show-mega-nav-box");
    });
});


// meganav tab links and columns logic
$(".nav-link-meganav[data-toggle='tab']").each(function () {

    $(this).on("mouseenter", function () {
        var selectedTab = $(this).attr("href");
        var selectedTabContent = $(selectedTab);

            $(this).addClass("active").parent(".nav-item").siblings().children(".nav-link-meganav").removeClass("active");
            selectedTabContent.addClass("active").siblings().removeClass("active");

            // sets the meganav fixed height for transition purposes
            var meganavHeight = $(this).closest(".meganav-menu-jcb .container-fluid").height();
            $(".meganav-menu-jcb").css("height", meganavHeight);
    });
});


$(".nav-link-meganav:not([data-toggle])").each(function () {

    $(this).on("mouseenter", function () {
        if ($(this).attr("data-toggle")) {
            alert("da");
        }
        $(this).addClass("active").parent(".nav-item").siblings().children(".nav-link-meganav").removeClass("active");
        $(".js-append-carousel .tab-pane").removeClass("active");
    });
});


var appendableRangeImage =  $(".mega-nav-box");
$(".js-append-carousel").append(appendableRangeImage);

$(".mega-nav-box").css("display", "block");

//smooth meganav transition animate height
$(document).on("mouseleave", ".mega-nav", function () {
    $(".meganav-menu-jcb").css("height", "0px");
});

