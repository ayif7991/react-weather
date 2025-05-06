import { useState, useEffect } from "react";
import getCity from "./api/currentcity.js";
import fetchWeatherData from "./api/fetch-weather-data.js";
import SearchForm from "./components/SearchForm.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import ForecastWeather from "./components/ForcastWeather.jsx";

import "./App.css";

// Review Comment - Consider organizing imports in a consistent order:
// React core, third-party libraries, local components, assets/styles
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Review Comment - If possible, Consider creating a custom hook (useWeather) to manage weather-related state and API calls
  // This would simplify this component and make the logic reusable across components
  // Example: const { weatherData, forecastData, loading, error, updateCity } = useWeather(initialCity);
  

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

  // Review Comment - Consider adding more descriptive loading and error states
  // For example, "Loading weather data..." is more informative than just "Loading..."
  if (loading) {
    return <div className="loading">Loading weather data...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="wrapper">
      {/* Using the extracted SearchForm component */}
      <SearchForm 
        onSearch={setCity}
      />
      {/* Review Comment - This conditional rendering is complex and could be simplified
         Consider extracting this into a CurrentWeather component that handles its own conditional rendering */}
      <CurrentWeather weatherData={weatherData} />

      {/* Review Comment - Extract this forecast section into a separate ForecastList component
         This would simplify the main component and make the code more modular */}
      <ForecastWeather forecastData={forecastData} />
    </div>
  );
}

export default App;
