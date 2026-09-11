import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { 
  FaDownload, 
  FaFileAlt, 
  FaFileContract, 
  FaArrowRight, 
  FaArrowLeft, 
  FaIdCard,
  FaMoneyBillWave,
  FaFileSignature,
  FaChevronRight
} from 'react-icons/fa';
import { getAllForms } from '../api';
import './TnebeaForms.css';

const themeColor = '#1b5baf';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function handleRowKeyDown(event, item) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openDocument(item);
  }
}

function openDocument(item) {
  const docUrl = item?.pdfUrl || item?.url;
  if (docUrl) {
    window.open(docUrl, '_blank', 'noopener,noreferrer');
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
  const [memberships, setMemberships] = useState([]);
  const [formsList, setFormsList] = useState([]);
  const [loansList, setLoansList] = useState([]);
  const [wageDivisionList, setWageDivisionList] = useState([]);
  const [nocList, setNocList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchFormsData = async () => {
      try {
        setLoading(true);
        const data = await getAllForms();
        if (Array.isArray(data)) {
          const mList = data.filter((item) => item.type === 'membership');
          const fList = data.filter((item) => item.type === 'form');
          const lList = data.filter((item) => item.type === 'loan');
          const wList = data.filter((item) => item.type === 'wage&division');
          const nList = data.filter((item) => item.type === 'noc');

          setMemberships(mList);
          setFormsList(fList);
          setLoansList(lList);
          setWageDivisionList(wList);
          setNocList(nList);
        }
      } catch (err) {
        console.error('Failed to load forms from API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormsData();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper renderer for a document section table - only shown when documents exist
  const renderDocumentSection = (title, items, columnHeader, sectionId) => {
    if (!items || items.length === 0) return null;

    return (
      <motion.div 
        id={sectionId}
        className="forms-section" 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-header">
          <span className="section-kicker">{title}</span>
          <div className="section-line" />
        </div>

        <div className="forms-table-wrap">
          <table className="forms-table" aria-label={`${title} table`}>
            <thead>
              <tr>
                <th className="serial-col">S.No</th>
                <th className="name-col">{columnHeader}</th>
                <th className="download-col">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                const docUrl = item.pdfUrl || item.url;
                return (
                  <motion.tr
                    key={item._id || item.title || i}
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
                      <a 
                        href={docUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        download={item.title} 
                        className="btn-download" 
                        title="Download File"
                      >
                        <FaDownload className="download-icon" /> Download
                      </a>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  };

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
            <h2 className="forms-hero-word">FORMS & DOCUMENTS</h2>
            <span className="title-gold-diamond">❖</span>
            <span className="title-gold-line right"></span>
          </motion.div>

          <motion.p 
            className="forms-hero-tagline" 
            initial={{ y: 12, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.36 }}
          >
            Centralized access to official forms, membership details, loans, wage division, and NOC formats
          </motion.p>

          {/* Dynamic Same-Theme Highlight Cards */}
          <motion.div 
            className="forms-hero-stats-row" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.42 }}
          >
            {/* Card 1: Membership */}
            {memberships.length > 0 && (
              <div 
                className="forms-stat-card"
                role="button"
                tabIndex={0}
                onClick={() => scrollToSection('section-membership')}
              >
                <div className="forms-stat-icon-box">
                  <FaIdCard />
                </div>
                <div className="forms-stat-content-col">
                  <span className="forms-stat-label">CURRENT MEMBERSHIP</span>
                  <strong className="forms-stat-val">Membership Forms</strong>
                </div>
                <div className="forms-stat-chevron-btn">
                  <FaChevronRight />
                </div>
              </div>
            )}

            {/* Card 2: Forms */}
            {formsList.length > 0 && (
              <div 
                className="forms-stat-card"
                role="button"
                tabIndex={0}
                onClick={() => scrollToSection('section-forms')}
              >
                <div className="forms-stat-icon-box">
                  <FaFileAlt />
                </div>
                <div className="forms-stat-content-col">
                  <span className="forms-stat-label">OFFICIAL FORMS</span>
                  <strong className="forms-stat-val">Forms & Applications</strong>
                </div>
                <div className="forms-stat-chevron-btn">
                  <FaChevronRight />
                </div>
              </div>
            )}

            {/* Card 3: Loan and Advance */}
            {loansList.length > 0 && (
              <div 
                className="forms-stat-card"
                role="button"
                tabIndex={0}
                onClick={() => scrollToSection('section-loan')}
              >
                <div className="forms-stat-icon-box">
                  <FaFileContract />
                </div>
                <div className="forms-stat-content-col">
                  <span className="forms-stat-label">LOANS & ADVANCES</span>
                  <strong className="forms-stat-val">Advances & Loans</strong>
                </div>
                <div className="forms-stat-chevron-btn">
                  <FaChevronRight />
                </div>
              </div>
            )}

            {/* Card 4: Wage Division */}
            {wageDivisionList.length > 0 && (
              <div 
                className="forms-stat-card"
                role="button"
                tabIndex={0}
                onClick={() => scrollToSection('section-wage-division')}
              >
                <div className="forms-stat-icon-box">
                  <FaMoneyBillWave />
                </div>
                <div className="forms-stat-content-col">
                  <span className="forms-stat-label">WAGE DIVISION</span>
                  <strong className="forms-stat-val">Wage & Related Forms</strong>
                </div>
                <div className="forms-stat-chevron-btn">
                  <FaChevronRight />
                </div>
              </div>
            )}

            {/* Card 5: NOC Format */}
            {nocList.length > 0 && (
              <div 
                className="forms-stat-card"
                role="button"
                tabIndex={0}
                onClick={() => scrollToSection('section-noc')}
              >
                <div className="forms-stat-icon-box">
                  <FaFileSignature />
                </div>
                <div className="forms-stat-content-col">
                  <span className="forms-stat-label">NOC FORMAT</span>
                  <strong className="forms-stat-val">NOC Documents</strong>
                </div>
                <div className="forms-stat-chevron-btn">
                  <FaChevronRight />
                </div>
              </div>
            )}
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
            Browse Documents <FaArrowRight className="ms-2" />
          </motion.button>
        </div>
      </motion.div>

      <div id="forms-content" className="forms-content container">
        {/* 1. MEMBERSHIP TABLE */}
        {renderDocumentSection(
          'MEMBERSHIP',
          memberships,
          'Membership Document / Detail',
          'section-membership'
        )}

        {/* 2. FORMS TABLE */}
        {renderDocumentSection(
          'FORMS',
          formsList,
          'Form Name',
          'section-forms'
        )}

        {/* 3. LOAN AND ADVANCE TABLE */}
        {renderDocumentSection(
          'LOAN AND ADVANCE',
          loansList,
          'Loan / Advance Name',
          'section-loan'
        )}

        {/* 4. WAGE DIVISION AND RELATED FORMS TABLE */}
        {renderDocumentSection(
          'WAGE DIVISION AND RELATED FORMS',
          wageDivisionList,
          'Document Name',
          'section-wage-division'
        )}

        {/* 5. NOC FORMAT TABLE */}
        {renderDocumentSection(
          'NOC FORMAT',
          nocList,
          'NOC Format Document',
          'section-noc'
        )}

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