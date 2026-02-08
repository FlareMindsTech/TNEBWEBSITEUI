import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../assets/tnebea_logo_cropped2.png';
import { SidebarContext } from '../context/SidebarContext';
import { fetchWeatherData, getWeatherIconUrl } from '../utils/weatherService';
import { getWeatherDescription } from '../utils/weatherDescriptions';

const Header = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const [currentTime, setCurrentTime] = useState('');
  const [headerSearch, setHeaderSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Update current time with 12-hour format
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const day = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      
      // Convert to 12-hour format
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      const hoursStr = hours.toString().padStart(2, '0');
      
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      setCurrentTime(`${day}, ${date}-${month}-${year}, ${hoursStr}:${minutes}:${seconds} ${ampm}`);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch weather with geolocation
  useEffect(() => {
    const loadWeather = async () => {
      setWeatherLoading(true);
      
      try {
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Fetch weather by coordinates (you can enhance weatherService to support coordinates)
                // For now, we'll use Chennai as default since the API is setup for city names
                const weatherData = await fetchWeatherData('Chennai');
                setWeather(weatherData);
              } catch (error) {
                console.error('Error fetching weather:', error);
                // Fallback to Chennai
                try {
                  const weatherData = await fetchWeatherData('Chennai');
                  setWeather(weatherData);
                } catch (fallbackError) {
                  console.error('Fallback weather fetch failed:', fallbackError);
                }
              } finally {
                setWeatherLoading(false);
              }
            },
            async (error) => {
              console.log('Geolocation error, using Chennai as default:', error.message);
              // If geolocation fails, default to Chennai
              try {
                const weatherData = await fetchWeatherData('Chennai');
                setWeather(weatherData);
              } catch (fallbackError) {
                console.error('Fallback weather fetch failed:', fallbackError);
              } finally {
                setWeatherLoading(false);
              }
            }
          );
        } else {
          // Geolocation not supported, use Chennai
          const weatherData = await fetchWeatherData('Chennai');
          setWeather(weatherData);
          setWeatherLoading(false);
        }
      } catch (error) {
        console.error('Error in weather loading:', error);
        setWeatherLoading(false);
      }
    };

    loadWeather();
    
    // Refresh weather every 5 minutes
    const weatherInterval = setInterval(loadWeather, 5 * 60 * 1000);
    
    return () => clearInterval(weatherInterval);
  }, []);

  const handleHeaderSearchSubmit = (e) => {
    e.preventDefault();
    if (!headerSearch.trim()) return;
  };

  const handleHeaderSearchClear = () => setHeaderSearch('');

  return (
    <>
      {/* Main Header */}
      <motion.header 
        className="main-header" 
        style={{ position: 'relative' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isSidebarOpen ? 0 : 1,
          height: isSidebarOpen ? 0 : 'auto',
          overflow: isSidebarOpen ? 'hidden' : 'visible',
          marginBottom: isSidebarOpen ? 0 : 'auto'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container-fluid" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-stretch py-2">
            {/* Logo and Title */}
            <div className="col-12 col-md-8 col-lg-9 mb-2 mb-md-0">
              <div className="d-flex align-items-center h-100">
                <motion.div 
                  className="logo-container mr-3"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  <Link to="/">
                    <motion.img
                      src={logo}
                      alt="TNEBEA Logo"
                      className="header-logo"
                      animate={{
                        filter: [
                          "drop-shadow(0 0 8px rgba(27, 91, 175, 0.3))",
                          "drop-shadow(0 0 15px rgba(72, 169, 230, 0.6))",
                          "drop-shadow(0 0 8px rgba(27, 91, 175, 0.3))"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </Link>
                </motion.div>
                <motion.div 
                  className="header-text" 
                  style={{ color: '#1b5baf' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.h1 
                    className="mb-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Tamilnadu Electricity Board | Engineers Association
                  </motion.h1>
                  <motion.p 
                    className="text-secondary sub-heading mb-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    The association was formed &amp; registered in 1946.
                  </motion.p>
                </motion.div>
              </div>
            </div>

            {/* Search and Time */}
            <motion.div 
              className="col-12 col-md-4 col-lg-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="header-right" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <motion.form 
                  className="search-form mb-0"
                  onSubmit={handleHeaderSearchSubmit}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <motion.div 
                    className="input-group"
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '25px',
                      padding: '8px 16px',
                      border: '2px solid rgba(27, 91, 175, 0.2)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{
                      boxShadow: '0 6px 20px rgba(27, 91, 175, 0.15)',
                      borderColor: 'rgba(27, 91, 175, 0.4)',
                      y: -2
                    }}
                    whileFocus={{
                      boxShadow: '0 8px 25px rgba(27, 91, 175, 0.25)',
                      borderColor: '#1b5baf'
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FaSearch style={{ color: '#1b5baf', fontSize: '14px', marginRight: '10px' }} />
                    </motion.div>
                    <motion.input
                      type="text"
                      className="form-control"
                      placeholder="Search resources..."
                      value={headerSearch}
                      onChange={(e) => setHeaderSearch(e.target.value)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: '14px',
                        flex: 1,
                        padding: 0,
                        boxShadow: 'none',
                        color: '#333'
                      }}
                      whileFocus={{
                        scale: 1.01,
                        transition: { duration: 0.2 }
                      }}
                    />
                    {headerSearch && (
                      <motion.button
                        type="button"
                        onClick={handleHeaderSearchClear}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#999',
                          marginLeft: '8px'
                        }}
                      >
                        <FaTimes style={{ fontSize: '12px' }} />
                      </motion.button>
                    )}
                  </motion.div>
                </motion.form>
                
                {/* Weather and Time Display in One Line */}
                <motion.div 
                  className="weather-time-display"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.85 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '20px',
                    padding: '6px 12px',
                    border: '2px solid rgba(27, 91, 175, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    gap: '8px',
                    fontSize: '13px',
                    flexWrap: 'nowrap'
                  }}
                >
                  {/* Weather Section */}
                  {weather && !weatherLoading && (
                    <>
                      <div 
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}
                        title={`${weather.city} - ${weather.temperature}°C - Feels like ${weather.feelsLike}°C - Humidity: ${weather.humidity}% - ${weather.description}`}
                      >
                        <img 
                          src={getWeatherIconUrl(weather.icon)} 
                          alt={weather.description}
                          style={{ width: '20px', height: '20px', flexShrink: 0 }}
                        />
                        <span style={{ fontWeight: '600', color: '#1b5baf', whiteSpace: 'nowrap', fontSize: '12px' }}>
                          {weather.temperature}°C
                        </span>
                        <span style={{ fontSize: '11px', color: '#666', textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {getWeatherDescription(weather.main, weather.description).description}
                        </span>
                      </div>
                      
                      <div style={{ width: '1px', height: '16px', background: 'rgba(27, 91, 175, 0.2)', flexShrink: 0 }}></div>
                    </>
                  )}
                  
                  {/* Time Section */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    <span style={{ fontSize: '14px' }}>⏰</span>
                    <span style={{ 
                      fontWeight: 600, 
                      color: '#1b5baf', 
                      letterSpacing: '0.3px',
                      whiteSpace: 'nowrap',
                      fontSize: '11px'
                    }}>
                      {currentTime}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Navigation */}
      <Navbar />
    </>
  );
};

export default Header;