//Get city name from search bar
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");

  if (searchInput.value) {
    let apiKey = "1b07efd51b1f8a474b481f3435f516eb";
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
  let temp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temp}°C`;
  let displayedCity = document.querySelector("#displayed-city");
  displayedCity.innerHTML = `${cityName}`;
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
let hours = now.getHours();
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
