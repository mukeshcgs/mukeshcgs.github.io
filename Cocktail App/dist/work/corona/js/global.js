console.log("Main");
$(function () {
    $.get("../header.html", function (data) {
        $("header").html(data);
    });

    $.get("../aside.html", function (data) {
        $("aside").html(data);
    });

});
