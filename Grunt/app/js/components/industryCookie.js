(function () {

    //sets industry cookie basked on industry selected (in the navigation)
    $("[data-industry]").each(function () {
        $(this).on("click", function () {
            var industrySelected = $(this).attr("data-industry");

            $.cookie.raw = true;
            $.cookie("jcb-user-industry", industrySelected, { path: '/' });
        });
    });

})();

