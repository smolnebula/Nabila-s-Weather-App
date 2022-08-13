let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentYear = now.getFullYear();

let todaysDay = document.querySelector("li .current-date");
todaysDay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let todaysTime = document.querySelector("li .current-time");
todaysTime.innerHTML = `Last updated: <strong> ${currentHour}:${currentMinutes} </strong>`;

//API for live weather data
let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "ff3837d74098813bfcef9f731c3749cf";
let units = "imperial";

//Change temperature unit to Celcius
function displayCelciusTemp(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let celciusTemp = Math.round((farenheitTemp - 32 * 5) / 9);
  temperatureElement.innerHTML = celciusTemp;
}

//Change temperature unit back to Farenheit
function displayFarenheitTemp(event) {
  event.preventDefault();
  farenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

// Give searched city's weather data
function displayWeatherCondition(response) {
  let currentCity = document.querySelector("li .current-city");
  currentCity.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  farenheitTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let currentTempIcon = document.querySelector("#current-temp-icon");
  let weatherCode = response.data.weather[0].icon;
  currentTempIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherCode}@2x.png`
  );
  currentTempIcon.setAttribute("alt", `${description}`);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Give current location's weather data
function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(geoUrl).then(displayWeatherCondition);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchLocation);

//Change city
let searchInput = document.querySelector("#search-input");
let searchForm = document.querySelector("#search-bar");
console.log(searchForm);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

searchForm.addEventListener("submit", handleSubmit);

let farenheitTemp = null; //To prevent loop of conversion F->C function

//Change temperature unit to Celcius
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

//Change temperature unit back to Farenheit
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemp);

//On-load data (so I have live data displayed before entering or searching)
searchCity("New York");
