import {getWeatherDaily} from "./forecast.js";

const api = {
    key: "f6f51145b699db7855d36f9027fc0cf1",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
const notificationElement = document.querySelector('.textNoLocation');

let timerId = null;

//function if press Enter
function setQuery(event) {
    if (event.keyCode === 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);

}

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
function setPosition(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeatherCurrent(latitude, longitude);
    getWeatherDaily(latitude,longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>User denied Geolocation</p><p>Please, add a Location...</p>";
}

function getWeatherCurrent(latitude, longitude){
    fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}


function displayResults(weather) {
    let main = weather.weather[0].main;
    let temp = weather.main.temp - 273.15;
    let nd = weather.weather[0].icon.slice(-1);
    if(main === "Rain" && nd === "n"){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/rain.jpg')";
    }else if(main === "Drizzle" || main === "Mist" || main === "Smoke" || main === "Haze" || main === "Dust" || main === "Fog" || main === "Sand" || main === "Dust" || main === "Ash" || main === "Squall"){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/fognight.jpg')";
    }else if(main === "Rain" && temp > 0){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/rainnight.jpg')";
    }else if(main === "Clear" && nd === "n" && temp > 0){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/clearnight.jpg')";
    }else if(main === "Clear" && temp > 0){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/clearday.jpg')";
    }else if(main === "Clouds" && nd === "n" && temp > 0){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/cloudsnight.jpg')";
    }else if(main === "Clouds" && temp > 0){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/clouds.jpg')";
    }else if((main === "Snow" && nd === "d") || (nd === "d" && temp < 0)){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/snowday.jpg')";
    }else if((main === "Snow" && nd === "n") || (nd === "n" && temp < 0)){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/snownight.jpg')";
    }else if(main === "Thunderstorm"){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/storm.jpg')";
    }else if(main === "Tornado"){
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/tornado.jpg')";
    }else{
        document.getElementById("bg").style.backgroundImage = "url('assets/backgroundImg/mountain.jpg')";
    }

    // convert time
    calcTime();

    function calcTime() {
        let offset = weather.timezone / 60 / 60;
        let d = new Date();
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        let nd = new Date(utc + (3600000 * offset));
        const option = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        document.querySelector('.location .date').innerText = nd.toLocaleDateString('en-US', option);
        document.querySelector('.location .local_time').innerText = nd.toLocaleTimeString('en-US');

        if (timerId) {
            clearInterval(timerId);
        }
        timerId = setInterval(calcTime, 500);
    }

    document.querySelector('.location .city').innerText = `${weather.name}, ${weather.sys.country}`;

    document.querySelector('.icon').innerHTML = `<img src="assets/icons/${weather.weather[0].icon}.png"/>`;

    document.querySelector('.current .weather').innerText = weather.weather[0].main;

    document.querySelector('.current .temp').innerHTML = `${Math.round(weather.main.temp - 273.15 )}<span>°C</span>`;

    document.querySelector('.current .m_temp .temp_max').innerHTML = `H: ${Math.round(weather.main.temp_max - 273.15 )}<span>°c</span>`;

    document.querySelector('.current .m_temp .temp_min').innerHTML = `L: ${Math.round(weather.main.temp_min - 273.15 )}<span>°c</span>`;
}
//time
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// Search places autocomplete
function activatePlacesSearch() {
     const input = document.getElementById('mainput');
     const autoComplete = new google.maps.places.Autocomplete(input);
     google.maps.event.addListener(autoComplete, 'place_changed', onPlaceChanged.bind(this, autoComplete));
}
window.activatePlacesSearch = activatePlacesSearch;

function onPlaceChanged(autoComplete){
    const place = autoComplete.getPlace();
    if (!place.geometry) return;

    const {location} = place.geometry;
    const latitude = location.lat();
    const longitude = location.lng();

    getWeatherCurrent(latitude,longitude);
    getWeatherDaily(latitude,longitude);
}

export {api, checkTime};

