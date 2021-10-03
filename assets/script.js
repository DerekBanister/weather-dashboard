//CHECK GIVEN a weather dashboard with form inputs    
//CHECK WHEN I search for a city 
//CHECK THEN I am presented with current and future conditions for that city and that city is added to the search history
//CHECK WHEN I view current weather conditions for that city
//CHECK THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//CHECK WHEN I view the UV index
//CHECK THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//CHECK WHEN I view future weather conditions for that city
//CHECK THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//CHECK WHEN I click on a city in the search history
//CHECK THEN I am again presented with current and future conditions for that city

//declaring today date using moment.
moment().format("L");

//Steps:
//On click event that handles the users city search. I need to make that input
//relate to the api call and display in the currentweather div based on the city
//that is searched. Also saving the searched items to local storage.
$("#cityButton").on("click", function(event){
    event.preventDefault();
    //grabbing user input
    var cityInput = $("#city-input").val();
    //saving user input to local storage
    //Local storage working but overwriting key
    //every time a city is searched
    var textContent = $(this).siblings("#city-input").val();
    var storeArray = [];
    storeArray.push(textContent);
    localStorage.setItem("userInput", JSON.stringify(storeArray));

    //calling both functions on click of search button
    citySearch(cityInput);
    citysaveBtn();
})


//API CALL WORKING ON CLICK BASED ON USER INPUT

//First setup a function that gets the weather api. Then that function will
//get the day's weather and eventually append those results to the 
//page in my currentweather div. 
function citySearch(cityname){
    //using weather api + cityname + my key to call this api.
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=2160410541d867a67171353419f6b95d";
    //5-day forecast call
    var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=2160410541d867a67171353419f6b95d";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(queryURL);
        //emptying div current weather
    $("#currentWeather").empty();
    //use for displaying date when i append api call
    let today = moment();
    var mainDate = today.format ("L");
    console.log(mainDate);

    //create html elements to display parts of api call I want to display
    var cityName = $("<h2>").text(response.name);
    console.log(response.name);
    var displayDate = $("<p>").text("Date: " + mainDate);
    console.log(displayDate);
    var temp = $("<p>").text("Temperature: " + response.main.temp + " \xB0");
    console.log(response.main.temp);
    var humidity = $("<p>").text("Humidity: " + response.main.humidity + " %");
    console.log(response.main.humidity);
    var wind =  $("<p>").text("Wind Speed: " + response.wind.speed + " mph");
    console.log(response.wind.speed);
    var weatherIcon = response.weather[0].main;
    console.log(response.weather[0].main);
       //if else? statements that display weather icons from openweathermap
       //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
       
       if (weatherIcon === "Clouds"){
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/02d.png")
            currentIcon.attr("style", "height: 100px; width: 100px")
        } else if (weatherIcon === "Clear"){
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d.png")
            currentIcon.attr("style", "height: 100px; width: 100px")
        } else if (weatherIcon === "Smoke"){
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/50d.png")
            currentIcon.attr("style", "height: 100px; width: 100px")
        } else if (currentweather === "Drizzle") {
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d.png");
            currentIcon.attr("style", "height: 100px; width: 100px");
        } else if (currentweather === "Rain") {
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d.png");
            currentIcon.attr("style", "height: 100px; width: 100px");
        } else if (currentweather === "Snow") {
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/13d.png");
            currentIcon.attr("style", "height: 100px; width: 100px");
        }

    var weatherDisplay = $("<div>");
        //appending all to div I created
    weatherDisplay.append(cityName, displayDate, temp, humidity, wind, currentIcon);
        //targeting html element
    $("#currentWeather").html(weatherDisplay);

var lat = response.coord.lat;
var lon = response.coord.lon;
var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=2160410541d867a67171353419f6b95d&lat=" + lat  + "&lon=" + lon;

        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            //need uv value, coordinate variables above work
            $("#uv-display").empty();
            var uvResults = response.value;
            //uv box appending in weird spot, need to figure out where it goes
            var uvBox = $("<button class='btn uvBtn'>").text("UV Index: " + uvResults);
      
            $("#uv-display").html(uvBox);

            if (uvResults <= 2){
                uvBox.attr("style", "background-color: green")
               }else if(uvResults <=5){
                uvBox.attr("style", "background-color: yellow")
               }else if(uvResults > 5) {
                   uvBox.attr("style", "background-color: red")
               }
        });
    },

  //I also need to make a call for the 5-day forecast which will display in the
