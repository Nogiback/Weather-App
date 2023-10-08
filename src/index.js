const API_KEY = '2555a85eb10948c48ff200547230710';

function convertWeatherData(weatherData) {
  const data = {
    city: weatherData.location.name,
    region: weatherData.location.region,
    country: weatherData.location.country,
    condition: weatherData.current.condition.text.replace(
      /(^\w{1})|(\s+\w{1})/g,
      (letter) => letter.toUpperCase(),
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
    icon: weatherData.current.condition.icon,
    time: weatherData.location.localtime,
  };
  return data;
}

async function getWeatherData(location) {
  const callAPI = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
  try {
    const response = await fetch(callAPI, { mode: 'cors' });
    if (response.status === 400) {
      console.log('City not found.');
    }
    const rawWeatherData = await response.json();
    const weatherData = convertWeatherData(rawWeatherData);
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    alert(error);
    return null;
  }
}

getWeatherData('Toronto');
