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
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let todaysTime = document.querySelector("li .current-time");
todaysTime.innerHTML = `${currentHour}:${currentMinutes}`;

//API for live weather data
let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "ff3837d74098813bfcef9f731c3749cf";
let units = "imperial";

// Give searched city's weather data
function displayWeatherCondition(response) {
  let currentCity = document.querySelector("li .current-city");
  currentCity.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

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
