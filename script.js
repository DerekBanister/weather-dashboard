
//declaring today date using moment.
//moment().format("L");

//Steps:
//On click event that handles the users city search. I need to make that input
//relate to the api call and display in the currentweather div based on the city
//that is searched. Also saving the searched items to local storage.
$("#cityButton").on("click", function(event){
    event.preventDefault();
    //grabbing user input
    var cityInput = $("#city-input").val();

    citySearch(cityInput);
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
    //$("#currentWeather").empty();
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

    var weatherDisplay = $("<div>");

    console.log(weatherDisplay);
        //appending all to div I created
    weatherDisplay.append(cityName, displayDate, temp, humidity, wind);
        //targeting html element
    $("#currentWeather").html(weatherDisplay);
    }
)}




//I also need to make a call for the 5-day forecast which will display in the
//div "5day" and append those to the page. Need to figure out how to include
//weather icons based upon the weather that day

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