// celsius and fahrenheit

function displayUnitFahrenheit(response) {
    response.preventDefault();
    document.querySelector("#current-temp").innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
    document.querySelector("#low-temp").innerHTML = Math.round((lowCelcius * 9) / 5 + 32);
    document.querySelector("#high-temp").innerHTML = Math.round((highCelcius * 9) / 5 + 32);

}

function displayUnitCelcius(response) {
    response.preventDefault();
    document.querySelector("#current-temp").innerHTML = celciusTemperature;
    document.querySelector("#low-temp").innerHTML = lowCelcius;
    document.querySelector("#high-temp").innerHTML = highCelcius;

}

let celciusTemperature = null;

let lowCelciusTemp = null;

let highCelciusTemp = null;

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", displayUnitFahrenheit);

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", displayUnitCelcius);

// update time

let days = [
    "Sun", 
    "Mon", 
    "Tues", 
    "Wed", 
    "Thurs", 
    "Fri", 
    "Sat"];

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
      "Dec"
    ];

function updateTime(timestamp) {
    let now = new Date (timestamp);
        
    let day = days[now.getDay()];
    
    let month = months[now.getMonth()];
    let date = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();

    document.querySelector("#current-day").innerHTML = `${day}`;
    document.querySelector("#current-month").innerHTML = `${month}`;
    document.querySelector("#current-date").innerHTML = `${date}`;
    document.querySelector("#current-time").innerHTML = `${hour}:${minutes}`;
}

// update temp

function updateTemp(result) {
    let city = result.data.name;
    let country = result.data.sys.country;

    celciusTemperature = Math.round(result.data.main.temp);
    lowCelcius = Math.round(result.data.main.temp_min);
    highCelcius = Math.round(result.data.main.temp_max);

    document.querySelector("#current-temp").innerHTML = Math.round(result.data.main.temp);
    document.querySelector("#current-location").innerHTML = `${city}, ${country}`;
    document.querySelector("#low-temp").innerHTML = Math.round(result.data.main.temp_min);
    document.querySelector("#high-temp").innerHTML = Math.round(result.data.main.temp_max);
    document.querySelector("#weather-description").innerHTML = result.data.weather[0].description;
    document.querySelector("#wind-speed").innerHTML = Math.round(result.data.wind.speed);
    document.querySelector("#humidity").innerHTML = result.data.main.humidity;

    document.querySelector("#weather-icon").setAttribute("src",
    `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`);

    updateTime(result.data.dt * 1000);
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

let locationButton = document.querySelector("#location-button")
locationButton.addEventListener("click", getCurrentLocation);

submitSearch("New York");