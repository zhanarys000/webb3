
import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.8.0/dist/leaflet-src.esm.js";

document.getElementById('getWeatherButton').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    try {
        const response = await fetch(`http://localhost:3000/get-weather?cityName=${city}`);
        const data = await response.json();

        // Call the updateWeatherInfo function with the retrieved data
        updateWeatherInfo(data);

        // Other code remains the same...

        if (data.coord) {
            initMap(data.coord.lat, data.coord.lon, data.name); // Pass city name to initMap
        }
    } catch (error) {
        document.getElementById('error').innerText = 'Error fetching weather data';
        console.error('Error fetching weather data:', error);
    }
}

// Add the updateWeatherInfo function here...
function updateWeatherInfo(weatherData) {
    const weatherInfoElement = document.getElementById('weatherData');

    if (weatherData) {
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const feelsLike = weatherData.main.feels_like;
        const humidity = weatherData.main.humidity;
        const pressure = weatherData.main.pressure;
        const windSpeed = weatherData.wind.speed;
        const country = weatherData.sys.country;
        const rainVolume = weatherData.rain ? weatherData.rain['3h'] : 0;

        weatherInfoElement.innerHTML = `
            <p>Temperature: ${temperature} F</p>
            <p>Description: ${description}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            <p>Feels Like: ${feelsLike} F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Country Code: ${country}</p>
            <p>Rain Volume (last 3 hours): ${rainVolume} mm</p>
        `;

        initMap(weatherData.coord.lat, weatherData.coord.lon, weatherData.name);
    } else {
        weatherInfoElement.innerHTML = 'Failed to fetch weather data.';
    }
}

function initMap(lat, lon, cityName) {
    const map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup(cityName).openPopup();
}
