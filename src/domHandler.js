import weatherHandler from './weatherHandler';

const domHandler = (() => {
  function initPage() {
    const form = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const submitBtn = document.getElementById('search-btn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
    });

    submitBtn.addEventListener('click', async () => {
      if (searchInput.value === '') {
        return;
      }
      const weatherData = await weatherHandler.getWeatherData(searchInput.value);
      changeBackground(weatherData);
      createWeatherCard(weatherData);
    });
  }

  function changeBackground(weatherData) {
    const main = document.querySelector('.main');
    const weatherCard = document.querySelector('.weather-card');

    if (!weatherData.isDay) {
      main.style.background = 'var(--nightradial)';
      weatherCard.style.color = 'var(--lighterblue)';
    } else if (
      weatherData.condition.includes('Sunny') ||
      weatherData.condition.includes('Partly')
    ) {
      main.style.background = 'var(--sunnyradial)';
      weatherCard.style.color = 'var(--darkblue)';
    } else {
      main.style.background = 'var(--cloudyradial)';
      weatherCard.style.color = 'var(--darkblue)';
    }
  }

  function createWeatherCard(weatherData) {
    if (!weatherData) {
      return;
    }
    const weatherCard = document.querySelector('.weather-card');
    weatherCard.classList.add('active');

    const location = document.getElementById('location-header');
    const date = document.getElementById('date-header');
    const conditions = document.getElementById('conditions');
    const currentTemp = document.getElementById('current-temp');
    const feelsLike = document.getElementById('feels-like');
    const chanceOfRain = document.getElementById('chance-data');
    const wind = document.getElementById('wind-data');
    const humidity = document.getElementById('humidity-data');
    const uvIndex = document.getElementById('uv-data');
    const sunrise = document.getElementById('sunrise-data');
    const sunset = document.getElementById('sunset-data');

    if (weatherData.country === 'United States of America') {
      location.textContent = `${weatherData.city}, ${weatherData.region}, USA`;
    } else if (weatherData.region.length > 12) {
      location.textContent = `${weatherData.city}, ${weatherData.country}`;
    } else {
      location.textContent = `${weatherData.city}, ${weatherData.region}, ${weatherData.country}`;
    }
    date.textContent = `${weatherData.date}`;
    conditions.textContent = `${weatherData.condition}`;
    // Note: add logic for if C or F is toggled, change temps
    currentTemp.textContent = `${weatherData.currentTemp.c}°`;
    feelsLike.textContent = `Feels like ${weatherData.feelsLike.c}°`;
    chanceOfRain.textContent = `${weatherData.chanceRain}%`;
    // Note add logic if imperial or metric is toggled, change units
    wind.textContent = `${weatherData.wind.kph} km/h ${weatherData.wind.direction}`;
    humidity.textContent = `${weatherData.humidity}%`;
    uvIndex.textContent = `${weatherData.uvIndex}`;
    sunrise.textContent = `${weatherData.sunrise}`;
    sunset.textContent = `${weatherData.sunset}`;
  }

  return { initPage, createWeatherCard };
})();

export default domHandler;
