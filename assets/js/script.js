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
    for (var i = 0; i < allCities.length; i++) {
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
    $("#today").empty();
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
        $("#cityName").text(response.name);
        // Convert the temp to Celsius
        var tempC = response.main.temp - 273.15;
        console.log(tempC.toFixed(2));
        $("#temp-current").text("Temp: " + tempC.toFixed(2) + " &#176F");
        $("#wind-current").text(response.wind.speed);
        $("#humidity-current").text(response.main.humidity);
    });

}

function weatherForecast() {
    // Empty the sections associated with the weather data
    $("#forecast").empty();
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