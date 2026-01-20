import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaChevronDown, FaDownload } from 'react-icons/fa';
import './TechnicalQa.css';

const DocumentAccordion = ({ doc, index, isOpen, onToggle }) => {
  return (
    <motion.div
      className="qa-accordion-item"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <motion.button
        className="qa-accordion-header"
        onClick={onToggle}
        whileHover={{ backgroundColor: 'rgba(27, 91, 175, 0.08)' }}
      >
        <div className="qa-header-content">
          <motion.div
            className="qa-accordion-icon"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown />
          </motion.div>
          <div className="qa-header-text">
            <h4 className="qa-title">{doc.title}</h4>
            <p className="qa-subtitle">{doc.subtitle}</p>
          </div>
        </div>
        <motion.div
          animate={{ scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaBook className="qa-doc-icon" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="qa-accordion-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="qa-content-inner">
              <p className="qa-description">{doc.description}</p>
              <motion.a
                href={doc.path}
                target="_blank"
                rel="noopener noreferrer"
                className="qa-download-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload /> Download PDF
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TechnicalQa = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const documents = [
    {
      id: 1,
      title: 'Handbook on Power System Maintenance and Operations',
      subtitle: 'Complete Reference Guide',
      description: 'Comprehensive handbook containing practical guidelines for power system maintenance and operational procedures specifically designed for TNEB engineers. This resource covers essential maintenance protocols, troubleshooting techniques, and operational best practices.',
      path: './documents/CKP-sir-NOTES-COMPILATION-VOL-1.pdf'
    },
    {
      id: 2,
      title: 'CKP Sir Notes Compilation',
      subtitle: 'Volume 1 - Technical Compilation',
      description: 'Expert compiled technical notes from CKP Sir covering various aspects of power systems. This document provides in-depth technical knowledge and practical insights for TNEB engineers.',
      path: './documents/CKP-sir-NOTES-COMPILATION-VOL-1.pdf'
    }
  ];

  return (
    <div className="qa-container">
      <motion.div
        className="qa-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="qa-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FaBook className="qa-hero-icon" />
            Technical Q&A
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Expert technical references and comprehensive guides for TNEB engineers
          </motion.p>
          <motion.div
            className="qa-timeline-dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {documents.map((_, idx) => (
              <motion.div
                key={idx}
                className="qa-dot"
                animate={{
                  scale: openIndex === idx ? 1.2 : 1,
                  backgroundColor: openIndex === idx ? '#1b5baf' : '#cbd5e0'
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="qa-content">
        <div className="qa-accordion-container">
          {documents.map((doc, index) => (
            <DocumentAccordion
              key={doc.id}
              doc={doc}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalQa;
