const currentWeatherWro = async () => {
    try {
        const dataRespsonse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Wroclaw,pl&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5");
        return dataRespsonse.json();
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

        // const wroLeft = document.querySelector("i+p");
        // wroLeft.innerText = `${Math.round(dataObj.main.temp)}°C`;

    } catch (err0) {
        console.log(err0);
    }
}

//Other cities

const otherCities = async () => {
    try {
        const dataRes = await fetch("https://api.openweathermap.org/data/2.5/group?id=7530858,6695624,7531002,3094802&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5");
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
let next1dayForecastArray = []; // <-- feel free to use that :D
let next2dayForecastArray = []; // <-- feel free to use that :D
let next3dayForecastArray = []; // <-- feel free to use that :D
let next4dayForecastArray = []; // <-- feel free to use that :D
let thisDay = [];

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
    next1dayForecastArray = [];
    next2dayForecastArray = [];
    next3dayForecastArray = [];
    next4dayForecastArray = [];
    thisDay = [];
    Promise.all([getWeatherNow(), getWeatherForecast()])
        .then(() => {
            leftContainerInject();
            createGraph();
            // add here
        })
        .catch((err) => {
            console.log(err);
        })
}

function markCity() {
    const target = event.currentTarget;
    target.style.transform = 'scale(1.1)';
    target.children[1].style.textDecoration = 'underline';
    iconDivsArray.forEach((iconDiv) => {
        if (iconDiv !== target) {
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
        const dataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity},pl&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5`);
        const dataObj = await dataResponse.json();
        currentCityWeatherNow = dataObj;
    } catch (err) {
        console.log(err);
    }
}

const getWeatherForecast = async () => {
    try {
        const dataResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity},pl&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5`);
        const dataObj = await dataResponse.json();
        currentCityWeatherForecast = dataObj;
    } catch (err) {
        console.log(err);
    }
}

const leftContainerInject = () => {
    const date = new Date();

    let minute = date.getMinutes();
    let hour = date.getHours();
    let month = date.getMonth();
    let weekday = date.getDay();
    let next1day;
    let next2day;
    let next3day;
    let next4day;

    let startIndex;

    switch (weekday) {
        case 1:
            next1day = 2;
            next2day = 3;
            next3day = 4;
            next4day = 5;
            break;
        case 2:
            next1day = 3;
            next2day = 4;
            next3day = 5;
            next4day = 6;
            break;
        case 3:
            next1day = 4;
            next2day = 5;
            next3day = 6;
            next4day = 7;
            break;
        case 4:
            next1day = 5;
            next2day = 6;
            next3day = 7;
            next4day = 1;
            break;
        case 5:
            next1day = 6;
            next2day = 7;
            next3day = 1;
            next4day = 2;
            break;
        case 6:
            next1day = 7;
            next2day = 1;
            next3day = 2;
            next4day = 3;
            break;
        case 7:
            next1day = 1;
            next2day = 2;
            next3day = 3;
            next4day = 4;
            break;
    }

    if (minute < 10) minute = '0' + minute.toString();

    weekday = weekdayNumberToName(weekday);
    next1day = weekdayNumberToName(next1day);
    next2day = weekdayNumberToName(next2day);
    next3day = weekdayNumberToName(next3day);
    next4day = weekdayNumberToName(next4day);

    month = monthNumberToName(month);

    document.getElementById('left-currentweather-place').innerText = `${currentCity}, Polska`;
    document.getElementById('left-currentweather-hour').innerText = `${hour}:${minute}`;
    document.getElementById('left-currentweather-date').innerText = `${date.getDate()} ${month}`;
    document.getElementById('left-currentweather-weekday').innerText = weekday;
    document.getElementById('left-currentweather-icon').setAttribute('src', `https://openweathermap.org/img/w/${currentCityWeatherNow.weather[0].icon}.png`);
    document.getElementById('left-currrentweather-temp').innerText = `${Math.round(currentCityWeatherNow.main.temp)} °C`;
    document.getElementById('lfwday1').innerText = next1day;
    document.getElementById('lfwday2').innerText = next2day;
    document.getElementById('lfwday3').innerText = next3day;
    document.getElementById('lfwday4').innerText = next4day;

    if (hour >= 0 && hour < 3) {
        startIndex = 7;
    } else if (hour >= 3 && hour < 6) {
        startIndex = 6;
    } else if (hour >= 6 && hour < 9) {
        startIndex = 5;
    } else if (hour >= 9 && hour < 12) {
        startIndex = 4
    } else if (hour >= 12 && hour < 15) {
        startIndex = 3
    } else if (hour >= 15 && hour < 18) {
        startIndex = 2;
    } else if (hour >= 18 && hour < 21) {
        startIndex = 1;
    } else if (hour >= 21 && hour < 24) {
        startIndex = 0;
    }

    for(let i = 0; i < startIndex; i++) {
        thisDay.push(currentCityWeatherForecast.list[i]);
    }

    for (let i = startIndex; i <= startIndex + 7; i++) {
        next1dayForecastArray.push(currentCityWeatherForecast.list[i]);
    }

    for (let i = startIndex + 8; i <= startIndex + 15; i++) {
        next2dayForecastArray.push(currentCityWeatherForecast.list[i]);
    }

    for (let i = startIndex + 16; i <= startIndex + 23; i++) {
        next3dayForecastArray.push(currentCityWeatherForecast.list[i]);
    }

    for (let i = startIndex + 24; i <= startIndex + 31; i++) {
        next4dayForecastArray.push(currentCityWeatherForecast.list[i]);
    }

    document.getElementById('lfitemp1left').innerText = dayArrayMaxTemp(next1dayForecastArray);
    document.getElementById('lfitemp2left').innerText = dayArrayMaxTemp(next2dayForecastArray);
    document.getElementById('lfitemp3left').innerText = dayArrayMaxTemp(next3dayForecastArray);
    document.getElementById('lfitemp4left').innerText = dayArrayMaxTemp(next4dayForecastArray);

    document.getElementById('lfitemp1right').innerText = dayArrayMinTemp(next1dayForecastArray);
    document.getElementById('lfitemp2right').innerText = dayArrayMinTemp(next2dayForecastArray);
    document.getElementById('lfitemp3right').innerText = dayArrayMinTemp(next3dayForecastArray);
    document.getElementById('lfitemp4right').innerText = dayArrayMinTemp(next4dayForecastArray);

    document.getElementById('lfiicon1').setAttribute('src', `https://openweathermap.org/img/w/${next1dayForecastArray[4].weather[0].icon}.png`)
    document.getElementById('lfiicon2').setAttribute('src', `https://openweathermap.org/img/w/${next2dayForecastArray[4].weather[0].icon}.png`)
    document.getElementById('lfiicon3').setAttribute('src', `https://openweathermap.org/img/w/${next3dayForecastArray[4].weather[0].icon}.png`)
    document.getElementById('lfiicon4').setAttribute('src', `https://openweathermap.org/img/w/${next4dayForecastArray[4].weather[0].icon}.png`)
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

const dayArrayMinTemp = array => {
    let min = Infinity;
    array.forEach(dataObj => {
        if (dataObj.main.temp < min) min = dataObj.main.temp;
    });
    return Math.round(min);
}

const dayArrayMaxTemp = array => {
    let max = -Infinity;
    array.forEach(dataObj => {
        if (dataObj.main.temp > max) max = dataObj.main.temp;
    });
    return Math.round(max);
}

const init = () => {
    initiateWroclawMarked();
    prepareIconDivs();
    currentWeatherWroDisplay();
    currentWeatherOtherDisplay();
    Promise.all([getWeatherNow(), getWeatherForecast()])
        .then(() => {
            leftContainerInject();
            createGraph();
            // add here
        })
        .catch((err) => {
            console.log(err);
        });
}

init();

setInterval(() => {
    currentWeatherWroDisplay();
    currentWeatherOtherDisplay();
    Promise.all([getWeatherNow(), getWeatherForecast()])
        .then(() => {
            leftContainerInject();
            createGraph();
            // add here
        })
        .catch((err) => {
            console.log(err);
        })
}, 60000)

//how to extract and use data - we don't use that in the project actually
const currentWeatherWro_unused = async () => {
    try {
        const dataRespsonse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Wroclaw,pl&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5");
        return dataRespsonse.json();
    } catch (err) {
        console.log(err);
    }
}

const forecastWro = async () => {
    try {
        const dataResponse = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Wroclaw,pl&units=metric&APPID=758ec9f74b2a9503848090a6f46944c5");
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

const currentWeatherWroDisplay_unused = async () => {
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

//graph

let next1temp;
let next2temp;
let next3temp;
let next4temp;
let next5temp;
let next6temp;
let next7temp;

const createGraph = () => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 800, 0);
    gradient.addColorStop(1, "rgba(250,174,50,0.8)");
    gradient.addColorStop(0, "rgba(200,14,50,0.8)");

    const date = new Date();
    const hourG = date.getHours();

    let next1hour;
    let next2hour;
    let next3hour;
    let next4hour;
    let next5hour;
    let next6hour;
    let next7hour;

    if (hourG >= 0 && hourG < 3) {
        next1hour = 3;
        next2hour = 6;
        next3hour = 9;
        next4hour = 12;
        next5hour = 15;
        next6hour = 18;
        next7hour = 21;

        next1temp = Math.round(thisDay[0].main.temp);
        next2temp = Math.round(thisDay[1].main.temp);
        next3temp = Math.round(thisDay[2].main.temp);
        next4temp = Math.round(thisDay[3].main.temp);
        next5temp = Math.round(thisDay[4].main.temp);
        next6temp = Math.round(thisDay[5].main.temp);
        next7temp = Math.round(thisDay[6].main.temp);
    } else if (hourG >= 3 && hourG < 6) {
        next1hour = 6;
        next2hour = 9;
        next3hour = 12;
        next4hour = 15;
        next5hour = 18;
        next6hour = 21;
        next7hour = 0;

        next1temp = Math.round(thisDay[0].main.temp);
        next2temp = Math.round(thisDay[1].main.temp);
        next3temp = Math.round(thisDay[2].main.temp);
        next4temp = Math.round(thisDay[3].main.temp);
        next5temp = Math.round(thisDay[4].main.temp);
        next6temp = Math.round(thisDay[5].main.temp);
        next7temp = Math.round(next1dayForecastArray[0].main.temp);
    } else if (hourG >= 6 && hourG < 9) {
        next1hour = 9;
        next2hour = 12;
        next3hour = 15;
        next4hour = 18;
        next5hour = 21;
        next6hour = 0;
        next7hour = 3;

        next1temp = Math.round(thisDay[0].main.temp);
        next2temp = Math.round(thisDay[1].main.temp);
        next3temp = Math.round(thisDay[2].main.temp);
        next4temp = Math.round(thisDay[3].main.temp);
        next5temp = Math.round(thisDay[4].main.temp);
        next6temp = Math.round(next1dayForecastArray[0].main.temp);
        next7temp = Math.round(next1dayForecastArray[1].main.temp);
    } else if (hourG >= 9 && hourG < 12) {
        next1hour = 12;
        next2hour = 15;
        next3hour = 18;
        next4hour = 21;
        next5hour = 0;
        next6hour = 3;
        next7hour = 6;

        next1temp = Math.round(thisDay[0].main.temp);
        next2temp = Math.round(thisDay[1].main.temp);
        next3temp = Math.round(thisDay[2].main.temp);
        next4temp = Math.round(thisDay[3].main.temp);
        next5temp = Math.round(next1dayForecastArray[0].main.temp);
        next6temp = Math.round(next1dayForecastArray[1].main.temp);
        next7temp = Math.round(next1dayForecastArray[2].main.temp);
    } else if (hourG >= 12 && hourG < 15) {
        next1hour = 15;
        next2hour = 18;
        next3hour = 21;
        next4hour = 0;
        next5hour = 3;
        next6hour = 6;
        next7hour = 9;

        next1temp = Math.round(thisDay[0].main.temp);
        next2temp = Math.round(thisDay[1].main.temp);
        next3temp = Math.round(thisDay[2].main.temp);
        next4temp = Math.round(next1dayForecastArray[0].main.temp);
        next5temp = Math.round(next1dayForecastArray[1].main.temp);
        next6temp = Math.round(next1dayForecastArray[2].main.temp);
        next7temp = Math.round(next1dayForecastArray[3].main.temp);
    } else if (hourG >= 15 && hourG < 18) {
        next1hour = 18;
        next2hour = 21;
        next3hour = 0;
        next4hour = 3;
        next5hour = 6;
        next6hour = 9;
        next7hour = 12;

        next1temp = Math.round(thisDay[0].main.temp);
        next2temp = Math.round(thisDay[1].main.temp);
        next3temp = Math.round(next1dayForecastArray[0].main.temp);
        next4temp = Math.round(next1dayForecastArray[1].main.temp);
        next5temp = Math.round(next1dayForecastArray[2].main.temp);
        next6temp = Math.round(next1dayForecastArray[3].main.temp);
        next7temp = Math.round(next1dayForecastArray[4].main.temp);
    } else if (hourG >= 18 && hourG < 21) {
        next1hour = 21;
        next2hour = 0;
        next3hour = 3;
        next4hour = 6;
        next5hour = 9;
        next6hour = 12;
        next7hour = 15;

        next1temp = Math.round(thisDay[0].main.temp);
        next2temp = Math.round(next1dayForecastArray[0].main.temp);
        next3temp = Math.round(next1dayForecastArray[1].main.temp);
        next4temp = Math.round(next1dayForecastArray[2].main.temp);
        next5temp = Math.round(next1dayForecastArray[3].main.temp);
        next6temp = Math.round(next1dayForecastArray[4].main.temp);
        next7temp = Math.round(next1dayForecastArray[5].main.temp);
    } else if (hourG >= 21 && hourG < 24) {
        next1hour = 0;
        next2hour = 3;
        next3hour = 6;
        next4hour = 9;
        next5hour = 12;
        next6hour = 15;
        next7hour = 16;

        next1temp = Math.round(next1dayForecastArray[0].main.temp);
        next2temp = Math.round(next1dayForecastArray[1].main.temp);
        next3temp = Math.round(next1dayForecastArray[2].main.temp);
        next4temp = Math.round(next1dayForecastArray[3].main.temp);
        next5temp = Math.round(next1dayForecastArray[4].main.temp);
        next6temp = Math.round(next1dayForecastArray[5].main.temp);
        next7temp = Math.round(next1dayForecastArray[6].main.temp);
    }

    if(window.bar != undefined) {
        window.bar.destroy();
    }
    window.bar = new Chart(ctx, {
        type: "line",
        data: {
            labels: [`${next1hour}`, `${next2hour}`, `${next3hour}`, `${next4hour}`, `${next5hour}`, `${next6hour}`, `${next7hour}`],
            datasets: [{
                backgroundColor: gradient,
                borderColor: "rgb(133, 5, 90, 0.5)",
                data: [next1temp, next2temp, next3temp, next4temp, next5temp, next6temp, next7temp],
                pointBackgroundColor: "rgb(50, 9, 12)"
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    position: "top",
                    stacked: true,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        fontColor: "#CCC",
                        fontSize: '16',
                        fontFamily: 'Montserrat'
                    }
                }],
                yAxes: [{
                    display: true,
                    stacked: true,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        min: -5,
                        max: 20,
                        fontFamily: 'Montserrat'
                    }
                }]
            },
            tooltips: {
                enabled: true,
                backgroundColor: "rgb(133, 5, 90)"
            },
            legend: {
                display: false
            },
            maintainAspectRatio: false
        }
    });
    canvas = document.querySelector('canvas');
    canvas.style.height = '250px';
    canvas.style.maxHeight = '250px';
    canvas.setAttribute('pointer-events', 'none');
}