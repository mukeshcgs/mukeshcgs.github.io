(function () {

    // mobile menu icon trigger 
    $('.menu-icon-wrap').on('click', function () {
        $(this).toggleClass('active');
        $('#mobile_menu_accordion').toggleClass('active');
    });


    // push the accordion into view
    $(".js-push-accordion").on("click", function (event) {
        //event.stopPropagation();
        $(this).children(".pushed-accordion").addClass("active");
        $(".js-push-accordion").not(this).children(".pushed-accordion").removeClass("active");
        $(".js-main-menu-push").addClass("active");
        $(".simple-accordion").not(this).removeClass("active")

    });

    $(".back-to-menu").on("click", function (event) {
        event.stopPropagation();
        $(this).parent(".pushed-accordion").removeClass("active");
        $(".js-main-menu-push").removeClass("active");
        $(this).closest(".simple-accordion").removeClass("active");
    });


    //variation for the accordion/push menu combination
    $(".simple-accordion .js-push-accordion").on("click", function (event) {
        event.stopPropagation();
        $(".js-main-menu-push").removeClass("active");
        $(this).closest(".simple-accordion").addClass("active");

    });



    //stop accordion close-open when clicking inside the body of the accordion
    $(".simple-accordion .panel-body").on("click", function (event) {
        event.stopPropagation();
    });



    // adds active (expanded) class to current accordion item and deals with plus, minus icons ( - , + ) of the accordion
    $(".simple-accordion").each(function () {

        if ($(this).children("a.single-accordion-title").attr('aria-expanded') == 'true') {
            $(this).addClass("expanded");


            $(this).children("svg").addClass("icon-minus");
            $(this).children("svg").children("use").attr("xlink:href", "#icon-minus");
        }
        else {
            $(this).children("svg").addClass("icon-plus");
            $(this).children("svg").children("use").attr("xlink:href", "#icon-plus");
        }

        $(this).click(function () {
            
            $(".simple-accordion").not(this).removeClass("expanded");
            $(this).toggleClass("expanded");

            $(this).children("svg").toggleClass("icon-minus icon-plus");
            $(this).children("svg").children("use").attr('xlink:href', function (index, attr) {
                return attr == "#icon-plus" ? "#icon-minus" : "#icon-plus";
            });

            $(".simple-accordion").not(this).children("svg").children("use").attr("xlink:href", "#icon-plus");
            $(".simple-accordion").not(this).removeClass("active").find(".pushed-accordion").removeClass("active");
        });

    });


    // acoordion level 2

    function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find("use")
            .attr("href", function(index, attr){
                return attr == "#icon-plus" ? "#icon-minus" : "#icon-plus";
            });
    }
    $('.accordion-level-1.panel-group').on('hide.bs.collapse', toggleIcon);
    $('.accordion-level-1.panel-group').on('show.bs.collapse', toggleIcon);

    

})();

