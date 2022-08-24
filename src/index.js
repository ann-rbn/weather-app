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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sut"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
    <button>
      <i class="bi bi-cloud-sun"></i>
      <br />
     <span id="forecast-max-temp">21°/</span>
     <span id="forecast-min-temp">19°C</span>
    </button>
    <p>${day} 27.06</p>
  </div>
  `;
  });

  forecastElement.innerHTML = forecastHTML;
}

function getWeather(response) {
  celcius = Math.round(response.data.main.temp);

  let city = document.querySelector("#city");
  let cityName = response.data.name;
  let tempCelcius = document.querySelector("#temp");
  let tempMax = document.querySelector("#max-temp");
  let tempMaxChange = Math.round(response.data.main.temp_max);
  let tempMin = document.querySelector("#min-temp");
  let tempMinChange = Math.round(response.data.main.temp_min);
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let humidityChange = response.data.main.humidity;
  let skyWeather = document.querySelector("#sky-weather");
  let skyWeatherDescription = response.data.weather[0].description;
  let iconWeather = document.querySelector("#icon");
  let iconWeatherSource = response.data.weather[0].icon;

  skyWeather.innerHTML = skyWeatherDescription;
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconWeatherSource}.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);

  city.innerHTML = cityName;
  tempCelcius.innerHTML = `${celcius}°C`;
  tempMax.innerHTML = `${tempMaxChange}°/`;
  tempMin.innerHTML = `${tempMinChange}°C`;
  wind.innerHTML = `${windSpeed} km/h`;
  humidity.innerHTML = `${humidityChange}%`;

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

let currentLocButton = document.querySelector("#current-location");
currentLocButton.addEventListener("click", getPosition);

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector("#temp");
  let newFahrTemp = Math.round((celcius * 9) / 5 + 32);
  tempFahrenheit.innerHTML = `${newFahrTemp}°F`;
}

let convertButton = document.querySelector("#hover-to-change");
convertButton.addEventListener("mouseover", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let tempCelcius = document.querySelector("#temp");
  tempCelcius.innerHTML = `${celcius}°C`;
}

let changeBackButton = document.querySelector("#hover-to-change");
changeBackButton.addEventListener("mouseout", convertToCelcius);

let celcius = null;

search("Kyiv");
displayForecast();
