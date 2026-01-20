import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import './DistributionRelatedInstructions.css';

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

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10
    }
  }
};

// Document Card Component
const DocumentCard = ({ doc, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleClick = (e) => {
    e.preventDefault();
    window.open(doc.href, '_blank');
  };

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
      className="dri-document-card"
      whileHover={{ 
        scale: 1.03,
        y: -10,
        transition: { duration: 0.2 }
      }}
      onClick={handleClick}
    >
      <div className="dri-card-content">
        <motion.div
          className="dri-card-icon"
          whileHover={{ 
            rotate: 10,
            scale: 1.2,
            transition: { duration: 0.3 }
          }}
        >
          <FaFilePdf style={{ color: '#dc3545' }} />
        </motion.div>

        <h3 className="dri-card-title">{doc.title}</h3>

        <motion.div
          className="dri-card-action"
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

const DistributionRelatedInstructions = () => {
  const documents = [
    { id: 1, title: '59. 2019.12.10 Raguram - SMP 7 of 2014', href: './documents/59.-2019.12.10-Raguram-SMP-7-of-2014.pdf' },
    { id: 2, title: 'Target-1', href: './documents/Target-1.pdf' },
    { id: 3, title: 'DCW CIRCULAR – 07.10.2021', href: './documents/DCW-CIRCULAR-07.10.2021.pdf' }
  ];

  return (
    <div className="dri-container">
      <motion.div
        className="dri-header"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <motion.span
            whileHover={{ scale: 1.1, rotate: -5 }}
            style={{ display: 'inline-block' }}
          >
            ⚡
          </motion.span>
          {' '}Distribution Related Instructions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Important distribution guidelines and instructions
        </motion.p>
      </motion.div>

      <div className="dri-content">
        <motion.div
          className="dri-document-count"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <FaFilePdf style={{ marginRight: '8px', color: '#dc3545' }} />
          Total <strong>{documents.length}</strong> documents available
        </motion.div>

        <motion.div
          className="dri-documents-grid"
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

export default DistributionRelatedInstructions;
