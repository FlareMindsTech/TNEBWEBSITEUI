import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBell,
  FaFilePdf,
  FaCalendarAlt,
  FaSearch,
  FaTimes,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight
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
        const rawType = item.Type || item.type || 'Notice';

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
    setCurrentPage(newPage);
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="notices-container">
      {/* 1. LUXURY HERO BANNER */}
      <div className="notices-hero">
        <div className="notices-hero-ambient-glow"></div>
        <div className="notices-hero-content">
          
          <h1>
            Important <span className="title-highlight">Notices</span>
          </h1>
          <div className="hero-divider"></div>
          <p className="notices-hero-tagline">
            Important documents and circulars for TNEB engineers
          </p>
        </div>
      </div>

      {/* 2. FLOATING SEARCH BAR (Half inside hero card, half outside) */}
      <div className="hero-floating-search-wrapper">
        <div className="hero-floating-search">
          <FaSearch className="floating-search-icon" />
          <input
            type="text"
            placeholder="Search by title, type, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="floating-search-input"
          />
          {searchTerm && (
            <button
              className="floating-search-clear"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* 3. ADVANCED HIGH-DESIGN PROFESSIONAL TABLE */}
      <div className="notices-content-wrapper">
        <div className="table-luxury-card">
          {/* Table Body / States */}
          {loading ? (
            <div className="table-state-box">
              <div className="luxury-spinner"></div>
              <h4>Loading Official Notices...</h4>
              <p>Fetching records from the server.</p>
            </div>
          ) : error ? (
            <div className="table-state-box error-box">
              <FaBell className="state-icon text-danger" />
              <h4>Unable to Load Notices</h4>
              <p>{error}</p>
              <button className="btn retry-btn" onClick={fetchNotices}>
                Try Again
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="table-state-box">
              <FaFilePdf className="state-icon text-muted" />
              <h4>No Notices Found</h4>
              <p>
                {searchTerm
                  ? 'No notices match your search query. Try another keyword.'
                  : 'There are currently no active notices.'}
              </p>
              {searchTerm && (
                <button className="btn reset-search-btn" onClick={() => setSearchTerm('')}>
                  Reset Search
                </button>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table advanced-notices-table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: '75px' }} className="text-center">S.No</th>
                    <th>Notice Title</th>
                    <th style={{ width: '230px' }}>Type</th>
                    <th style={{ width: '160px' }} className="text-center">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {paginatedItems.map((item, index) => {
                      const serialNum = (currentPage - 1) * itemsPerPage + index + 1;
                      const hasDocument = Boolean(item.link);

                      return (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          className="advanced-table-row"
                        >
                          {/* 1. S.No */}
                          <td className="text-center">
                            <span className="serial-pill">
                              {serialNum}
                            </span>
                          </td>

                          {/* 2. Notice Title */}
                          <td className="title-cell">
                            {hasDocument ? (
                              <a
                                href={item.link.startsWith('http') ? item.link : `https://tnebeaengineers.in/${item.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="advanced-title-link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDocument(item.link);
                                }}
                              >
                                <span className="title-text">{item.title}</span>
                                <FaExternalLinkAlt className="external-icon" />
                              </a>
                            ) : (
                              <span className="title-text-plain">{item.title}</span>
                            )}
                          </td>

                          {/* 3. Type */}
                          <td className="type-cell">
                            <span className="type-badge-pill">
                              {item.rawType}
                            </span>
                          </td>

                          {/* 4. Date */}
                          <td className="date-cell text-center">
                            <span className="date-badge-pill">
                              <FaCalendarAlt className="date-icon" />
                              {item.dateInfo.formatted}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}

          {/* Advanced Pagination Footer with Icon Controls */}
          {!loading && !error && filteredItems.length > 0 && (
            <div className="table-pagination-footer">
              <div className="pagination-summary">
                Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> -{' '}
                <strong>{Math.min(currentPage * itemsPerPage, filteredItems.length)}</strong> of{' '}
                <strong>{filteredItems.length}</strong> records
              </div>

              <div className="pagination-nav-group">
                <button
                  className="nav-btn icon-nav-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                  title="Previous Page"
                >
                  <FaChevronLeft />
                </button>

                <div className="nav-numbers">
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
                          {showEllipsis && <span className="nav-dots">...</span>}
                          <button
                            className={`num-btn ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </button>
                        </React.Fragment>
                      );
                    })}
                </div>

                <button
                  className="nav-btn icon-nav-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next Page"
                  title="Next Page"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Importantnotices;