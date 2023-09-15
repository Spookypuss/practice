// Search bar (at top) functionality

function displayCurrent(response) {
  //displays current weather passed from searchCity, below
  let location = document.querySelector("#location-heading");
  location.innerHTML = response.data.name; // sets name of location
  let temperature = Math.round(response.data.main.temp); // gets current temperature and rounds to integer
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature; // displays current temp on page
  let description = document.querySelector("#current-description");
  description.innerHTML = response.data.weather[0].main; // gets text description of current weather and displays on page - can maybe try description instead of main for fuller desc?
  let humidity = document.querySelector("#humidity"); //
  humidity.innerHTML = response.data.main.humidity; // gets humidity data and displays on page

  /*let latitude = document.querySelector("#lat"); // Next, show the lat and long of chosen city
  latitude.innerHTML = response.data.coord.lat;
  let longitude = document.querySelector("#long");
  longitude.innerHTML = response.data.coord.lon;*/
}

function searchCity(event) {
  // gets current weather for input location and passes to displayCurrent, above
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-text"); // use this input in function

  let cityName = searchInput.value;
  cityName = cityName.trim();
  cityName = cityName.toLowerCase(); // formats the input

  let apiKey = "28966f9a5b2543fb60e8a809ec2c1fd9";
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(endpoint).then(displayCurrent);
  // how to get sense check in here?
  /*else {
    alert("Please enter a location, or select 'use my location'");
    let heading = document.querySelector("#location-heading");
    heading.innerHTML = "No city selected";
  }*/
}

function showLocation(position) {
  // shows the current lat and long in heading (instead of city name) when passed from getLocation, below
  let latitude = position.coords.latitude; //declares latitude as response data
  let longitude = position.coords.longitude; //declares longitude as response data
  let sentence = `Latitude: ${latitude}, longitude: ${longitude}`; //puts together sentence for heading
  let heading = document.querySelector("#location-heading"); // assign variable to element with id: location-heading
  heading.innerHTML = sentence; // displays sentence as heading
  console.log(position);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showLocation); // finds current position and passes it to showLocation, above
}

let searchForm = document.querySelector("#search-form"); //triggers a search (should be via axios!!)
searchForm.addEventListener("submit", searchCity);

let locationButton = document.querySelector("#my-location-button");
locationButton.addEventListener("click", getLocation);
// function updates page to show lat and long instead of city name and displays current temp

// Time and date functionality
let now = new Date();
let date = now.getDate();
let hours = String(now.getHours()).padStart(2, 0);
let minutes = String(now.getMinutes()).padStart(2, 0);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day}, ${hours}:${minutes}`;

// Weather object - locations with temp and humidity key-value pairs
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// Unit conversion button functionality (or not :< )
function convertToFahrenheit(event) {
  event.preventDefault();
  let displayTemperature = document.querySelector("#current-temperature"); // selects the h4 element and displays current temp
  let temperature = displayTemperature.innerHTML;
  temperature = Number(temperature); // converts to a number
  displayTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32); // converts to F and displays
}

function convertToCelcius(event) {
  event.preventDefault();
  let displayTemperature = document.querySelector("#current-temperature"); // selects the h4 element and displays current temp
  let temperature = displayTemperature.innerHTML;
  displayTemperature.innerHTML = 17; // displays fake data!!
}

let currentTemperature = 16.9; // sets the current temperature

let displayTemperature = document.querySelector("#current-temperature"); // selects the h4 element and displays current temp
displayTemperature.innerHTML = Math.round(currentTemperature);

fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);
