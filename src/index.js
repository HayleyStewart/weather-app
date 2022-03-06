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

let enterCityForm = document.querySelector("#type-city");
enterCityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", findCurrentLocation);

let now = new Date();
function formatDate(currentDate) {
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
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day} ${date} ${month} ${hour}:${minute}`;
}
formatDate(now);

function showSearchedWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#current-temp");
  cityTemp.innerHTML = `${currentTemp}°C`;
  let currentHumidity = Math.round(response.data.main.humidity);
  let cityHumidity = document.querySelector("#current-humidity");
  cityHumidity.innerHTML = `${currentHumidity} %RH`;
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let cityWindSpeed = document.querySelector("#current-wind-speed");
  cityWindSpeed.innerHTML = `${currentWindSpeed} km/h`;
  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
}

enterCity("Wellington");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click, displayFahrenheitTemperature");

//took this out:
//let h1 = document.querySelector("h1");
// if (enterCityHere.value) {
// h1.innerHTML = `${enterCityHere.value}`;
// } else {
//  h1.innerHTML = null;
// alert("Please type a city");
