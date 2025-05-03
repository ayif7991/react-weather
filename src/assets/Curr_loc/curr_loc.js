const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// (method) Geolocation.getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback | null, options?: PositionOptions): void

const get_city = (setCity) => {
    navigator.geolocation.getCurrentPosition(
    async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const geoUrl = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const res = await fetch(geoUrl);
        const data = await res.json();
        const city = data.name;
        setCity(city)


        
    },
    (error) => {
        console.error("Error getting location:", error);
        setCity('London')
    }
    );
}




export default get_city;
    