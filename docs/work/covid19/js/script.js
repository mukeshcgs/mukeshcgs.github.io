//AFTER LOAD
$(function () {
    var $body = $('body');

    var resData;
    let regionsArray;
    var regionTen;
    let weekData;
    // LOADING STATIC DATA
    var LatestSettings = {
        "url": "https://api.quarantine.country/api/v1/summary/latest",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json"
        },
    };
    $.ajax(LatestSettings).done(function (response) {
        resData = response.data;
        console.log("resData", resData);

        setLocStorageData(resData, "locData")

        totalCount(resData);

        const regionsObj = resData.regions
        //Convert objects of Obj into objects of Array
        regionsArray = Object.values(regionsObj)
        //Sort Array 
        regionTen = regionsArray.sort();

        regionTen = regionTen.filter((region, i) => i < 10)

        window.resData = resData;
        window.regionTen = regionTen;

        renderHighestCases(regionTen)
        //This start function will call the P5 defaults 
        start();
        //Start Sketch 2
        sketch_2.startSketch2(resData)
        renderOptions(resData.regions)

    });
    var WRsettings = {
        "url": "https://api.quarantine.country/api/v1/spots/week?region=usa",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json"
        },
    };

    $.ajax(WRsettings).done(function (response) {
        console.log(response);
        weekData = response;
        setLocStorageData(weekData, "WeeklocData")

        window.weekData = weekData

        const weekObj = weekData.data
        //Convert objects of Obj into objects of Array
        weeksArray = Object.values(weekObj)

        sketch_3.startSketch3(resData, weekData, weeksArray)
    });

    var monthsSettings = {
        "url": "https://api.quarantine.country/api/v1/spots/month?region=usa",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json"
        },
    };

    $.ajax(monthsSettings).done(function (response) {
        console.log(response);
        monthData = response;
        setLocStorageData(monthData, "MonthlocData")
        window.monthData = monthData

        const monthObj = monthData.data
        monthArray = Object.values(monthObj)
        monthArrayKeys = Object.keys(monthObj)

        mergeArr = monthArray.map(function (x, i) {
            return { ...x, "date": monthArrayKeys[i] }
        }.bind(this));
        monthArray = mergeArr
        //Sedn to Sketch 4
        sketch_4.startSketch4(resData, monthData, monthArray)
    });


    function setLocStorageData(data, name) {
        var getLocData = localStorage.getItem(name);
        if (getLocData) {
            //console.log("Loc Data Present");
            getLocData = JSON.parse(getLocData)
            // if (getLocData.summary.total_cases === data.summary.total_cases) {
            //     //console.log("Ideal", getLocData.summary.total_cases + "==" + resData.summary.total_cases);
            // } else {
            //     //console.log("NOT Ideal", getLocData.summary.total_cases + "==" + resData.summary.total_cases);
            //     localStorage.removeItem(name);
            //     localStorage.setItem(name, JSON.stringify(data));
            // }
        } else {
            localStorage.setItem(name, JSON.stringify(data));
        }
    }
    $('#country').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        updateCountry(valueSelected)
    });



    function renderOptions(response) {
        const regionsObj = resData.regions
        //Convert objects of Obj into objects of Array
        regionsArray = Object.values(regionsObj)
        console.log("===+++++++++++++++++++++++++=", regionsArray);


        $.each(response, function (index, value) {
            var resHTML = '<option data-id="' + value.name + '" value="' + value.name + '">' + value.name + '</option>';
            $('#country').append(resHTML);
        });
    }

    $('#country').on('change', function (e) {
        var state = "";
        var result;
        $("select option:selected").each(function () {
            state += $(this).text() + " ";
            var selectedId = $(this).attr("data-id")
            result = regionsArray.find(({ id }) => id === selectedId);
        });
        updateCountry(result);
    });
    function updateCountry(country) {
        var monthsSettings = {
            "url": "https://api.quarantine.country/api/v1/spots/month?region=" + country + "",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Accept": "application/json"
            },
        };
        $.ajax(monthsSettings).done(function (response) {
            monthData = response;
            setLocStorageData(monthData, "MonthlocData")
            window.monthData = monthData
            const monthObj = monthData.data
            monthArray = Object.values(monthObj)
            monthArrayKeys = Object.keys(monthObj)
            mergeArr = monthArray.map(function (x, i) {
                return { ...x, "date": monthArrayKeys[i] }
            }.bind(this));
            monthArray = mergeArr
            sketch_4.startSketch4(resData, monthData, monthArray)
        });
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
        // console.log(resData);
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

