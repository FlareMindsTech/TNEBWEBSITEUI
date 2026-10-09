import React, { useState, useEffect, useMemo } from 'react';
import {
  FaFilePdf,
  FaDownload,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaSearch,
  FaTimes,
  FaGavel,
  FaExclamationTriangle,
  FaThLarge,
  FaList,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaShieldAlt,
  FaFileAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { getAllActRegulations } from '../api';
import './ActRegulations.css';

// Default static fallback documents
import conductregulations from '../assets/documents/TNEBConductRegulations.pdf';
import disciplineregulations from '../assets/documents/TNEBDARegulations.pdf';
import leaveregulations from '../assets/documents/TNEBLeaveRegulations.pdf';
import amendments from '../assets/documents/TNERC-Amendments-to-SC-DC.pdf';

const DEFAULT_DOCUMENTS = [
  {
    _id: 'default-act-1',
    title: "TNEB Conduct Regulations",
    docUrl: conductregulations,
    filename: "TNEBConductRegulations.pdf",
    category: "Service Regulations"
  },
  {
    _id: 'default-act-2',
    title: "TNEB Discipline and Appeal Regulations",
    docUrl: disciplineregulations,
    filename: "TNEBDARegulations.pdf",
    category: "Discipline & Appeal"
  },
  {
    _id: 'default-act-3',
    title: "TNEB Leave Regulations",
    docUrl: leaveregulations,
    filename: "TNEBLeaveRegulations.pdf",
    category: "Leave Rules"
  },
  {
    _id: 'default-act-4',
    title: "TNERC Amendments to the Tamil Nadu Electricity Supply Code & Distribution code",
    docUrl: amendments,
    filename: "TNERC-Amendments-to-SC-DC.pdf",
    category: "Statutory Code",
    note: "Notification No. TNERC/SC/7–40, dated 18-12-2019 & Notification No. TNERC/DC/8–25 dated 18-12-2019"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } }
};

