import React from 'react';
import { Link } from 'react-router-dom';
import { FaSmile } from 'react-icons/fa';
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


const Footer = () => {
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
        <div className="container" >
          <div className="row align-items-center">
            <div className="col-md-3 text-left text-white">
              <FaSmile className="mr-1" />
              <span className="small">TNEBEA</span>
            </div>
            <div className="col-md-6 text-center">
              <span className="text-white">Copyright © TNEBEA {currentYear}</span>
            </div>
            <div className="col-md-3 text-right footer-links" style={{display:'flex', alignItems:'center'}}>
              <Link to="/privacy-policy" style={{width:'100%'}}>Privacy Policy</Link>
              <Link to="/terms-and-conditions" style={{width:'100%'}}>Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
