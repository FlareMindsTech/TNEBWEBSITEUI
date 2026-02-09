import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllMinthirans } from '../api';
import './Minthiran.css';

const Minthiran = () => {
  const pageStyle = {
    background: '#ffffff'
  };
  const [minthirans, setMinthirans] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMinthirans();
  }, []);

  const fetchMinthirans = async () => {
    try {
      setLoading(true);
      const response = await getAllMinthirans();
      // Group by year if not already grouped
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
      return data; // Already grouped
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

  const openPdf = (pdfUrl, title) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('PDF file is not available');
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="act-regulations-container" style={pageStyle}>
      <div className="page-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          E-Minthiran
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

      <div className="container py-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading magazines...</p>
          </div>
        ) : Object.keys(minthirans).length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No magazines available at the moment.</p>
          </div>
        ) : (
          Object.keys(minthirans).sort((a, b) => b - a).map((year, yearIndex) => (
            <motion.div
              key={year}
              className="year-section mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
            >
              <h3 className="year-title mb-4">{year}</h3>
              <div className="magazines-grid">
                {minthirans[year].map((magazine, index) => (
                  <motion.div
                    key={magazine._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div
                      className="flipbook-card"
                      onClick={() => openPdf(magazine.pdf?.url || magazine.pdfUrl, `${magazine.month} ${magazine.year}`)}
                    >
                      <div className="flipbook-cover">
                        <div className="flipbook-spine"></div>
                        <div className="flipbook-front">
                          <div className="magazine-date">
                            <div className="month">{magazine.month}</div>
                            <div className="year-badge">{magazine.year}</div>
                          </div>
                          <div className="magazine-title">
                            <h5>Minthiran</h5>
                            <p>Monthly Magazine</p>
                          </div>
                          <div className="flipbook-icon">
                            📖
                          </div>
                        </div>
                      </div>
                      <div className="flipbook-shadow"></div>
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