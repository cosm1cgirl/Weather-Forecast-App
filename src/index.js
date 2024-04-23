function updateTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let conditionElement = document.querySelector("#condition");
  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#current-humidity");
  let iconElement = document.querySelector("#icon");
  let date = new Date(response.data.time * 1000);
  let timeElement = document.getElementById("day-time");

  temperatureElement.innerHTML = Math.round(temperature) + "°c";
  conditionElement.innerHTML = response.data.condition.description;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class ="weather-conditions-icon"/> `;
  timeElement.innerHTML = formatDate(date);
  getForecast(response.data.city);

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[date.getDay()];
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
  }
}
function searchCity(city) {
  let apiKey = "efc7a995b0ta50f31c388oe39854d44b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "efc7a995b0ta50f31c388oe39854d44b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div><div class="forecast-day">${formatDay(day.time)}</div>
<div class="forecast-icon">
<img src="${day.condition.icon_url}" width="30"/></div>
<div><span class="min-temperature">${Math.round(
          day.temperature.minimum
        )}</span>°<span class="max-temperature"><span><strong>${Math.round(
          day.temperature.maximum
        )}<strong>°</span></div></div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", updateCity);

searchCity("Cape Town");
