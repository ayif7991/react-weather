# React Weather App

A simple weather application built with React that displays the current weather and a 5-day forecast for any city using the OpenWeatherMap API.

## Features

- Detects and displays weather based on user's current location (with permission).
- Search for weather information by city name.
- Display current weather details, including:
  - Temperature
  - Weather condition
  - Humidity
  - Wind speed.
- Show a 5-day weather forecast with daily temperature and weather icons.
- Loading and error handling for API requests.

## Live Demo

Check out the live application here: [React Weather App](https://locationweather.vercel.app/)

## Screenshots

<p align="center"> <img src="image.png" alt="Home page" width="600"/> </p>

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **OpenWeatherMap API**: Provides weather data. [openweathermap](https://home.openweathermap.org/)
- **CSS**: For styling the application.
- **Vite**: Build tool for fast development.
- **Vercel**: Used for hosting the weather app.

## Develop

```shell
npm i

npm run dev
```

## Future Improvements

- Implement a logger for better debugging and error tracking.
- Add more routes to support additional features (e.g., saved cities, settings).
- Validate user input to ensure valid city names.
- Implement test cases for components and API calls.
- Add support for multiple languages and units (e.g., Celsius/Fahrenheit).
