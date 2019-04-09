//Other cities

const otherCities = async () => {
    try {
        const dataRes = await fetch("http://api.openweathermap.org/data/2.5/group?id=7530858,6695624,7531002,3094802&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5");
        return dataRes.json();
    } catch (err) {
        console.log(err);
    }
}

const currentWeatherOtherDisplay = async () => {
    try {
        const dataObject = await otherCities();
        //Poznan
        const poznan = document.querySelector(".poz~p.deg");
        poznan.innerText = `${Math.round(dataObject.list[0].main.temp)}°C`;
        const pozType = document.querySelector(".poz~p.word");
        pozType.innerText = dataObject.list[0].weather[0].main;
        //Warszawa
        const wawa = document.querySelector(".wawa~p.deg");
        wawa.innerText = `${Math.round(dataObject.list[1].main.temp)}°C`;
        const wawaType = document.querySelector(".wawa~p.word");
        wawaType.innerText = dataObject.list[1].weather[0].main;
        //Grańsk
        const gdansk = document.querySelector(".gda~p.deg");
        gdansk.innerText = `${Math.round(dataObject.list[2].main.temp)}°C`;
        const gdaType = document.querySelector(".gda~p.word");
        gdaType.innerText = dataObject.list[2].weather[0].main;
        // Karaków
        const krakow = document.querySelector(".krk~p.deg");
        krakow.innerText = `${Math.round(dataObject.list[3].main.temp)}°C`;
        const krkType = document.querySelector(".krk~p.word");
        krkType.innerText = dataObject.list[3].weather[0].main;
        console.log(dataObject.list[3].weather[0].main);
        console.log(dataObject);

    } catch (er) {
        console.log(er);
    }
}

currentWeatherOtherDisplay();

/*Left bar*/
function iconClick(e) {
    if (e.target.getAttribute("id") === "icon") {
        for (i = 0; i < 6; i++) {
            e.target.parentNode.children[i].setAttribute("style", "color: rgba(255, 255, 255, 0.719);");
        }
        e.target.setAttribute("style", "color: rgba(233, 203, 37, 0.76);");
    }
}

document.addEventListener("click", iconClick, false);

// Selecting a city from the header, getting weather for that city
let currentCity = 'Wroclaw'
let currentCityWeatherNow; // <-- feel free to use that :D
let currentCityWeatherForecast; // <-- feel free to use that :D

const iconDivsArray = Array.from(document.getElementsByClassName('city-icone'));

function changeCity() {
    const target = event.currentTarget;
    switch (target.getAttribute('id')) {
        case 'krk':
            currentCity = 'Krakow';
            break;
        case 'wwa':
            currentCity = 'Warszawa';
            break;
        case 'wro':
            currentCity = 'Wroclaw';
            break;
        case 'gda':
            currentCity = 'Gdansk';
            break;
        case 'poz':
            currentCity = 'Poznan';
            break;
        default:
            console.log('?');
            break;
    }
    getWeatherNow();
    getWeatherForecast();
    setTimeout(leftContainerInject, 3000); //temporary
}

function markCity() {
    const target = event.currentTarget;
    target.style.transform = 'scale(1.1)';
    target.children[1].style.textDecoration = 'underline';
    iconDivsArray.forEach((iconDiv) => {
        if(iconDiv !== target) {
            iconDiv.style.transform = 'scale(1)';
            iconDiv.children[1].style.textDecoration = 'none';
        }
    })
}

function prepareIconDivs() {
    iconDivsArray.forEach((iconDiv) => {
        iconDiv.addEventListener('click', changeCity);
        iconDiv.addEventListener('click', markCity);
    })
}

function initiateWroclawMarked() {
    const iconDiv = document.getElementById('wro');
    iconDiv.style.transform = 'scale(1.1)';
    iconDiv.children[1].style.textDecoration = 'underline';
}

const getWeatherNow = async () => {
    try {
        const dataResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${currentCity},pl&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5`);
        const dataObj = await dataResponse.json();
        currentCityWeatherNow = dataObj;
    } catch (err) {
        console.log(err);
    }
}

const getWeatherForecast = async () => {
    try {
        const dataResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${currentCity},pl&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5`);
        const dataObj = await dataResponse.json();
        currentCityWeatherForecast = dataObj;
    } catch (err) {
        console.log(err);
    }
}

const leftContainerInject = () => {
    const date = new Date();

    let minute = date.getMinutes();
    let month = date.getMonth();
    let weekday = date.getDay();
    let next1day = (weekday+1)%7;
    let next2day = (weekday+2)%7;
    let next3day = (weekday+3)%7;
    let next4day = (weekday+4)%7;

    if(minute<10) minute = '0' + minute.toString();

    weekday = weekdayNumberToName(weekday);
    next1day = weekdayNumberToName(next1day);
    next2day = weekdayNumberToName(next2day);
    next3day = weekdayNumberToName(next3day);
    next4day = weekdayNumberToName(next4day);

    month = monthNumberToName(month);

    document.getElementById('left-currentweather-place').innerText = `${currentCity}, Polska`;
    document.getElementById('left-currentweather-hour').innerText = `${date.getHours()}:${minute}`;
    document.getElementById('left-currentweather-date').innerText = `${date.getDate()} ${month}`;
    document.getElementById('left-currentweather-weekday').innerText = weekday;
    document.getElementById('left-currentweather-icon').setAttribute('src', `http://openweathermap.org/img/w/${currentCityWeatherNow.weather[0].icon}.png`);
    document.getElementById('left-currrentweather-temp').innerText = `${Math.round(currentCityWeatherNow.main.temp)} °C`;
    document.getElementById('lfwday1').innerText = next1day;
    document.getElementById('lfwday2').innerText = next2day;
    document.getElementById('lfwday3').innerText = next3day;
    document.getElementById('lfwday4').innerText = next4day;

}

