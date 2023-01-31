// Current weather data API call: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 5 day weather forecast API call: https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// Declare all variables
var apiKey = "4338bc6e6ee374a0322f73ff5e6b9efd";
var cityInput = "";
var allCities = [];
var cityList = $("#history");
var todayDate = moment().format("DD/MM/YYYY");
console.log(todayDate);

// Generate a button for each searched city in search history stored in the localStorage
showSearchHistory();

function showSearchHistory() {
    allCities = JSON.parse(localStorage.getItem("allCities")) || [];
    if (allCities === null) {
        return;
    } else if (0 < allCities.length < 6) {
        for (var i = 0; i < allCities.length; i++) {
            var searchedCity = $(`<button type="button" class="btn btn-secondary city-btn">${allCities[i]}</button><br>`);
            cityList.prepend(searchedCity);
        }
    } else {
        for (var i = 0; i < 6; i++) {
            var searchedCity = $(`<button type="button" class="btn btn-secondary city-btn">${allCities[i]}</button><br>`);
            cityList.prepend(searchedCity);
        }
    }
}

// When a user searches for a city, that city is added to the search history.
// Add the function to add button for a new city with input from the search box
function addNewCity(cityName) {
    console.log("Already searched cities: " + allCities);
    var newCity = $(`<button type="button" class="btn btn-secondary btn-block city-btn">${cityName}</button><br>`);
    if (!allCities.includes(cityName)) {
        allCities.push(cityName); // pushes new cities entered to array 
        console.log(allCities);
        localStorage.setItem("allCities", JSON.stringify(allCities)); //saves city input to local storage 
        cityList.prepend(newCity);
    } else {
        console.log("It's not a new city!");
    }
}

// When a user searches for a city they are presented with current weather conditions for that city
function currentWeather(cityName) {
    // Empty the sections associated with the weather data
    $("#today").empty();
    // Build the query URL for the ajax request to the OpenWeather API
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
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
        // When a user views the current weather conditions for that city they are presented with:
        // The city name // The date
        // An icon representation of weather conditions
        // The temperature
        // The wind speed
        // The humidity
        $("#today").html(`<div id="current-weather" class="card border-primary col-lg-12 mb-3">
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

// When a user searches for a city they are presented with future weather conditions for that city
function weatherForecast(cityName) {
    // Empty the sections associated with the weather data
    $("#forecast").empty();
    // Build the query URL for the ajax request to the OpenWeather API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    console.log(queryURL);
    // Make the AJAX request to the OpenWeather API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the function displaying weather data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // Add section heading 5-Day Forecast
        $("#forecast").html(
            `<div class="container-fluid">
        <h4 class="sectionHeading">5-Day Forecast:</h4>
        <div id="forecast-5d" class="row row-cols-sm-1 row-cols-md-3 row-cols-xl-5 weather-forecast">`);
        // Use for loop to add a new card for each day of the 5-day forecast
        for (var i = 7; i < response.list.length; i += 8) {
            var date = response.list[i].dt_txt.substr(0, 10);
            var reformatDate = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
            var tempC = response.list[i].main.temp - 273.15;
            var iconURL = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
            // When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
            // The date
            // An icon representation of weather conditions
            // The temperature
            // The wind speed
            // The humidity
            $("#forecast-5d").append(`<div class="cardContainer col mb-3">
            <div class="card text-white bg-primary">
              <div class="card-body">
                <h6 class="card-title text-center">${reformatDate}</h6>
                <div class="text-center"><img src="${iconURL}" alt="weather icon"></div>
                <p class="card-text">Temp: ${tempC.toFixed(2)} &#8451;</p>
                <p class="card-text">Wind: ${response.list[i].wind.speed} KPH</p>
                <p class="card-text">Humidity: ${response.list[i].main.humidity} %</p>
              </div>
            </div>
          </div>`);
        }
    });

}

// CLICK HANDLERS
// .on("click") function associated with the Search Button
$("#search-button").on("click", function (event) {
    event.preventDefault();
    cityInput = $("#search-input").val().trim();
    console.log("New search for: " + cityInput);
    addNewCity(cityInput);
    currentWeather(cityInput);
    weatherForecast(cityInput);
});

// When a user clicks on a city in the search history they are again presented with current and future conditions for that city.
// Show weather for a searched city on button click
$("#history").on("click", function (event) {
    event.preventDefault();
    var searchedCity = ($(event.target).text());
    currentWeather(searchedCity);
    weatherForecast(searchedCity);
});











