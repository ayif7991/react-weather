const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Gets the user's current city using geolocation
 * @param {Function} setCityCallback - A callback function to update the city state.
 */

const getUserCity = (setCityCallback) => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const geoUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const res = await fetch(geoUrl);
      const data = await res.json();
      const city = data.name;
      setCityCallback(city);
    },
    (error) => {
      console.error("Error getting location:", error);
      setCityCallback("London");
    }
  );
};

export default getUserCity;
