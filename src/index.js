function updateTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let conditionElement = document.querySelector("#condition");
  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#current-humidity");

  temperatureElement.innerHTML = Math.round(temperature) + "°c";
  conditionElement.innerHTML = response.data.condition.description;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", updateCity);

searchCity("Cape Town");
