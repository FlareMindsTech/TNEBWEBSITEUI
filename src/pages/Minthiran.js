import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllMinthirans } from '../api';
import './Minthiran.css';

const Minthiran = () => {
  const navigate = useNavigate();
  const pageStyle = {
    background: '#ffffff'
  };
  const [minthirans, setMinthirans] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');
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

  const filteredMagazines = useMemo(() => {
    let magazines = getAllMagazines();

    // Filter by year
    if (selectedYear !== 'all') {
      magazines = magazines.filter(m => m.year === selectedYear);
    }

    // Filter by month
    if (selectedMonth !== 'all') {
      magazines = magazines.filter(m => m.month === selectedMonth);
    }

    // Search by title or content
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      magazines = magazines.filter(m => 
        m.title?.toLowerCase().includes(query) ||
        m.month?.toLowerCase().includes(query) ||
        m.description?.toLowerCase().includes(query) ||
        m.year?.toString().includes(query)
      );
    }

    return magazines;
  }, [minthirans, selectedYear, selectedMonth, searchQuery]);

  const groupFilteredByYear = () => {
    const grouped = {};
    filteredMagazines.forEach(item => {
      if (!grouped[item.year]) {
        grouped[item.year] = [];
      }
      grouped[item.year].push(item);
    });
    return grouped;
  };

  const openBookDetail = (magazine) => {
    const pdfLink = magazine?.pdf?.url || magazine?.pdfUrl;
    if (pdfLink) {
      window.open(pdfLink, '_blank', 'noopener,noreferrer');
      return;
    }

    console.warn('PDF link missing for this magazine:', magazine);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Object.keys(minthirans).sort((a, b) => b - a);

  return (
    <div className="act-regulations-container" style={pageStyle}>
      <div className="page-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          e-Minthiran
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lead"
        >
          Monthly Magazine Archives
        </motion.p>
      </div>

      {/* Enhanced Filter and Search Section */}
      <div className="filter-search-container">
        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="yearFilter">Filter by Year:</label>
            <select 
              id="yearFilter"
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="monthFilter">Filter by Month:</label>
            <select 
              id="monthFilter"
              className="filter-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              {monthNames.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="search-section">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search magazines by title, month, year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {(selectedYear !== 'all' || selectedMonth !== 'all' || searchQuery) && (
          <div className="active-filters">
            <span className="results-count">
              {filteredMagazines.length} {filteredMagazines.length === 1 ? 'magazine' : 'magazines'} found
            </span>
            <button 
              className="clear-all-filters"
              onClick={() => {
                setSelectedYear('all');
                setSelectedMonth('all');
                setSearchQuery('');
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
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
            <p className="text-muted">Try adjusting your filters or search query</p>
            <button 
              className="reset-button"
              onClick={() => {
                setSelectedYear('all');
                setSelectedMonth('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          Object.keys(groupFilteredByYear())
            .sort((a, b) => b - a)
            .map((year, yearIndex) => (
              <motion.div
                key={year}
                className="year-section mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
              >
                <h3 className="year-title mb-4">{year}</h3>
                <div className="magazines-grid">
                  {groupFilteredByYear()[year].map((magazine, index) => (
                    <motion.div
                      key={magazine._id}
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
                              <span>{magazine.year}</span>
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
                                <div className="cover-year">{magazine.year}</div>
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
            ))
        )}
      </div>
    </div>
  );
};

export default Minthiran;