const weekdayNumberToName = weekday => {
    switch (weekday) {
        case 1:
            weekday = 'Monday';
            break;
        case 2:
            weekday = 'Tuesday';
            break;
        case 3:
            weekday = 'Wednesday';
            break;
        case 4:
            weekday = 'Thursday';
            break;
        case 5:
            weekday = 'Friday';
            break;
        case 6:
            weekday = 'Saturday';
            break;
        case 7:
            weekday = 'Sunday';
            break;
    }
    return weekday;
}

const monthNumberToName = month => {
    switch (month) {
        case 1:
            month = 'January';
            break;
        case 2:
            month = 'February';
            break;
        case 3:
            month = 'March';
            break;
        case 4:
            month = 'April';
            break;
        case 5:
            month = 'May';
            break;
        case 6:
            month = 'June';
            break;
        case 7:
            month = 'July';
            break;
        case 8:
            month = 'August';
            break;
        case 9:
            month = 'September';
            break;
        case 10:
            month = 'October';
            break;
        case 11:
            month = 'November';
            break;
        case 12:
            month = 'December';
            break;
    }
    return month;
}

initiateWroclawMarked();
prepareIconDivs();
getWeatherNow();
getWeatherForecast();
setTimeout(leftContainerInject, 3000); //temporary

//how to extract and use data - we don't use that in the project actually
const currentWeatherWro = async () => {
    try {
        const dataRespsonse = await fetch("http://api.openweathermap.org/data/2.5/weather?q=Wroclaw,pl&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5");
        return dataRespsonse.json();
    } catch (err) {
        console.log(err);
    }
}

const forecastWro = async () => {
    try {
        const dataResponse = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=Wroclaw,pl&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5");
        return dataResponse.json();
    } catch (err) {
        console.log(err);
    }
}

const forecastWroDisplay = async () => {
    try {
        const dataObj = await forecastWro();

        console.log(dataObj);
    } catch (err) {
        console.log(err);
    }
}

const currentWeatherWroDisplay = async () => {
    try {
        const dataObj = await currentWeatherWro();

        const wroHeader = document.querySelector(".wro~p.deg");
        wroHeader.innerText = `${Math.round(dataObj.main.temp)}°C`;

        const wroType = document.querySelector(".wro~p.word");
        wroType.innerText = dataObj.weather[0].main;

        const wroLeft = document.querySelector("i+p");
        wroLeft.innerText = `${Math.round(dataObj.main.temp)}°C`;

        console.log(dataObj);

        console.log(`Wyświetlam pogodę dla: ${dataObj.name}, ${dataObj.sys.country}`);
        console.log(`Moment pobrania danych: ${dataObj.dt} unix UTC`); /* konwersja z unix do normalnej godziny? */
        console.log(`Temperatura: ${dataObj.main.temp}°C`);
        console.log(`Ciśnienie atmosfetyczne: ${dataObj.main.pressure}hPa`);
        console.log(`Wilgotność: ${dataObj.main.humidity}%`);
        console.log(`Temperatura minimalna: ${dataObj.main.temp_min}°C`);
        console.log(`Temperatura maksymalna: ${dataObj.main.temp_max}°C`);
        console.log(`Prędkość wiatru: ${dataObj.wind.speed}m/s`);
        console.log(`Zachmurzenie: ${dataObj.clouds.all}%`);

        console.log(`Typ pogody: ${dataObj.weather[0].main}`);
        console.log(`Opis: ${dataObj.weather[0].description}`);

        let rain1h;
        try {
            rain1h = dataObj.rain["1h"];
        } catch (err1) {
            rain1h = 0;
        }
        console.log(`Opady deszczu przez ostatnią godzinę: ${rain1h}mm`);

        let rain3h;
        try {
            rain3h = dataObj.rain["3h"];
        } catch (err2) {
            rain3h = 0;
        }
        console.log(`Opady deszczu przez ostatnie 3 godziny: ${rain3h}mm`);

        let snow1h;
        try {
            snow1h = dataObj.snow["1h"];
        } catch (err3) {
            snow1h = 0;
        }
        console.log(`Opady śniegu przez ostatnią godzinę: ${snow1h}mm`);

        let snow3h;
        try {
            snow3h = dataObj.snow["3h"];
        } catch (err4) {
            snow3h = 0;
        }
        console.log(`Opady śniegu przez ostatnie 3 godziny: ${snow3h}mm`);
    } catch (err0) {
        console.log(err0);
    }
}