import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaStar, FaRupeeSign, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaBolt } from 'react-icons/fa';
import './HandBook.css';

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
      <motion.section
        className="handbook-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="electricity-container">
          <motion.div className="arc-wire left-wire" />
          <motion.div className="arc-wire right-wire" />
          <motion.div className="power-center" animate={{ boxShadow: ["0 0 20px rgba(255,193,7,0.3)", "0 0 40px rgba(255,193,7,0.8)", "0 0 20px rgba(255,193,7,0.3)"] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
        <motion.div className="hero-formal-content" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          {/* <div className="formal-header-badge">Government Project</div> */}
          <motion.div className="hero-book-formal" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            <FaBook />
          </motion.div>
          <h1 className="hero-title-formal">Power Engineer's Handbook</h1>
          <div className="formal-divider"></div>
          <p className="hero-subtitle-formal">Tamil Nadu Generation and Distribution Corporation Limited (TNEB)</p>
          <p className="hero-description-formal">Official Technical Reference & Engineering Standards Publication</p>
          <motion.div className="formal-status-badge" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, type: "spring" }}>
            <motion.span  animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            Published & Approved
          </motion.div>
        </motion.div>
      </motion.section>

      <div className="handbook-main">
        <motion.section
          className="about-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading">About This Publication</h2>
          <div className="about-text">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              A prestigious publication that embodies the TNEBEA-ions Cap – utilized by DISCOM and Energy Utility Executives and students across India.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              This book represents the precious product of the Association, symbolizing the untiring efforts of its members to share unparalleled expertise and rich experience with the engineering community.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              The global recognition of practicing Engineers stands witness to the greatness of this treasure.
            </motion.p>
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
                  <h4><FaMapMarkerAlt /> Address</h4>
                  <p>T.N.E.B. Engineers' Association<br />144, Anna Salai, Chennai – 600 002<br />(Regn.No.217/94)</p>
                </div>
              </div>
              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <h4><FaPhone /> Mobile</h4>
                  <a href="tel:9487465104">94874 65104</a>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h4><FaEnvelope /> Email</h4>
                  <a href="mailto:tnebea@gmail.com">tnebea@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="contact-note">
              📧 Send digital request letter to the email address for your hard copy
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HandBook;
