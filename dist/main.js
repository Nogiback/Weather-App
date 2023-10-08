/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksRUFBRSxTQUFTLEVBQUU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0VBQW9FLFFBQVEsS0FBSyxTQUFTO0FBQzFGO0FBQ0EsNENBQTRDLGNBQWM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBUElfS0VZID0gJzI1NTVhODVlYjEwOTQ4YzQ4ZmYyMDA1NDcyMzA3MTAnO1xuXG5mdW5jdGlvbiBjb252ZXJ0V2VhdGhlckRhdGEod2VhdGhlckRhdGEpIHtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICBjaXR5OiB3ZWF0aGVyRGF0YS5sb2NhdGlvbi5uYW1lLFxuICAgIHJlZ2lvbjogd2VhdGhlckRhdGEubG9jYXRpb24ucmVnaW9uLFxuICAgIGNvdW50cnk6IHdlYXRoZXJEYXRhLmxvY2F0aW9uLmNvdW50cnksXG4gICAgY29uZGl0aW9uOiB3ZWF0aGVyRGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0LnJlcGxhY2UoXG4gICAgICAvKF5cXHd7MX0pfChcXHMrXFx3ezF9KS9nLFxuICAgICAgKGxldHRlcikgPT4gbGV0dGVyLnRvVXBwZXJDYXNlKCksXG4gICAgKSxcbiAgICBmZWVsc0xpa2U6IHtcbiAgICAgIGY6IE1hdGgucm91bmQod2VhdGhlckRhdGEuY3VycmVudC5mZWVsc2xpa2VfZiksXG4gICAgICBjOiBNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MpLFxuICAgIH0sXG4gICAgY3VycmVudFRlbXA6IHtcbiAgICAgIGY6IE1hdGgucm91bmQod2VhdGhlckRhdGEuY3VycmVudC50ZW1wX2YpLFxuICAgICAgYzogTWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXBfYyksXG4gICAgfSxcbiAgICB3aW5kOiB7XG4gICAgICBkaXJlY3Rpb246IHdlYXRoZXJEYXRhLmN1cnJlbnQud2luZF9kaXIsXG4gICAgICBrcGg6IHdlYXRoZXJEYXRhLmN1cnJlbnQud2luZF9rcGgsXG4gICAgICBtcGg6IHdlYXRoZXJEYXRhLmN1cnJlbnQud2luZF9tcGgsXG4gICAgfSxcbiAgICBodW1pZGl0eTogd2VhdGhlckRhdGEuY3VycmVudC5odW1pZGl0eSxcbiAgICBpY29uOiB3ZWF0aGVyRGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uLFxuICAgIHRpbWU6IHdlYXRoZXJEYXRhLmxvY2F0aW9uLmxvY2FsdGltZSxcbiAgfTtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XG4gIGNvbnN0IGNhbGxBUEkgPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT0ke0FQSV9LRVl9JnE9JHtsb2NhdGlvbn1gO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY2FsbEFQSSwgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICBjb25zb2xlLmxvZygnQ2l0eSBub3QgZm91bmQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHJhd1dlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gY29udmVydFdlYXRoZXJEYXRhKHJhd1dlYXRoZXJEYXRhKTtcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGFsZXJ0KGVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5nZXRXZWF0aGVyRGF0YSgnVG9yb250bycpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9