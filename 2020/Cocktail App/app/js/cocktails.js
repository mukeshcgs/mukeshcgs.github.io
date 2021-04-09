"use strict";

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }

    return arr2;
}

function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }

    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

$(function () {
    var $body = $('body');
    var $mainNav = $body.find(".mob-nav");
    $("#menu-lines").click(function () {
        if ($mainNav.hasClass("active")) {
            $mainNav.removeClass("active");
            $(this).removeClass("active");
        } else {
            $mainNav.addClass("active");
            $(this).addClass("active");
        }
    }); //SMOOTH SCROLL 
    // $('.mob-nav ul li a').click(function (event) {
    //     event.preventDefault();
    //     var link = this; 
    //     $.smoothScroll({
    //         scrollTarget: link.hash
    //     });
    // });

    $(".main-nav ul li").click(function () {
        event.preventDefault();

        if ($mainNav.hasClass("active")) {
            $mainNav.removeClass("active");
            $("#menu-lines").removeClass("active");
        } else {
            $mainNav.addClass("active");
            $("#menu-lines").addClass("active");
        }
    }); ////////////////////////////////////////////////// RANDOM COCKTAIL FOR HOME PAGE

    var randomCocktailSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://the-cocktail-db.p.rapidapi.com/random.php",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "82ddc2a600msh1494e8e6f9ac181p126ff1jsn281879195311",
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
        }
    };
    $.ajax(randomCocktailSettings).done(function (response) {
        console.log("RANDOM", response);
        var html = "<div class=\"bg\" style=\"background-image: url('".concat(response.drinks[0].strDrinkThumb, "');\n        \"></div>");
        $('.js-randomDrink').append(html);
    }); //////////////////////////////////////////////////
    //KEYS 

    var rapidapiHost = "the-cocktail-db.p.rapidapi.com";
    var rapidapiKey = "82ddc2a600msh1494e8e6f9ac181p126ff1jsn281879195311";
    var settings = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": rapidapiHost,
            "x-rapidapi-key": rapidapiKey
        }
    }; //URLS API paramater

    var alcohol = "a",
        ingredients = "i",
        glassess = "g",
        categories = "c";

    function getData(data) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://the-cocktail-db.p.rapidapi.com/list.php?" + data + "=list",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": rapidapiHost,
                "x-rapidapi-key": rapidapiKey
            }
        };
        $.ajax(settings).done(function (response) {
            renderData(response.drinks);
            renderDataOnPage(response.drinks);

            if (isSelectCategorie()) {
                getSelectCategorie();
            }

            console.log(isSelectCategorie());
        });
    }

    function renderDataOnPage(response) {
        $.each(response, function (index, value) {
            //console.log(index, value);
            var resHTML = '<li><a href="./drink-list.html?category=' + value.strCategory + '" data-cat="' + value.strCategory + '">' + value.strCategory + '</a></li>';
            $('.js-categorie-list').append(resHTML);
        });
    }

    function renderData(response) {
        $.each(response, function (index, value) {
            //console.log(index, value);
            var resHTML = '<option data-cat="' + value.strCategory + '" value="' + value.strCategory + '">' + value.strCategory + '</option>';
            $('#categoriesSelect').append(resHTML);
        });
    }

    function getIngredients(data) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://the-cocktail-db.p.rapidapi.com/list.php?" + data + "=list",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": rapidapiHost,
                "x-rapidapi-key": rapidapiKey
            }
        };
    } //getData(alcohol);
    //getData(ingredients);
    //getData(glassess);


    getData(categories);
    onSelectCategorie();
    getIngredients(ingredients);

    function isSelectCategorie() {
        console.log("CALL");

        if ($('#categoriesSelect option').length > 1) {
            //$("#categoriesSelect").prop("selectedIndex", 1);
            //getSelectCategorie($("#categoriesSelect").children("option:selected").val())
            return true;
        } else {
            $('#categoriesSelect').hide();
        }
    }

    function onSelectCategorie() {
        $('select').on('change', function () {
            var data = this.value;
            $('#selected').empty();
            getSelectCategorie(data);
        });
    }

    function getSelectCategorie(data) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?c=" + data + "",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": rapidapiHost,
                "x-rapidapi-key": rapidapiKey
            }
        };
        $.ajax(settings).done(function (response) {
            console.log("filter", response);
            $.each(response.drinks, function (index, value) {
                var randomThumbSize = Math.floor(Math.random() * 3) + 1;
                var resHTML = "<div data-id=\"".concat(value.idDrink, "\" class=\"drink ").concat(randomThumbSize, "\" style=\"background-image: url('").concat(value.strDrinkThumb, "')\">\n                        <div  class=\"d-name\">").concat(value.strDrink, "</div>\n                        </div>");
                $('#selected').append(resHTML);
            });
        });
    } //Lookup full cocktail details by ID
    //https://the-cocktail-db.p.rapidapi.com/lookup.php?i=11007


    $(document).on('click', "[data-id]", function (e) {
        e.preventDefault();
        var $el = $(this);
        var dId = $el.data('id');
        settings.url = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + dId + "", $.ajax(settings).done(function (response) {
            var drink = response.drinks[0];
            var entries = Object.entries(drink);
            $('.d-detail').empty();

            for (var _i = 0, _entries = entries; _i < _entries.length; _i++) {
                var _entries$_i = _slicedToArray(_entries[_i], 2),
                    fruit = _entries$_i[0],
                    count = _entries$_i[1];

                $('.d-detail').append("<p><b>".concat(fruit, " :</b>").concat(count, "</p>"));
            }

            $('.dImg').css('background-image', 'url(' + drink.strDrinkThumb + ')');

            if (!drink.strDrinkThumb == null) {
                //$('.d-details').css("backgroundImage", drink.strDrinkThumb);
                $('.d-details').css('background-image', 'url(' + drink.strDrinkThumb + ')');
            } else {}

            $('.d-details').append(resHTML);
        });

        if (dId) {
            openDetails();
        } else {
            closeDetails();
        }
    });

    function openDetails() {
        $('#drink-details').show();
    }

    function closeDetails() {
        $('#drink-details').hide();
    } ///////////////////////////////////////////// LIST page


    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    };

    var category = decodeURIComponent($.urlParam('category'));

    if (category) {
        getSelectCategorie(category);
        $('.db-cat-name').text(category);
    }

    $(function () {
        $("#test").swipe({
            swipe: function swipe(event, direction) {
                $(this).text("You swiped " + direction);
                alert(direction);
            },
            swipeStatus: function swipeStatus(event, phase) {
                if (phase == "cancel") {
                    $(this).text("You didnt swipe far enough ");
                }
            },
            threshold: 200
        });
    });
});
//# sourceMappingURL=cocktails.js.map