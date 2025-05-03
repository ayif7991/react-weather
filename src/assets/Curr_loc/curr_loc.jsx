const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const get_city = () => {
    navigator.geolocation.getCurrentPosition(
    async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        const geoUrl = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const res = await fetch(geoUrl);
        const data = await res.json();
        console.log(data);

        const city = data.name;
        console.log("City:", city);
        return city;},
    (error) => {
        console.error("Error getting location:", error);
    }
    );
}



export default get_city;
    