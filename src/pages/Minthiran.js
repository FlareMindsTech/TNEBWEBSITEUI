import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaCalendarAlt, FaBookOpen, FaUndo } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { getAllMinthirans } from '../api';
import FlipBookModal from '../components/FlipBookModal';
import './Minthiran.css';

const minthiran80thPdf = `${process.env.PUBLIC_URL || ''}/documents/Minthiran_80th_Year_Special_Edition.pdf`;

const CURRENT_YEAR = new Date().getFullYear();

const MONTH_ORDER = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const Minthiran = () => {
  const navigate = useNavigate();
  const [minthirans, setMinthirans] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(String(CURRENT_YEAR));
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMagazineForFlip, setSelectedMagazineForFlip] = useState(null);

  useEffect(() => {
    fetchMinthirans();
  }, []);

  const fetchMinthirans = async () => {
    try {
      setLoading(true);
      const response = await getAllMinthirans();
      const groupedData = groupByYear(response);
      setMinthirans(groupedData);
    } catch (error) {
      console.error('Error fetching minthirans:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupByYear = (data) => {
    if (!data) return {};
    if (typeof data === 'object' && !Array.isArray(data)) {
      return data;
    }
    
    const grouped = {};
    data.forEach(item => {
      const year = item.year || (item.createdAt ? new Date(item.createdAt).getFullYear() : CURRENT_YEAR);
      const strYear = String(year);
      if (!grouped[strYear]) {
        grouped[strYear] = [];
      }
      grouped[strYear].push({ ...item, year: strYear });
    });
    return grouped;
  };

  const getAllMagazines = useMemo(() => {
    const allMagazines = [];
    Object.keys(minthirans).forEach(year => {
      minthirans[year].forEach(magazine => {
        allMagazines.push({ ...magazine, year: String(magazine.year || year) });
      });
    });
    return allMagazines;
  }, [minthirans]);

  const availableYears = useMemo(() => {
    const yearSet = new Set(getAllMagazines.map((m) => String(m.year)).filter(Boolean));
    yearSet.add(String(CURRENT_YEAR));
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
  }, [getAllMagazines]);

  const availableMonths = useMemo(() => {
    let magazines = getAllMagazines;
    if (selectedYear !== 'all') {
      magazines = magazines.filter((m) => String(m.year) === String(selectedYear));
    }

    const monthSet = new Set(
      magazines
        .map((magazine) => magazine.month)
        .filter(Boolean)
    );

    return Array.from(monthSet).sort((a, b) => {
      const indexA = MONTH_ORDER.indexOf(a);
      const indexB = MONTH_ORDER.indexOf(b);

      if (indexA === -1 && indexB === -1) {
        return a.localeCompare(b);
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });
  }, [getAllMagazines, selectedYear]);

  const filteredMagazines = useMemo(() => {
    let magazines = getAllMagazines;

    if (selectedYear !== 'all') {
      magazines = magazines.filter((m) => String(m.year) === String(selectedYear));
    }

    if (selectedMonth !== 'all') {
      magazines = magazines.filter((m) => m.month === selectedMonth);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      magazines = magazines.filter((m) =>
        m.title?.toLowerCase().includes(query) ||
        m.month?.toLowerCase().includes(query) ||
        String(m.year)?.toLowerCase().includes(query) ||
        m.description?.toLowerCase().includes(query)
      );
    }

    return magazines.sort((a, b) => {
      const yearDiff = Number(b.year || 0) - Number(a.year || 0);
      if (yearDiff !== 0) return yearDiff;

      const indexA = MONTH_ORDER.indexOf(a.month);
      const indexB = MONTH_ORDER.indexOf(b.month);

      if (indexA === -1 && indexB === -1) {
        return (a.month || '').localeCompare(b.month || '');
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [getAllMagazines, selectedYear, selectedMonth, searchQuery]);

  const groupedDisplayMagazines = useMemo(() => {
    const groups = {};
    filteredMagazines.forEach((mag) => {
      const yr = String(mag.year || CURRENT_YEAR);
      if (!groups[yr]) {
        groups[yr] = [];
      }
      groups[yr].push(mag);
    });
    return groups;
  }, [filteredMagazines]);

  const displayYears = useMemo(() => {
    return Object.keys(groupedDisplayMagazines).sort((a, b) => Number(b) - Number(a));
  }, [groupedDisplayMagazines]);

  const handleResetFilters = () => {
    setSelectedYear(String(CURRENT_YEAR));
    setSelectedMonth('all');
    setSearchQuery('');
  };

  const isFiltered = selectedYear !== String(CURRENT_YEAR) || selectedMonth !== 'all' || searchQuery.trim() !== '';

  const specialEditionBook = useMemo(() => {
    return {
      _id: 'minthiran-80th-special-edition',
      title: 'e-Minthiran — 80th Year Special Edition',
      category: 'e-Minthiran Special',
      month: 'Special Edition',
      year: '80th Year',
      docUrl: minthiran80thPdf,
      pages: [],
      pageCount: 0,
      description: 'Commemorating 80 Glorious Years of TNEB Engineers Association (1946–2026)'
    };
  }, []);

  const openBookDetail = (magazine) => {
    if (!magazine) return;

    const docUrl = magazine.pdf?.url || magazine.docUrl || magazine.url || null;
    const directPages = Array.isArray(magazine.pdf?.pages) && magazine.pdf.pages.length > 0
      ? magazine.pdf.pages
      : (Array.isArray(magazine.pages) ? magazine.pages : []);

    const formattedBook = {
      id: magazine._id || `${magazine.month}-${magazine.year}`,
      title: magazine.title || `e-Minthiran — ${magazine.month} ${magazine.year}`,
      category: 'e-Minthiran',
      month: magazine.month,
      year: magazine.year,
      docUrl: docUrl,
      pages: directPages,
      pageCount: directPages.length || 0,
      description: magazine.description || `${magazine.month} ${magazine.year} Edition`
    };

    setSelectedMagazineForFlip(formattedBook);
  };

  return (
    <div className="minthiran-container">
      {/* Luxury Hero Banner matching Minnagam theme */}
      <div className="minthiran-hero">
        <div className="minthiran-hero-ambient-glow"></div>
        <div className="minthiran-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="minthiran-hero-title"
          >
            e-<span className="title-highlight">Minthiran</span>
          </motion.h1>
          <div className="hero-divider"></div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="minthiran-hero-tagline"
          >
            {selectedYear === 'all' ? 'All-Time' : selectedYear} Monthly Magazine Collection
          </motion.p>
        </div>
      </div>

      {/* Professional Floating Filter and Search Card */}
      <div className="filter-search-container minthiran-toolbar-card">
        <div className="minthiran-toolbar-grid">
          {/* Month Filter */}
          <div className="toolbar-field-group">
            <label htmlFor="monthFilter" className="toolbar-label">
              <FaCalendarAlt className="toolbar-label-icon" />
              <span>Filter by Month</span>
            </label>
            <div className="toolbar-select-wrapper">
              <select
                id="monthFilter"
                className="toolbar-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="all">All Months</option>
                {availableMonths.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Box */}
          <div className="toolbar-field-group search-field-group">
            <label htmlFor="magSearchInput" className="toolbar-label">
              <FaSearch className="toolbar-label-icon" />
              <span>Search Collection</span>
            </label>
            <div className="toolbar-search-box">
              <FaSearch className="search-box-icon" />
              <input
                id="magSearchInput"
                type="text"
                className="toolbar-search-input"
                placeholder={
                  selectedYear === 'all'
                    ? 'Search magazines by title, month, year...'
                    : `Search ${selectedYear} magazines by title, month...`
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button"
                  className="search-box-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar Footer / Active Stats & Year Filter */}
        <div className="minthiran-toolbar-footer">
          <div className="toolbar-results-badge">
            <FaBookOpen className="badge-stat-icon" />
            <span>
              <strong>{filteredMagazines.length}</strong> {filteredMagazines.length === 1 ? 'magazine' : 'magazines'} {selectedYear === 'all' ? 'found in archives' : `in ${selectedYear}`}
            </span>
          </div>

          <div className="toolbar-footer-actions">
            {/* Year Filter Capsule */}
            {availableYears.length > 1 && (
              <div className="minthiran-year-tabs">
                <button
                  type="button"
                  className={`year-tab-btn ${selectedYear === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedYear('all');
                    setSelectedMonth('all');
                  }}
                >
                  All Years
                </button>
                {availableYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    className={`year-tab-btn ${selectedYear === year ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedYear(year);
                      setSelectedMonth('all');
                    }}
                  >
                    <span>{year}</span>
                    {year === String(CURRENT_YEAR) && <span className="current-year-badge">CURRENT</span>}
                  </button>
                ))}
              </div>
            )}

            {isFiltered && (
              <button
                type="button"
                className="toolbar-reset-btn"
                onClick={handleResetFilters}
              >
                <FaUndo className="reset-icon" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container py-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading magazines...</p>
          </div>
        ) : filteredMagazines.length === 0 ? (
          <div className="text-center py-5 no-results">
            <div className="no-results-icon">📚</div>
            <h3>No magazines found</h3>
            <p className="text-muted">
              {selectedYear !== 'all' 
                ? `No editions matching your criteria found for ${selectedYear}.`
                : 'Try adjusting your year, month, or search keywords.'}
            </p>
            <button 
              className="reset-button"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Minthiran 80th Year Special Edition Section (Before 2026) */}
            {(selectedYear === 'all' || selectedYear === '2026') && (!searchQuery || searchQuery.toLowerCase().includes('80') || searchQuery.toLowerCase().includes('special') || searchQuery.toLowerCase().includes('minthiran')) && (
              <motion.div
                className="special-edition-section mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="special-edition-header">
                  <div className="special-edition-badge-pill">
                    <span>⭐ 80TH YEAR CELEBRATION</span>
                  </div>
                  <h3 className="special-edition-title">Minthiran 80th Year Special Edition</h3>
                  <p className="special-edition-subtitle">Commemorating 80 Years of Excellence & Dedication (1946 – 2026)</p>
                </div>

                <div className="special-edition-grid">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="real-book-card special-book-card"
                      onClick={() => openBookDetail(specialEditionBook)}
                    >
                      <div className="real-book special-real-book">
                        <div className="real-book-spine special-book-spine">
                          <div className="spine-text">
                            <span>Minthiran</span>
                            <span>80th Year</span>
                          </div>
                        </div>
                        <div className="real-book-cover special-book-cover">
                          <div className="cover-texture"></div>
                          <div className="cover-content">
                            <div className="cover-header">
                              <div className="cover-badge special-gold-badge">80th Year Special</div>
                            </div>
                            <div className="cover-date-box special-date-box">
                              <div className="special-anniversary-number">80</div>
                              <div className="special-anniversary-sub">Years of Excellence</div>
                            </div>
                            <div className="cover-title">
                              <h5>Commemorative</h5>
                              <h4>Special Edition</h4>
                            </div>
                            <div className="cover-footer">
                              <div className="cover-number special-gold-years">1946 – 2026</div>
                              <div className="cover-icon">⭐</div>
                            </div>
                          </div>
                          <div className="cover-edge"></div>
                          <div className="cover-corner top-left"></div>
                          <div className="cover-corner top-right"></div>
                          <div className="cover-corner bottom-left"></div>
                          <div className="cover-corner bottom-right"></div>
                        </div>
                      </div>
                      <div className="book-shadow"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {displayYears.map((year) => (
              <motion.div
                key={year}
                className="year-section mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
              <div className="year-section-header">
                <h3 className="year-title">{year}</h3>
              </div>
              <div className="magazines-grid">
                {groupedDisplayMagazines[year].map((magazine, index) => (
                  <motion.div
                    key={magazine._id || `${magazine.month}-${magazine.year}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div
                      className="real-book-card"
                      onClick={() => openBookDetail(magazine)}
                    >
                      <div className="real-book">
                        <div className="real-book-spine">
                          <div className="spine-text">
                            <span>Minthiran</span>
                            <span>{magazine.year || year}</span>
                          </div>
                        </div>
                        <div className="real-book-cover">
                          <div className="cover-texture"></div>
                          <div className="cover-content">
                            <div className="cover-header">
                              <div className="cover-badge">e-Minthiran</div>
                            </div>
                            <div className="cover-date-box">
                              <div className="cover-month">{magazine.month}</div>
                              <div className="cover-year">{magazine.year || year}</div>
                            </div>
                            <div className="cover-title">
                              <h5>Monthly</h5>
                              <h4>Magazine</h4>
                            </div>
                            <div className="cover-footer">
                              <div className="cover-number">
                                {String(index + 1).padStart(2, '0')}
                              </div>
                              <div className="cover-icon">📖</div>
                            </div>
                          </div>
                          <div className="cover-edge"></div>
                          <div className="cover-corner top-left"></div>
                          <div className="cover-corner top-right"></div>
                          <div className="cover-corner bottom-left"></div>
                          <div className="cover-corner bottom-right"></div>
                        </div>
                      </div>
                      <div className="book-shadow"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </>
        )}
      </div>

      {/* 3D Realistic FlipBook Modal */}
      <AnimatePresence>
        {selectedMagazineForFlip && (
          <FlipBookModal
            book={selectedMagazineForFlip}
            onClose={() => setSelectedMagazineForFlip(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Minthiran;