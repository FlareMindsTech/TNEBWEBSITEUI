import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllMinthirans } from '../api';
import './ActRegulations.css';

const Minthiran = () => {
  const [minthirans, setMinthirans] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);

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
    setSelectedPdf({ url: pdfUrl, title });
  };

  const closePdf = () => {
    setSelectedPdf(null);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="act-regulations-container">
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
              <div className="row g-4">
                {minthirans[year].map((magazine, index) => (
                  <motion.div
                    key={magazine._id}
                    className="col-lg-3 col-md-4 col-sm-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div
                      className="flipbook-card"
                      onClick={() => openPdf(magazine.pdfUrl, `${magazine.month} ${magazine.year}`)}
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

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="pdf-modal" onClick={closePdf}>
          <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="pdf-close-btn" onClick={closePdf}>
              ×
            </button>
            <h4 className="mb-3">{selectedPdf.title}</h4>
            {selectedPdf.url ? (
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedPdf.url)}&embedded=true`}
                title={selectedPdf.title}
                className="pdf-viewer"
                frameBorder="0"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
              />
            ) : (
              <div className="pdf-error">
                <p>PDF not available</p>
                <a href={selectedPdf.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">
                  Open in New Tab
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .year-section {
          margin-bottom: 3rem;
        }

        .year-title {
          color: #1b5baf;
          font-weight: 700;
          font-size: 2rem;
          padding-bottom: 10px;
          border-bottom: 3px solid #1b5baf;
          display: inline-block;
        }

        .flipbook-card {
          perspective: 1500px;
          cursor: pointer;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flipbook-cover {
          position: relative;
          width: 200px;
          height: 280px;
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform: rotateY(-5deg);
        }

        .flipbook-card:hover .flipbook-cover {
          transform: rotateY(0deg) translateY(-10px);
        }

        .flipbook-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 20px;
          background: linear-gradient(to right, #15458a, #1b5baf);
          border-radius: 4px 0 0 4px;
          transform: rotateY(-90deg);
          transform-origin: left;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
        }

        .flipbook-front {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1b5baf 0%, #2a6cc7 50%, #48a9e6 100%);
          border-radius: 8px;
          box-shadow: 
            0 10px 40px rgba(27, 91, 175, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        .flipbook-front::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></svg>');
          background-size: 20px 20px;
          opacity: 0.3;
        }

        .magazine-date {
          position: relative;
          z-index: 1;
        }

        .magazine-date .month {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fbbf24;
          text-transform: uppercase;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .magazine-date .year-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          margin-top: 5px;
          backdrop-filter: blur(10px);
        }

        .magazine-title {
          text-align: center;
          color: white;
          position: relative;
          z-index: 1;
        }

        .magazine-title h5 {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .magazine-title p {
          font-size: 0.9rem;
          margin: 5px 0 0;
          opacity: 0.9;
        }

        .flipbook-icon {
          font-size: 3rem;
          text-align: center;
          opacity: 0.9;
          position: relative;
          z-index: 1;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .flipbook-shadow {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 30px;
          background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3), transparent);
          border-radius: 50%;
          transition: all 0.6s ease;
        }

        .flipbook-card:hover .flipbook-shadow {
          width: 90%;
          opacity: 0.6;
        }

        .pdf-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .pdf-modal-content {
          background: white;
          border-radius: 12px;
          padding: 20px;
          max-width: 1200px;
          width: 100%;
          height: 90vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .pdf-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #1b5baf;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .pdf-close-btn:hover {
          background: #15458a;
          transform: rotate(90deg);
        }

        .pdf-viewer {
          width: 100%;
          height: calc(100% - 60px);
          border: none;
          border-radius: 8px;
        }

        .pdf-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #666;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .flipbook-cover {
            width: 160px;
            height: 220px;
          }

          .magazine-title h5 {
            font-size: 1.4rem;
          }

          .flipbook-icon {
            font-size: 2rem;
          }

          .year-title {
            font-size: 1.5rem;
          }

          .pdf-modal-content {
            padding: 15px;
            height: 85vh;
          }
        }
      `}</style>
    </div>
  );
};

export default Minthiran;