// Current weather data API call: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 5 day weather forecast API call: https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// Declare all variables
var apiKey = "4338bc6e6ee374a0322f73ff5e6b9efd";
var cityInput = "";
var allCities = [];
var cityList = $("#history");
var todayDate = moment().format("DD/M/YYYY");
console.log(todayDate);

// Generate a button for each searched city in search history stored in the localStorage
showSearchHistory();

function showSearchHistory() {
    allCities = JSON.parse(localStorage.getItem("allCities")) || [];
    for (var i = 0; i < 6; i++) {
        var searchedCity = $(`<button type="button" class="btn btn-secondary btn-block city-btn">${allCities[i]}</button><br>`);
        cityList.prepend(searchedCity);
    }
}

// Add the function to add button for a new city with input from the search box
function addNewCity() {
    console.log("Already searched cities: " + allCities);
    var newCity = $(`<button type="button" class="btn btn-secondary btn-block city-btn">${cityInput}</button><br>`);
    if (!allCities.includes(cityInput)) {
        allCities.push(cityInput); // pushes new cities entered to array 
        console.log(allCities);
        localStorage.setItem("allCities", JSON.stringify(allCities)); //saves city input to local storage 
        cityList.prepend(newCity);
    } else {
        console.log("It's not a new city!");
    }
}

// // Show weather for a searched city on button click 
// $("#history").on("click", ".city-btn", function (event) {
//     event.preventDefault();
//     var cityInput = ($(this).text());
//     showWeather(cityInput);
// });


function currentWeather() {
    // Empty the sections associated with the weather data
    // $("#today").empty();
    // Build the query URL for the ajax request to the OpenWeather API
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey;
    console.log(queryURL);
    // Make the AJAX request to the OpenWeather API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the function displaying weather data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.name);
        // Convert the temperature to Celsius
        var tempC = response.main.temp - 273.15;
        var iconURL = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        $("#today").html(`<div id="current-weather" class="card border-dark col-lg-12 mb-3">
        <div class="card-body">
          <h3 class="card-title">${response.name} (${todayDate})
            <img src="${iconURL}" alt="weather icon"></img>
          </h3>
          <p class="card-text">Temperature: ${tempC.toFixed(2)} &#8451;</p>
          <p class="card-text">Wind-speed: ${response.wind.speed} KPH</p>
          <p class="card-text">Humidity: ${response.main.humidity} %</p>
        </div>
      </div>`);
    });

}

function weatherForecast() {
    // Empty the sections associated with the weather data
    // $("#forecast").empty();
    // Build the query URL for the ajax request to the OpenWeather API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey;
    console.log(queryURL);
    // Make the AJAX request to the OpenWeather API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the function displaying weather data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // $("#forecast").html(
        //     `<div class="container-fluid">
        // <h4 class="sectionHeading">5-Day Forecast:</h4>
        // <div id="forecast-5d" class="row row-cols-sm-1 row-cols-md-3 row-cols-xl-5 weather-forecast">`);

        //         for (var i = 7; i < response.list.length - 1; i += 8) {
        //             // console.log(response.list[i])
        //             // console.log(response.list[i].weather[0].icon)
        //             var tempC = response.list[i].main.temp - 273.15;
        //             var iconURL = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
        //             $("#forecast-5d").append(`<div class="cardContainer col mb-3">
        //     <div class="card text-white bg-dark">
        //       <div class="card-body">
        //         <h6 class="card-title">DD/M/YYYY</h6>
        //         <div><img src="${iconURL}" alt="weather icon"></div>
        //         <p class="card-text">Temp: ${tempC.toFixed(2)} &#8451;</p>
        //         <p class="card-text">Wind: ${response.list[i].wind.speed} KPH</p>
        //         <p class="card-text">Humidity: ${response.list[i].main.humidity} %</p>
        //       </div>
        //     </div>
        //   </div>`);
        //         }
    });

}


// CLICK HANDLER
// .on("click") function associated with the Search Button
$("#search-button").on("click", function (event) {
    event.preventDefault();
    cityInput = $("#search-input").val().trim();
    console.log("New search for: " + cityInput);
    addNewCity();
    currentWeather();
    weatherForecast();
});

// When a user searches for a city they are presented with current

// and future conditions for that city


// and that city is added to the search history.









// When a user views the current weather conditions for that city they are presented with:
// The city name



// The date

// An icon representation of weather conditions

// The temperature

// The humidity

// The wind speed

// When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:

// The date

// An icon representation of weather conditions

// The temperature

// The humidity

// When a user clicks on a city in the search history they are again presented with current and future conditions for that city.