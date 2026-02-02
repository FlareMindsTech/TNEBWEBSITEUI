import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {  FaSearch, FaTimes } from 'react-icons/fa';
import Navbar from './Navbar';
import { SidebarContext } from '../context/SidebarContext';
import { fetchWeatherData, getWeatherIconUrl } from '../utils/weatherService';
import { getWeatherDescription, getWeatherRecommendation } from '../utils/weatherDescriptions';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isSidebarOpen } = useContext(SidebarContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // search logic will soon
    }
  };

  return (
    <motion.div 
      className="search-bar-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isSidebarOpen ? 0 : 1,
        y: isSidebarOpen ? -10 : 0,
        height: isSidebarOpen ? 0 : 'auto',
        overflow: isSidebarOpen ? 'hidden' : 'visible'
      }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'linear-gradient(135deg, rgba(27, 91, 175, 0.05), rgba(72, 169, 230, 0.05))',
        padding: '12px 12px',
        borderBottom: '1px solid rgba(27, 91, 175, 0.1)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px', minWidth: '0' }}>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <motion.div 
            className="input-group"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              borderRadius: '25px',
              padding: '10px 20px',
              border: '2px solid rgba(27, 91, 175, 0.2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              boxShadow: '0 6px 20px rgba(27, 91, 175, 0.15)',
              borderColor: 'rgba(27, 91, 175, 0.4)',
              y: -2
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaSearch style={{ color: '#1b5baf', fontSize: '16px', marginRight: '12px' }} />
            </motion.div>
            <input
              type="text"
              className="form-control"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: 'clamp(13px, 2.5vw, 15px)',
                flex: 1,
                padding: 0,
                boxShadow: 'none',
                color: '#333'
              }}
            />
            {searchQuery && (
              <motion.button
                type="button"
                onClick={() => setSearchQuery('')}
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
                <FaTimes style={{ fontSize: '14px' }} />
              </motion.button>
            )}
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

const Header = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const [currentTime, setCurrentTime] = useState('');
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Update current time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const day = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      setCurrentTime(`${day}, ${date}-${month}-${year}, ${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch weather data on component mount
  useEffect(() => {
    const getWeather = async () => {
      try {
        setWeatherLoading(true);
        const data = await fetchWeatherData('Chennai');
        setWeather(data);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setWeatherLoading(false);
      }
    };

    getWeather();
  }, []);

  return (
    <>
      {/* Top Carousel with Sentences */}
      {/* <motion.div 
        className="sentence-carousel"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isSidebarOpen ? 0 : 1, 
          y: isSidebarOpen ? -20 : 0,
          display: isSidebarOpen ? 'none' : 'block'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="sentence-track">
          {[
            "Welcome to Tamilnadu Electricity Board Engineers Association",
            "Serving Engineers Since 1946",
            "Powering Tamil Nadu's Progress",
            "Engineering Excellence in Electricity"
          ].concat([
            "Welcome to Tamilnadu Electricity Board Engineers Association",
            "Serving Engineers Since 1946",
            "Powering Tamil Nadu's Progress",
            "Engineering Excellence in Electricity"
          ]).map((sentence, index) => (
            <motion.div 
              key={index} 
              className="sentence-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(255,255,255,0.8)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="circular-icon"
                animate={{ 
                  rotate: [0, 360],
                  boxShadow: [
                    "0 0 10px rgba(72, 169, 230, 0.5)",
                    "0 0 20px rgba(27, 91, 175, 0.8)",
                    "0 0 10px rgba(72, 169, 230, 0.5)"
                  ]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <img src={logo} alt="TNEBEA Icon" />
              </motion.div>
              <motion.span 
                className="sentence-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {sentence}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div> */}

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
          {/* Date, Time and Weather Section */}
          <div className="row justify-content-center py-1 py-md-2" style={{ paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
            <div className="col-12 col-md-10 col-lg-8">
              <motion.div 
                className="info-bar d-flex flex-wrap justify-content-center align-items-center gap-2 gap-md-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ minWidth: 0 }}
              >
                {/* Date and Time */}
                <motion.div 
                  className="time-display d-flex align-items-center flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ minWidth: 0 }}
                >
                  <motion.span
                    className="clock-emoji"
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: 'inline-block', marginRight: 6, fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', flexShrink: 0 }}
                  >
                    ⏰
                  </motion.span>
                  <motion.span
                    className="time-text"
                    key={currentTime}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      fontWeight: 600, 
                      fontSize: 'clamp(0.7rem, 2vw, 0.95rem)', 
                      color: '#1b5baf',
                      letterSpacing: '0.3px'
                    }}
                  >
                    {currentTime}
                  </motion.span>
                </motion.div>

                {/* Divider */}
                <span style={{ color: '#ccc', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', flex: '0 0 auto' }}>|</span>

                {/* Weather Display */}
                {!weatherLoading && weather && (
                  <motion.div 
                    className="weather-display d-flex align-items-center gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(27, 91, 175, 0.05), rgba(72, 169, 230, 0.05))',
                      padding: '6px 10px',
                      borderRadius: '20px',
                      border: '1px solid rgba(27, 91, 175, 0.1)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      minWidth: 0,
                      flex: '0 1 auto'
                    }}
                    title={getWeatherRecommendation(weather.main)}
                  >
                    {(() => {
                      const weatherDesc = getWeatherDescription(weather.main, weather.description);
                      return (
                        <>
                          <span style={{ fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', flexShrink: 0 }}>{weatherDesc.emoji}</span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                              <span style={{ 
                                fontSize: 'clamp(0.8rem, 2vw, 1rem)', 
                                fontWeight: 700, 
                                color: '#1b5baf',
                                flexShrink: 0
                              }}>
                                {weather.temperature}°C
                              </span>
                              <span style={{ 
                                fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)', 
                                fontWeight: 600,
                                color: weatherDesc.color,
                                textTransform: 'capitalize',
                                minWidth: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {weatherDesc.description}
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                )}

                {weatherLoading && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ fontSize: '1.2rem' }}
                  >
                    ⏳
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Title and Subtitle Section  */}
          <div className="row justify-content-center py-2 py-md-3" style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className="col-12" style={{ minWidth: 0 }}>
              <motion.div 
                className="header-text text-center" 
                style={{ color: '#1b5baf', wordBreak: 'break-word' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.h1 
                  className="mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{ 
                    fontSize: 'clamp(0.95rem, 5vw, 1.8rem)',
                    fontWeight: 700,
                    color: '#1b5baf',
                    lineHeight: '1.2',
                    margin: 0
                  }}
                >
                  Tamilnadu Electricity Board | Engineers Association
                </motion.h1>
                <motion.p 
                  className="text-secondary sub-heading mb-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  style={{
                    fontSize: 'clamp(0.75rem, 3vw, 1rem)',
                    color: '#666',
                    lineHeight: '1.4'
                  }}
                >
                  The association was formed &amp; registered in 1946.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Navigation */}
      <Navbar />

      {/* Search Bar */}
      <SearchBar />
    </>
  );
};

export default Header;
