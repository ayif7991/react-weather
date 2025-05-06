import React from 'react';

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return null; 
  }

  return (
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
            <p className="bold-text">
              {Math.round(weatherData.main.humidity)}%
            </p>
          </div>
          <div>
            <p>Wind Speed</p>
            <p className="bold-text">
              {Math.round(weatherData.wind.speed)} mph
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
