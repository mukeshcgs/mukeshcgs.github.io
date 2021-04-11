$('.panel-title > a').click(function () {
    // $(this).find('i').toggleClass('fa-plus fa-minus')
    //        .closest('panel').siblings('panel')
    //        .find('i')
    //        .removeClass('fa-minus').addClass('fa-plus');
    $(this).parent().parent().parent().toggleClass('close22 open22');
    $(this).find('span').toggleClass('glyphicon-plus glyphicon-minus')
        .closest('panel').siblings('panel')
        .find('span')
        .removeClass('glyphicon-minus').addClass('glyphicon-plus');
});

$(document).ready(function () {
    $('.mob button').hover(
        function () {
            $('.mob').removeClass("active")
            $('.pop-btn').removeClass("active")
            $('.popups').css("visibility", "hidden");
            // $('.popups').css("height", "0px");
            $(this).parent().addClass("active")
            $(this).parent().find('.popups').css("visibility", "visible");
            // $(this).parent().find('.popups').css("height", "0px");
        },
        function () {
            $(this).parent().removeClass("active")
            $(this).parent().find('.popups').css("visibility", "hidden");
            // $(this).parent().find('.popups').css("height", "0px");
        }
    );
    // PLANE
    $('.js-select-plan').click(function () {
        $(this).parents().find('.box').removeClass("active")
        $(this).parent().parent().addClass("active")
        // $(this).hide();
    })

});