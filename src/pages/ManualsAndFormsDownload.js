import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaFilePdf, FaDownload, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './ManualsAndFormsDownload.css';
import conductregulations from '../assets/documents/TNEBConductRegulations.pdf';
import disciplineregulations from '../assets/documents/TNEBDARegulations.pdf';
import leaveregulations from '../assets/documents/TNEBLeaveRegulations.pdf';
import serviceregulations from '../assets/documents/TNEBServiceRegulations.pdf';
import amendments from '../assets/documents/TNERC-Amendments-to-SC-DC.pdf';
import costdata from '../assets/documents/Costdata202122-consolidated.pdf';
import maternityleave from '../assets/documents/Maternity-Leave-BPS-TNGOs.pdf';
import nhisbpsgos from '../assets/documents/NHIS-BPs-GOs.pdf';
import tnebnhis2021bp from '../assets/documents/TNEB-NHIS-2021-BP-NO-162-17721.pdf';
import courtjudgement from '../assets/documents/TNEB-CourtJudgement-nhis-father-also-as-family-02012020.pdf';

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

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6
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
  const [isAvailable] = useState(doc.href && doc.href !== '#');

  const handleDocumentClick = (e) => {
    e.preventDefault();
    if (isAvailable) {
      window.open(doc.href, '_blank');
    } else {
      Swal.fire({
        title: 'Document Not Available',
        text: 'This document is currently not available for download.',
        icon: 'info',
        confirmButtonColor: '#1b5baf',
        confirmButtonText: 'OK'
      });
    }
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
      className={`document-card ${!isAvailable ? 'empty-document' : ''}`}
      onClick={handleDocumentClick}
      whileHover={isAvailable ? { 
        scale: 1.03,
        y: -10,
        transition: { duration: 0.2 }
      } : {}}
    >
      <div className="document-card-content">
        <motion.div
          className="document-card-icon"
          whileHover={isAvailable ? { 
            rotate: 10,
            scale: 1.2,
            transition: { duration: 0.3 }
          } : {}}
        >
          {isAvailable ? (
            <FaFilePdf style={{ color: '#dc3545' }} />
          ) : (
            <FaLock style={{ color: '#999' }} />
          )}
        </motion.div>

        <h3 className="document-card-title">
          {doc.title}
        </h3>

        {doc.note && (
          <motion.div
            className="document-card-note"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.2 }}
          >
            {doc.note.split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </motion.div>
        )}

        {!isAvailable && (
          <div className="unavailable-badge">Coming Soon</div>
        )}

        {isAvailable && (
          <motion.div
            className="document-card-action"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FaDownload size={16} />
            <span>Click to download</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ManualsAndFormsDownload = () => {
  const documents = [
    {
      id: 1,
      title: "TNEB Conduct Regulations",
      href: conductregulations
    },
    {
      id: 2,
      title: "TNEB Discipline and Appeal Regulations",
      href: disciplineregulations
    },
    {
      id: 3,
      title: "TNEB Leave Regulations",
      href: leaveregulations
    },
    {
      id: 4,
      title: "TNEB Service Regulations",
      href: serviceregulations
    },
    {
      id: 5,
      title: "TNERC, Amendments to the Tamil Nadu Electricity Supply Code & Distribution code",
      href: amendments,
      note: "(Notification No. TNERC/SC/7–40, dated 18-12-2019.)\n(Notification No. TNERC/DC/8–25 dated 18-12-2019.)"
    },
    {
      id: 6,
      title: "GAZETTE YEARWISE -1983-2020",
      href: "#"
    },
    {
      id: 7,
      title: "COST DATA 2021-2022- Consolidated",
      href: costdata
    },
    {
      id: 8,
      title: "Guidelines on Administrative Matters and Entitlements",
      href: "#"
    },
    {
      id: 9,
      title: "Maternity Leave BPS TNGOs",
      href: maternityleave
    },
    {
      id: 10,
      title: "NHIS BPs GOs",
      href: nhisbpsgos
    },
    {
      id: 11,
      title: "TNEB-NHIS2021- REVISED MEDICAL POLICY-TNGO-29.06.2021",
      href: nhisbpsgos
    },
    {
      id: 12,
      title: "TNEB-NHIS2018- ADDITIONAL HOSPITAL COVERAGE-TNGO-ADOPTED BY BOARD -02.08.2021",
      href: "#"
    },
    {
      id: 13,
      title: "TNEB-NHIS 2021 – BP NO 162-17.07.2021",
      href: tnebnhis2021bp
    },
    {
      id: 14,
      title: "TNEB-Court Judgement-NHIS – Father also as family member-02.01.2020",
      href: courtjudgement
    }
  ];

  return (
    <div className="manuals-container">
      <motion.div
        className="manuals-header"
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
            📚
          </motion.span>
          {' '}TNEB Manuals, Forms & Documents
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Official TNEB regulated regulations, manuals, and forms download
        </motion.p>
      </motion.div>

      <div className="manuals-content">
        <motion.div
          className="document-count"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <FaFilePdf style={{ marginRight: '8px', color: '#dc3545' }} />
          Total <strong>{documents.length}</strong> documents available
        </motion.div>

        <motion.div
          className="documents-grid"
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

export default ManualsAndFormsDownload;
