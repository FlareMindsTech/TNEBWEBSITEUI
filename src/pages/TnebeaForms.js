import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaFileAlt, FaFileContract, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './TnebeaForms.css';
// pdf imports
import joiningReportDoc from '../assets/tnebea-forms/joining-report.doc';
import classICasualLeave from '../assets/tnebea-forms/class-1casual-leave.pdf';
import casualLeaveEnglish from '../assets/tnebea-forms/Casual-Leave-application-Form-English.pdf';
import casualLeaveTamil from '../assets/tnebea-forms/Casual-Leave-application-Form-Tamil.pdf';
import classIAndIILeave from '../assets/tnebea-forms/Class-I-II-Leave-application.pdf';
import classIIIAndIVLeave from '../assets/tnebea-forms/Class-III-IV-Leave-application.pdf';
import classIJoiningReport from '../assets/tnebea-forms/Class-I-Joining-Report.pdf';
import provincialTABill from '../assets/tnebea-forms/Provincial-TA-Bill.pdf';
import festivalAdvance from '../assets/tnebea-forms/Festival-Advance.pdf';
import gpfPartFinal from '../assets/tnebea-forms/GPF-Part-Final-Application.pdf';
import computerLoan from '../assets/tnebea-forms/Computer-Loan.pdf';
import marriageLoan from '../assets/tnebea-forms/marriageloan.pdf';
import utilisationCertificate from '../assets/tnebea-forms/Utilisation-Certificate.pdf';

const themeColor = '#1b5baf';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const forms = [
  { title: 'Joining Report', url: joiningReportDoc, type: 'Word File' },
  { title: 'Class I - Casual Leave application Form', url: classICasualLeave, type: 'PDF File' },
  { title: 'Casual Leave application Form - English', url: casualLeaveEnglish, type: 'PDF File' },
  { title: 'Casual Leave application Form - Tamil', url: casualLeaveTamil, type: 'PDF File' },
  { title: 'Class I & II Leave application', url: classIAndIILeave, type: 'PDF File' },
  { title: 'Class III & IV Leave application', url: classIIIAndIVLeave, type: 'PDF File' },
  { title: 'Class I Joining Report', url: classIJoiningReport, type: 'PDF File' },
  { title: 'Provincial TA Bill', url: provincialTABill, type: 'PDF File' },
];

const loans = [
  { title: 'Festival Advance', url: festivalAdvance, type: 'PDF File' },
  { title: 'GPF Part Final Application', url: gpfPartFinal, type: 'PDF File' },
  { title: 'Computer Loan', url: computerLoan, type: 'PDF File' },
  { title: 'Marriage Loan', url: marriageLoan, type: 'PDF File' },
  { title: 'Utilisation Certificate', url: utilisationCertificate, type: 'PDF File' },
];

function handleRowKeyDown(event, item) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openDocument(item);
  }
}

function openDocument(item) {
  if (item?.url) {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'File not available',
      text: 'The document is missing in assets. Please contact the administrator.',
      confirmButtonColor: themeColor,
      background: '#ffffff',
      color: '#0e2649',
      customClass: {
        confirmButton: 'swal-confirm-btn'
      }
    });
  }
}

