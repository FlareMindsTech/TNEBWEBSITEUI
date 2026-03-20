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
import OptionForm from'../assets/tnebea-forms/latest-forms/Option Form 2019 - 2026.pdf';
import optionWR2019 from'../assets/tnebea-forms/latest-forms/option WR2019_Officer BP.pdf';

const themeColor = '#1b5baf';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const forms = [
  { title: 'Option Form 2019 - 2026', url: OptionForm, type: 'PDF File' },
  { title: 'option WR2019_Officer BP', url: optionWR2019, type: 'PDF File' },
  { title: 'Joining Report', url: joiningReportDoc, type: 'Word File' },
  { title: 'Class I - Casual Leave application Form', url: classICasualLeave, type: 'PDF File' },
  { title: 'Casual Leave application Form - English', url: casualLeaveEnglish, type: 'PDF File' },
  { title: 'Casual Leave application Form - Tamil', url: casualLeaveTamil, type: 'PDF File' },
  { title: 'Class I & II Leave application', url: classIAndIILeave, type: 'PDF File' },
  { title: 'Class III & IV Leave application', url: classIIIAndIVLeave, type: 'PDF File' },
  { title: 'Class I Joining Report', url: classIJoiningReport, type: 'PDF File' },
  { title: 'Provincial TA Bill', url: provincialTABill, type: 'PDF File' },
  // { title: 'Option Form 2019 - 2026', url: OptionForm, type: 'PDF File' },
  // { title: 'option WR2019_Officer BP', url: optionWR2019, type: 'PDF File' },
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
        className="forms-hero" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay" />

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

          <div className="forms-table-wrap">
            <table className="forms-table" aria-label="Forms table">
              <thead>
                <tr>
                  <th className="serial-col">S.No</th>
                  <th className="name-col">Form Name</th>
                  <th className="type-col">Type</th>
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
                    <td className="serial-cell">{i + 1}</td>
                    <td className="name-cell">{item.title}</td>
                    <td className="type-cell">{item.type}</td>
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
            <span className="section-kicker">LOANS AND ADVANCES:</span>
            <div className="section-line" />
          </div>

          <div className="forms-table-wrap">
            <table className="forms-table" aria-label="Loans and advances table">
              <thead>
                <tr>
                  <th className="serial-col">S.No</th>
                  <th className="name-col">Loan / Advance Name</th>
                  <th className="type-col">Type</th>
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
                    <td className="serial-cell">{i + 1}</td>
                    <td className="name-cell">{item.title}</td>
                    <td className="type-cell">{item.type}</td>
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