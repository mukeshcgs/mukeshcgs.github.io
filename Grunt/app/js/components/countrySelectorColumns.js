(function () {

    //wrapps every 14 items onto a column
    $(".region-slide-down").each(function () {
        var a = $(this).children(".region-item");

        for (var i = 0; i < a.length; i += 14) {
            a.slice(i, i + 14).wrapAll('<div class="col-lg-4 country-items-columns"></div>');
        }

    });


    // country selector accordion on mobile
    $('#accordion').collapse();

   
    // adds active (expanded) class to current accordion item and deals with plus, minus icons ( - , + ) of the accordion
    $(".country-header-accordion a").each(function () {

        if ($(this).attr('aria-expanded') == 'true') {
            $(this).addClass("expanded");


            $(this).children("svg").addClass("icon-minus");
            $(this).children("svg").children("use").attr("xlink:href", "#icon-minus");
        }
        else {
            $(this).children("svg").addClass("icon-plus");
            $(this).children("svg").children("use").attr("xlink:href", "#icon-plus");
        }

        $(this).click(function () {
            $(".country-header-accordion a").not(this).removeClass("expanded");
            $(this).toggleClass("expanded");


            $(this).children("svg").toggleClass("icon-minus icon-plus");
            $(this).children("svg").children("use").attr('xlink:href', function(index, attr){
                return attr == "#icon-plus" ? "#icon-minus" : "#icon-plus";
            });

            $(".country-header-accordion a").not(this).children("svg").children("use").attr("xlink:href", "#icon-plus");
        });
        
    });
  

})();

