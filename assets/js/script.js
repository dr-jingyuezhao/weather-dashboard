// Create a weather dashboard with form inputs.
// API call: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
var apiKey = "4338bc6e6ee374a0322f73ff5e6b9efd";

// * takes API data (JSON/object) and turns it into elements on the page
// * @param {object} NYTData - object containing NYT API data
// */


// CLICK HANDLER
// .on("click") function associated with the Search Button
$("#search-button").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    // Empty the region associated with the articles
    $("#today").empty();
    $("#forecast").empty();
    // Build the query URL for the ajax request to the NYT API
    var cityName = $("#search-input").val().trim();
    console.log(cityName);
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    console.log(queryURL);

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage);
});

function updatePage(weatherData) {
    console.log(weatherData);
    // When a user searches for a city they are presented with current

    // and future conditions for that city


    // and that city is added to the search history.

}







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