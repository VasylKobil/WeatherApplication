const api = {
    key: "f6f51145b699db7855d36f9027fc0cf1",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
const notificationElement = document.querySelector('.textNoLocation');

//function if press Enter
function setQuery(event) {
    if (event.keyCode == 13) {
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
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeatherCurrent(latitude, longitude);
    getWeatherDaily(latitude, longitude);
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
    // console.log(weather);
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

//date
function dateBuilder(event) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[event.getDay()];
    let date = event.getDate();
    let month = months[event.getMonth()];
    let year = event.getFullYear();

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
    const latitude = location.lat();
    const longitude = location.lng();

    getWeatherCurrent(latitude,longitude);
    getWeatherDaily(latitude,longitude);
}
//forecast weather
function getWeatherDaily(latitude, longitude) {
    fetch(`${api.base}onecall?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`)
        .then(weatherDaily => {
            return weatherDaily.json();
        }).then(displayResultsDaily);
}
function displayResultsDaily(weather) {
    console.log(weather);
    //first day
    let iconFirstDay = document.querySelector('.first-day .forecast-content .forecast-icon');
    iconFirstDay.innerHTML = `<img src="icons/${weather.daily[1].weather[0].icon}.png" alt="" width="48">`;

    let tempFirstday = document.querySelector('.first-day .forecast-content .degree');
    tempFirstday.innerHTML = `${Math.round(weather.daily[1].temp.day)}<sup>o</sup>C`;

    let tempFeelFirstday = document.querySelector('.first-day .forecast-content .tempFeel');
    tempFeelFirstday.innerHTML = `${Math.round(weather.daily[1].feels_like.day)}<sup>o</sup>C`;

    //secound day
    let iconSecondDay = document.querySelector('.second-day .forecast-content .forecast-icon');
    iconSecondDay.innerHTML = `<img src="icons/${weather.daily[2].weather[0].icon}.png" alt="" width="48">`;

    let tempSecondDay = document.querySelector('.second-day .forecast-content .degree');
    tempSecondDay.innerHTML = `${Math.round(weather.daily[2].temp.day)}<sup>o</sup>C`;

    let tempFeelSecondDay = document.querySelector('.second-day .forecast-content .tempFeel');
    tempFeelSecondDay.innerHTML = `${Math.round(weather.daily[2].feels_like.day)}<sup>o</sup>C`;

    //third day
    let iconThreeDay = document.querySelector('.three-day .forecast-content .forecast-icon');
    iconThreeDay.innerHTML = `<img src="icons/${weather.daily[3].weather[0].icon}.png" alt="" width="48">`;

    let tempThreeDay = document.querySelector('.three-day .forecast-content .degree');
    tempThreeDay.innerHTML = `${Math.round(weather.daily[3].temp.day)}<sup>o</sup>C`;

    let tempFeelThreeDay = document.querySelector('.three-day .forecast-content .tempFeel');
    tempFeelThreeDay.innerHTML = `${Math.round(weather.daily[3].feels_like.day)}<sup>o</sup>C`;

    //four day
    let iconFourDay = document.querySelector('.four-day .forecast-content .forecast-icon');
    iconFourDay.innerHTML = `<img src="icons/${weather.daily[4].weather[0].icon}.png" alt="" width="48">`;

    let tempFourDay = document.querySelector('.four-day .forecast-content .degree');
    tempFourDay.innerHTML = `${Math.round(weather.daily[4].temp.day)}<sup>o</sup>C`;

    let tempFeelFourDay = document.querySelector('.four-day .forecast-content .tempFeel');
    tempFeelFourDay.innerHTML = `${Math.round(weather.daily[4].feels_like.day)}<sup>o</sup>C`;

    //five day
    let iconFiveDay = document.querySelector('.five-day .forecast-content .forecast-icon');
    iconFiveDay.innerHTML = `<img src="icons/${weather.daily[5].weather[0].icon}.png" alt="" width="48">`;

    let tempFiveDay = document.querySelector('.five-day .forecast-content .degree');
    tempFiveDay.innerHTML = `${Math.round(weather.daily[5].temp.day)}<sup>o</sup>C`;

    let tempFeelFiveDay = document.querySelector('.five-day .forecast-content .tempFeel');
    tempFeelFiveDay.innerHTML = `${Math.round(weather.daily[5].feels_like.day)}<sup>o</sup>C`;

    //six day
    let iconSixDay = document.querySelector('.six-day .forecast-content .forecast-icon');
    iconSixDay.innerHTML = `<img src="icons/${weather.daily[6].weather[0].icon}.png" alt="" width="48">`;

    let tempSixDay = document.querySelector('.six-day .forecast-content .degree');
    tempSixDay.innerHTML = `${Math.round(weather.daily[6].temp.day)}<sup>o</sup>C`;

    let tempFeelSixDay = document.querySelector('.six-day .forecast-content .tempFeel');
    tempFeelSixDay.innerHTML = `${Math.round(weather.daily[6].feels_like.day)}<sup>o</sup>C`;

    //seven day
    let iconSevenDay = document.querySelector('.seven-day .forecast-content .forecast-icon');
    iconSevenDay.innerHTML = `<img src="icons/${weather.daily[7].weather[0].icon}.png" alt="" width="48">`;

    let tempSevenDay = document.querySelector('.seven-day .forecast-content .degree');
    tempSevenDay.innerHTML = `${Math.round(weather.daily[7].temp.day)}<sup>o</sup>C`;

    let tempFeelSevenDay = document.querySelector('.seven-day .forecast-content .tempFeel');
    tempFeelSevenDay.innerHTML = `${Math.round(weather.daily[7].feels_like.day)}<sup>o</sup>C`;

}