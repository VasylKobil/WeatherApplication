import {api, checkTime,} from './main.js';

//forecast weather
export function getWeatherDaily(latitude, longitude) {
    fetch(`${api.base}onecall?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`)
        .then(weatherDaily => {
            return weatherDaily.json();
        }).then(displayResultsDaily);
}
//convert alltime a Unix timestamp
function convertAllTime(event){
    let date = new Date(event * 1000);
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${time}`;
}

function displayResultsDaily(weather) {
    //function for hour for hourly forecast
    function calcTime(event) {
        let offset = weather.timezone_offset / 60 / 60;
        let d = new Date(event * 1000);
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        let nd = new Date(utc + (3600000 * offset));
        let newHour = nd.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        return `${newHour}`;
    }
    //Function for days Forecast
    function convertDay(event){
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let offset = weather.timezone_offset / 60 / 60;
        let d = new Date(event * 1000);
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        let nd = new Date(utc + (3600000 * offset));
        let convertDay = nd.getDay();
        let result = days[convertDay];
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
    //hourly
    //now
    let iconNow = document.querySelector('.now .forecast-content .forecast-icon');
    iconNow.innerHTML = `<img src="assets/icons/${weather.hourly[0].weather[0].icon}.png" alt="" width="38">`;

    let tempNow = document.querySelector('.now .forecast-content .degree');
    tempNow.innerHTML = `${Math.round(weather.hourly[0].temp)}<sup>o</sup>`;
    //+1
    let placeTime1 = document.querySelector('.plus1 .time');
    placeTime1.innerHTML = calcTime(weather.hourly[1].dt);

    let iconPlus1 = document.querySelector('.plus1 .forecast-content .forecast-icon');
    iconPlus1.innerHTML = `<img src="assets/icons/${weather.hourly[1].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus1 = document.querySelector('.plus1 .forecast-content .degree');
    tempPlus1.innerHTML = `${Math.round(weather.hourly[1].temp)}<sup>o</sup>`;
    //+2
    let placeTime2 = document.querySelector('.plus2 .time');
    placeTime2.innerHTML = calcTime(weather.hourly[2].dt);

    let iconPlus2 = document.querySelector('.plus2 .forecast-content .forecast-icon');
    iconPlus2.innerHTML = `<img src="assets/icons/${weather.hourly[2].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus2 = document.querySelector('.plus2 .forecast-content .degree');
    tempPlus2.innerHTML = `${Math.round(weather.hourly[2].temp)}<sup>o</sup>`;
    //+3
    let placeTime3 = document.querySelector('.plus3 .time');
    placeTime3.innerHTML = calcTime(weather.hourly[3].dt);

    let iconPlus3 = document.querySelector('.plus3 .forecast-content .forecast-icon');
    iconPlus3.innerHTML = `<img src="assets/icons/${weather.hourly[3].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus3 = document.querySelector('.plus3 .forecast-content .degree');
    tempPlus3.innerHTML = `${Math.round(weather.hourly[3].temp)}<sup>o</sup>`;
    //+4
    let placeTime4 = document.querySelector('.plus4 .time');
    placeTime4.innerHTML = calcTime(weather.hourly[4].dt);

    let iconPlus4 = document.querySelector('.plus4 .forecast-content .forecast-icon');
    iconPlus4.innerHTML = `<img src="assets/icons/${weather.hourly[4].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus4 = document.querySelector('.plus4 .forecast-content .degree');
    tempPlus4.innerHTML = `${Math.round(weather.hourly[4].temp)}<sup>o</sup>`;
    //+5
    let placeTime5 = document.querySelector('.plus5 .time');
    placeTime5.innerHTML = calcTime(weather.hourly[5].dt);

    let iconPlus5 = document.querySelector('.plus5 .forecast-content .forecast-icon');
    iconPlus5.innerHTML = `<img src="assets/icons/${weather.hourly[5].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus5 = document.querySelector('.plus5 .forecast-content .degree');
    tempPlus5.innerHTML = `${Math.round(weather.hourly[5].temp)}<sup>o</sup>`;
    //+6
    let placeTime6 = document.querySelector('.plus6 .time');
    placeTime6.innerHTML = calcTime(weather.hourly[6].dt);

    let iconPlus6 = document.querySelector('.plus6 .forecast-content .forecast-icon');
    iconPlus6.innerHTML = `<img src="assets/icons/${weather.hourly[6].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus6 = document.querySelector('.plus6 .forecast-content .degree');
    tempPlus6.innerHTML = `${Math.round(weather.hourly[6].temp)}<sup>o</sup>`;
    //+7
    let placeTime7 = document.querySelector('.plus7 .time');
    placeTime7.innerHTML = calcTime(weather.hourly[7].dt);

    let iconPlus7 = document.querySelector('.plus7 .forecast-content .forecast-icon');
    iconPlus7.innerHTML = `<img src="assets/icons/${weather.hourly[7].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus7 = document.querySelector('.plus7 .forecast-content .degree');
    tempPlus7.innerHTML = `${Math.round(weather.hourly[7].temp)}<sup>o</sup>`;
    //+8
    let placeTime8 = document.querySelector('.plus8 .time');
    placeTime8.innerHTML = calcTime(weather.hourly[8].dt);

    let iconPlus8 = document.querySelector('.plus8 .forecast-content .forecast-icon');
    iconPlus8.innerHTML = `<img src="assets/icons/${weather.hourly[8].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus8 = document.querySelector('.plus8 .forecast-content .degree');
    tempPlus8.innerHTML = `${Math.round(weather.hourly[8].temp)}<sup>o</sup>`;
    //+9
    let placeTime9 = document.querySelector('.plus9 .time');
    placeTime9.innerHTML = calcTime(weather.hourly[9].dt);

    let iconPlus9 = document.querySelector('.plus9 .forecast-content .forecast-icon');
    iconPlus9.innerHTML = `<img src="assets/icons/${weather.hourly[9].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus9 = document.querySelector('.plus9 .forecast-content .degree');
    tempPlus9.innerHTML = `${Math.round(weather.hourly[9].temp)}<sup>o</sup>`;
    //+10
    let placeTime10 = document.querySelector('.plus10 .time');
    placeTime10.innerHTML = calcTime(weather.hourly[10].dt);

    let iconPlus10 = document.querySelector('.plus10 .forecast-content .forecast-icon');
    iconPlus10.innerHTML = `<img src="assets/icons/${weather.hourly[10].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus10 = document.querySelector('.plus10 .forecast-content .degree');
    tempPlus10.innerHTML = `${Math.round(weather.hourly[10].temp)}<sup>o</sup>`;
    //+11
    let placeTime11 = document.querySelector('.plus11 .time');
    placeTime11.innerHTML = calcTime(weather.hourly[11].dt);

    let iconPlus11 = document.querySelector('.plus11 .forecast-content .forecast-icon');
    iconPlus11.innerHTML = `<img src="assets/icons/${weather.hourly[11].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus11 = document.querySelector('.plus11 .forecast-content .degree');
    tempPlus11.innerHTML = `${Math.round(weather.hourly[11].temp)}<sup>o</sup>`;
    //+12
    let placeTime12 = document.querySelector('.plus12 .time');
    placeTime12.innerHTML = calcTime(weather.hourly[12].dt);

    let iconPlus12 = document.querySelector('.plus12 .forecast-content .forecast-icon');
    iconPlus12.innerHTML = `<img src="assets/icons/${weather.hourly[12].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus12 = document.querySelector('.plus12 .forecast-content .degree');
    tempPlus12.innerHTML = `${Math.round(weather.hourly[12].temp)}<sup>o</sup>`;
    //+13
    let placeTime13 = document.querySelector('.plus13 .time');
    placeTime13.innerHTML = calcTime(weather.hourly[13].dt);

    let iconPlus13 = document.querySelector('.plus13 .forecast-content .forecast-icon');
    iconPlus13.innerHTML = `<img src="assets/icons/${weather.hourly[13].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus13 = document.querySelector('.plus13 .forecast-content .degree');
    tempPlus13.innerHTML = `${Math.round(weather.hourly[13].temp)}<sup>o</sup>`;
    //+14
    let placeTime14 = document.querySelector('.plus14 .time');
    placeTime14.innerHTML = calcTime(weather.hourly[14].dt);

    let iconPlus14 = document.querySelector('.plus14 .forecast-content .forecast-icon');
    iconPlus14.innerHTML = `<img src="assets/icons/${weather.hourly[14].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus14 = document.querySelector('.plus14 .forecast-content .degree');
    tempPlus14.innerHTML = `${Math.round(weather.hourly[14].temp)}<sup>o</sup>`;
    //+15
    let placeTime15 = document.querySelector('.plus15 .time');
    placeTime15.innerHTML = calcTime(weather.hourly[15].dt);

    let iconPlus15 = document.querySelector('.plus15 .forecast-content .forecast-icon');
    iconPlus15.innerHTML = `<img src="assets/icons/${weather.hourly[15].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus15 = document.querySelector('.plus15 .forecast-content .degree');
    tempPlus15.innerHTML = `${Math.round(weather.hourly[15].temp)}<sup>o</sup>`;
    //+16
    let placeTime16 = document.querySelector('.plus16 .time');
    placeTime16.innerHTML = calcTime(weather.hourly[16].dt);

    let iconPlus16 = document.querySelector('.plus16 .forecast-content .forecast-icon');
    iconPlus16.innerHTML = `<img src="assets/icons/${weather.hourly[16].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus16 = document.querySelector('.plus16 .forecast-content .degree');
    tempPlus16.innerHTML = `${Math.round(weather.hourly[16].temp)}<sup>o</sup>`;
    //+17
    let placeTime17 = document.querySelector('.plus17 .time');
    placeTime17.innerHTML = calcTime(weather.hourly[17].dt);

    let iconPlus17 = document.querySelector('.plus17 .forecast-content .forecast-icon');
    iconPlus17.innerHTML = `<img src="assets/icons/${weather.hourly[17].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus17 = document.querySelector('.plus17 .forecast-content .degree');
    tempPlus17.innerHTML = `${Math.round(weather.hourly[17].temp)}<sup>o</sup>`;
    //+18
    let placeTime18 = document.querySelector('.plus18 .time');
    placeTime18.innerHTML = calcTime(weather.hourly[18].dt);

    let iconPlus18 = document.querySelector('.plus18 .forecast-content .forecast-icon');
    iconPlus18.innerHTML = `<img src="assets/icons/${weather.hourly[18].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus18 = document.querySelector('.plus18 .forecast-content .degree');
    tempPlus18.innerHTML = `${Math.round(weather.hourly[18].temp)}<sup>o</sup>`;
    //+19
    let placeTime19 = document.querySelector('.plus19 .time');
    placeTime19.innerHTML = calcTime(weather.hourly[19].dt);

    let iconPlus19 = document.querySelector('.plus19 .forecast-content .forecast-icon');
    iconPlus19.innerHTML = `<img src="assets/icons/${weather.hourly[19].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus19 = document.querySelector('.plus19 .forecast-content .degree');
    tempPlus19.innerHTML = `${Math.round(weather.hourly[19].temp)}<sup>o</sup>`;
    //+20
    let placeTime20 = document.querySelector('.plus20 .time');
    placeTime20.innerHTML = calcTime(weather.hourly[20].dt);

    let iconPlus20 = document.querySelector('.plus20 .forecast-content .forecast-icon');
    iconPlus20.innerHTML = `<img src="assets/icons/${weather.hourly[20].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus20 = document.querySelector('.plus20 .forecast-content .degree');
    tempPlus20.innerHTML = `${Math.round(weather.hourly[20].temp)}<sup>o</sup>`;
    //+21
    let placeTime21 = document.querySelector('.plus21 .time');
    placeTime21.innerHTML = calcTime(weather.hourly[21].dt);

    let iconPlus21 = document.querySelector('.plus21 .forecast-content .forecast-icon');
    iconPlus21.innerHTML = `<img src="assets/icons/${weather.hourly[21].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus21 = document.querySelector('.plus21 .forecast-content .degree');
    tempPlus21.innerHTML = `${Math.round(weather.hourly[21].temp)}<sup>o</sup>`;
    //+22
    let placeTime22 = document.querySelector('.plus22 .time');
    placeTime22.innerHTML = calcTime(weather.hourly[22].dt);

    let iconPlus22 = document.querySelector('.plus22 .forecast-content .forecast-icon');
    iconPlus22.innerHTML = `<img src="assets/icons/${weather.hourly[22].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus22 = document.querySelector('.plus22 .forecast-content .degree');
    tempPlus22.innerHTML = `${Math.round(weather.hourly[22].temp)}<sup>o</sup>`;
    //+23
    let placeTime23 = document.querySelector('.plus23 .time');
    placeTime23.innerHTML = calcTime(weather.hourly[23].dt);

    let iconPlus23 = document.querySelector('.plus23 .forecast-content .forecast-icon');
    iconPlus23.innerHTML = `<img src="assets/icons/${weather.hourly[23].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus23 = document.querySelector('.plus23 .forecast-content .degree');
    tempPlus23.innerHTML = `${Math.round(weather.hourly[23].temp)}<sup>o</sup>`;
    //+24
    let placeTime24 = document.querySelector('.plus24 .time');
    placeTime24.innerHTML = calcTime(weather.hourly[24].dt);

    let iconPlus24 = document.querySelector('.plus24 .forecast-content .forecast-icon');
    iconPlus24.innerHTML = `<img src="assets/icons/${weather.hourly[24].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus24 = document.querySelector('.plus24 .forecast-content .degree');
    tempPlus24.innerHTML = `${Math.round(weather.hourly[24].temp)}<sup>o</sup>`;
    //+25
    let placeTime25 = document.querySelector('.plus25 .time');
    placeTime25.innerHTML = calcTime(weather.hourly[25].dt);

    let iconPlus25 = document.querySelector('.plus25 .forecast-content .forecast-icon');
    iconPlus25.innerHTML = `<img src="assets/icons/${weather.hourly[25].weather[0].icon}.png" alt="" width="38">`;

    let tempPlus25 = document.querySelector('.plus25 .forecast-content .degree');
    tempPlus25.innerHTML = `${Math.round(weather.hourly[25].temp)}<sup>o</sup>`;

    //daily first day///////////////////////////////////////////////////////////////////////////////
    //first day
    let day1 = document.querySelector('.plusday1 .day');
    day1.innerHTML = convertDay(weather.daily[1].dt);

    let icon1Day = document.querySelector('.plusday1 .icon');
    icon1Day.innerHTML = `<img src="assets/icons/${weather.daily[1].weather[0].icon}.png" alt="" width="38">`;

    let temp1day = document.querySelector('.plusday1 .temp-day');
    temp1day.innerHTML = `${Math.round(weather.daily[1].temp.day)}<sup>o</sup>`;

    let tempNight1day = document.querySelector('.plusday1 .temp-night');
    tempNight1day.innerHTML = `${Math.round(weather.daily[1].temp.night)}<sup>o</sup>`;
    //secound day
    let day2 = document.querySelector('.plusday2 .day');
    day2.innerHTML = convertDay(weather.daily[2].dt);

    let icon2Day = document.querySelector('.plusday2 .icon');
    icon2Day.innerHTML = `<img src="assets/icons/${weather.daily[2].weather[0].icon}.png" alt="" width="38">`;

    let temp2day = document.querySelector('.plusday2 .temp-day');
    temp2day.innerHTML = `${Math.round(weather.daily[2].temp.day)}<sup>o</sup>`;

    let tempNight2day = document.querySelector('.plusday2 .temp-night');
    tempNight2day.innerHTML = `${Math.round(weather.daily[2].temp.night)}<sup>o</sup>`;

    //three day
    let day3 = document.querySelector('.plusday3 .day');
    day3.innerHTML = convertDay(weather.daily[3].dt);

    let icon3Day = document.querySelector('.plusday3 .icon');
    icon3Day.innerHTML = `<img src="assets/icons/${weather.daily[3].weather[0].icon}.png" alt="" width="38">`;

    let temp3day = document.querySelector('.plusday3 .temp-day');
    temp3day.innerHTML = `${Math.round(weather.daily[3].temp.day)}<sup>o</sup>`;

    let tempNight3day = document.querySelector('.plusday3 .temp-night');
    tempNight3day.innerHTML = `${Math.round(weather.daily[3].temp.night)}<sup>o</sup>`;

    //four day
    let day4 = document.querySelector('.plusday4 .day');
    day4.innerHTML = convertDay(weather.daily[4].dt);

    let icon4Day = document.querySelector('.plusday4 .icon');
    icon4Day.innerHTML = `<img src="assets/icons/${weather.daily[4].weather[0].icon}.png" alt="" width="38">`;

    let temp4day = document.querySelector('.plusday4 .temp-day');
    temp4day.innerHTML = `${Math.round(weather.daily[4].temp.day)}<sup>o</sup>`;

    let tempNight4day = document.querySelector('.plusday4 .temp-night');
    tempNight4day.innerHTML = `${Math.round(weather.daily[4].temp.night)}<sup>o</sup>`;

    //five day
    let day5 = document.querySelector('.plusday5 .day');
    day5.innerHTML = convertDay(weather.daily[5].dt);

    let icon5Day = document.querySelector('.plusday5 .icon');
    icon5Day.innerHTML = `<img src="assets/icons/${weather.daily[5].weather[0].icon}.png" alt="" width="38">`;

    let temp5day = document.querySelector('.plusday5 .temp-day');
    temp5day.innerHTML = `${Math.round(weather.daily[5].temp.day)}<sup>o</sup>`;

    let tempNight5day = document.querySelector('.plusday5 .temp-night');
    tempNight5day.innerHTML = `${Math.round(weather.daily[5].temp.night)}<sup>o</sup>`;

    //six day
    let day6 = document.querySelector('.plusday6 .day');
    day6.innerHTML = convertDay(weather.daily[6].dt);

    let icon6Day = document.querySelector('.plusday6 .icon');
    icon6Day.innerHTML = `<img src="assets/icons/${weather.daily[6].weather[0].icon}.png" alt="" width="38">`;

    let temp6day = document.querySelector('.plusday6 .temp-day');
    temp6day.innerHTML = `${Math.round(weather.daily[6].temp.day)}<sup>o</sup>`;

    let tempNight6day = document.querySelector('.plusday6 .temp-night');
    tempNight6day.innerHTML = `${Math.round(weather.daily[6].temp.night)}<sup>o</sup>`;

    //seven day
    let day7 = document.querySelector('.plusday7 .day');
    day7.innerHTML = convertDay(weather.daily[7].dt);

    let icon7Day = document.querySelector('.plusday7 .icon');
    icon7Day.innerHTML = `<img src="assets/icons/${weather.daily[7].weather[0].icon}.png" alt="" width="38">`;

    let temp7day = document.querySelector('.plusday7 .temp-day');
    temp7day.innerHTML = `${Math.round(weather.daily[7].temp.day)}<sup>o</sup>`;

    let tempNight7day = document.querySelector('.plusday7 .temp-night');
    tempNight7day.innerHTML = `${Math.round(weather.daily[7].temp.night)}<sup>o</sup>`;

    //Additional information


    let sunrise = document.querySelector('.additionalInf .sunr_time');
    sunrise.innerHTML = convertAllTime(weather.current.sunrise);

    let sunset = document.querySelector('.additionalInf .suns_time');
    sunset.innerHTML = convertAllTime(weather.current.sunset);

    let speedwind = document.querySelector('.additionalInf .wind_speed');
    speedwind.innerHTML = `${weather.current.wind_speed} km/h`;

    windDerection(weather.current.wind_deg);

    let feeltemp = document.querySelector('.additionalInf .feels_like');
    feeltemp.innerHTML = `${Math.round(weather.current.feels_like)} °C`;

    let humidity = document.querySelector('.additionalInf .value_hum');
    humidity.innerHTML = `${weather.current.humidity} %`;

    let pressure = document.querySelector('.additionalInf .value_press');
    pressure.innerHTML = `${weather.current.pressure} hPa`;

    let visibility = document.querySelector('.additionalInf .value_visi');
    visibility.innerHTML = `${Math.round(weather.current.visibility / 1000)}<span> km</span>`;

    let cloudiness = document.querySelector('.additionalInf .value_clouds');
    cloudiness.innerHTML = `${weather.current.clouds}<span> %</span>`;

    let uvIndex = document.querySelector('.additionalInf .value_index');
    uvIndex.innerHTML = `${Math.round(weather.current.uvi)}`;
}