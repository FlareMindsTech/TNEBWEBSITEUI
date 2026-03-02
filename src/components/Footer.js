import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IPDSImage from '../assets/IPDS-1.gif';
import Cea from '../assets/cea.png';
import Mnre from '../assets/mnre_0.png';
import DigitalIndia from '../assets/digitalindia_0-1.png';
import Natportal from '../assets/natportal_0.png';
import PowerGrid from '../assets/powergrid_1.png';
import Pfcl from '../assets/pfcl.png';
import Minofpower from '../assets/minofpower_3.png';
import Mygov from '../assets/mygov_7.png';
import { motion } from 'framer-motion';
import { trackVisitor, getVisitorCount, getVisitorId } from '../api';
import "./Footer.css"

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeVisitorTracking = async () => {
      try {
        // Get or generate visitor ID
        const visitorId = getVisitorId();
        
        // Track visitor with ID
        const trackResponse = await trackVisitor(visitorId);
        
        // Use count from track
        if (trackResponse && trackResponse.totalVisitors !== undefined) {
          setVisitorCount(trackResponse.totalVisitors);
        } else {
          // fetch current count
          const countData = await getVisitorCount();
          setVisitorCount(countData.totalVisitors || countData.count || 0);
        }
      } catch (error) {
        console.error('Visitor tracking error:', error);
        // Fallback to just fetching count if tracking fails
        try {
          const countData = await getVisitorCount();
          setVisitorCount(countData.totalVisitors || countData.count || 0);
        } catch (err) {
          console.error('Failed to fetch visitor count:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeVisitorTracking();
  }, []);

  const formatVisitorCount = (count) => {
    if (!count) return '0';
    return count.toLocaleString('en-IN');
  };
  // Footer slider images
  const footerImages = [
    { id: 1, src: Cea, alt: "CEA", link: "http://cea.nic.in/" },
    { id: 2, src: Mnre, alt: "MNRE", link: "https://mnre.gov.in/" },
    { id: 3, src: DigitalIndia, alt: "Digital India", link: "https://www.digitalindia.gov.in/" },
    { id: 4, src: IPDSImage, alt: "IPDS", link: "http://www.ipds.gov.in/" },
    { id: 5, src: Natportal, alt: "National Portal", link: "https://npp.gov.in/" },
    { id: 6, src: PowerGrid, alt: "Power Grid", link: "http://www.powergridindia.com/" },
    { id: 7, src: Pfcl, alt: "PFC", link: "https://www.pfcindia.com/" },
    { id: 8, src: Minofpower, alt: "Ministry of Power", link: "https://powermin.nic.in/" },
    { id: 9, src: Mygov, alt: "MyGov", link: "https://www.mygov.in/" }
  ];

  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-slider">
        <div className="container">
          <motion.div
            className="slider-circular"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {[...footerImages, ...footerImages].map((img, index) => (
              <motion.div
                key={index}
                className="slider-item"
                variants={itemVariants}
                whileHover={{ scale: 1.06, rotate: 0.6 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href={img.link} target="_blank" rel="noopener noreferrer">
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="img-fluid footer-slider-img"
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-brand">
              {/* <div className="footer-logo">
                <img src={Logo} alt="TNEBEA Logo" className="footer-logo-img bg-light rounded" />
              </div> */}
              <span className="footer-brand-text">TNEBEA</span>
            </div>
            <div className="footer-copyright">
              <span>Copyright © TNEBEA {currentYear}</span>
            </div>
            <div className="footer-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </div>
            <motion.div 
              className="visitor-count-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {!isLoading && (
                <>
                  <span className="visitor-icon-wrap">
                    <svg className="visitor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span className="visitor-pulse" aria-hidden="true"></span>
                  </span>
                  <span className="visitor-count">{formatVisitorCount(visitorCount)}</span>
                  <span className="visitor-label">Visitors</span>
                </>
              )}
              {isLoading && (
                <div className="visitor-loading">
                  <div className="spinner-dot"></div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;