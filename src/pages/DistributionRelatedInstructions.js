import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFilePdf,
  FaDownload,
  FaExternalLinkAlt,
  FaSearch,
  FaTimes,
  FaExclamationTriangle,
  FaThLarge,
  FaList,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaBolt,
  FaFileAlt
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { getAllDistributionInstructions } from '../api';
import './DistributionRelatedInstructions.css';

// Default static fallback documents
const DEFAULT_DOCUMENTS = [
  {
    _id: 'default-1',
    title: '59. 2019.12.10 Raguram - SMP 7 of 2014',
    docUrl: './documents/59.-2019.12.10-Raguram-SMP-7-of-2014.pdf',
    category: 'SMP Instruction'
  },
  {
    _id: 'default-2',
    title: 'Target-1 Technical Guidelines',
    docUrl: './documents/Target-1.pdf',
    category: 'Technical Instruction'
  },
  {
    _id: 'default-3',
    title: 'DCW CIRCULAR – 07.10.2021',
    docUrl: './documents/DCW-CIRCULAR-07.10.2021.pdf',
    category: 'DCW Circular'
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
      ease: 'easeOut'
    }
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } }
};

const DistributionRelatedInstructions = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // Default to grid view
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  const fetchInstructions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllDistributionInstructions();
      if (Array.isArray(data) && data.length > 0) {
        setDocuments(data);
      } else {
        setDocuments(DEFAULT_DOCUMENTS);
      }
    } catch (err) {
      console.error('Error fetching distribution instructions:', err);
      setError('Failed to fetch from server. Showing local archives.');
      setDocuments(DEFAULT_DOCUMENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructions();
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

  // Filtered & Sorted documents
  const filteredDocuments = useMemo(() => {
    let list = [...documents];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((doc) => {
        const titleMatch = doc.title && doc.title.toLowerCase().includes(q);
        const categoryMatch = doc.category && doc.category.toLowerCase().includes(q);
        return titleMatch || categoryMatch;
      });
    }

    list.sort((a, b) => {
      const titleA = (a.title || '').toLowerCase();
      const titleB = (b.title || '').toLowerCase();
      return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });

    return list;
  }, [documents, searchQuery, sortOrder]);

  return (
    <div className="dri-container">
      {/* Hero Header with Luxury Theme */}
      <div className="dri-hero">
        <div className="dri-hero-ambient-glow"></div>
        <div className="dri-hero-content">
          <div className="dri-hero-badge">
            <FaBolt className="pulse-gold" />
            <span>Official Circulars &amp; Guidelines</span>
          </div>
          <h1>
            Distribution Related <span className="title-highlight">Instructions</span>
          </h1>
          <div className="hero-divider"></div>
          <p className="dri-hero-tagline">
            Official distribution guidelines, circulars, and technical instructions for engineers
          </p>
        </div>
      </div>

      {/* Floating Pill Search Bar Overlapping Hero Border */}
      <div className="dri-floating-search-wrapper">
        <div className="dri-floating-search-card">
          <div className="dri-search-input-box">
            <FaSearch className="dri-search-lens-icon" />
            <input
              type="text"
              className="dri-main-search-input"
              placeholder="Search by title, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button"
                className="dri-search-clear-btn" 
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
      <div className="dri-content">
        {/* Controls & Statistics Bar */}
        <div className="dri-action-bar">
          <div className="dri-count-left">
            <span className="dri-total-pill">
              <FaFileAlt className="me-2 text-primary" />
              Total <strong>{filteredDocuments.length}</strong> {filteredDocuments.length === 1 ? 'Instruction' : 'Instructions'} Available
            </span>
            {searchQuery && (
              <span className="dri-filter-tag">
                Matching: "<strong>{searchQuery}</strong>"
              </span>
            )}
          </div>

          <div className="dri-controls-right">
            {error && (
              <span className="dri-error-badge">
                <FaExclamationTriangle className="me-1" /> Offline Mode
              </span>
            )}

            {/* Sort Toggle (A-Z / Z-A) */}
            <button
              className="dri-ctrl-btn"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              title={sortOrder === 'asc' ? 'Sort: A to Z' : 'Sort: Z to A'}
            >
              {sortOrder === 'asc' ? <FaSortAlphaDown className="me-1 text-primary" /> : <FaSortAlphaUp className="me-1 text-primary" />}
              <span>{sortOrder === 'asc' ? 'A - Z' : 'Z - A'}</span>
            </button>

            {/* View Mode Toggle */}
            <div className="dri-view-toggle">
              <button
                className={`dri-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <FaThLarge />
              </button>
              <button
                className={`dri-view-btn ${viewMode === 'list' ? 'active' : ''}`}
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
          <div className="dri-loading-state">
            <div className="dri-spinner"></div>
            <p>Loading distribution instructions from server...</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          /* Empty Search State */
          <motion.div 
            className="dri-empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FaSearch className="dri-empty-icon" />
            <h3>No instructions match your search</h3>
            <p>Try searching with different keywords or clear the filter.</p>
            {searchQuery && (
              <button className="dri-reset-btn" onClick={() => setSearchQuery('')}>
                Clear Search Filter
              </button>
            )}
          </motion.div>
        ) : viewMode === 'grid' ? (
          /* ================================================================= */
          /* PROFESSIONAL CENTERED GRID VIEW                                   */
          /* ================================================================= */
          <motion.div 
            className="dri-documents-grid-view"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredDocuments.map((doc, index) => {
                const fileUrl = doc.docUrl || doc.href || '#';

                return (
                  <motion.div
                    key={doc._id || doc.id || index}
                    variants={itemVariants}
                    layout
                    whileHover={{ y: -6, transition: { duration: 0.22 } }}
                    className="dri-pro-grid-card centered-card"
                    onClick={(e) => handleView(e, fileUrl)}
                  >
                    <div className="dri-grid-top-bar centered-top">
                      <div className="dri-pdf-squircle-grid">
                        <FaFilePdf className="dri-pdf-glyph" />
                      </div>

                      <span className="dri-tag-category">
                        <FaBolt className="me-1 text-warning" />
                        {doc.category || 'Circular'}
                      </span>
                    </div>

                    <div className="dri-grid-center centered-body">
                      <h3 className="dri-grid-title" title={doc.title}>
                        {doc.title}
                      </h3>
                    </div>

                    <div className="dri-grid-footer" onClick={(e) => e.stopPropagation()}>
                      <button 
                        type="button"
                        className="dri-btn-pro-view"
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
                        download={doc.title || 'distribution-instruction.pdf'}
                        className="dri-btn-pro-download"
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
            className="dri-documents-list-view"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredDocuments.map((doc, index) => {
                const fileUrl = doc.docUrl || doc.href || '#';

                return (
                  <motion.div
                    key={doc._id || doc.id || index}
                    variants={itemVariants}
                    layout
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="dri-pro-row-card"
                    onClick={(e) => handleView(e, fileUrl)}
                  >
                    {/* Left: Red Gradient PDF Squircle Badge */}
                    <div className="dri-row-icon-col">
                      <div className="dri-pdf-squircle">
                        <FaFilePdf className="dri-pdf-glyph" />
                      </div>
                    </div>

                    {/* Middle: Document Category Tag, Title */}
                    <div className="dri-row-body-col">
                      <div className="dri-row-top-tags">
                        <span className="dri-tag-category">
                          <FaBolt className="me-1 text-warning" />
                          {doc.category || 'Distribution Circular'}
                        </span>
                      </div>

                      <h3 className="dri-row-title">
                        {doc.title}
                      </h3>
                    </div>

                    {/* Right: Action Buttons Group */}
                    <div className="dri-row-actions-col" onClick={(e) => e.stopPropagation()}>
                      <button 
                        type="button"
                        className="dri-btn-pro-view"
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
                        download={doc.title || 'distribution-instruction.pdf'}
                        className="dri-btn-pro-download"
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

export default DistributionRelatedInstructions;