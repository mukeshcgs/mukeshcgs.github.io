
// document.body.requestFullscreen();

//AFTER LOAD
$(function () {
    var $body = $('body');

    var resData;
    let regionsArray;
    var regionTen;
    // LOADING STATIC DATA

    $.getJSON("./js/latest.json", function (json) {
        resData = json.data;
        totalCount(resData);

        const regionsObj = resData.regions
        //Convert objects of Obj into objects of Array
        regionsArray = Object.values(regionsObj)
        //Sort Array 
        regionTen = regionsArray.sort(compare);

        regionTen = regionTen.filter((region, i) => i < 10)

        window.resData = resData
        window.regionTen = regionTen

        renderHighestCases(regionTen)
        //This start function will call the P5 defaults 
        start();
        setLocStorageData(resData)
    });

    function setLocStorageData(resData) {
        var getLocData = localStorage.getItem('locData');
        if (getLocData) {
            //console.log("Loc Data Present");
            getLocData = JSON.parse(getLocData)
            if (getLocData.summary.total_cases === resData.summary.total_cases) {
                //console.log("Ideal", getLocData.summary.total_cases + "==" + resData.summary.total_cases);
            } else {
                //console.log("NOT Ideal", getLocData.summary.total_cases + "==" + resData.summary.total_cases);
                localStorage.removeItem('locData');
                localStorage.setItem("locData", JSON.stringify(resData));
            }
        } else {
            localStorage.setItem("locData", JSON.stringify(resData));
        }
    }


    let s2W = $('#s2 .bar-container').width();
    function renderHighestCases(regionTen) {
        $.each(regionTen, function (index, value) {
            var resHTML = '<div class="cir">' +
                '<div class="outer">' +
                '</div>' +
                '<div class="inner">' + value.name + '</div>' +
                '</div>';
            $('#s1 .cir-container').append(resHTML);

            //FULL CIRCLE
            let total = resData.summary.total_cases;
            let next = value.total_cases;
            let countPer = Math.round(next * 100 / total);
            let screenPer = Math.round((s2W * countPer) / 500);
            let perBar = '<div class="bars">' +
                '<div class="bar" style="width:' + screenPer + '%"></div>' +
                '<div class="c-name">' + value.name + ' : <span class="c-cases">' + value.total_cases + '</span></div>' +
                '</div>';
            $('#s2 .bar-container').append(perBar);

        });
    }
    // let URL = "https://api.quarantine.country/api/v1/summary/latest"
    // function getData(data) {
    //     var settings = {
    //         "url": URL,
    //         "method": "GET",
    //         "timeout": 0,
    //         "headers": {
    //             "Accept": "application/json"
    //         },
    //     };

    //     $.ajax(settings).done(function (response) {
    //         console.log("LATEST", response.data);
    //         resData = response.data
    //     });
    // }

    // function renderData(response) {
    //     $.each(response, function (index, value) {
    //         var resHTML = '<option data-id="' + value.id + '" value="' + value.name + '">' + value.name + '</option>';
    //         $('#categoriesSelect').append(resHTML);
    //     });
    // }
    function totalCount(resData) {
        console.log(resData);
        let HTML = `
        <div class="cases"><span class="count">${resData.summary.total_cases}</span><span>Total Cases</span></div>
        <div class="recovered"><span class="count">${resData.summary.active_cases}</span><span>Active Cases</span></div>
        <div class="deaths"><span class="count">${resData.summary.recovered}</span><span>Recovered</span></div>
        <div class="deaths"><span class="count">${resData.summary.deaths}</span><span>Deaths</span></div>`;
        $("#result").html(HTML);

    }
    $("#categoriesSelect").change(function () {
        var state = "";
        var result;
        $("select option:selected").each(function () {
            state += $(this).text() + " ";
            //$(this).attr("data-id") // will return the string "123"
            //$(this).data("id") // will return the number 123
            var selectedId = $(this).attr("data-id")
            result = resData.find(({ id }) => id === selectedId);
        });

        updateResult(result);

    });
    // renderData(resData)

    function updateResult(state) {
        console.log(state);
        $(".state").text(state.name);
        $(".cases .count").text(state.cases);
        $(".recovered .count").text(state.recovered);
        $(".deaths .count").text(state.deaths);

        // <h1 class="state"></h1>
        // <div class="cases"></div>
        // <div class="Recovered"></div>
        // <div class="Deaths"></div>
        //console.clear();
        var test = document.querySelector("#result");

        // TweenLite.to(test, 1, {
        //     x: 100,
        //     onComplete: complete
        // });

        function complete() {
            //TweenLite.set(test, {x:0});
            //test.style.transform = "matrix(1, 0, 0, 1, 0, 0)";

            //TweenLite.to(test, 1, {
            //     y: 100
            // });
        }

    }

    // getData(country);


    //Compare
    function compare(a, b) {
        const bandA = a;
        const bandB = b;

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }



});//END


// LERP
// let target = 0
// let current = 0

// const ease = 0.075
// const element = document.querySelector('.js-lerp-me')

// window.addEventListener('mousemove', (e) => {
//   target = e.clientX // Stores the mouse (X) positon
// })

// function animate() {
//   current += ((target/2 - current/2) * ease) * 0.01 // This is where the magic happens

//   element.style.transform = `scale(${current})`

//   requestAnimationFrame(animate)
// }

// animate() // Runs 60 times per second