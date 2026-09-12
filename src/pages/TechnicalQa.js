import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaChevronDown, FaDownload, FaBookOpen } from 'react-icons/fa';
import { getAllTechnicalQA } from '../api';
import FlipBookModal from '../components/FlipBookModal';
import './TechnicalQa.css';

const DocumentAccordion = ({ doc, index, isOpen, onToggle, onOpenReader }) => {
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
            {doc.subtitle ? <p className="qa-subtitle">{doc.subtitle}</p> : null}
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
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <motion.button
                  onClick={() => onOpenReader(doc)}
                  className="qa-download-btn"
                  style={{
                    background: 'linear-gradient(135deg, #ffca38 0%, #e5b020 100%)',
                    color: '#061c3d',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(255, 202, 56, 0.35)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaBookOpen /> 3D FlipBook
                </motion.button>

                {doc.path && (
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
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TechnicalQa = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getAllTechnicalQA();
        if (Array.isArray(data)) {
          const formatted = data.map((doc, i) => {
            const title = doc.title || 'Technical Document';
            const path = doc.docUrl || doc.path || doc.href || doc.file || '';

            return {
              id: doc._id || doc.id || i + 1,
              title: title,
              subtitle: doc.subtitle || '',
              description: doc.description || '',
              docUrl: path,
              path: path
            };
          });
          setDocuments(formatted);
        }
      } catch (err) {
        console.error('Error loading Technical Q&A from backend:', err);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="qa-container">
      {/* Hero Banner with Theme Background only and exact original text */}
      <div className="qa-hero">
        <div className="qa-hero-ambient-glow"></div>
        <div className="qa-hero-content">
          <h1>
            <FaBook className="qa-hero-icon" /> Technical <span className="title-highlight">Q&amp;A</span>
          </h1>
          <div className="hero-divider"></div>
          <p className="qa-hero-tagline">Expert technical references and comprehensive guides for TNEB engineers</p>
        </div>
      </div>

      <div className="qa-content">
        <div className="qa-accordion-container">
          {documents.map((doc, index) => (
            <DocumentAccordion
              key={doc.id}
              doc={doc}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              onOpenReader={(d) => setSelectedDoc(d)}
            />
          ))}
        </div>
      </div>

      {/* ── 3D FlipBook Interactive Reader Modal ── */}
      <AnimatePresence>
        {selectedDoc && (
          <FlipBookModal
            book={selectedDoc}
            onClose={() => setSelectedDoc(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechnicalQa;


