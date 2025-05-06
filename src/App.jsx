import { useState, useEffect } from "react";
import "./App.css";
import getUserCity from "./api/get-current-city.js";
import fetchWeatherData from "./api/fetch-weather-data.js";
import SearchForm from "./components/SearchForm.jsx";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [forecastData, setForecastData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserCity(setCity);
  }, []);

  useEffect(() => {
    fetchWeatherData(
      city,
      setLoading,
      setForecastData,
      setError,
      setWeatherData
    );
  }, [city]);

  function handleSearch(e) {
    e.preventDefault();
    setCity(searchInput);
  }

  if (loading) {
    return <div className="loading">Loading weather data... Please wait!</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="wrapper">
      <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
        />
      
      {weatherData && weatherData.main && weatherData.weather && (
        <>
          <div className="header">
            <h1 className="city">{weatherData.name}</h1>
            <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
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
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <p>{Math.round(day.main.temp)}°C</p>
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
