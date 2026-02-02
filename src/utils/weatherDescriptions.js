// Weather description mapper with emojis and icons
export const getWeatherDescription = (weatherMain, weatherDescription) => {
  const weatherMain_lower = weatherMain.toLowerCase();
  
  const weatherMap = {
    'clear': {
      emoji: '☀️',
      description: 'Sunny',
      color: '#FFD700'
    },
    'clouds': {
      emoji: '☁️',
      description: 'Cloudy',
      color: '#A9A9A9'
    },
    'rain': {
      emoji: '🌧️',
      description: 'Rainy',
      color: '#4682B4'
    },
    'drizzle': {
      emoji: '🌦️',
      description: 'Light Rain',
      color: '#6495ED'
    },
    'thunderstorm': {
      emoji: '⛈️',
      description: 'Stormy',
      color: '#2F4F4F'
    },
    'mist': {
      emoji: '🌫️',
      description: 'Misty',
      color: '#B0C4DE'
    },
    'smoke': {
      emoji: '💨',
      description: 'Smoky',
      color: '#696969'
    },
    'haze': {
      emoji: '🌫️',
      description: 'Hazy',
      color: '#D3D3D3'
    },
    'dust': {
      emoji: '🌪️',
      description: 'Dusty',
      color: '#DEB887'
    },
    'fog': {
      emoji: '🌫️',
      description: 'Foggy',
      color: '#C0C0C0'
    },
    'sand': {
      emoji: '🏜️',
      description: 'Sandy',
      color: '#F4A460'
    },
    'ash': {
      emoji: '🌋',
      description: 'Ash',
      color: '#696969'
    },
    'squall': {
      emoji: '💨',
      description: 'Windy',
      color: '#708090'
    },
    'tornado': {
      emoji: '🌪️',
      description: 'Tornado',
      color: '#8B4513'
    },
    'snow': {
      emoji: '❄️',
      description: 'Snowy',
      color: '#F0F8FF'
    }
  };

  // Check for wind in description
  if (weatherDescription && weatherDescription.toLowerCase().includes('wind')) {
    return {
      emoji: '💨',
      description: 'Windy',
      color: '#708090'
    };
  }

  // Return matched weather or default
  return weatherMap[weatherMain_lower] || {
    emoji: '🌤️',
    description: weatherMain,
    color: '#4169E1'
  };
};

/**
 * Get weather recommendations
 * @param {string} weatherMain - Main weather condition
 * @returns {string} Recommendation
 */
export const getWeatherRecommendation = (weatherMain) => {
  const recommendationMap = {
    'clear': '☀️ It\'s sunny! Great day for outdoor activities.',
    'clouds': '☁️ Cloudy weather. You might want to carry an umbrella just in case.',
    'rain': '🌧️ It\'s raining! Stay indoors or bring an umbrella if you go out.',
    'drizzle': '🌦️ Light rain expected. A light jacket should be enough.',
    'thunderstorm': '⛈️ Thunderstorm warning! Please stay indoors for safety.',
    'mist': '🌫️ Misty outside. Visibility is low - drive carefully.',
    'smoke': '💨 Smoky conditions. Wear a mask if you\'re going outside.',
    'haze': '🌫️ Hazy weather. Air quality might be affected.',
    'dust': '🌪️ Dusty weather. Keep your windows closed.',
    'fog': '🌫️ Foggy conditions. Visibility is low, drive with caution.',
    'sand': '🏜️ Sandy weather. Protect your eyes and nose.',
    'ash': '🌋 Ashy conditions. Wear a protective mask if outdoors.',
    'squall': '💨 Very windy! Secure any loose items outside.',
    'tornado': '🌪️ Tornado warning! Seek shelter immediately!',
    'snow': '❄️ Snowy weather. It\'s cold outside!'
  };

  return recommendationMap[weatherMain.toLowerCase()] || 'Check the weather for more details.';
};

/**
 * Get weather icon URL from OpenWeatherMap
 * @param {string} iconCode - Icon code from weather data
 * @returns {string} Icon URL
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
