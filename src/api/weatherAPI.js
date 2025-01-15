const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL

export const getWeatherByCoordinates = async (lat, lon) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            // `${BASE_URL}/weather?q={city name}&appid=${API_KEY}`
            // `${BASE_URL}/weather?lat={lat}&lon={lon}&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
};

const weatherCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000;

export const getCachedWeather = async (lat, lon) => {
    const cacheKey = `${lat}-${lon}`;
    const cachedData = weatherCache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.data;
    }

    const weatherData = await getWeatherByCoordinates(lat, lon);
    if (weatherData) {
        weatherCache.set(cacheKey, {
            data: weatherData,
            timestamp: Date.now()
        });
    }
    
    return weatherData;
};
