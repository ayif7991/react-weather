import { useState. useEffect } from 'react'


import './App.css'

function App() {
  const API_Key = import.meta.env.VITE_API_KEY
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');

  useEffect(() => {
    const fetchWeatherData = async (cityName) => {
      try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        console.log(data)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    };
    fetchWeatherData(city)
  },[city]);
  return (
    <div className="wrapper">
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
    <div className='forecast'>
      <h2 className='forecast-header'>5-Day Forecast</h2>
    <div className='forecast-days'>
      <div className='forecast-day'>
      <p>Monday</p>
      <p>60°F</p>
      <p>Cloudy</p>
      </div>
      <div className='forecast-day'>
      <p>Monday</p>
      <p>60°F</p>
      <p>Cloudy</p>
      </div>
    </div>
      </div>
  </div>
  );
}

export default App
