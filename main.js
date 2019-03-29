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