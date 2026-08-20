import React from 'react';
import { motion, useInView } from 'framer-motion';
import { FaFilePdf, FaDownload, FaMoneyBillWave } from 'react-icons/fa';
import './ContributoryPensionScheme.css';
import CPS3 from '../assets/documents/CPS3.pdf';
import CPSExposureDraft1 from '../assets/documents/CPS-Exposure-Draft1.pdf';
import cpsIMAGE from '../assets/documents/cpsIMAGE.pdf';
import CPSINDEX from '../assets/documents/CPSINDEX.pdf';
import CPSMTCE from '../assets/documents/CPSMTCE.pdf';
import CPSOTHER from '../assets/documents/CPSOTHER.pdf';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Document Card Component
const DocumentCard = ({ doc, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
            delay: index * 0.08
          }
        }
      }}
      className="cps-document-card"
      whileHover={{ 
        scale: 1.03,
        y: -10,
        transition: { duration: 0.2 }
      }}
      onClick={() => window.open(doc.href, '_blank')}
    >
      <div className="cps-card-content">
        <motion.div
          className="cps-card-icon"
          whileHover={{ 
            rotate: 10,
            scale: 1.2,
            transition: { duration: 0.3 }
          }}
        >
          <FaFilePdf style={{ color: '#dc3545' }} />
        </motion.div>

        <h3 className="cps-card-title">{doc.title}</h3>

        <motion.div
          className="cps-card-action"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FaDownload size={14} />
          <span>Download</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ContributoryPensionScheme = () => {
  const documents = [
    { id: 1, title: 'CPS3', href: CPS3 },
    { id: 2, title: 'CPS - Exposure Draft 1', href: CPSExposureDraft1 },
    { id: 3, title: 'CPS IMAGE', href: cpsIMAGE },
    { id: 4, title: 'CPS INDEX', href: CPSINDEX },
    { id: 5, title: 'CPS MTCE', href: CPSMTCE },
    { id: 6, title: 'CPS OTHER', href: CPSOTHER }
  ];

  return (
    <div className="cps-container">
      {/* Hero Header with requested Luxury Theme */}
      <div className="cps-hero">
        <div className="cps-hero-ambient-glow"></div>
        <div className="cps-hero-content">
         
          <h1>Contributory <span className="title-highlight">Pension Scheme</span></h1>
          <div className="hero-divider"></div>
          <p className="cps-hero-tagline">Comprehensive CPS documentation and guidelines</p>
        </div>
      </div>

      <div className="cps-content">
        <motion.div
          className="cps-document-count"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FaFilePdf style={{ marginRight: '8px', color: '#dc3545' }} />
          Total <strong>{documents.length}</strong> documents available
        </motion.div>

        <motion.div
          className="cps-documents-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {documents.map((doc, index) => (
            <DocumentCard key={doc.id} doc={doc} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ContributoryPensionScheme;