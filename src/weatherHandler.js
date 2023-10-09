import { format } from 'date-fns';

const weatherHandler = (() => {
  const API_KEY = '2555a85eb10948c48ff200547230710';

  function convertWeatherData(weatherData) {
    const data = {
      city: weatherData.location.name,
      region: weatherData.location.region,
      country: weatherData.location.country,
      condition: weatherData.current.condition.text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase(),
      ),
      feelsLike: {
        f: Math.round(weatherData.current.feelslike_f),
        c: Math.round(weatherData.current.feelslike_c),
      },
      currentTemp: {
        f: Math.round(weatherData.current.temp_f),
        c: Math.round(weatherData.current.temp_c),
      },
      wind: {
        direction: weatherData.current.wind_dir,
        kph: weatherData.current.wind_kph,
        mph: weatherData.current.wind_mph,
      },
      humidity: weatherData.current.humidity,
      uvIndex: weatherData.current.uv,
      sunrise: weatherData.forecast.forecastday[0].astro.sunrise,
      sunset: weatherData.forecast.forecastday[0].astro.sunset,
      chanceRain: weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
      date: format(new Date(weatherData.location.localtime), 'EEEE MMMM d, y | h:mma'),
      isDay: weatherData.current.is_day,
    };
    return data;
  }

  async function getWeatherData(location) {
    const callAPI = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=1`;
    try {
      const response = await fetch(callAPI, { mode: 'cors' });
      if (response.status === 400) {
        console.log('City not found.');
      }
      const rawWeatherData = await response.json();
      console.log(rawWeatherData);
      const weatherData = convertWeatherData(rawWeatherData);
      console.log(weatherData);
      return weatherData;
    } catch (error) {
      alert(error);
      return null;
    }
  }

  return { getWeatherData };
})();

export default weatherHandler;
