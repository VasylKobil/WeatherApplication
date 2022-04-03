import {api} from './main.js';

export function getWeatherDaily(latitude, longitude) {
    fetch(`${api.base}onecall?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`)
        .then(weatherDaily => {
            return weatherDaily.json();
        }).then(displayResultsDaily);
}

const formHourly = obj => {
    const parser = new DOMParser();

    return parser.parseFromString(
        `<div class="forecast">
            <div class="forecast-header">
                <div class="time">${obj.time}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="${obj.src}" alt="Image whether">
                </div>
                <div class="degree">${obj.degrees}<sup>o</sup>C</div>
            </div>
        </div>`, 'text/html')
}

const formDaily = obj => {
    const parser = new DOMParser();

    return parser.parseFromString(
        `<div class="days-header">
                <div class="body-one">
                    <div class="day">${obj.day}</div>
                </div>
                <div class="body-two">
                    <div class="icon">
                        <img src="${obj.src}" alt="Image whether">
                    </div>
                </div>
                <div class="body-three">
                    <div class="temp-day">${obj.tempDay}</div>
                    <div class="temp-night">${obj.tempNight}</div>
                </div>
            </div>`, 'text/html')
}

function displayResultsDaily(weather) {
    if(!weather) return;
    function calcTime(event) {
        const offset = weather.timezone_offset / 60 / 60;
        const d = new Date(event * 1000);
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        const newHour = nd.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        return `${newHour}`;
    }

    function convertAllTime(event){
        const offset = weather.timezone_offset  / 60 / 60;
        const date = new Date(event * 1000);
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const newDate = new Date(utc + (3600000 * offset));
        const time = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return `${time}`;
    }

    function convertDay(event){
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const offset = weather.timezone_offset / 60 / 60;
        const d = new Date(event * 1000);
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        const convertDay = nd.getDay();
        const result = days[convertDay];
        return `${result}`;
    }

    function windDerection(degree){
        if(degree>=334 && degree <= 360){
            document.getElementById('arrow').classList.toggle('nnw');
            document.querySelector('.compass .direction').innerHTML = "NNW";
        }
        if(degree>=306 && degree <= 333){
            document.getElementById('arrow').classList.toggle('nw');
            document.querySelector('.compass .direction').innerHTML = "NW";
        }
        if(degree>=286 && degree <= 305){
            document.getElementById('arrow').classList.toggle('wnw');
            document.querySelector('.compass .direction').innerHTML = "WNW";
        }
        if(degree>=266 && degree <= 285){
            document.getElementById('arrow').classList.toggle('w');
            document.querySelector('.compass .direction').innerHTML = "W";
        }
        if(degree>=241 && degree <= 265){
            document.getElementById('arrow').classList.toggle('wsw');
            document.querySelector('.compass .direction').innerHTML = "WSW";
        }
        if(degree>=221 && degree <= 240){
            document.getElementById('arrow').classList.toggle('sw');
            document.querySelector('.compass .direction').innerHTML = "SW";
        }
        if(degree>=196 && degree <= 220){
            document.getElementById('arrow').classList.toggle('ssw');
            document.querySelector('.compass .direction').innerHTML = "SSW";
        }
        if(degree>=176 && degree <= 195){
            document.getElementById('arrow').classList.toggle('s');
            document.querySelector('.compass .direction').innerHTML = "S";
        }
        if(degree>=148 && degree <= 175){
            document.getElementById('arrow').classList.toggle('sse');
            document.querySelector('.compass .direction').innerHTML = "SSE";
        }
        if(degree>=131 && degree <= 147){
            document.getElementById('arrow').classList.toggle('se');
            document.querySelector('.compass .direction').innerHTML = "SE";
        }
        if(degree>=106 && degree <= 130){
            document.getElementById('arrow').classList.toggle('ese');
            document.querySelector('.compass .direction').innerHTML = "ESE";
        }
        if(degree >= 85 && degree <= 105){
            document.getElementById('arrow').classList.toggle('e');
            document.querySelector('.compass .direction').innerHTML = "E";
        }
        if(degree>=61 && degree <= 85){
            document.getElementById('arrow').classList.toggle('ene');
            document.querySelector('.compass .direction').innerHTML = "ENE";
        }
        if(degree>=41 && degree <= 60){
            document.getElementById('arrow').classList.toggle('ne');
            document.querySelector('.compass .direction').innerHTML = "NE";
        }
        if(degree>=16 && degree <= 40){
            document.getElementById('arrow').classList.toggle('nne');
            document.querySelector('.compass .direction').innerHTML = "NNE";
        }
        if(degree >= 0 && degree <=15)
        document.querySelector('.compass .direction').innerHTML = "N";
    }

    const forecastContainer = document.querySelector('.forecast-container');
    const forecastDays = document.querySelector('.forecast-days');

    forecastContainer.innerHTML = '';
    forecastDays.innerHTML = '';

    weather?.hourly.forEach((obj, index) => {
        if(index > 24) return;
        let readyRender;
        const icon = obj.weather[0].icon;
        if(index === 0){
            readyRender = formHourly({time: 'Now', src: `assets/icons/${icon}.png`, degrees: `${Math.round(obj.temp)}`});
        }else{
            readyRender = formHourly({time: `${calcTime(obj.dt)}`, src: `assets/icons/${icon}.png`, degrees: `${Math.round(obj.temp)}`});
        }
        forecastContainer.appendChild(readyRender.querySelector('.forecast'));
    })

    weather.daily.forEach((obj, index) => {
        if(index === 0 || index > 7) return;
        const icon = obj.weather[0].icon;
        const newElement = formDaily({
            day: `${convertDay(obj.dt)}`,
            src: `assets/icons/${icon}.png`,
            tempDay: `${Math.round(obj.temp.day)}`,
            tempNight: `${Math.round(obj.temp.night)}`
        });
        forecastDays.appendChild(newElement.querySelector('.days-header'));
    })

    const sunrise = document.querySelector('.additionalInf .sunr_time');
    sunrise.innerHTML = convertAllTime(weather.current.sunrise);

    const sunset = document.querySelector('.additionalInf .suns_time');
    sunset.innerHTML = convertAllTime(weather.current.sunset);

    const speedwind = document.querySelector('.additionalInf .wind_speed');
    speedwind.innerHTML = `${weather.current.wind_speed} km/h`;

    windDerection(weather.current.wind_deg);

    const feeltemp = document.querySelector('.additionalInf .feels_like');
    feeltemp.innerHTML = `${Math.round(weather.current.feels_like)} °C`;

    const humidity = document.querySelector('.additionalInf .value_hum');
    humidity.innerHTML = `${weather.current.humidity} %`;

    const pressure = document.querySelector('.additionalInf .value_press');
    pressure.innerHTML = `${weather.current.pressure} hPa`;

    const visibility = document.querySelector('.additionalInf .value_visi');
    visibility.innerHTML = `${Math.round(weather.current.visibility / 1000)}<span> km</span>`;

    const cloudiness = document.querySelector('.additionalInf .value_clouds');
    cloudiness.innerHTML = `${weather.current.clouds}<span> %</span>`;

    const uvIndex = document.querySelector('.additionalInf .value_index');
    uvIndex.innerHTML = `${Math.round(weather.current.uvi)}`;
}