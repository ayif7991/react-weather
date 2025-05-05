import { useState, useEffect } from "react";
import "./App.css";
import getCity from "./api/currentcity.js";
import fetchWeatherData from "./api/weatherdata.js";

// Review Comment - Consider organizing imports in a consistent order: React core, third-party libraries, local components, assets/styles
// This makes it easier to scan imports and understand dependencies at a glance

// Review Comment - This component is handling too many responsibilities. Consider breaking it down into smaller components:
// 1. SearchForm - For the city search functionality
// 2. CurrentWeather - For displaying current weather data
// 3. ForecastList - For displaying the 5-day forecast
// Smaller, focused components are easier to maintain, test, and reuse

function App() {
  
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [forecastData, setForecastData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Review Comment - If possible, Consider creating a custom hook (useWeather) to manage weather-related state and API calls
  // This would simplify this component and make the logic reusable across components
  // Example: const { weatherData, forecastData, loading, error, updateCity } = useWeather(initialCity);
  
  // Review Comment - Add space for consistent formatting and separate logical sections with blank lines
  function handleSearch(e) {
    e.preventDefault();
    // Review Comment - Add validation to prevent empty searches
    // Example: if (searchInput.trim() === '') return;
    setCity(searchInput);
  }

  useEffect(() => {
    getCity(setCity);
  }, []);

  useEffect(() => {
    fetchWeatherData(city, setLoading, setForecastData, setError, setWeatherData);
    // Review Comment - Consider using a more functional approach by returning data from API functions instead of passing setters
    // This makes the code more testable and the data flow more predictable
  }, [city]);

  // Review Comment - Consider adding more descriptive loading and error states
  // For example, "Loading weather data..." is more informative than just "Loading..."
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="wrapper">
      {/* Review Comment - Extract this form into a separate SearchForm component
         This would make the main App component cleaner and the search functionality reusable */}
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
      {/* Review Comment - This conditional rendering is complex and could be simplified
         Consider extracting this into a CurrentWeather component that handles its own conditional rendering */}
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
                {/* Review Comment - Avoid inline styles. Add a CSS class instead for better maintainability.
                   For example, create a .bold-text class in your CSS file */}
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

      {/* Review Comment - Extract this forecast section into a separate ForecastList component
         This would simplify the main component and make the code more modular */}
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
