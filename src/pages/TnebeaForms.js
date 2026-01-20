import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
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

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.35 },
  }),
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
        className="forms-hero" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay" />

        {/* Enhanced Decorations */}
        <div className="hero-decor">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="hero-particle"
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0 
              }}
              animate={{ 
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2
              }}
              style={{
                position: 'absolute',
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: themeColor,
                borderRadius: '50%',
                filter: 'blur(1px)'
              }}
            />
          ))}
          <motion.div className="hero-orb orb-1" animate={{ y: [0, -10, 0], x: [0, 12, 0], opacity: [0.9, 1, 0.9] }} transition={{ repeat: Infinity, duration: 5 }} />
          <motion.div className="hero-orb orb-2" animate={{ y: [0, -8, 0], x: [0, -10, 0], opacity: [0.9, 1, 0.9] }} transition={{ repeat: Infinity, duration: 6 }} />
          <motion.div className="hero-orb orb-3" animate={{ y: [0, -6, 0], x: [0, 8, 0], opacity: [0.9, 1, 0.9] }} transition={{ repeat: Infinity, duration: 7 }} />
          <motion.div className="hero-spark" animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 3 }} />
        </div>

        <div className="hero-header">
          <motion.span 
            className="hero-badge" 
            initial={{ y: 18, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            TNEBEA
          </motion.span>
          <motion.h1 
            className="hero-title" 
            initial={{ y: 18, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            TAMILNADU ELECTRICITY BOARD
          </motion.h1>
          <motion.h2 
            className="hero-subtitle" 
            initial={{ y: 16, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.28 }}
          >
            FORMS
          </motion.h2>
          <motion.p 
            className="hero-tagline" 
            initial={{ y: 14, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.36 }}
          >
            Centralized access to official forms and advances
          </motion.p>
        </div>

        <motion.div 
          className="hero-stats" 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.42 }}
        >
          <div className="stat">
            <span className="stat-icon">🗂️</span>
            <span className="stat-text">{forms.length} Forms</span>
          </div>
          <div className="stat">
            <span className="stat-icon">💼</span>
            <span className="stat-text">{loans.length} Advances</span>
          </div>
        </motion.div>

        <motion.button 
          className="hero-cta" 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -4, scale: 1.05 }} 
          whileTap={{ scale: 0.98 }} 
          onClick={() => {
            const el = document.getElementById('forms-content');
            el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          Browse Forms
        </motion.button>
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
            <span className="section-kicker">FORMS:</span>
            <div className="section-line" />
          </div>

          <div className="cards-grid">
            {forms.map((item, i) => (
              <motion.button
                key={item.title}
                className="form-card"
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ '--card-index': i }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 16px 48px rgba(27,91,175,0.16)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openDocument(item)}
              >
                <div className="card-top">
                  <span className="file-chip">{item.type}</span>
                </div>
                <div className="card-body">
                  <div className="card-icon">📝</div>
                  <div className="card-title">{item.title}</div>
                </div>
                <div className="card-bottom">
                  <span className="open-text">Open Document</span>
                  <span className="open-arrow">➜</span>
                </div>
              </motion.button>
            ))}
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
            <span className="section-kicker">LOANS AND ADVANCES:</span>
            <div className="section-line" />
          </div>

          <div className="cards-grid">
            {loans.map((item, i) => (
              <motion.button
                key={item.title}
                className="form-card loan"
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ '--card-index': i }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 16px 48px rgba(27,91,175,0.16)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openDocument(item)}
              >
                <div className="card-top">
                  <span className="file-chip">{item.type}</span>
                </div>
                <div className="card-body">
                  <div className="card-icon">📄</div>
                  <div className="card-title">{item.title}</div>
                </div>
                <div className="card-bottom">
                  <span className="open-text">Open Document</span>
                  <span className="open-arrow">➜</span>
                </div>
              </motion.button>
            ))}
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
            whileHover={{ x: -4, scale: 1.05 }} 
            whileTap={{ scale: 0.98 }} 
            onClick={() => navigate(-1)}
          >
            ← Back to Previous Page
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default TnebeaForms;