import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFileAlt,
  FaFilePdf,
  FaCalendarAlt,
  FaSearch,
  FaTimes,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSyncAlt,
  FaExclamationTriangle
} from 'react-icons/fa';
import { getAllImportantNotices } from '../api';
import './Importantnotices.css';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const parseItemDate = (item) => {
  const title = item.Notice_title || item.title || item.name || '';
  const description = item.description || item.content || item.summary || '';
  const explicitDate = item.date || item.createdAt || item.updatedAt;

  // 1. Explicit document date in title or description (e.g. dt 12.05.2026, 13-05-26)
  const textToSearch = `${title} ${description}`;
  const dateRegexNumeric = /(?:dt\.?|dated|date)?\s*(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/i;
  const matchNumeric = textToSearch.match(dateRegexNumeric);

  if (matchNumeric) {
    const day = parseInt(matchNumeric[1], 10);
    const monthIndex = parseInt(matchNumeric[2], 10) - 1;
    let year = parseInt(matchNumeric[3], 10);
    if (year < 100) year = year < 50 ? 2000 + year : 1900 + year;

    if (monthIndex >= 0 && monthIndex < 12 && day > 0 && day <= 31 && year >= 1900 && year <= 2100) {
      return {
        day: day.toString().padStart(2, '0'),
        month: MONTH_NAMES[monthIndex],
        year: year.toString(),
        formatted: `${day.toString().padStart(2, '0')} ${MONTH_NAMES[monthIndex]} ${year}`,
        dateObj: new Date(year, monthIndex, day)
      };
    }
  }

  // 2. Explicit date property or createdAt
  if (explicitDate) {
    const parsed = new Date(explicitDate);
    if (!isNaN(parsed.getTime())) {
      const day = parsed.getDate();
      const month = MONTH_NAMES[parsed.getMonth()];
      const year = parsed.getFullYear();
      return {
        day: day.toString().padStart(2, '0'),
        month,
        year: year.toString(),
        formatted: `${day.toString().padStart(2, '0')} ${month} ${year}`,
        dateObj: parsed
      };
    }
  }

  const now = new Date();
  return {
    day: now.getDate().toString().padStart(2, '0'),
    month: MONTH_NAMES[now.getMonth()],
    year: now.getFullYear().toString(),
    formatted: `${now.getDate().toString().padStart(2, '0')} ${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`,
    dateObj: now
  };
};

/* --- Royal Scroll Ornaments (SVG Finials & Flourishes) --- */
const ScrollFinialLeft = () => (
  <div className="scroll-roller-knob knob-left">
    <svg viewBox="0 0 54 64" className="knob-svg">
      <defs>
        <linearGradient id="finialGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2a8" />
          <stop offset="35%" stopColor="#e5b842" />
          <stop offset="70%" stopColor="#9e6e10" />
          <stop offset="100%" stopColor="#ffea8a" />
        </linearGradient>
        <linearGradient id="knobGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffea9f" />
          <stop offset="40%" stopColor="#dca42b" />
          <stop offset="80%" stopColor="#7a4f08" />
          <stop offset="100%" stopColor="#ffd875" />
        </linearGradient>
        <linearGradient id="blueInlay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#082b60" />
          <stop offset="50%" stopColor="#041738" />
          <stop offset="100%" stopColor="#0b3778" />
        </linearGradient>
        <filter id="knobShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-2" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#knobShadow)">
        {/* Outer Round Finial Tip */}
        <circle cx="9" cy="32" r="7.5" fill="url(#knobGold)" stroke="#6b4604" strokeWidth="0.8" />
        <ellipse cx="7.5" cy="29.5" rx="3" ry="1.8" fill="#fff" opacity="0.6" />
        
        {/* Collar & Neck */}
        <rect x="14" y="27" width="5" height="10" rx="1.5" fill="url(#finialGold)" stroke="#6b4604" strokeWidth="0.6" />
        <rect x="18" y="22" width="6" height="20" rx="2" fill="url(#finialGold)" stroke="#6b4604" strokeWidth="0.6" />
        
        {/* Main Blue Enamelled Sleeve with Gold Filigree */}
        <rect x="23" y="14" width="22" height="36" rx="3" fill="url(#blueInlay)" stroke="url(#finialGold)" strokeWidth="1.2" />
        
        {/* Gold Filigree Patterns inside Blue Sleeve */}
        <path d="M26 19 C31 16 37 16 42 19 M26 45 C31 48 37 48 42 45" stroke="#fab81e" strokeWidth="1" fill="none" />
        <path d="M34 20 C30 25 30 39 34 44 M34 32 C38 27 42 27 42 32 C42 37 38 37 34 32" stroke="#fab81e" strokeWidth="1" fill="none" />
        <circle cx="34" cy="32" r="2" fill="#ffd700" />
        <circle cx="28" cy="26" r="1.2" fill="#ffd700" />
        <circle cx="40" cy="26" r="1.2" fill="#ffd700" />
        <circle cx="28" cy="38" r="1.2" fill="#ffd700" />
        <circle cx="40" cy="38" r="1.2" fill="#ffd700" />
        
        {/* Inner Gold Ring connecting to roller cylinder */}
        <rect x="44" y="11" width="7" height="42" rx="2" fill="url(#knobGold)" stroke="#6b4604" strokeWidth="0.8" />
      </g>
    </svg>
  </div>
);

const ScrollFinialRight = () => (
  <div className="scroll-roller-knob knob-right">
    <svg viewBox="0 0 54 64" className="knob-svg">
      <defs>
        <linearGradient id="finialGoldR" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff2a8" />
          <stop offset="35%" stopColor="#e5b842" />
          <stop offset="70%" stopColor="#9e6e10" />
          <stop offset="100%" stopColor="#ffea8a" />
        </linearGradient>
        <linearGradient id="knobGoldR" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffea9f" />
          <stop offset="40%" stopColor="#dca42b" />
          <stop offset="80%" stopColor="#7a4f08" />
          <stop offset="100%" stopColor="#ffd875" />
        </linearGradient>
        <linearGradient id="blueInlayR" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#082b60" />
          <stop offset="50%" stopColor="#041738" />
          <stop offset="100%" stopColor="#0b3778" />
        </linearGradient>
        <filter id="knobShadowR" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#knobShadowR)">
        {/* Inner Gold Ring connecting to roller cylinder */}
        <rect x="3" y="11" width="7" height="42" rx="2" fill="url(#knobGoldR)" stroke="#6b4604" strokeWidth="0.8" />
        
        {/* Main Blue Enamelled Sleeve with Gold Filigree */}
        <rect x="9" y="14" width="22" height="36" rx="3" fill="url(#blueInlayR)" stroke="url(#finialGoldR)" strokeWidth="1.2" />
        
        {/* Gold Filigree Patterns inside Blue Sleeve */}
        <path d="M12 19 C17 16 23 16 28 19 M12 45 C17 48 23 48 28 45" stroke="#fab81e" strokeWidth="1" fill="none" />
        <path d="M20 20 C16 25 16 39 20 44 M20 32 C24 27 28 27 28 32 C28 37 24 37 20 32" stroke="#fab81e" strokeWidth="1" fill="none" />
        <circle cx="20" cy="32" r="2" fill="#ffd700" />
        <circle cx="14" cy="26" r="1.2" fill="#ffd700" />
        <circle cx="26" cy="26" r="1.2" fill="#ffd700" />
        <circle cx="14" cy="38" r="1.2" fill="#ffd700" />
        <circle cx="26" cy="38" r="1.2" fill="#ffd700" />

        {/* Collar & Neck */}
        <rect x="30" y="22" width="6" height="20" rx="2" fill="url(#finialGoldR)" stroke="#6b4604" strokeWidth="0.6" />
        <rect x="35" y="27" width="5" height="10" rx="1.5" fill="url(#finialGoldR)" stroke="#6b4604" strokeWidth="0.6" />
        
        {/* Outer Round Finial Tip */}
        <circle cx="45" cy="32" r="7.5" fill="url(#knobGoldR)" stroke="#6b4604" strokeWidth="0.8" />
        <ellipse cx="43.5" cy="29.5" rx="3" ry="1.8" fill="#fff" opacity="0.6" />
      </g>
    </svg>
  </div>
);



const GoldFlourishDivider = () => (
  <div className="scroll-footer-flourish">
    <span className="flourish-line"></span>
    <svg viewBox="0 0 120 18" className="footer-flourish-svg" aria-hidden="true">
      <path
        d="M5 9 C25 9 35 3 48 3 C55 3 58 7 60 9 C62 7 65 3 72 3 C85 3 95 9 115 9"
        stroke="#1a457d"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M20 9 C35 14 48 14 60 9 C72 14 85 14 100 9"
        stroke="#fab81e"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="60" cy="9" r="2.5" fill="#072a60" stroke="#fab81e" strokeWidth="0.8" />
      <path d="M60 2 L62 7 L60 9 L58 7 Z" fill="#072a60" />
      <path d="M60 16 L62 11 L60 9 L58 11 Z" fill="#072a60" />
    </svg>
    <span className="flourish-line"></span>
  </div>
);

const DeckledEdgeBorder = () => (
  <div className="parchment-deckle-edge left-edge" aria-hidden="true">
    <svg viewBox="0 0 18 800" preserveAspectRatio="none" className="deckle-svg">
      <path
        d="M18 0 Q 3 25 12 50 Q 0 75 14 100 Q 4 125 11 150 Q 2 175 13 200 Q 5 225 10 250 Q 0 275 15 300 Q 3 325 12 350 Q 1 375 14 400 Q 4 425 11 450 Q 2 475 13 500 Q 5 525 10 550 Q 0 575 15 600 Q 3 625 12 650 Q 1 675 14 700 Q 4 725 11 750 Q 2 775 18 800 L 18 0 Z"
        fill="#f3e5c8"
      />
    </svg>
  </div>
);

const DeckledEdgeBorderRight = () => (
  <div className="parchment-deckle-edge right-edge" aria-hidden="true">
    <svg viewBox="0 0 18 800" preserveAspectRatio="none" className="deckle-svg">
      <path
        d="M0 0 Q 15 25 6 50 Q 18 75 4 100 Q 14 125 7 150 Q 16 175 5 200 Q 13 225 8 250 Q 18 275 3 300 Q 15 325 6 350 Q 17 375 4 400 Q 14 425 7 450 Q 16 475 5 500 Q 13 525 8 550 Q 18 575 3 600 Q 15 625 6 650 Q 17 675 4 700 Q 14 725 7 750 Q 16 775 0 800 L 0 0 Z"
        fill="#f3e5c8"
      />
    </svg>
  </div>
);

const Importantnotices = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError(null);

      const rawNotices = await getAllImportantNotices();
      const noticesArray = Array.isArray(rawNotices) ? rawNotices : [];

      const normalized = noticesArray.map((item, idx) => {
        const title = item.Notice_title || item.title || 'Untitled Notice';
        const link = item.docUrl || item.link || item.pdfUrl || item.url || '';
        const dateInfo = parseItemDate(item);
        const rawType = item.Type || item.type || 'Official Notice';

        return {
          id: item._id || item.id || `notice-${idx}`,
          title,
          link,
          rawType,
          dateInfo
        };
      });

      // Sort by date descending
      normalized.sort((a, b) => b.dateInfo.dateObj.getTime() - a.dateInfo.dateObj.getTime());

      setItems(normalized);
    } catch (err) {
      console.error('Error fetching important notices:', err);
      setError('Unable to load notices at this time. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const openDocument = (link) => {
    if (!link) return;
    const finalLink = link.startsWith('http') ? link : `https://tnebeaengineers.in/${link}`;
    window.open(finalLink, '_blank', 'noopener,noreferrer');
  };

  // Filtered items by search
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return (
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rawType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dateInfo.formatted.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [items, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const scrollEl = document.querySelector('.royal-scroll-wrapper');
      if (scrollEl) {
        scrollEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="royal-notices-container">
      {/* 1. HERO BANNER */}
      <div className="royal-hero-banner">
        <div className="royal-hero-ambient-glow"></div>
        <div className="royal-hero-content">
          <h1>
            Important <span className="title-gold-text">Notices</span>
          </h1>
          <div className="royal-hero-divider"></div>
          <p className="royal-hero-tagline">
            Official announcements, orders, circulars, and notifications for TNEB engineers
          </p>
        </div>
      </div>

      {/* 2. ROYAL SEARCH BAR */}
      <div className="royal-search-wrapper">
        <div className="royal-search-bar">
          <FaSearch className="royal-search-icon" />
          <input
            type="text"
            placeholder="Search by title, category, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="royal-search-input"
          />
          {searchTerm && (
            <button
              className="royal-search-clear"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* 3. AUTHENTIC ROYAL PARCHMENT SCROLL TABLE */}
      <div className="royal-scroll-main-wrapper">
        <div className="royal-scroll-wrapper">
          {/* Top Roller Bar */}
          <div className="royal-scroll-roller roller-top">
            <ScrollFinialLeft />
            <div className="scroll-roller-cylinder">
              <div className="cylinder-highlight"></div>
              <div className="cylinder-texture"></div>
            </div>
            <ScrollFinialRight />
          </div>

          {/* Parchment Sheet */}
          <div className="royal-parchment-sheet">
            <DeckledEdgeBorder />
            <DeckledEdgeBorderRight />

            <div className="parchment-inner-content">
              {loading ? (
                <div className="parchment-state-box">
                  <div className="royal-spinner"></div>
                  <h4 className="state-title">Loading Official Notices...</h4>
                  <p className="state-desc">Fetching latest records from the server.</p>
                </div>
              ) : error ? (
                <div className="parchment-state-box error-state">
                  <FaExclamationTriangle className="state-icon error-icon" />
                  <h4 className="state-title">Unable to Load Notices</h4>
                  <p className="state-desc">{error}</p>
                  <button className="parchment-retry-btn" onClick={fetchNotices}>
                    <FaSyncAlt className="me-2" /> Try Again
                  </button>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="parchment-state-box empty-state">
                  <FaFilePdf className="state-icon empty-icon" />
                  <h4 className="state-title">No Notices Found</h4>
                  <p className="state-desc">
                    {searchTerm
                      ? `No notices match "${searchTerm}". Please try a different query.`
                      : 'There are currently no active notices available.'}
                  </p>
                  {searchTerm && (
                    <button className="parchment-retry-btn" onClick={() => setSearchTerm('')}>
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <div className="royal-table-scroll-container">
                  <table className="royal-scroll-table" aria-label="Important Notices Table">
                    <thead>
                      <tr>
                        {/* 1. Notice Title Header */}
                        <th className="th-notice-title">
                          <div className="th-content-flex">
                            <FaFileAlt className="th-icon" />
                            <span>NOTICE TITLE</span>
                          </div>
                        </th>

                        {/* 2. Date Header */}
                        <th className="th-date text-center">
                          <div className="th-content-flex justify-center">
                            <FaCalendarAlt className="th-icon" />
                            <span>DATE</span>
                          </div>
                        </th>

                        {/* 3. Document Header */}
                        <th className="th-document text-center">
                          <div className="th-content-flex justify-center">
                            <FaFileAlt className="th-icon" />
                            <span>DOCUMENT</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence mode="popLayout">
                        {paginatedItems.map((item, index) => {
                          const hasDocument = Boolean(item.link);

                          return (
                            <motion.tr
                              key={item.id}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.02 }}
                              className="parchment-row"
                            >
                              {/* 1. Notice Title */}
                              <td className="td-notice-title">
                                <div className="notice-title-wrap">
                                  {hasDocument ? (
                                    <a
                                      href={
                                        item.link.startsWith('http')
                                          ? item.link
                                          : `https://tnebeaengineers.in/${item.link}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="parchment-title-link"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        openDocument(item.link);
                                      }}
                                      title="Open Notice PDF"
                                    >
                                      {item.title}
                                    </a>
                                  ) : (
                                    <span className="parchment-title-text">{item.title}</span>
                                  )}
                                </div>
                              </td>

                              {/* 2. Date Pill */}
                              <td className="td-date text-center">
                                <div className="parchment-date-pill">
                                  <FaCalendarAlt className="date-pill-icon" />
                                  <span className="date-pill-text">{item.dateInfo.formatted}</span>
                                </div>
                              </td>

                              {/* 3. View PDF Button */}
                              <td className="td-document text-center">
                                {hasDocument ? (
                                  <button
                                    type="button"
                                    className="parchment-pdf-btn"
                                    onClick={() => openDocument(item.link)}
                                    title="View PDF Document"
                                  >
                                    <FaFilePdf className="btn-pdf-icon" />
                                    <span className="btn-pdf-text">View PDF</span>
                                    <FaExternalLinkAlt className="btn-ext-icon" />
                                  </button>
                                ) : (
                                  <span className="no-doc-tag">No Doc</span>
                                )}
                              </td>
                            </motion.tr>
                          );
                        })}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              )}

              {/* 4. PARCHMENT FOOTER WITH PAGINATION */}
              {!loading && !error && filteredItems.length > 0 && (
                <div className="parchment-footer">
                  <div className="parchment-footer-count">
                    Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> -{' '}
                    <strong>{Math.min(currentPage * itemsPerPage, filteredItems.length)}</strong> of{' '}
                    <strong>{filteredItems.length}</strong> records
                  </div>

                  <GoldFlourishDivider />

                  <div className="parchment-pagination">
                    <button
                      className="parchment-page-nav-btn prev-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      title="Previous page"
                    >
                      <FaChevronLeft />
                    </button>

                    <div className="parchment-page-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => {
                          return (
                            p === 1 ||
                            p === totalPages ||
                            Math.abs(p - currentPage) <= 2
                          );
                        })
                        .map((pageNum, idx, arr) => {
                          const prevPage = arr[idx - 1];
                          const showEllipsis = prevPage && pageNum - prevPage > 1;

                          return (
                            <React.Fragment key={pageNum}>
                              {showEllipsis && <span className="parchment-dots">...</span>}
                              <button
                                className={`parchment-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                                onClick={() => handlePageChange(pageNum)}
                              >
                                {pageNum}
                              </button>
                            </React.Fragment>
                          );
                        })}
                    </div>

                    <button
                      className="parchment-page-nav-btn next-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      title="Next page"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Roller Bar */}
          <div className="royal-scroll-roller roller-bottom">
            <ScrollFinialLeft />
            <div className="scroll-roller-cylinder cylinder-bottom">
              <div className="cylinder-highlight"></div>
              <div className="cylinder-texture"></div>
            </div>
            <ScrollFinialRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Importantnotices;