// Weather Service with Local Storage Caching
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_KEY = 'tnebea_weather_cache';

if (!WEATHER_API_KEY) {
  console.error('Weather API key not found in environment variables');
}

/**
 * Get cached weather data from localStorage
 * @returns {Object|null} Cached weather data or null if expired
 */
const getCachedWeather = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) {
      console.log('No weather cache found');
      return null;
    }

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    const age = Math.round((now - timestamp) / 1000);

    // Check if cache is still valid (within 5 minutes)
    if (now - timestamp < CACHE_DURATION) {
      console.log(`Using cached weather data (age: ${age}s)`);
      return data;
    }

    // Cache expired, remove it
    console.log(`Weather cache expired (age: ${age}s), removing...`);
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading weather cache:', error);
    return null;
  }
};

/**
 * Save weather data to localStorage with timestamp
 * @param {Object} data - Weather data to cache
 */
const cacheWeatherData = (data) => {
  try {
    const cacheObject = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
    console.log('Weather data cached successfully', data);
  } catch (error) {
    console.error('Error caching weather data:', error);
  }
};

/**
 * Fetch weather data from OpenWeatherMap API
 * @param {string} city - City name (default: 'Chennai')
 * @returns {Promise<Object>} Weather data
 */
export const fetchWeatherData = async (city = 'Chennai') => {
  // First check if we have valid cached data
  const cachedData = getCachedWeather();
  if (cachedData) {
    console.log('Using cached weather data');
    return cachedData;
  }

  // No valid cache, fetch from API
  try {
    const url = `${WEATHER_API_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data into a simpler format
    const weatherData = {
      city: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      main: data.weather[0].main
    };

    // Cache the data
    cacheWeatherData(weatherData);

    console.log('Fetched fresh weather data from API');
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Clear weather cache from localStorage
 */
export const clearWeatherCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log('Weather cache cleared');
  } catch (error) {
    console.error('Error clearing weather cache:', error);
  }
};

/**
 * Get weather icon URL from OpenWeatherMap
 * @param {string} iconCode - Icon code from weather data
 * @returns {string} Icon URL
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
