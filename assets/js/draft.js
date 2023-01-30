// add a bootstrap card in section #today
var todaySection = $("#today");
$(todaySection).html(function () {
    var todayCard = $("<div>");
    todayCard.addClass("card");
    var cityTitle = $(`<div class="card">
    <div class="hour col-1">${timeblocks[i]}</div>
    <textarea class="col-10 description"></textarea>
    <button class="btn saveBtn col-1"><i class="fas fa-save"></i></button>
    </div>`);
    $(todayCard).prepend(cityTitle);

    $(todaySection).append(todayCard);
});

var titleTd = $("<td>").text(response.Title);
<div class="card">
    <h5 class="card-title">${cityName}</h5>
    <i src="..." class="card-img-top" class="fas fa-save"></i>
    <p class="card-text">Temp: </p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
</div>

// Create a weather dashboard with form inputs.
// Declare all variables
// API call: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
var apiKey = "4338bc6e6ee374a0322f73ff5e6b9efd";
var cityInput = "";
var allCities = [];

function updatePage() {
    showSearchHistory();
    showWeather();
}

function showSearchHistory() {
    console.log(allCities);
    var cityList = $("#history");
    $(cityList).html(function () {
        var newCity = cityInput;
        if (newCity = ) {
            var newCity = $(`<button type="button" class="btn btn-secondary btn-lg btn-block city-btn">${allCities[i]}</button>`);
            cityList.append(newCity);
        }
    });


}

function showWeather() {
    // Empty the region associated with the articles
    $("#today").empty();
    $("#forecast").empty();

    // Build the query URL for the ajax request to the NYT API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey;
    console.log(queryURL);
    // Make the AJAX request to the OpenWeather API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
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
    console.log(cityInput);
    allCities = JSON.parse(localStorage.getItem("allCities"));
    if (!allCities.includes(cityInput)) {
        allCities.push(cityInput); // pushes new cities entered to array 
        console.log(allCities);
        localStorage.setItem("allCities", JSON.stringify(allCities)); //saves city input to local storage 
    } else {

    }

    updatePage();
});


// show weather for a searched city on click 
$("#history").on("click", ".city-btn", function (event) {
    event.preventDefault();
    var cityInput = ($(this).text());
    showWeather(cityInput);
});


<div id="icon"><img id="wicon" src="" alt="Weather icon"></div>
var iconCode = response.weather[0].icon;
var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
$('#wicon').attr('src', iconURL);

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