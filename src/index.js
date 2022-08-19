/*  to remember
question = question.toLowerCase();
question = question.trim();
if (weather[question] === undefined) {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${question}`
  );
 fahrenheit = (weather[question].temp * 9) / 5 + 32;
*/
function currentDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuersday",
    "Friday",
    "Saturday",
  ];
  let day = days[new Date().getDay()];
  let data = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();

  if (month < 10) {
    month = "0" + month;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  let today = document.querySelector("#today");
  today.innerHTML = `Last update:<br>${day} ${data}.${month}<br>${hour}:${minute}`;
}

function getWeather(response) {
  let city = document.querySelector("#city");
  let cityName = response.data.name;
  let tempCity = Math.round(response.data.main.temp);
  let tempCelcius = document.querySelector("#temp");
  let tempMax = document.querySelector("#maxTemp");
  let tempMaxChange = Math.round(response.data.main.temp_max);
  let tempMin = document.querySelector("#minTemp");
  let tempMinChange = Math.round(response.data.main.temp_min);
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let humidityChange = response.data.main.humidity;
  let skyWeather = document.querySelector("#skyWeather");
  let skyWeatherDescription = response.data.weather[0].description;

  city.innerHTML = cityName;
  tempCelcius.innerHTML = `${tempCity}°C`;

  tempMax.innerHTML = `${tempMaxChange}°/`;
  tempMin.innerHTML = `${tempMinChange}°C`;
  wind.innerHTML = `${windSpeed} km/h`;
  humidity.innerHTML = `${humidityChange}%`;
  skyWeather.innerHTML = skyWeatherDescription;
  currentDay();
}

function search(city) {
  let units = "metric";
  let apiKey = "b1305a061eaf28d2e5ae44fea3603578";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${url}&appid=${apiKey}`).then(getWeather);
}

function searchCity(event) {
  event.preventDefault();
  let typeCity = document.querySelector("#exampleDataList");
  let input = document.querySelector("#city");
  input.innerHTML = typeCity.value;
  let city = typeCity.value;
  search(city);
}

let input = document.querySelector("form");
input.addEventListener("submit", searchCity);

search("Kyiv");

function changeData(response) {
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentTemp = document.querySelector("#temp");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = city;
  currentTemp.innerHTML = `${temp}°C`;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b1305a061eaf28d2e5ae44fea3603578";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`;
  axios.get(`${url}&appid=${apiKey}`).then(changeData);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(getLocation);
}
let currentLocButton = document.querySelector("#currentLocation");
currentLocButton.addEventListener("click", getPosition);

/*
function convertToFahrenheit(event) {
  event.preventDefault();
  let tempCelcius = document.querySelector("#temp");

  tempCelcius.innerHTML = 66;
}

function convertIconToF(event) {
  event.preventDefault();
  let iconCelcius = document.querySelector("#celcius-icon");
  iconCelcius.innerHTML = "°F";
}

let convertButton = document.querySelector("#clickToChange");
convertButton.addEventListener("mouseover", convertToFahrenheit);
convertButton.addEventListener("mouseover", convertIconToF);

function convertToCelcius(event) {
  event.preventDefault();
  let tempCelcius = document.querySelector("#temp");

  tempCelcius.innerHTML = 20;
}
function convertIconToC(event) {
  event.preventDefault();
  let iconCelcius = document.querySelector("#celcius-icon");
  iconCelcius.innerHTML = "°C";
}
let changeBackButton = document.querySelector("#clickToChange");
changeBackButton.addEventListener("mouseout", convertToCelcius);
changeBackButton.addEventListener("mouseout", convertIconToC);
*/
