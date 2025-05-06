const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchWeatherData = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) throw new Error(`City not found: ${response.statusText}`);
  
  const weatherData = await response.json();

  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!forecastResponse.ok) throw new Error(`Forecast data not found: ${forecastResponse.statusText}`);

  const forecastData = await forecastResponse.json();
  const dailyForecast = forecastData.list.filter(
    (_, index) => index % 8 === 0
  );

  return {
    weatherData,
    forecastData: dailyForecast
  };
};

export default fetchWeatherData;