const ActRegulations = () => {
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // Default to grid view
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  const fetchRegulations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllActRegulations();
      if (Array.isArray(data) && data.length > 0) {
        setRegulations(data);
      } else {
        setRegulations(DEFAULT_DOCUMENTS);
      }
    } catch (err) {
      console.error('Error fetching Act & Regulations:', err);
      setError('Failed to fetch from server. Showing local archives.');
      setRegulations(DEFAULT_DOCUMENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegulations();
  }, []);

  const handleView = (e, fileUrl) => {
    e.preventDefault();
    e.stopPropagation();
    if (!fileUrl || fileUrl === '#') {
      Swal.fire({
        icon: 'info',
        title: 'Document Notice',
        text: 'Document digital copy will be available shortly.',
        confirmButtonColor: '#1b5baf'
      });
      return;
    }
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  };

  // Filtered & Sorted regulations
  const filteredRegulations = useMemo(() => {
    let list = [...regulations];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((doc) => {
        const titleMatch = doc.title && doc.title.toLowerCase().includes(q);
        const noteMatch = doc.note && doc.note.toLowerCase().includes(q);
        const categoryMatch = doc.category && doc.category.toLowerCase().includes(q);
        return titleMatch || noteMatch || categoryMatch;
      });
    }

    list.sort((a, b) => {
      const titleA = (a.title || '').toLowerCase();
      const titleB = (b.title || '').toLowerCase();
      return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });

    return list;
  }, [regulations, searchQuery, sortOrder]);

  return (
    <div className="act-regulations-container">
      {/* Hero Header with Luxury Theme */}
      <div className="act-hero">
        <div className="act-hero-ambient-glow"></div>
        <div className="act-hero-content">
          <div className="act-hero-badge">
            <FaGavel className="pulse-gold" />
            <span>Statutory Acts &amp; Service Rules</span>
          </div>
          <h1>
            Act &amp; <span className="title-highlight">Regulations</span>
          </h1>
          <div className="hero-divider"></div>
          <p className="act-hero-tagline">
            Essential conduct rules, service regulations, and statutory codes for TNEB engineers
          </p>
        </div>
      </div>

      {/* Floating Pill Search Bar Overlapping Hero Border */}
      <div className="act-floating-search-wrapper">
        <div className="act-floating-search-card">
          <div className="act-search-input-box">
            <FaSearch className="act-search-lens-icon" />
            <input
              type="text"
              className="act-main-search-input"
              placeholder="Search by title, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button"
                className="act-search-clear-btn" 
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="act-regulations-content-wrap">
        {/* Controls & Statistics Bar */}
        <div className="act-action-bar">
          <div className="act-count-left">
            <span className="act-total-pill">
              <FaFileAlt className="me-2 text-primary" />
              Total <strong>{filteredRegulations.length}</strong> {filteredRegulations.length === 1 ? 'Regulation' : 'Regulations'} Available
            </span>
            {searchQuery && (
              <span className="act-filter-tag">
                Matching: "<strong>{searchQuery}</strong>"
              </span>
            )}
          </div>

          <div className="act-controls-right">
            {error && (
              <span className="act-error-badge">
                <FaExclamationTriangle className="me-1" /> Offline Mode
              </span>
            )}

            {/* Sort Toggle (A-Z / Z-A) */}
            <button
              className="act-ctrl-btn"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              title={sortOrder === 'asc' ? 'Sort: A to Z' : 'Sort: Z to A'}
            >
              {sortOrder === 'asc' ? <FaSortAlphaDown className="me-1 text-primary" /> : <FaSortAlphaUp className="me-1 text-primary" />}
              <span>{sortOrder === 'asc' ? 'A - Z' : 'Z - A'}</span>
            </button>

            {/* View Mode Toggle */}
            <div className="act-view-toggle">
              <button
                className={`act-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <FaThLarge />
              </button>
              <button
                className={`act-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="act-loading-state">
            <div className="act-spinner"></div>
            <p>Loading official Acts and Regulations from server...</p>
          </div>
        ) : filteredRegulations.length === 0 ? (
          /* Empty Search State */
          <motion.div 
            className="act-empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FaSearch className="act-empty-icon" />
            <h3>No regulations match your search</h3>
            <p>Try searching with different terms or reset your filter.</p>
            {searchQuery && (
              <button className="act-reset-btn" onClick={() => setSearchQuery('')}>
                Clear Search Filter
              </button>
            )}
          </motion.div>
        ) : viewMode === 'grid' ? (
          /* ================================================================= */
          /* PROFESSIONAL CENTERED GRID VIEW                                   */
          /* ================================================================= */
          <motion.div 
            className="act-documents-grid-view"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredRegulations.map((doc, index) => {
                const fileUrl = doc.docUrl || doc.path || '#';

                return (
                  <motion.div
                    key={doc._id || doc.id || index}
                    variants={itemVariants}
                    layout
                    whileHover={{ y: -6, transition: { duration: 0.22 } }}
                    className="act-pro-grid-card centered-card"
                    onClick={(e) => handleView(e, fileUrl)}
                  >
                    <div className="act-grid-top-bar centered-top">
                      <div className="act-pdf-squircle-grid">
                        <FaFilePdf className="act-pdf-glyph" />
                      </div>

                      <span className="act-tag-category">
                        <FaShieldAlt className="me-1 text-primary" />
                        {doc.category || 'Regulation'}
                      </span>
                    </div>

                    <div className="act-grid-center centered-body">
                      <h3 className="act-grid-title" title={doc.title}>
                        {doc.title}
                      </h3>
                      {doc.note && (
                        <p className="act-grid-note" title={doc.note}>
                          {doc.note}
                        </p>
                      )}
                    </div>

                    <div className="act-grid-footer" onClick={(e) => e.stopPropagation()}>
                      <button 
                        type="button"
                        className="act-btn-pro-view"
                        onClick={(e) => handleView(e, fileUrl)}
                        title="View Document"
                      >
                        <FaExternalLinkAlt className="me-1" />
                        <span>View</span>
                      </button>

                      <a 
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={doc.title || 'act-regulation.pdf'}
                        className="act-btn-pro-download"
                        title="Download PDF"
                      >
                        <FaDownload className="me-1" />
                        <span>Download</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ================================================================= */
          /* PROFESSIONAL LIST VIEW                                           */
          /* ================================================================= */
          <motion.div 
            className="act-documents-list-view"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredRegulations.map((doc, index) => {
                const fileUrl = doc.docUrl || doc.path || '#';

                return (
                  <motion.div
                    key={doc._id || doc.id || index}
                    variants={itemVariants}
                    layout
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="act-pro-row-card"
                    onClick={(e) => handleView(e, fileUrl)}
                  >
                    {/* Left: Red Gradient PDF Squircle Badge */}
                    <div className="act-row-icon-col">
                      <div className="act-pdf-squircle">
                        <FaFilePdf className="act-pdf-glyph" />
                      </div>
                    </div>

                    {/* Middle: Document Category Tag, Title, and Note */}
                    <div className="act-row-body-col">
                      <div className="act-row-top-tags">
                        <span className="act-tag-category">
                          <FaShieldAlt className="me-1 text-primary" />
                          {doc.category || 'Official Regulation'}
                        </span>
                      </div>

                      <h3 className="act-row-title">
                        {doc.title}
                      </h3>

                      {doc.note && (
                        <div className="act-row-note">
                          <FaInfoCircle className="me-1 text-secondary flex-shrink-0 mt-1" />
                          <span>{doc.note}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Action Buttons Group */}
                    <div className="act-row-actions-col" onClick={(e) => e.stopPropagation()}>
                      <button 
                        type="button"
                        className="act-btn-pro-view"
                        onClick={(e) => handleView(e, fileUrl)}
                        title="View Document"
                      >
                        <FaExternalLinkAlt className="me-1" />
                        <span>View</span>
                      </button>

                      <a 
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={doc.title || 'act-regulation.pdf'}
                        className="act-btn-pro-download"
                        title="Download PDF"
                      >
                        <FaDownload className="me-1" />
                        <span>Download</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ActRegulations;