import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import {
  FaFilePdf,
  FaSearch,
  FaDownload,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaAward,
  FaFolderOpen,
  FaThLarge,
  FaList,
  FaSyncAlt,
  FaTimes,
  FaSortAmountDown,
  FaSortAmountUp,
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
  FaUsers,
  FaInfoCircle
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAllBoardProceedings } from '../api';
import './BoardProceedings.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
};



const BoardProceedings = () => {
  const navigate = useNavigate();
  const [proceedings, setProceedings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigation & Filter States
  // selectedCategory: null (home) | "BP's & Orders" | "Panels & Promotion" | "ALL"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest) | 'asc' (oldest)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBoardProceedings();
      const list = Array.isArray(data) ? data : [];
      setProceedings(list);
    } catch (err) {
      console.error('Failed to load board proceedings:', err);
      setError('Unable to fetch board proceedings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Category counts
  const totalCount = proceedings.length;
  const bpOrdersCount = useMemo(
    () =>
      proceedings.filter(
        (p) => p.category && p.category.toLowerCase().includes('bp')
      ).length,
    [proceedings]
  );
  const panelsPromotionCount = useMemo(
    () =>
      proceedings.filter(
        (p) => p.category && p.category.toLowerCase().includes('panel')
      ).length,
    [proceedings]
  );

  // Determines whether to show the documents view or the home selection cards
  const isDocumentsView = Boolean(selectedCategory || searchQuery.trim());

  // Filtered and Sorted list
  const filteredProceedings = useMemo(() => {
    return proceedings
      .filter((item) => {
        // Category Filter (only applies if a specific category is chosen, or default to all if searching without category)
        const matchesCategory =
          !selectedCategory ||
          selectedCategory === 'ALL' ||
          (item.category &&
            item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase());

        // Search Filter
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          (item.title && item.title.toLowerCase().includes(query)) ||
          (item.category && item.category.toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt || a.updatedAt || 0).getTime();
        const timeB = new Date(b.createdAt || b.updatedAt || 0).getTime();
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      });
  }, [proceedings, selectedCategory, searchQuery, sortOrder]);

  const handleOpenDoc = (url, title) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Document Notice',
        text: `The document for "${title}" is not currently uploaded in digital format. Please contact the Board Secretariat.`,
        confirmButtonColor: '#1b5baf',
      });
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetToCategories = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`board-proceedings-page ${isDocumentsView ? 'bp-docs-mode-page' : ''}`}>
      {/* =================================================================== */}
      {/* HERO BANNER (SHOWN ON HOME CATEGORIES VIEW ONLY)                    */}
      {/* =================================================================== */}
      {!isDocumentsView && (
        <section className="bp-hero-banner">
          <div className="bp-hero-ambient-glow"></div>
          <div className="bp-hero-inner container">
            {/* Left Column: Heading & Info */}
            <div className="bp-hero-left">
              <div className="bp-official-archive-tag">
                <span className="tag-dash">—</span>
                <span className="tag-text">TNEBEA OFFICIAL ARCHIVE</span>
                <span className="tag-dash">—</span>
              </div>

              <h1 className="bp-hero-title">
                Board <span className="bp-hero-title-gold">Proceedings</span>
              </h1>

              {/* Glowing Golden Bar below Title */}
              <div className="bp-hero-gold-glow-line"></div>

              <h2 className="bp-hero-subtitle">Official Orders &amp; Promotion Panels</h2>

              <p className="bp-hero-desc">
                Search documents or select a category below to explore official proceedings, orders, and promotion panels.
              </p>
            </div>

            {/* Right Column: Deep Navy Tamil Nadu Map & Golden Calligraphy Slogan */}
            <div className="bp-hero-graphics">
              {/* Deep Navy Tamil Nadu Map */}
              <div className="bp-map-wrap">
                <svg
                  className="bp-tn-map-svg"
                  viewBox="0 0 280 320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="tnMapGradNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#144896" stopOpacity="0.95" />
                      <stop offset="45%" stopColor="#0b2c61" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#051733" stopOpacity="0.98" />
                    </linearGradient>
                    <filter id="mapDeepShadow" x="-15%" y="-15%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#020b1a" floodOpacity="0.75" />
                    </filter>
                    <linearGradient id="swooshGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="60%" stopColor="#fab81e" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  {/* 1:1 Pixel-Accurate Traced Outline of Tamil Nadu in Deep Navy */}
                  <path
                    d="M 256.6 10 
                       L 270 14.9 L 270 25.8 L 265.1 44 L 266.4 56.2 L 256.6 76.8 
                       L 238.4 98.7 L 237.2 135.1 L 242.1 137.5 L 242.1 144.8 L 234.8 146 
                       L 215.3 165.5 L 183.7 211.6 L 183.7 220.1 L 187.4 222.6 L 191 221.3 
                       L 194.7 228.6 L 203.2 229.8 L 205.6 234.7 L 188.6 232.3 L 175.2 242 
                       L 159.4 243.2 L 148.5 255.3 L 149.7 265.1 L 138.8 277.2 L 132.7 289.4 
                       L 118.1 296.6 L 95 297.9 L 97.5 301.5 L 103.6 300.3 L 98.7 308.8 
                       L 101.1 310 L 72 310 L 65 302 L 62 288 L 65 278 L 74.4 272.3 
                       L 79.3 276 L 89 269.9 L 87.8 259 L 92.6 254.1 L 91.4 250.5 
                       L 93.8 248.1 L 87.8 240.8 L 87.8 228.6 L 93.8 220.1 L 90.2 210.4 
                       L 95 203.1 L 92.6 193.4 L 96.3 187.3 L 90.2 181.3 L 76.8 189.8 
                       L 74.4 184.9 L 74.4 167.9 L 70.7 163 L 73.2 153.3 L 68.3 147.2 
                       L 61 146 L 65.9 136.3 L 57.4 127.8 L 56.2 123 L 40.4 110.8 
                       L 40.4 107.2 L 55 99.9 L 76.8 106 L 91.4 92.6 L 104.8 96.2 
                       L 112.1 95 L 115.7 88.9 L 124.2 84.1 L 124.2 80.4 L 115.7 68.3 
                       L 115.7 63.4 L 124.2 44 L 131.5 41.6 L 133.9 36.7 L 147.3 40.4 
                       L 150.9 46.4 L 159.4 47.7 L 166.7 45.2 L 171.6 33.1 L 178.9 28.2 
                       L 191 27 L 200.7 31.9 L 206.8 29.4 L 211.7 23.4 L 225 25.8 
                       L 232.3 17.3 L 242.1 19.7 L 256.6 10 Z"
                    fill="url(#tnMapGradNavy)"
                    stroke="#1d55a4"
                    strokeWidth="1"
                    filter="url(#mapDeepShadow)"
                  />
                </svg>
              </div>

              {/* Golden Calligraphy Slogan with Swoosh */}
              <div className="bp-script-slogan gold-calligraphy">
                <span>Powering</span>
                <span>People</span>
                <span>Empowering</span>
                <span>Engineers</span>
                <svg
                  className="bp-slogan-swoosh"
                  viewBox="0 0 120 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 5,10 C 35,4 85,2 115,5 C 75,8 35,11 5,10 Z"
                    fill="url(#swooshGold)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* MAIN CONTAINER (SEARCH BAR + POPULAR SEARCHES + CARDS / DOCS)       */}
      {/* =================================================================== */}
      <div className={`bp-body-wrap container ${isDocumentsView ? 'bp-docs-mode' : ''}`}>
        {/* ================================================================= */}
        {/* VIEW 1: HOME SELECTION SCREEN                                     */}
        {/* ================================================================= */}
        {!isDocumentsView ? (
          <motion.div
            className="bp-home-selection-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* 1. Large Floating Search Bar (Exact 50/50 Overlapping Hero Banner) */}
            <div className="bp-hero-search-wrapper">
              <div className="bp-hero-search-card">
                <div className="bp-search-input-box">
                  <FaSearch className="bp-search-lens-icon" />
                  <input
                    type="text"
                    className="bp-main-search-input"
                    placeholder="Search all proceedings by title, order no., or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        // Handled by state
                      }
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="bp-search-clear-btn"
                      onClick={() => setSearchQuery('')}
                      title="Clear search"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Two Advanced Category Cards (Clean Executive Layout) */}
            <div className="bp-category-selection-cards">
              {/* CARD 1: BP's & Orders (Soft Royal Blue Theme) */}
              <motion.div
                className="bp-card-modern bp-card-blue"
                onClick={() => handleSelectCategory("BP's & Orders")}
                whileHover={{ y: -6, scale: 1.012, transition: { duration: 0.22 } }}
                whileTap={{ scale: 0.985 }}
              >
                {/* Background Watermark */}
                <div className="card-bg-watermark watermark-blue">
                  <FaFileAlt />
                </div>

                <div className="card-inner-top">
                  {/* Card Header */}
                  <div className="card-header-flex">
                    <div className="card-header-left">
                      <div className="card-icon-box icon-blue">
                        <FaFileAlt />
                      </div>
                      <div className="card-header-titles">
                        <span className="card-tag-pill tag-blue">
                          OFFICIAL GAZETTE &amp; ORDERS
                        </span>
                        <h2 className="card-title-text">BP's &amp; Orders</h2>
                      </div>
                    </div>

                    <div className="card-count-badge badge-blue">
                      <FaFileAlt className="me-1" /> {bpOrdersCount} {bpOrdersCount === 1 ? 'Document' : 'Documents'}
                    </div>
                  </div>

                  {/* Card Description */}
                  <p className="card-description-text">
                    Official Board Proceedings, administrative decisions, service regulations, and gazetted notifications.
                  </p>
                </div>

                {/* Full Width Gold CTA Button */}
                <button
                  type="button"
                  className="card-cta-btn btn-gold-pill"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectCategory("BP's & Orders");
                  }}
                >
                  <span>Explore BP's &amp; Orders</span>
                  <span className="cta-arrow-circle">
                    <FaArrowRight />
                  </span>
                </button>
              </motion.div>

              {/* CARD 2: Panels & Promotion (Soft Obsidian / Amber Gold Theme) */}
              <motion.div
                className="bp-card-modern bp-card-amber"
                onClick={() => handleSelectCategory('Panels & Promotion')}
                whileHover={{ y: -6, scale: 1.012, transition: { duration: 0.22 } }}
                whileTap={{ scale: 0.985 }}
              >
                {/* Background Watermark */}
                <div className="card-bg-watermark watermark-amber">
                  <FaUsers />
                </div>

                <div className="card-inner-top">
                  {/* Card Header */}
                  <div className="card-header-flex">
                    <div className="card-header-left">
                      <div className="card-icon-box icon-amber">
                        <FaUsers />
                      </div>
                      <div className="card-header-titles">
                        <span className="card-tag-pill tag-amber">
                          CADRE &amp; SENIORITY
                        </span>
                        <h2 className="card-title-text">Panels &amp; Promotion</h2>
                      </div>
                    </div>

                    <div className="card-count-badge badge-amber">
                      <FaUsers className="me-1" /> {panelsPromotionCount} {panelsPromotionCount === 1 ? 'Document' : 'Documents'}
                    </div>
                  </div>

                  {/* Card Description */}
                  <p className="card-description-text">
                    Executive promotion panels, seniority listings, suitability rankings, and cadre advancements.
                  </p>
                </div>

                {/* Full Width Gold CTA Button */}
                <button
                  type="button"
                  className="card-cta-btn btn-gold-pill"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectCategory('Panels & Promotion');
                  }}
                >
                  <span>Explore Panels &amp; Promotion</span>
                  <span className="cta-arrow-circle">
                    <FaArrowRight />
                  </span>
                </button>
              </motion.div>
            </div>

            {/* 4. Footer Accent Tagline */}
            <div className="bp-footer-accent-bar">
              <span className="footer-bar-line"></span>
              <span className="footer-bar-text">
                SERVING ENGINEERS &bull; SUPPORTING PROGRESS &bull; SINCE 1946
              </span>
              <span className="footer-bar-line"></span>
            </div>
          </motion.div>
        ) : (
          /* ================================================================= */
          /* VIEW 2: DOCUMENTS VIEW (WHEN SEARCHING OR CATEGORY SELECTED)      */
          /* ================================================================= */
          <motion.div
            className="bp-documents-view-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Top Navigation & Controls Card */}
            <div className="bp-controls-card">
              {/* Category Breadcrumb & Back Button */}
              <div className="bp-category-header-row">
                <button
                  type="button"
                  className="bp-back-categories-btn"
                  onClick={handleResetToCategories}
                  title="Return to category cards"
                >
                  <FaArrowLeft className="me-2" /> Back to Categories
                </button>

                <div className="bp-active-category-title-wrap">
                  <span className="bp-cat-icon">
                    {selectedCategory === 'Panels & Promotion' ? (
                      <FaUsers style={{ color: '#ffca38' }} />
                    ) : selectedCategory === "BP's & Orders" ? (
                      <FaFileAlt style={{ color: '#ffca38' }} />
                    ) : (
                      <FaFolderOpen style={{ color: '#ffca38' }} />
                    )}
                  </span>
                  <div>
                    <h2 className="bp-cat-title">
                      {searchQuery
                        ? `Search Results`
                        : selectedCategory === 'ALL'
                        ? 'All Proceedings'
                        : selectedCategory}
                    </h2>
                    <span className="bp-cat-count-text">
                      {filteredProceedings.length} {filteredProceedings.length === 1 ? 'document' : 'documents'} found
                      {searchQuery ? ` for "${searchQuery}"` : ''}
                    </span>
                  </div>
                </div>

                <div className="bp-header-quick-switch">
                  <button
                    type="button"
                    className={`bp-switch-pill ${!selectedCategory || selectedCategory === 'ALL' ? 'active-pill pill-navy' : ''}`}
                    onClick={() => setSelectedCategory('ALL')}
                  >
                    All ({totalCount})
                  </button>
                  <button
                    type="button"
                    className={`bp-switch-pill ${selectedCategory === "BP's & Orders" ? 'active-pill pill-blue' : ''}`}
                    onClick={() => setSelectedCategory("BP's & Orders")}
                  >
                    BP's &amp; Orders ({bpOrdersCount})
                  </button>
                  <button
                    type="button"
                    className={`bp-switch-pill ${selectedCategory === 'Panels & Promotion' ? 'active-pill pill-amber' : ''}`}
                    onClick={() => setSelectedCategory('Panels & Promotion')}
                  >
                    Panels &amp; Promotion ({panelsPromotionCount})
                  </button>
                </div>
              </div>

              {/* Search Bar & View Options inside Document View */}
              <div className="bp-search-row mt-3">
                <div className="bp-search-input-wrapper">
                  <FaSearch className="bp-search-icon" />
                  <input
                    type="text"
                    className="bp-search-input"
                    placeholder="Refine search by title, number, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus={Boolean(searchQuery)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="bp-search-clear"
                      onClick={() => setSearchQuery('')}
                      title="Clear search"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                <div className="bp-action-btns">
                  {/* Sort Order Toggle */}
                  <button
                    type="button"
                    className="bp-sort-btn"
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    title={`Sort by date: ${sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}`}
                  >
                    {sortOrder === 'desc' ? (
                      <>
                        <FaSortAmountDown className="me-1" /> Newest First
                      </>
                    ) : (
                      <>
                        <FaSortAmountUp className="me-1" /> Oldest First
                      </>
                    )}
                  </button>

                  {/* View Switcher */}
                  <div className="bp-view-switcher">
                    <button
                      type="button"
                      className={`bp-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Grid Cards View"
                    >
                      <FaThLarge />
                    </button>
                    <button
                      type="button"
                      className={`bp-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                      onClick={() => setViewMode('table')}
                      title="List Table View"
                    >
                      <FaList />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="bp-refresh-sync-btn small"
                    onClick={fetchData}
                    title="Refresh Records"
                  >
                    <FaSyncAlt className={loading ? 'fa-spin' : ''} />
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Content: Loading / Error / Empty / Grid / Table */}
            {loading ? (
              <div className="bp-loading-state">
                <div className="bp-spinner"></div>
                <p>Fetching official records from repository...</p>
              </div>
            ) : error ? (
              <div className="bp-error-state">
                <FaInfoCircle className="bp-error-icon" />
                <h3>Unable to Load Records</h3>
                <p>{error}</p>
                <button className="bp-retry-btn" onClick={fetchData}>
                  <FaSyncAlt className="me-2" /> Try Again
                </button>
              </div>
            ) : filteredProceedings.length === 0 ? (
              <motion.div
                className="bp-empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bp-empty-icon-wrap">
                  <FaFolderOpen />
                </div>
                <h3>No Documents Found</h3>
                <p>
                  {searchQuery
                    ? `No documents matched your search query "${searchQuery}".`
                    : `There are currently no records uploaded under "${
                        selectedCategory || 'this category'
                      }".`}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  {searchQuery && (
                    <button
                      className="bp-clear-search-btn"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search Filter
                    </button>
                  )}
                  <button
                    className="bp-clear-search-btn"
                    onClick={handleResetToCategories}
                  >
                    View All Categories
                  </button>
                </div>
              </motion.div>
            ) : viewMode === 'grid' ? (
              /* ================= GRID VIEW ================= */
              <motion.div
                className="bp-grid-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {filteredProceedings.map((item, index) => {
                    const isBP =
                      item.category && item.category.toLowerCase().includes('bp');
                    return (
                      <motion.div
                        key={item._id || index}
                        className="bp-doc-card"
                        variants={itemVariants}
                        layout
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        onClick={() => handleOpenDoc(item.docUrl, item.title)}
                      >
                        <div className="bp-card-top">
                          <span className={`bp-category-badge ${isBP ? 'bp-badge' : 'promo-badge'}`}>
                            {isBP ? <FaFolderOpen className="me-1" /> : <FaAward className="me-1" />}
                            {item.category || "BP's & Orders"}
                          </span>

                          <span className="bp-date-badge">
                            <FaCalendarAlt className="me-1" />
                            {formatDate(item.createdAt || item.updatedAt)}
                          </span>
                        </div>

                        <div className="bp-card-body">
                          <div className="bp-doc-icon-pill">
                            <FaFilePdf className="pdf-symbol" />
                          </div>
                          <div className="bp-title-wrap">
                            <h3 className="bp-card-title">{item.title}</h3>
                            {item.description && (
                              <p className="bp-card-desc">{item.description}</p>
                            )}
                          </div>
                        </div>

                        <div className="bp-card-footer" onClick={(e) => e.stopPropagation()}>
                          {item.docUrl ? (
                            <>
                              <a
                                href={item.docUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bp-btn-view"
                                title="View document in new tab"
                              >
                                <FaExternalLinkAlt className="me-1" /> View
                              </a>
                              <a
                                href={item.docUrl}
                                download={item.title}
                                className="bp-btn-download"
                                title="Download document"
                              >
                                <FaDownload className="me-1" /> Download
                              </a>
                            </>
                          ) : (
                            <span className="bp-no-doc-tag">Digital Copy Pending</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* ================= TABLE VIEW ================= */
              <motion.div
                className={`bp-table-card ${
                  selectedCategory === "BP's & Orders"
                    ? 'theme-blue'
                    : selectedCategory === 'Panels & Promotion'
                    ? 'theme-amber'
                    : 'theme-navy'
                }`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bp-table-responsive">
                  <table className="bp-table">
                    <thead>
                      <tr>
                        <th className="th-sno">S.No</th>
                        <th className="th-title">Proceeding Title &amp; Subject</th>
                        <th className="th-category">Category</th>
                        <th className="th-date">Published Date</th>
                        <th className="th-actions">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProceedings.map((item, index) => {
                        const isBP =
                          item.category && item.category.toLowerCase().includes('bp');
                        return (
                          <motion.tr
                            key={item._id || index}
                            className="bp-table-row"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.03 }}
                            onClick={() => handleOpenDoc(item.docUrl, item.title)}
                          >
                            <td className="td-sno">
                              <span className="bp-sno-badge">{index + 1}</span>
                            </td>
                            <td className="td-title">
                              <div className="title-with-icon">
                                <FaFilePdf className="table-pdf-icon" />
                                <div>
                                  <span className="table-doc-title">{item.title}</span>
                                  {item.description && (
                                    <p className="table-doc-subdesc">{item.description}</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="td-category">
                              <span className={`bp-category-badge ${isBP ? 'bp-badge' : 'promo-badge'}`}>
                                {item.category || "BP's & Orders"}
                              </span>
                            </td>
                            <td className="td-date">
                              <div className="date-with-icon">
                                <FaCalendarAlt className="me-1 text-muted" />
                                {formatDate(item.createdAt || item.updatedAt)}
                              </div>
                            </td>
                            <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                              {item.docUrl ? (
                                <div className="table-btn-group">
                                  <a
                                    href={item.docUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="table-action-btn view"
                                    title="Open in new tab"
                                  >
                                    <FaExternalLinkAlt /> View
                                  </a>
                                  <a
                                    href={item.docUrl}
                                    download={item.title}
                                    className="table-action-btn download"
                                    title="Download PDF"
                                  >
                                    <FaDownload /> Download
                                  </a>
                                </div>
                              ) : (
                                <span className="text-muted small">Not Available</span>
                              )}
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Back to Home Button */}
        <motion.div
          className="bp-back-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button className="bp-back-home-btn" onClick={() => navigate('/')}>
            <FaArrowLeft className="me-2" /> Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BoardProceedings;