import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaStar, FaRupeeSign, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaBolt, FaInfoCircle, FaBookOpen, FaUsers, FaAward, FaGlobe, FaCertificate, FaPaperPlane } from 'react-icons/fa';
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
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="edition-card"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* FRONT OF CARD (EXACT MATCH TO INFOGRAPHIC) */}
        <div className="edition-front">
          {/* Top Step Number Badge (01, 02...) */}
          <div className="edition-step-badge">
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="edition-card-inner-body">
            {/* Book Icon Circle */}
            <div className="edition-book-circle-wrap">
              <div className="edition-navy-book-circle">
                <FaBookOpen className="edition-white-book-icon" />
              </div>
            </div>

            {/* Title */}
            <h3 className="edition-title">{edition.title}</h3>

            {/* Small Gold Accent Bar */}
            <div className="edition-gold-accent-bar"></div>
          </div>

          {/* Bottom Solid Navy Year Banner */}
          <div className="edition-bottom-year-banner">
            <span className="edition-year-text">{edition.year}</span>
          </div>
        </div>

        {/* BACK OF CARD (SAPPHIRE THEME HOVER FLIP) */}
        <div className="edition-back sapphire-theme-back">
          <div className="year-box-top-shine"></div>
          <div className="edition-back-step-badge">
            Edition {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="edition-back-title">{edition.title}</h3>
          <div className="edition-gold-accent-bar"></div>
          <p className="edition-description">{edition.description}</p>
          <div className="edition-back-year-badge">
            {edition.year}
          </div>
          <div className="year-box-bottom-flare"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PricingOption = ({ option, index }) => {
  return (
    <motion.div
      className={`pricing-option ${option.featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      {option.featured && (
        <div className="price-badge">
          ★ RECOMMENDED ★
        </div>
      )}

      {/* Top Header Wrap */}
      <div className="pricing-header-wrap">
        <div className="pricing-icon-circle">
          {option.featured ? <FaAward className="pricing-top-icon" /> : <FaBookOpen className="pricing-top-icon" />}
        </div>
        <h3 className="price-category">{option.category}</h3>
        <div className="pricing-gold-bar"></div>
      </div>

      {/* Luxury Price Display */}
      <div className="price-wrapper">
        <span className="currency"><FaRupeeSign /></span>
        <span className="amount">{option.price}</span>
        <span className="price-period">/ copy</span>
      </div>

      {/* Feature Checkpoints */}
      <ul className="price-details">
        {option.details.map((detail, idx) => (
          <li key={idx}>
            <span className="check-icon-circle"><FaCheckCircle /></span>
            <span className="check-text">{detail}</span>
          </li>
        ))}
      </ul>

      {/* Bottom Note Banner */}
      <div className="price-note-banner">
        <span>{option.note}</span>
      </div>
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
          className="about-publication-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-publication-master-card">
            {/* Top-Right & Bottom-Left Navy Gold Corners */}
            <div className="pub-corner-navy-tr"></div>
            <div className="pub-corner-navy-bl"></div>

            {/* Watermark Dot Matrix Accents */}
            <div className="pub-card-dots-tr"></div>
            <div className="pub-card-dots-bl"></div>

            {/* About Publication Luxury Header INSIDE CARD */}
            <div className="pub-timeline-header text-center">
              <div className="pub-timeline-top-crest">
                <span className="crest-line left"></span>
                <span className="crest-diamond">◆</span>
                <div className="crest-circle">
                  <FaBookOpen className="crest-icon" />
                </div>
                <span className="crest-diamond">◆</span>
                <span className="crest-line right"></span>
              </div>

              <h2 className="pub-timeline-main-title">
                About This <span className="title-gold-text">Publication</span>
              </h2>

              <p className="pub-timeline-subtitle">
                A prestigious technical legacy empowering power engineers and utility leaders across India.
              </p>

              <div className="pub-timeline-flourish-divider">
                <span className="flourish-bar"></span>
                <span className="flourish-gem small">◆</span>
                <span className="flourish-gem big">◆</span>
                <span className="flourish-gem small">◆</span>
                <span className="flourish-bar"></span>
              </div>
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
          </div>
        </motion.section>

        <motion.section
          className="editions-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Timeline Infographic Header */}
          <div className="pub-timeline-header text-center">
            <div className="pub-timeline-top-crest">
              <span className="crest-line left"></span>
              <span className="crest-diamond">◆</span>
              <div className="crest-circle">
                <FaBookOpen className="crest-icon" />
              </div>
              <span className="crest-diamond">◆</span>
              <span className="crest-line right"></span>
            </div>

            <h2 className="pub-timeline-main-title">
              Publication <span className="title-gold-text">Timeline</span>
            </h2>

            <p className="pub-timeline-subtitle">
              A journey of knowledge and evolution through the years.
            </p>

            <div className="pub-timeline-flourish-divider">
              <span className="flourish-bar"></span>
              <span className="flourish-gem small">◆</span>
              <span className="flourish-gem big">◆</span>
              <span className="flourish-gem small">◆</span>
              <span className="flourish-bar"></span>
            </div>
          </div>

          {/* 5 + 3 Connected Timeline Container */}
          <div className="publication-timeline-tree">
            {/* Top Row (01 to 05) */}
            <div className="timeline-row-wrapper top-row">
              <div className="timeline-connector-bar-top"></div>
              <div className="editions-grid row-5-grid">
                {editions.slice(0, 5).map((edition, index) => (
                  <div key={index} className="timeline-card-cell">
                    <div className="timeline-node-dot"></div>
                    <div className="timeline-node-stem"></div>
                    <EditionCard edition={edition} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Interconnecting Circuit Arms */}
            <div className="timeline-circuit-transition">
              <div className="circuit-arm left"></div>
              <div className="circuit-arm right"></div>
            </div>

            {/* Bottom Row (06 to 08) */}
            <div className="timeline-row-wrapper bottom-row">
              <div className="timeline-connector-bar-bottom"></div>
              <div className="editions-grid row-3-grid">
                {editions.slice(5, 8).map((edition, index) => (
                  <div key={index + 5} className="timeline-card-cell">
                    <div className="timeline-node-dot"></div>
                    <div className="timeline-node-stem"></div>
                    <EditionCard edition={edition} index={index + 5} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="pricing-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Pricing Luxury Header */}
          <div className="pub-timeline-header text-center">
            <div className="pub-timeline-top-crest">
              <span className="crest-line left"></span>
              <span className="crest-diamond">◆</span>
              <div className="crest-circle">
                <FaRupeeSign className="crest-icon" />
              </div>
              <span className="crest-diamond">◆</span>
              <span className="crest-line right"></span>
            </div>

            <h2 className="pub-timeline-main-title">
              Get Your <span className="title-gold-text">Copy</span>
            </h2>

            <p className="pub-timeline-subtitle">
              Special publication rates for esteemed TNEBEA members and non-members.
            </p>

            <div className="pub-timeline-flourish-divider">
              <span className="flourish-bar"></span>
              <span className="flourish-gem small">◆</span>
              <span className="flourish-gem big">◆</span>
              <span className="flourish-gem small">◆</span>
              <span className="flourish-bar"></span>
            </div>
          </div>

          <div className="pricing-container">
            {pricingOptions.map((option, index) => (
              <PricingOption key={index} option={option} index={index} />
            ))}
          </div>
        </motion.section>

        <motion.section
          className="contact-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Contact Luxury Header */}
          <div className="pub-timeline-header text-center">
            <h2 className="pub-timeline-main-title">
              Contact <span className="title-gold-text">The Treasurer</span>
            </h2>

            <p className="pub-timeline-subtitle">
              Reach out directly for handbook orders, dispatch queries, and assistance.
            </p>

            <div className="pub-timeline-flourish-divider">
              <span className="flourish-bar"></span>
              <span className="flourish-gem small">◆</span>
              <span className="flourish-gem big">◆</span>
              <span className="flourish-gem small">◆</span>
              <span className="flourish-bar"></span>
            </div>
          </div>

          <div className="contact-box luxury-contact-card">
            <div className="contact-columns-grid">
              {/* Column 1: Headquarters Address */}
              <div className="contact-col-item">
                <div className="contact-icon-wrapper">
                  <div className="contact-navy-icon-circle">
                    <FaMapMarkerAlt className="contact-white-icon" />
                  </div>
                </div>

                <h4 className="contact-col-title">Headquarters Address</h4>
                <div className="contact-gold-dash"></div>

                <div className="contact-col-body">
                  <p className="contact-address-text">
                    <strong>T.N.E.B. Engineers' Association</strong><br />
                    144, Anna Salai,<br />
                    Chennai – 600 002
                  </p>
                  <div className="contact-regn-pill">
                    <FaCertificate className="contact-regn-icon" />
                    <span>Regn.No.217/94</span>
                  </div>
                </div>
              </div>

              {/* Column Divider 1 with Hollow Node */}
              <div className="contact-col-divider">
                <span className="divider-line top"></span>
                <span className="divider-hollow-node"></span>
                <span className="divider-line bottom"></span>
              </div>

              {/* Column 2: Direct Mobile */}
              <div className="contact-col-item">
                <div className="contact-icon-wrapper">
                  <div className="contact-navy-icon-circle">
                    <FaPhone className="contact-white-icon phone-icon-flipped" />
                  </div>
                </div>

                <h4 className="contact-col-title">Mobile</h4>
                <div className="contact-gold-dash"></div>

                <div className="contact-col-body">
                  <div className="contact-phone-group">
                    <p className="contact-sub-text">Vice President-I</p>
                    <a href="tel:9444355366" className="contact-solid-navy-btn">
                      <FaPhone className="contact-btn-gold-icon phone-icon-flipped" />
                      <span className="contact-btn-separator">|</span>
                      <span className="contact-btn-label">94443 55336</span>
                    </a>
                  </div>

                  <div className="contact-phone-group">
                    <p className="contact-sub-text">Treasurer Line</p>
                    <a href="tel:9487465104" className="contact-solid-navy-btn">
                      <FaPhone className="contact-btn-gold-icon phone-icon-flipped" />
                      <span className="contact-btn-separator">|</span>
                      <span className="contact-btn-label">94874 65104</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Column Divider 2 with Hollow Node */}
              <div className="contact-col-divider">
                <span className="divider-line top"></span>
                <span className="divider-hollow-node"></span>
                <span className="divider-line bottom"></span>
              </div>

              {/* Column 3: Official Email */}
              <div className="contact-col-item">
                <div className="contact-icon-wrapper">
                  <div className="contact-navy-icon-circle">
                    <FaEnvelope className="contact-white-icon" />
                  </div>
                </div>

                <h4 className="contact-col-title">Official Email</h4>
                <div className="contact-gold-dash"></div>

                <div className="contact-col-body">
                  <p className="contact-sub-text">Digital Request &amp; Orders</p>
                  <a href="mailto:tnebea@gmail.com" className="contact-solid-navy-btn email-btn">
                    <FaEnvelope className="contact-btn-gold-icon" />
                    <span className="contact-btn-separator">|</span>
                    <span className="contact-btn-label">tnebea@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Full-Width Sapphire Banner */}
            <div className="contact-bottom-sapphire-banner">
              <div className="banner-left-content">
                <div className="banner-gold-circle-icon">
                  <FaPaperPlane className="banner-paperplane-icon" />
                </div>
                <span className="banner-gold-vertical-divider"></span>
                <p className="banner-message-text">
                  Please send a digital request letter to the official email address for your handbook copy.
                </p>
              </div>

              {/* Watermark Paperplane Outline SVG */}
              <div className="banner-watermark-plane">
                <svg viewBox="0 0 100 60" width="85" height="50" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 28, 95 5, 60 55, 45 35, 95 5, 45 35, 45 55, 30 40, 5 28" opacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HandBook;