//div "5day" and append those to the page. Need to figure out how to include
//weather icons based upon the weather that day
$.ajax({
    url: queryURLforecast,
    method: "GET"
}).then(function (response){
    console.log(response);
    //console.log(queryURLforecast)
    var results = response.list
    //need to empty display area as results are stacking
    $("#5day").empty();
    //looping through part of response I want
    for (var i = 0; i < results.length; i += 8){
        //creating area for forecast to show
        var fiveDay = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 140px; height: 180px;'>");
        var date = results[i].dt_txt;
        //picking first 5 dates out of string?
        //var setDate = date.substr(0,4)
        var temp2 = results[i].main.temp;
        var humid = results[i].main.humidity;

        //creating html for results
        var dateh4 = $("<h4 class = 'card-title'>").text(date);
        var temp2 = $("<p class = 'card-text card1'>").text ("Temp: " + temp2 + " \xB0");
        var humid = $("<p class = 'card-text card1'>").text("Humidity: " + humid + " %");

        fiveDay.append(dateh4, temp2, humid);

        $("#5day").append(fiveDay);
        }
    })
)};
citysaveBtn();

//Buttons that store saved data and display city name in there. Gettin items from
//local storage
function citysaveBtn () {
    var lastSearch = JSON.parse(localStorage.getItem("userInput"));
    var searchDiv = $("<button class='btn-primary btn-outline-dark mt-1 bg-primary rounded' style='width: 165px;'>").text(lastSearch);
    var pastSearch = $("<div>");
    pastSearch.append(searchDiv)
    //using prepend so users search history displays in correct order
    $("#searchHistory").prepend(pastSearch);
    //on click for button that stores city searches and displays them
    $(searchDiv).click(function () {
        console.log($(this).text());
        citySearch($(this).text());
})
}


//api call for forecast
// city: {id: 5391959, name: 'San Francisco', coord: {…}, country: 'US', population: 805235, …}
// cnt: 40
// cod: "200"
// list: Array(40)
// 0:
// clouds: {all: 1}
// dt: 1633197600
// dt_txt: "2021-10-02 18:00:00" ********************
//*********** */ main: {temp: 66.83, feels_like: 66.22, temp_min: 66.83, temp_max: 69.24, pressure: 1015, …}
// pop: 0
// sys: {pod: 'd'}
// visibility: 10000
// weather: [{…}]
// wind: {speed: 2.89, deg: 26, gust: 4.43}
// [[Prototype]]: Object


// //{ api call example for san francisco ************** = info I need to display
// "coord": {
//     "lon": -122.4194,
//     "lat": 37.7749
//     },
//     "weather": [
//     {
//     "id": 800,
//     "main": "Clear", ************************************
//     "description": "clear sky",
//     "icon": "01n"
//     }
//     ],
//     "base": "stations",
//     "main": {
//     "temp": 293.66, *************************************
//     "feels_like": 293.46,
//     "temp_min": 288.87,
//     "temp_max": 300.14,
//     "pressure": 1015,
//     "humidity": 65 **************************************
//     },
//     "visibility": 10000,
//     "wind": {
//     "speed": 1.79, ****************************************
//     "deg": 216,
//     "gust": 4.47
//     },
//     "clouds": {
//     "all": 1
//     },
//     "dt": 1633143073,
//     "sys": {
//     "type": 2,
//     "id": 2016474,
//     "country": "US",
//     "sunrise": 1633097127,
//     "sunset": 1633139567
//     },
//     "timezone": -25200,
//     "id": 5391959,
//     "name": "San Francisco",
//     "cod": 200
//     }