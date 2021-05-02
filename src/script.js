// time

let now = new Date();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

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

let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let currentDay = document.querySelector("#current-day");
let currentMonth = document.querySelector("#current-month");
let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");

currentDay.innerHTML = `${day} `
currentMonth.innerHTML = `${month} `
currentDate.innerHTML = `${date} `
currentTime.innerHTML = `${hour}:${minutes}`


// search bar

//function submitSearch(event) {
    //event.preventDefault();
    //let city = document.querySelector("#search-bar");
    //let currentCity = document.querySelector("#current-location");
    //currentCity.innerHTML = `${city.value}`;

//}

function updateTemp(result) {
    let currentTemp = document.querySelector("#current-temp");
    let currentCity = document.querySelector("#current-location");
    let city = document.querySelector("#search-bar");
    let country = result.data.sys.country;
    let updatedTemp = result.data.main.temp;
    let roundTemp = Math.round(updatedTemp);
    currentTemp.innerHTML = `${roundTemp}°`;
    currentCity.innerHTML = `${city.value}, ${country}`;
}

function submitSearch(event) {
    event.preventDefault();
    let city = document.querySelector("#search-bar");
    let units = "Metric";
    let apiKey = "b1c1669c8a86a926a2b5510d2ed7b9e2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}`).then(updateTemp);
}

let search = document.querySelector(".searchBar");
search.addEventListener("submit", submitSearch);


// celsius and fahrenheit

function changeUnitFahrenheit() {
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = ("55°");
}

function changeUnitCelcius() {
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = ("18°");
}

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", changeUnitFahrenheit);

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", changeUnitCelcius);

// get location

function showTemp(result) {
    let temperature = result.data.main.temp;
    let roundTemp = Math.round(temperature);
    let currentTemp = document.querySelector("#current-temp");
    let currentCity = document.querySelector("#current-location");
    let city = result.data.name;
    let country = result.data.sys.country;
    currentTemp.innerHTML = `${roundTemp}°`;
    currentCity.innerHTML = `${city}, ${country}`;
}

function currentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "b1c1669c8a86a926a2b5510d2ed7b9e2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}`).then(showTemp);
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(currentLocation);
}

let locationButton = document.querySelector("#location-button")
locationButton.addEventListener("click", getCurrentLocation);
//navigator.geolocation.getCurrentPosition(currentLocation);

