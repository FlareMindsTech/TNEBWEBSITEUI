import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaStar, FaRupeeSign, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaBolt, FaInfoCircle, FaBookOpen, FaUsers, FaAward, FaGlobe } from 'react-icons/fa';
import './HandBook.css';
import handbookCover from '../assets/handbook_cover.jpg';

const EditionCard = ({ edition, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="edition-card-wrapper"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="edition-card"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="edition-front">
          <div className="edition-icon">📖</div>
          <h3 className="edition-title">{edition.title}</h3>
          <p className="edition-year">{edition.year}</p>
        </div>
        <div className="edition-back">
          <p className="edition-description">{edition.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PricingOption = ({ option, index }) => {
  return (
    <motion.div
      className={`pricing-option ${option.featured ? 'featured' : ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(27, 91, 175, 0.3)" }}
    >
      {option.featured && (
        <motion.div
          className="price-badge"
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        >
          POPULAR
        </motion.div>
      )}
      <h3 className="price-category">{option.category}</h3>
      <div className="price-wrapper">
        <span className="currency"><FaRupeeSign /></span>
        <span className="amount">{option.price}</span>
      </div>
      <ul className="price-details">
        {option.details.map((detail, idx) => (
          <li key={idx}><FaCheckCircle /> {detail}</li>
        ))}
      </ul>
      <p className="price-note">{option.note}</p>
    </motion.div>
  );
};

const HandBook = () => {
  const editions = [
    { title: "Technical Diary", year: "1947", description: "The beginning of TNEBEA's publishing legacy" },
    { title: "1st Edition", year: "1957", description: "First comprehensive Power Engineers Handbook" },
    { title: "2nd Edition", year: "1959", description: "Updated with new technical insights" },
    { title: "3rd Edition", year: "1964", description: "Further expanded scope and content" },
    { title: "4th Edition", year: "1968", description: "Modern engineering standards included" },
    { title: "5th Edition", year: "1976", description: "Major revision and enhancement" },
    { title: "6th Edition", year: "2002", description: "Latest enlarged and revised edition" },
    { title: "Reprint", year: "2011", description: "Reprinted to meet growing demand" }
  ];

  const pricingOptions = [
    {
      category: "TNEBEA Members",
      price: "1,500",
      featured: true,
      details: [
        "Contact Branch Secretary",
        "Quote your LM Number",
        "Request via Branch Secretary"
      ],
      note: "Exclusive member rate"
    },
    {
      category: "Non-Members",
      price: "3,000",
      featured: false,
      details: [
        "Demand Draft Rs. 3,500",
        "Includes postal charges",
        "Drawn on any bank"
      ],
      note: "Subject to actual postal charges"
    }
  ];

  return (
    <div className="handbook-container">
      {/* Luxury Hero Banner matching Minnagam Theme */}
      <div className="handbook-hero">
        <div className="handbook-hero-ambient-glow"></div>
        <div className="handbook-hero-content">
          <h1>
            Power Engineer's <span className="title-highlight">Handbook</span>
          </h1>
          <div className="hero-divider"></div>
          <p className="handbook-hero-tagline">
            Authoritative Technical Reference &amp; Guidelines for Power Engineers
          </p>
        </div>
      </div>

      <div className="handbook-main">
        <motion.div
          className="handbook-cover-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src={handbookCover} alt="Power Engineer's Handbook Cover" className="handbook-cover-image" />
        </motion.div>

        <motion.section
          className="about-publication-master-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top-Right & Bottom-Left Navy Gold Corners */}
          <div className="pub-corner-navy-tr"></div>
          <div className="pub-corner-navy-bl"></div>

          {/* Watermark Dot Matrix Accents */}
          <div className="pub-card-dots-tr"></div>
          <div className="pub-card-dots-bl"></div>

          {/* Top Circular Book Badge with Gold Dividers */}
          <div className="pub-card-header-top">
            <span className="pub-gold-divider-line left"></span>
            <span className="pub-gold-divider-dot"></span>
            <div className="pub-top-circle-badge">
              <FaBookOpen className="pub-top-icon" />
            </div>
            <span className="pub-gold-divider-dot"></span>
            <span className="pub-gold-divider-line right"></span>
          </div>

          {/* Editorial Serif Heading */}
          <h2 className="about-pub-heading">About This Publication</h2>

          {/* Golden Flourish Ornament Divider with Blue Side Lines */}
          <div className="pub-heading-flourish">
            <span className="flourish-bar left"></span>
            <svg className="flourish-svg" viewBox="0 0 80 20" width="60" height="18" fill="#d97706">
              <path d="M40 0 C44 7, 54 10, 65 10 C55 12, 48 15, 40 20 C32 15, 25 12, 15 10 C26 10, 36 7, 40 0 Z" />
              <circle cx="40" cy="10" r="2.5" fill="#f59e0b" />
            </svg>
            <span className="flourish-bar right"></span>
          </div>

          {/* 3 Structured Highlight Rows */}
          <div className="about-pub-list">
            {/* Row 1 */}
            <motion.div 
              className="about-pub-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="pub-row-icon-circle">
                <FaUsers className="pub-row-icon" />
              </div>
              <p className="pub-row-text">
                A prestigious publication that embodies the TNEBEA-ions Cap – utilized by DISCOM and Energy Utility Executives and students across India.
              </p>
            </motion.div>

            {/* Row 2 */}
            <motion.div 
              className="about-pub-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="pub-row-icon-circle">
                <FaAward className="pub-row-icon" />
              </div>
              <p className="pub-row-text">
                This book represents the precious product of the Association, symbolizing the untiring efforts of its members to share unparalleled expertise and rich experience with the engineering community.
              </p>
            </motion.div>

            {/* Row 3 */}
            <motion.div 
              className="about-pub-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="pub-row-icon-circle">
                <FaGlobe className="pub-row-icon" />
              </div>
              <p className="pub-row-text">
                The global recognition of practicing Engineers stands witness to the greatness of this treasure.
              </p>
            </motion.div>
          </div>

          {/* Bottom Sapphire Curved Arch Tab with Gold Ribbon */}
          <div className="pub-card-bottom-tab">
            <svg viewBox="0 0 60 14" width="48" height="12" fill="#ffca38">
              <path d="M30 0 C34 5, 42 7, 50 7 C42 9, 36 11, 30 14 C24 11, 18 9, 10 7 C18 7, 26 5, 30 0 Z" />
            </svg>
          </div>
        </motion.section>

        <motion.section
          className="editions-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading">Publication Timeline</h2>
          <div className="editions-grid">
            {editions.map((edition, index) => (
              <EditionCard key={index} edition={edition} index={index} />
            ))}
          </div>
        </motion.section>

        <motion.section
          className="pricing-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading">Get Your Copy</h2>
          <div className="pricing-container">
            {pricingOptions.map((option, index) => (
              <PricingOption key={index} option={option} index={index} />
            ))}
          </div>
        </motion.section>

        <motion.section
          className="contact-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading">Contact The Treasurer</h2>
          <div className="contact-box">
            <div className="contact-info">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h4> Address</h4>
                  <p>T.N.E.B. Engineers' Association<br />144, Anna Salai,<br /> Chennai – 600 002<br />(Regn.No.217/94)</p>
                </div>
              </div>
              <div className="info-item">
                <FaPhone className="info-icon phone-icon-flipped" />
                <div>
                  <h4> Mobile</h4>
                  <a href="tel:9487465104">94874 65104</a>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h4> Email</h4>
                  <a href="mailto:tnebea@gmail.com">tnebea@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="contact-note">
              <FaInfoCircle />
              <span>Send digital request letter to the email address for your hard copy</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HandBook;
