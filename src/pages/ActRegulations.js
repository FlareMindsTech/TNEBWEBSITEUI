import React from 'react';
import { FaFilePdf, FaCalendar, FaDownload, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Swal from 'sweetalert2';
import './ActRegulations.css';
import conductregulations from '../assets/documents/TNEBConductRegulations.pdf';
import disciplineregulations from '../assets/documents/TNEBDARegulations.pdf';
import leaveregulations from '../assets/documents/TNEBLeaveRegulations.pdf';
import amendments from '../assets/documents/TNERC-Amendments-to-SC-DC.pdf';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const DocumentItem = ({ doc, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDownload = (e) => {
    e.preventDefault();
    window.open(doc.path, '_blank');
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, x: -50, scale: 0.9 },
        visible: {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: index * 0.1
          }
        }
      }}
      whileHover={{ 
        scale: 1.02,
        x: 10,
        transition: { duration: 0.2 }
      }}
      className="document-item mb-4 p-4 border rounded"
    >
      <div className="d-flex align-items-start">
        <motion.div 
          className="document-icon mr-3"
          whileHover={{ 
            scale: 1.2,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
        >
          <FaFilePdf className="text-danger fa-2x" />
        </motion.div>
        <div className="document-details flex-grow-1">
          <h6 className="mb-2">
            <a 
              href={doc.path}
              onClick={handleDownload}
              className="text-decoration-none text-dark font-weight-bold document-link"
            >
              {doc.title}
            </a>
          </h6>
          <div className="document-meta d-flex justify-content-between align-items-center flex-wrap">
            <motion.small 
              className="text-muted"
              whileHover={{ scale: 1.05, color: '#1b5baf' }}
            >
              <FaCalendar className="mr-1" />
              PDF Document
            </motion.small>
            <motion.small 
              className="text-muted"
              whileHover={{ scale: 1.05, color: '#1b5baf' }}
            >
              <FaDownload className="mr-1" />
              {doc.filename}
            </motion.small>
          </div>
          {doc.note && (
            <motion.div 
              className="document-note mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.3 }}
            >
              <p className="mb-0 text-secondary small">
                <FaInfoCircle className="mr-1" />
                <em>{doc.note}</em>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ActRegulations = () => {
  // Document links data
  const documents = [
    {
      id: 1,
      title: "TNEB Conduct Regulations",
      path: conductregulations,
      filename: "TNEBConductRegulations.pdf"
    },
    {
      id: 2,
      title: "TNEB Discipline and Appeal Regulations",
      path: disciplineregulations,
      filename: "TNEBDARegulations.pdf"
    },
    {
      id: 3,
      title: "TNEB Leave Regulations",
      path: leaveregulations,
      filename: "TNEBLeaveRegulations.pdf"
    },
    {
      id: 4,
      title: "TNERC Amendments to the Tamil Nadu Electricity Supply Code & Distribution code",
      path: amendments,
      filename: "TNERC-Amendments-to-SC-DC.pdf",
      note: "(Notification No. TNERC/SC/7–40, dated 18-12-2019.) (Notification No. TNERC/DC/8–25 dated 18-12-2019.)"
    }
  ];

  const showInfoAlert = () => {
    Swal.fire({
      title: 'Important Information',
      html: `
        <div style="text-align: left; padding: 10px;">
          <p><strong><i class="fa fa-check-circle"></i> All documents are official TNEB publications</strong></p>
          <p><i class="fa fa-file-pdf"></i> Documents are in PDF format</p>
          <p><i class="fa fa-external-link"></i> Click on titles to open in new tab</p>
          <p><i class="fa fa-download"></i> Right-click to download files</p>
          <p><i class="fa fa-info-circle"></i> Ensure you have a PDF reader installed</p>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#1b5baf',
      confirmButtonText: 'Understood'
    });
  };

  return (
    <div className="act-regulations-container">
      {/* Hero Header with requested Luxury Theme */}
      <div className="act-hero">
        <div className="act-hero-ambient-glow"></div>
        <div className="act-hero-content">
        
          <h1>Act &amp; <span className="title-highlight">Regulations</span></h1>
          <div className="hero-divider"></div>
          <p className="act-hero-tagline">Important documents and regulations for TNEB engineers</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="act-regulations-content-wrap">
        <div className="documents-container">
          <motion.div 
            className="card shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Official Documents</h5>
              <button
                className="btn btn-sm btn-light"
                onClick={showInfoAlert}
              >
                <FaInfoCircle /> Info
              </button>
            </div>
            <div className="card-body">
              <motion.div 
                className="documents-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {documents.map((doc, index) => (
                  <DocumentItem key={doc.id} doc={doc} index={index} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ActRegulations;