const TnebeaForms = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.querySelector('.scroll-progress');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="tnebea-forms-page" style={{ ['--theme']: themeColor }}>
      {/* Scroll progress indicator */}
      <div className="scroll-progress"></div>

      <motion.div 
        className="forms-hero-fluid-banner" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        {/* Background Swirl Graphics & Wave Backdrops */}
        <div className="fluid-wave-bg-left"></div>
        <div className="fluid-wave-bg-right"></div>
        <div className="gold-accent-swirl-left"></div>
        <div className="gold-accent-swirl-right"></div>
        <div className="hero-grid-pattern"></div>

        <div className="forms-hero-inner-content">
          {/* Top TNEBEA Badge with Gold Flourishes */}
          <motion.div 
            className="forms-top-badge-wrap"
            initial={{ y: 15, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="badge-gold-flourish-line left"></span>
            <span className="forms-tnebea-badge">TNEBEA</span>
            <span className="badge-gold-flourish-line right"></span>
          </motion.div>

          {/* Main Serif Header */}
          <motion.h1 
            className="forms-hero-main-title" 
            initial={{ y: 15, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            TAMILNADU<br />
            ELECTRICITY BOARD
          </motion.h1>

          <motion.div 
            className="forms-hero-sub-title-wrap"
            initial={{ y: 15, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.28 }}
          >
            <span className="title-gold-line left"></span>
            <span className="title-gold-diamond">❖</span>
            <h2 className="forms-hero-word">FORMS</h2>
            <span className="title-gold-diamond">❖</span>
            <span className="title-gold-line right"></span>
          </motion.div>

          <motion.p 
            className="forms-hero-tagline" 
            initial={{ y: 12, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.36 }}
          >
            Centralized access to official forms and advances
          </motion.p>

          {/* 2 Metric Highlight Cards */}
          <motion.div 
            className="forms-hero-stats-row" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.42 }}
          >
            {/* Card 1: 8 Forms */}
            <div className="forms-stat-card">
              <div className="stat-corner-ribbon"></div>
              <div className="stat-circle-icon">
                <FaFileAlt />
              </div>
              <div className="stat-card-info text-start">
                <span className="stat-big-num">{forms.length}</span>
                <span className="stat-main-lbl">Forms</span>
                <span className="stat-sub-desc">Official Forms</span>
              </div>
            </div>

            {/* Card 2: 5 Advances */}
            <div className="forms-stat-card">
              <div className="stat-corner-ribbon"></div>
              <div className="stat-circle-icon">
                <FaFileContract />
              </div>
              <div className="stat-card-info text-start">
                <span className="stat-big-num">{loans.length}</span>
                <span className="stat-main-lbl">Advances</span>
                <span className="stat-sub-desc">Advance Requests</span>
              </div>
            </div>
          </motion.div>

          {/* 3D Navy Gold-Border Button */}
          <motion.button 
            className="forms-hero-cta-btn" 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -3, scale: 1.03 }} 
            whileTap={{ scale: 0.98 }} 
            onClick={() => {
              const el = document.getElementById('forms-content');
              el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Browse Forms <FaArrowRight className="ms-2" />
          </motion.button>
        </div>
      </motion.div>

      <div id="forms-content" className="forms-content container">
        <motion.div 
          className="forms-section" 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="section-header">
            <span className="section-kicker">FORMS</span>
            <div className="section-line" />
          </div>

          <div className="forms-table-wrap">
            <table className="forms-table" aria-label="Forms table">
              <thead>
                <tr>
                  <th className="serial-col">S.No</th>
                  <th className="name-col">Form Name</th>
                  <th className="download-col">Action</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((item, i) => (
                  <motion.tr
                    key={item.title}
                    className="table-click-row"
                    role="button"
                    tabIndex={0}
                    onClick={() => openDocument(item)}
                    onKeyDown={(event) => handleRowKeyDown(event, item)}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <td className="serial-cell">
                      <span className="sno-circle-badge">{i + 1}</span>
                    </td>
                    <td className="name-cell">{item.title}</td>
                    <td className="download-cell" onClick={(e) => e.stopPropagation()}>
                      <a href={item.url} download={item.title} className="btn-download" title="Download File">
                        <FaDownload className="download-icon" /> Download
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div 
          className="forms-section" 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="section-header">
            <span className="section-kicker">LOANS AND ADVANCES</span>
            <div className="section-line" />
          </div>

          <div className="forms-table-wrap">
            <table className="forms-table" aria-label="Loans and advances table">
              <thead>
                <tr>
                  <th className="serial-col">S.No</th>
                  <th className="name-col">Loan / Advance Name</th>
                  <th className="download-col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((item, i) => (
                  <motion.tr
                    key={item.title}
                    className="table-click-row"
                    role="button"
                    tabIndex={0}
                    onClick={() => openDocument(item)}
                    onKeyDown={(event) => handleRowKeyDown(event, item)}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <td className="serial-cell">
                      <span className="sno-circle-badge">{i + 1}</span>
                    </td>
                    <td className="name-cell">{item.title}</td>
                    <td className="download-cell" onClick={(e) => e.stopPropagation()}>
                      <a href={item.url} download={item.title} className="btn-download" title="Download File">
                        <FaDownload className="download-icon" /> Download
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div 
          className="back-row" 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.button 
            className="back-btn" 
            whileHover={{ y: -3, scale: 1.03 }} 
            whileTap={{ scale: 0.98 }} 
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" /> Back to Previous Page
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default TnebeaForms;