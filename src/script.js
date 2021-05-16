// update time

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

let months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sept",
	"Nov",
	"Dec",
];

function updateTime(timestamp) {
	let now = new Date(timestamp);

	let day = days[now.getDay()];

	let month = months[now.getMonth()];
	let date = now.getDate();
	let hour = now.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let minutes = now.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	document.querySelector("#current-day").innerHTML = `${day}`;
	document.querySelector("#current-month").innerHTML = `${month}`;
	document.querySelector("#current-date").innerHTML = `${date}`;
	document.querySelector("#current-time").innerHTML = `${hour}:${minutes}`;
}

// update forecast

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();

	return days[day];
}

function displayForecast(result) {
	let forecast = result.data.daily;

	let forecastElement = document.querySelector("#future-forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 3) {
			forecastHTML =
				forecastHTML +
				`
      <div class="col">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
						forecastDay.weather[0].icon
					}@2x.png"
          alt=""
          width="38"
        />
        <div><span class="forecast-high">${Math.round(
					forecastDay.temp.max
				)}°</span> | <span class="forecast-low">${Math.round(
					forecastDay.temp.min
				)}°</span></div>

      </div>
  `;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(response) {
	let apiKey = "b1c1669c8a86a926a2b5510d2ed7b9e2";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&appid=${apiKey}&units=metric`;
	axios.get(`${apiUrl}`).then(displayForecast);
}

// sunrise & sunset

function displaySunrise(timestamp) {
    let now = new Date(timestamp);
	let hour = now.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let minutes = now.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
    document.querySelector("#sunrise-time").innerHTML = `${hour}:${minutes}`
}

function displaySunset(timestamp) {
    let now = new Date(timestamp);
	let hour = now.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let minutes = now.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
    document.querySelector("#sunset-time").innerHTML = `${hour}:${minutes}`
}

// update temp

function updateTemp(result) {
	let city = result.data.name;
	let country = result.data.sys.country;

	celciusTemperature = Math.round(result.data.main.temp);
	lowCelcius = Math.round(result.data.main.temp_min);
	highCelcius = Math.round(result.data.main.temp_max);

	document.querySelector("#current-temp").innerHTML = Math.round(
		result.data.main.temp
	);
	document.querySelector("#current-location").innerHTML = `${city}, ${country}`;
	document.querySelector("#low-temp").innerHTML = `${Math.round(
		result.data.main.temp_min
	)}°`;
	document.querySelector("#high-temp").innerHTML = `${Math.round(
		result.data.main.temp_max
	)}°`;
	document.querySelector("#weather-description").innerHTML =
		result.data.weather[0].description;
	document.querySelector("#wind-speed").innerHTML = Math.round(
		result.data.wind.speed
	);
	document.querySelector("#humidity").innerHTML = result.data.main.humidity;

	document
		.querySelector("#weather-icon")
		.setAttribute(
			"src",
			`http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`
		);

	updateTime(result.data.dt * 1000);
	getForecast(result.data.coord);
    displaySunrise(result.data.sys.sunrise * 1000);
    displaySunset(result.data.sys.sunset *1000);
}

// search bar

function submitSearch(city) {
	let units = "Metric";
	let apiKey = "b1c1669c8a86a926a2b5510d2ed7b9e2";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
	axios.get(`${apiUrl}`).then(updateTemp);
}

function handleSearch(event) {
	event.preventDefault();
	let city = document.querySelector("#search-bar").value;
	submitSearch(city);
}

let search = document.querySelector(".searchBar");
search.addEventListener("submit", handleSearch);

// get current location

function currentLocation(position) {
	let units = "metric";
	let apiKey = "b1c1669c8a86a926a2b5510d2ed7b9e2";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
	axios.get(`${apiUrl}`).then(updateTemp);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(currentLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

submitSearch("Tasmania");
