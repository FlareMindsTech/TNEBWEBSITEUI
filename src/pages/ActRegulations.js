import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaCalendar, FaDownload, FaHome, FaUser, FaInfoCircle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
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

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
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
  hidden: { opacity: 0, y: -20 },
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
  const [currentTime, setCurrentTime] = useState('');

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

  // Update current time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const day = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      
      setCurrentTime(`${day}, ${date}-${month}-${year}, ${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Show welcome message alert
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('actRegulationsVisited');
    if (!hasVisited) {
      Swal.fire({
        title: 'Welcome!',
        html: '<p>Access official TNEB Acts & Regulations</p><small>Click on any document to view or download</small>',
        icon: 'info',
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#1b5baf',
        timer: 4000,
        timerProgressBar: true
      });
      sessionStorage.setItem('actRegulationsVisited', 'true');
    }
  }, []);

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
      {/* Main Content */}
      <main className="act-regulations-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <motion.div 
                className="page-header mb-4"
                initial="hidden"
                animate="visible"
                variants={headerVariants}
              >
                <motion.h1 
                  className="text-primary"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <motion.span
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{ display: 'inline-block' }}
                  >
                    <FaFilePdf className="mr-2" />
                  </motion.span>
                  Act & Regulations
                </motion.h1>
                <motion.p 
                  className="text-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Important documents and regulations for TNEB engineers
                </motion.p>
              </motion.div>
              
              <div className="documents-container">
                <motion.div 
                  className="card shadow-sm"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <motion.div 
                    className="card-header bg-primary text-white"
                    whileHover={{ backgroundColor: '#0d47a1' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Official Documents</h5>
                      <motion.button
                        className="btn btn-sm btn-light"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={showInfoAlert}
                      >
                        <FaInfoCircle /> Info
                      </motion.button>
                    </div>
                  </motion.div>
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
        </div>
      </main>
    </div>
  );
};

export default ActRegulations;