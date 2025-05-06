import { useState, useEffect } from "react";
import getCity from "./api/get-current-city.js";
import fetchWeatherData from "./api/fetch-weather-data.js";
import SearchForm from "./components/SearchForm.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import ForecastWeather from "./components/ForecastWeather.jsx";

import "./App.css";

function App() {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCity(setCity);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { weatherData, forecastData } = await fetchWeatherData(city);
        setWeatherData(weatherData);
        setForecastData(forecastData);
      } catch (error) {
        setError("Failed to fetch weather data. Please try again.");
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  if (loading) {
    return <div className="loading">Loading weather data...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="wrapper">
      <SearchForm onSearchCallback={(city) => setCity(city)} />

      <CurrentWeather weatherData={weatherData} />

      <ForecastWeather forecastData={forecastData} />
    </div>
  );
}

export default App;
