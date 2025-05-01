import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const API_Key = import.meta.env.VITE_API_KEY
  console.log('API Key:', API_Key)
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [forecastData, setForecastData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  

  useEffect(() => {
    const fetchWeatherData = async (cityName) => {
      try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}&units=imperial`;
        console.log('url:', url)
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        console.log('data:', data)

        const forecastresponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_Key}&units=imperial`);
        const forecastdata = await forecastresponse.json();
        const dailyForecast = forecastdata.list.filter(
          (item,index) => index % 8 === 0
        );

        setForecastData(dailyForecast);
        console.log('forecastdata:', forecastdata)
        console.log('dailyForecast:', dailyForecast)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    };
    fetchWeatherData(city);
  },[city]);
  return (
    <div className="wrapper">
      <form className='search-form'>
        <input type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder='Enter city' 
        className='search-inp'
        />
        <button type='submit' className='search-button'>
          Search
        </button>
      </form>
      {weatherData && (weatherData.main && weatherData.weather) &&(
        <><div className='header'>
          <h1 className='city'>{weatherData.name}</h1>
          <p className='temp'>{Math.round(weatherData.main.temp)}°F</p>
          <p className='cond'>{weatherData.weather[0].main}</p>
        </div><div>
            <div className='weather-details'>
              <div>
                <p>Humidity</p>
                <p style={{ fontWeight: "bold" }}>{Math.round(weatherData.main.humidity)}%</p>
              </div>
              <div>
                <p>Wind Speed</p>
                <p style={{ fontWeight: "bold" }}>{Math.round(weatherData.wind.speed)} mph</p>
              </div>
            </div>
          </div></>
      )}
      <div className='header'>
        <h1 className='city'>London</h1>
        <p className='temp'>60°F</p>
        <p className='cond'>Cloudy</p>
      </div>
      <div className='weather-details'>
        <div>
          <p>Humidity</p>
          <p>60%</p>
        </div>
        <div>
          <p>Wind</p>
          <p>10 mph</p>
      </div>
    </div>
    {forecastData.length > 0 && (
      <>
      <div className='forecast'>
        <h2 className='forecast-header'>5-Day Forecast</h2>
        <div className='forecast-days'>
          {forecastData.map((day, index) => (
            <div key={index} className='forecast-day'>
              <p>
                {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <img 
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
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

export default App
