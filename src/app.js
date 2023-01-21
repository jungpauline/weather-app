//Get city name from search bar
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");

  if (searchInput.value) {
    let apiKey = "b1a8336ff1e05b64da5625e4158fbea3";
    let city = searchInput.value;
    let unit = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemp);
  } else {
    displayedCity.innerHTML = null;
    alert("Please type a city");
  }
}

//Show temp and city name from searched city
function showTemp(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  let temp = Math.round(celsiusTemp);
  let cityName = response.data.name;
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temp}`;
  let displayedCity = document.querySelector("#displayed-city");
  displayedCity.innerHTML = `${cityName}`;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = response.data.weather[0].description;
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = response.data.main.humidity;

  getForecast(response.data.coord);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//Display temp and city name from the current location by clicking current button

let buttonPosition = document.querySelector("#current-position");
buttonPosition.addEventListener("click", showPosition);

function showPosition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let apiKey = "1b07efd51b1f8a474b481f3435f516eb";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

//Get date
let now = new Date();
let currentTime = document.querySelector("#currentTime");
let currentDate = document.querySelector("#currentDate");
let date = now.getDate();
let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()]; //Array mapping to match the index of the current day with the string in the array created
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
currentDate.innerHTML = `${day} ${date} ${month} ${year}`;
currentTime.innerHTML = `${hours}:${minutes}`;

function showFahrenheitTemp(event) {
  event.preventDefault();

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

// Function to get the forecast from API
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b1a8336ff1e05b64da5625e4158fbea3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//create function to format the date stamp from the forecast API:
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// Create a function to display the forecast and loop for the next days
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
              <img class="icon-weather" src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="42" />
              <div class="temp-day">
                <span class="min-temp">${Math.round(
                  forecastDay.temp.min
                )}°C</span>
                <span class="max-temp">${Math.round(
                  forecastDay.temp.max
                )}°C</span>

              </div>
            </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function displayDefault() {
  let apiKey = "b1a8336ff1e05b64da5625e4158fbea3";
  let defaultCity = "London";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

displayDefault();

//If current location upon loading the page is needed, use the following code and remove function displayDefault:
//showPosition();
//getPosition(position);
