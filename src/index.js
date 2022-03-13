function enterCity(city) {
  let apiKey = "5bff8c5201df4ca815f7b284a8ea6f2f";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showSearchedWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-input").value;
  enterCity(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5bff8c5201df4ca815f7b284a8ea6f2f";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showSearchedWeather);
}

function findCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
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
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${date} ${month} ${hour}:${minute}`;
}

function getForecast(coordinates) {
  let apiKey = "5bff8c5201df4ca815f7b284a8ea6f2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showSearchedWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  celsiusTemperature = response.data.main.temp;
  let currentTemp = Math.round(celsiusTemperature);
  let cityTemp = document.querySelector("#current-temp");
  cityTemp.innerHTML = `${currentTemp}`;
  let currentHumidity = Math.round(response.data.main.humidity);
  let cityHumidity = document.querySelector("#current-humidity");
  cityHumidity.innerHTML = `${currentHumidity} %RH`;
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let cityWindSpeed = document.querySelector("#current-wind-speed");
  cityWindSpeed.innerHTML = `${currentWindSpeed} km/h`;
  let currentDescription = response.data.weather[0].description;
  let cityWeatherDescription = document.querySelector("#current-description");
  cityWeatherDescription.innerHTML = `${currentDescription}`;
  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="42"/>
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperatures-max">${Math.round(
        forecastDay.temp.max
      )}°</span>
      <span class="weather-forecast-temperatures-min">${Math.round(
        forecastDay.temp.min
      )}°</span>
    </div>
  </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let enterCityForm = document.querySelector("#type-city");
enterCityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", findCurrentLocation);

enterCity("Wellington");
