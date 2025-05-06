const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;


const fetchWeatherData = async (city,setLoading,setForecastData,setError,setWeatherData) => {
    try {
      setLoading(true);
      setError(null);
      const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);

      const forecastresponse = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastdata = await forecastresponse.json();
      const dailyForecast = forecastdata.list.filter(
        (_, index) => index % 8 === 0
      );

      setForecastData(dailyForecast);
      
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  export default fetchWeatherData;