import { useState, useEffect } from "react";
import "./App.css";
import get_city from "./assets/Curr_loc/curr_loc.js";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [weatherData, setWeatherData] = useState(null);
  //getcity function gets the current location of the user
  //and returns the city name
  const [city, setCity] = useState('London');
  const [forecastData, setForecastData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);



  const fetchWeatherData = async (cityName) => {
  
    try {
      setLoading(true);
      setError(null);
      const url = `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);

      const forecastresponse = await fetch(
        `${BASE_URL}/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`
      );
      const forecastdata = await forecastresponse.json();
      const dailyForecast = forecastdata.list.filter(
        (index) => index % 8 === 0
      );

      setForecastData(dailyForecast);
      console.log("forecastdata:", forecastdata);
      console.log("dailyForecast:", dailyForecast);
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };
  function handleSearch(e) {
    e.preventDefault();
    setCity(searchInput);
  }

  useEffect(() => {
    get_city(setCity)
    console.log("city:", city);
  }, []);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="wrapper">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      {weatherData && weatherData.main && weatherData.weather && (
        <>
          <div className="header">
            <h1 className="city">{weatherData.name}</h1>
            <p className="temp">{Math.round(weatherData.main.temp)}°F</p>
            <p className="cond">{weatherData.weather[0].main}</p>
          </div>
          <div>
            <div className="weather-details">
              <div>
                <p>Humidity</p>
                <p style={{ fontWeight: "bold" }}>
                  {Math.round(weatherData.main.humidity)}%
                </p>
              </div>
              <div>
                <p>Wind Speed</p>
                <p style={{ fontWeight: "bold" }}>
                  {Math.round(weatherData.wind.speed)} mph
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {forecastData.length > 0 && (
        <>
          <div className="forecast">
            <h2 className="forecast-header">5-Day Forecast</h2>
            <div className="forecast-days">
              {forecastData.map((day, index) => (
                <div key={index} className="forecast-day">
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    src={`${BASE_URL}/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <p>{Math.round(day.main.temp)}°F</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
