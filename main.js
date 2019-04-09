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

currentWeatherWroDisplay();
forecastWroDisplay();

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