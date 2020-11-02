const api = {
    key: "f6f51145b699db7855d36f9027fc0cf1",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
const notificationElement = document.querySelector('.textNoLocation');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
    }
}
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>User denied Geolocation</p><p>Please, add a Location...</p>";
}

function getWeather(latitude, longitude){
    fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}
function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let icon = weather.weather[0].icon;
    let iconElement = document.querySelector('.icon');
    iconElement.innerHTML = `<img src="icons/${icon}.png"/>`;


    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp - 273.15 )}<span>°C</span>`;

    let feeltemp = document.querySelector('.current .tempfeel');
    feeltemp.innerHTML = `<span>Feels like </span>${Math.round(weather.main.feels_like - 273.15)} °C`;

    
    let speedwind = document.querySelector('.current .speedwind');
    speedwind.innerHTML = `<span>Speed wind </span>${weather.wind.speed} km/h`;

    let visibility = document.querySelector('.current .visibility');
    visibility.innerHTML = `<span>Visibility </span>${Math.round(weather.visibility / 1000)}<span> km</span>`;

    let humidity = document.querySelector('.current .humidity');
    humidity.innerHTML = `<span>Humidity </span>${weather.main.humidity} %`;

    let pressure = document.querySelector('.current .pressure');
    pressure.innerHTML = `<span>Pressure </span>${weather.main.pressure} hPa`;



}
//time


function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    //time
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function startTime() {
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        // add a zero in front of numbers<10
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
        let time = h + ":" + m + ":" + s;
        t = setTimeout(function() {
            startTime()
        }, 500);
    }
    startTime();

    return `${day} ${date} ${month} ${year} `;
}
// Search places autocomplete
 function activatePlacesSearch() {
    const input = document.getElementById('mainput');
    const autoComplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autoComplete, 'place_changed', onPlaceChanged.bind(this, autoComplete));
};

function onPlaceChanged(autoComplete){
    const place = autoComplete.getPlace();
    if (!place.geometry) return;

    const {location} = place.geometry;
    const lat = location.lat();
    const lng = location.lng();

    getWeather(lat,lng);
}
