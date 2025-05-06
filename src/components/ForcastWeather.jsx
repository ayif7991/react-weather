import React from 'react';

const ForecastWeather = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) {
    return null; // Or return a loading state or error message
  }

  return (
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
  );
};

export default ForecastWeather;
