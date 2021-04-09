
//AFTER LOAD
$(function () {
  var $body = $('body');
  //KEYS
  const rapidapiHost = "coronavirus-tracker-india-covid-19.p.rapidapi.com";
  const rapidapiKey = "7d2d8cdad7msh4d195f980df65dfp1e065bjsn15b1cff29222";
  const URL = "https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewise";

  var resData;
  var country = "India"
  function getData(data) {
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": URL,
          "method": "GET",
          "headers": {
              "x-rapidapi-host": rapidapiHost,
              "x-rapidapi-key": rapidapiKey
          }
      }
      $.ajax(settings).done(function (response) {
          renderData(response);
          resData = response;
          console.log(response);
      });
  }

  function renderData(response) {
      $.each(response, function (index, value) {
          var resHTML = '<option data-id="' + value.id + '" value="' + value.name + '">' + value.name + '</option>';
          $('#categoriesSelect').append(resHTML);
      });
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
  getData(country);


  resData.sort(function(a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
  });
});//END