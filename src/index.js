/*
let weather = {
  kyiv: {
    temp: 19.7,
    humidity: 80,
  },
  paris: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  amsterdam: {
    temp: 20.9,
    humidity: 100,
  },
  warsaw: {
    temp: -5,
    humidity: 20,
  },
};

let question = prompt("Enter a city");
question = question.toLowerCase();
question = question.trim();

if (weather[question] === undefined) {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${question}`
  );
} else {
  let celcius = Math.round(weather[question].temp);
  let fahrenheit = (weather[question].temp * 9) / 5 + 32;
  alert(
    `It is currently ${celcius}°C (${fahrenheit}°F) in ${
      question.charAt(0).toUpperCase() + question.slice(1)
    } with a humidity of ${weather[question].humidity}%`
  );
}
*/

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
today.innerHTML = `${day}<br>${data}.${month}<br>${hour}:${minute}`;

function getWeather(response) {
  let tempCity = Math.round(response.data.main.temp);
  let tempCelcius = document.querySelector("#temp");
  tempCelcius.innerHTML = tempCity;
}

function searchCity(event) {
  event.preventDefault();
  let typeCity = document.querySelector("#exampleDataList");
  let input = document.querySelector("#city");
  input.innerHTML = typeCity.value;
  let city = typeCity.value;
  let units = "metric";
  let apiKey = "b1305a061eaf28d2e5ae44fea3603578";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${url}&appid=${apiKey}`).then(getWeather);
}

let input = document.querySelector("form");
input.addEventListener("submit", searchCity);

function changeData(response) {
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentTemp = document.querySelector("#temp");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = city;
  currentTemp.innerHTML = temp;
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
