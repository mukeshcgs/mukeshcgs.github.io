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
    });

    //SMOOTH SCROLL 
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
    });

    //////////////////////////////////////////////////
    //KEYS
    const rapidapiHost = "the-cocktail-db.p.rapidapi.com";
    const rapidapiKey = "82ddc2a600msh1494e8e6f9ac181p126ff1jsn281879195311";
    var settings = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": rapidapiHost,
            "x-rapidapi-key": rapidapiKey
        }
    }
    //URLS API paramater
    const alcohol = "a",
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
        }

        $.ajax(settings).done(function (response) {
            renderData(response.drinks);
            renderDataOnPage(response.drinks);
            if (isSelectCategorie()) {
                getSelectCategorie();
            }
            console.log(isSelectCategorie())
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
        }
    }
    //getData(alcohol);
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
            return true
        } else {
            $('#categoriesSelect').hide();
        }
    }

    function onSelectCategorie() {
        $('select').on('change', function () {
            var data = this.value;
            $('#selected').empty();

            getSelectCategorie(data);

        })
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
        }

        $.ajax(settings).done(function (response) {
            console.log("filter", response);
            $.each(response.drinks, function (index, value) {
                var randomThumbSize = Math.floor(Math.random() * 3) + 1;

                var resHTML = `<div data-id="${value.idDrink}" class="drink ${randomThumbSize}" style="background-image: url('${value.strDrinkThumb}')">
                        <div  class="d-name">${value.strDrink}</div>
                        </div>`;
                $('#selected').append(resHTML);
            });

        });

    }

    //Lookup full cocktail details by ID
    //https://the-cocktail-db.p.rapidapi.com/lookup.php?i=11007

    $(document).on('click', "[data-id]", function (e) {
        e.preventDefault();
        var $el = $(this);
        var dId = $el.data('id');

        settings.url = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + dId + "",
            $.ajax(settings).done(function (response) {
                var drink = response.drinks[0]

                const entries = Object.entries(drink)
                $('.d-detail').empty();
                for (const [fruit, count] of entries) {
                    $('.d-detail').append(`<p><b>${fruit} :</b>${count}</p>`);
                }
                $('.dImg').css('background-image', 'url(' + drink.strDrinkThumb + ')');

                if (!drink.strDrinkThumb == null) {
                    //$('.d-details').css("backgroundImage", drink.strDrinkThumb);
                    $('.d-details').css('background-image', 'url(' + drink.strDrinkThumb + ')');

                } else {

                }

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
    }
    ///////////////////////////////////////////// LIST page
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    }
    var category = decodeURIComponent($.urlParam('category'))
    if (category) {
        getSelectCategorie(category);
        $('.db-cat-name').text(category)
    }
})