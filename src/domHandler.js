import weatherHandler from './weatherHandler';

const domHandler = (() => {
  function initPage() {
    const form = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const submitBtn = document.getElementById('search-btn');
    const initUnit = 'metric';

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
      createWeatherCard(weatherData, getUnits());
      deleteToggle();
      createToggle(weatherData);
    });

    // Initial search for Toronto on page load
    const initPromise = new Promise((resolve, reject) => {
      const initLocation = weatherHandler.getWeatherData('Toronto');
      resolve(initLocation);
      reject(new Error('ERROR'));
    });

    initPromise.then((initLocation) => {
      changeBackground(initLocation);
      createWeatherCard(initLocation, initUnit);
      createToggle(initLocation);
    });
  }

  function getUnits() {
    const metricBtn = document.getElementById('unit-metric');
    const imperialBtn = document.getElementById('unit-imperial');
    let units = '';

    if (metricBtn.classList.contains('active')) {
      units = 'metric';
    }

    if (imperialBtn.classList.contains('active')) {
      units = 'imperial';
    }

    return units;
  }

  function deleteToggle() {
    const metricBtn = document.getElementById('unit-metric');
    const imperialBtn = document.getElementById('unit-imperial');
    metricBtn.remove();
    imperialBtn.remove();
  }

  function createToggle(weatherData) {
    const weatherCard = document.querySelector('.weather-card');
    const toggleSection = document.querySelector('.toggle-section');
    const metricBtn = document.createElement('button');
    metricBtn.classList.add('unit-toggle');
    metricBtn.setAttribute('id', 'unit-metric');
    metricBtn.textContent = 'Metric';
    const imperialBtn = document.createElement('button');
    imperialBtn.classList.add('unit-toggle');
    imperialBtn.setAttribute('id', 'unit-imperial');
    imperialBtn.textContent = 'Imperial';

    toggleSection.appendChild(metricBtn);
    toggleSection.appendChild(imperialBtn);

    if (weatherCard.getAttribute('data-units') === 'metric') {
      metricBtn.classList.add('active');
    }
    if (weatherCard.getAttribute('data-units') === 'imperial') {
      imperialBtn.classList.add('active');
    }

    metricBtn.addEventListener('click', () => {
      if (metricBtn.classList.contains('active')) {
        return;
      }
      metricBtn.classList.add('active');
      imperialBtn.classList.remove('active');
      createWeatherCard(weatherData, 'metric');
    });

    imperialBtn.addEventListener('click', () => {
      if (imperialBtn.classList.contains('active')) {
        return;
      }
      imperialBtn.classList.add('active');
      metricBtn.classList.remove('active');
      createWeatherCard(weatherData, 'imperial');
    });
  }

  function changeBackground(weatherData) {
    const main = document.querySelector('.main');
    const weatherCard = document.querySelector('.weather-card');

    // Changes background and font color based on time of day and weather
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

  function createWeatherCard(weatherData, units) {
    if (!weatherData) {
      return;
    }
    const weatherCard = document.querySelector('.weather-card');
    weatherCard.classList.add('active');

    if (units === 'imperial') {
      weatherCard.setAttribute('data-units', 'imperial');
    }
    if (units === 'metric') {
      weatherCard.setAttribute('data-units', 'metric');
    }

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

    date.textContent = `${weatherData.date}`;
    conditions.textContent = `${weatherData.condition}`;
    chanceOfRain.textContent = `${weatherData.chanceRain}%`;
    humidity.textContent = `${weatherData.humidity}%`;
    uvIndex.textContent = `${weatherData.uvIndex}`;
    sunrise.textContent = `${weatherData.sunrise}`;
    sunset.textContent = `${weatherData.sunset}`;

    if (weatherData.country === 'United States of America') {
      location.textContent = `${weatherData.city}, ${weatherData.region}, USA`;
    } else if (weatherData.region.length > 16) {
      location.textContent = `${weatherData.city}, ${weatherData.country}`;
    } else if (weatherData.region === '') {
      location.textContent = `${weatherData.city}, ${weatherData.country}`;
    } else {
      location.textContent = `${weatherData.city}, ${weatherData.region}, ${weatherData.country}`;
    }

    if (units === 'metric') {
      currentTemp.textContent = `${weatherData.currentTemp.c}°`;
      feelsLike.textContent = `Feels like ${weatherData.feelsLike.c}°`;
      wind.textContent = `${weatherData.wind.kph} km/h ${weatherData.wind.direction}`;
    }
    if (units === 'imperial') {
      currentTemp.textContent = `${weatherData.currentTemp.f}°`;
      feelsLike.textContent = `Feels like ${weatherData.feelsLike.f}°`;
      wind.textContent = `${weatherData.wind.mph} mph ${weatherData.wind.direction}`;
    }
  }

  return { initPage };
})();

export default domHandler;
