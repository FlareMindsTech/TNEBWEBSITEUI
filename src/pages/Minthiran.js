import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaCalendarAlt, FaBookOpen, FaFilter, FaUndo } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { getAllMinthirans } from '../api';
import './Minthiran.css';

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
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    if (typeof data === 'object' && !Array.isArray(data)) {
      return data;
    }
    
    const grouped = {};
    data.forEach(item => {
      const year = item.year || new Date(item.createdAt).getFullYear();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(item);
    });
    return grouped;
  };

  const getAllMagazines = () => {
    const allMagazines = [];
    Object.keys(minthirans).forEach(year => {
      minthirans[year].forEach(magazine => {
        allMagazines.push({ ...magazine, year });
      });
    });
    return allMagazines;
  };

  const currentYearMagazines = useMemo(() => {
    const magazines = getAllMagazines().filter((m) => Number(m.year) === CURRENT_YEAR);
    return magazines.sort((a, b) => {
      const indexA = MONTH_ORDER.indexOf(a.month);
      const indexB = MONTH_ORDER.indexOf(b.month);

      if (indexA === -1 && indexB === -1) {
        return (a.month || '').localeCompare(b.month || '');
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [minthirans]);

  const availableMonths = useMemo(() => {
    const monthSet = new Set(
      currentYearMagazines
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
  }, [currentYearMagazines]);

  const filteredMagazines = useMemo(() => {
    let magazines = currentYearMagazines;

    if (selectedMonth !== 'all') {
      magazines = magazines.filter((m) => m.month === selectedMonth);
    }

    if (searchQuery.trim() === '') {
      return magazines;
    }

    const query = searchQuery.toLowerCase();
    return magazines.filter((m) =>
      m.title?.toLowerCase().includes(query) ||
      m.month?.toLowerCase().includes(query) ||
      m.description?.toLowerCase().includes(query)
    );
  }, [currentYearMagazines, searchQuery, selectedMonth]);

  const openBookDetail = (magazine) => {
    if (!magazine?._id) {
      console.warn('Book ID missing for this magazine:', magazine);
      return;
    }

    // navigate(`/minthiran-book/${magazine._id}`, {
    //   state: { book: magazine }
    // });

    Swal.fire({
      title: 'Page Work Under Construction',
      text: 'e-Minthiran books are temporarily unavailable.',
      icon: 'info',
      confirmButtonText: 'OK'
    });
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
            {CURRENT_YEAR} Monthly Magazine Collection
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
                placeholder={`Search ${CURRENT_YEAR} magazines by title, month...`}
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

        {/* Toolbar Footer / Active Stats */}
        <div className="minthiran-toolbar-footer">
          <div className="toolbar-results-badge">
            <FaBookOpen className="badge-stat-icon" />
            <span>
              <strong>{filteredMagazines.length}</strong> {filteredMagazines.length === 1 ? 'magazine' : 'magazines'} in {CURRENT_YEAR}
            </span>
          </div>

          {(selectedMonth !== 'all' || searchQuery) && (
            <button
              type="button"
              className="toolbar-reset-btn"
              onClick={() => {
                setSelectedMonth('all');
                setSearchQuery('');
              }}
            >
              <FaUndo className="reset-icon" />
              <span>Reset Filters</span>
            </button>
          )}
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
            <h3>No {CURRENT_YEAR} magazines found</h3>
            <p className="text-muted">Try changing month filter or search keyword</p>
            <button 
              className="reset-button"
              onClick={() => {
                setSelectedMonth('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            className="year-section mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="year-title mb-4">{CURRENT_YEAR}</h3>
            <div className="magazines-grid">
              {filteredMagazines.map((magazine, index) => (
                <motion.div
                  key={magazine._id || `${magazine.month}-${index}`}
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
                          <span>{CURRENT_YEAR}</span>
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
                            <div className="cover-year">{CURRENT_YEAR}</div>
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
        )}
      </div>
    </div>
  );
};

export default Minthiran;