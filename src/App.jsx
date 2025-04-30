import { useState } from 'react'

import './App.css'

function App() {
  

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
    </div>
      </div>
  </div>
  );
}

export default App
