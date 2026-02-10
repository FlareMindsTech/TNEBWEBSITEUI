import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroScreen.css';
import logo from '../assets/tnebea_logo_cropped2.png';

const IntroScreen = ({ onComplete }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [sparks, setSparks] = useState([]);
  const [emojis, setEmojis] = useState([]);

  // Generate electric sparks
  useEffect(() => {
    const generateSparks = () => {
      const newSparks = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 2,
        size: 2 + Math.random() * 4
      }));
      setSparks(newSparks);
    };

    generateSparks();
    const interval = setInterval(generateSparks, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-trigger success after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(true);

      // Generate falling emojis
      const emojisList = ['🎉', '✨', '⚡', '🎊', '💫', '🌟', '✅', '🎯'];
      const fallingEmojis = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        emoji: emojisList[Math.floor(Math.random() * emojisList.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2
      }));
      setEmojis(fallingEmojis);

      // Complete after 3 seconds of showing success
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);


  return (
    <div className="intro-screen">
      {/* Electric Spark Background */}
      <div className="sparks-container">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="spark"
            style={{
              left: `${spark.left}%`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
            }}
            initial={{ top: '-5%', opacity: 0 }}
            animate={{
              top: '105%',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Animated electric lines */}
      <div className="electric-lines">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M 0 50 Q 250 100, 500 50 T 1000 50"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 1000 80 Q 750 30, 500 80 T 0 80"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#0099FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="intro-content"
            className="intro-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo with glow effect */}
            <motion.div
              className="intro-logo-container"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            >
              <div className="logo-glow"></div>
              <img src={logo} alt="TNEB Logo" className="intro-logo" />
            </motion.div>

            {/* Website Name */}
            <motion.h1
              className="intro-title"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              TNEB Engineers Association
            </motion.h1>

            {/* Welcome Message */}
            <motion.p
              className="intro-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Tamil Nadu Electricity Board
            </motion.p>

            <motion.p
              className="intro-tagline"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Powering Tamil Nadu's Future | Empowering Engineers
            </motion.p>

            {/* Enter Button */}
            {/* <motion.button
              className="intro-button"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(27, 91, 175, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="button-text">Enter Website</span>
            </motion.button> */}

            {/* Press Enter hint */}
            <motion.p
              className="intro-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              {/* Press <kbd>Enter</kbd> or click the button */}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="success-content"
            className="success-content"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="success-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              ✅
            </motion.div>
            <motion.h2
              className="success-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to TNEB
            </motion.h2>
            <motion.p
              className="success-message"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading your experience...
            </motion.p>

            {/* Loading bar */}
            <motion.div className="loading-bar-container">
              <motion.div
                className="loading-bar"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Confetti on Success */}
      {showSuccess && (
        <div className="emojis-container">
          {emojis.map((emoji) => (
            <motion.div
              key={emoji.id}
              className="falling-emoji"
              style={{ left: `${emoji.left}%` }}
              initial={{ top: '-10%', opacity: 1 }}
              animate={{
                top: '110%',
                opacity: [1, 1, 0],
                x: (Math.random() - 0.5) * 100,
              }}
              transition={{
                duration: emoji.duration,
                delay: emoji.delay,
                ease: 'easeIn',
              }}
            >
              {emoji.emoji}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntroScreen;
