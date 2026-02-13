import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllGalleries } from '../api';
import './Photogallery.css';

const Photogallery = () => {
  const navigate = useNavigate();
  const pageStyle = {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    minHeight: '100vh'
  };
  
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);
  
  const tableRef = useRef(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await getAllGalleries();
      const sorted = response.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      setGalleries(sorted);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryClick = (gallery) => {
    navigate(`/gallery-detail/${gallery._id}`);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
    } catch {
      return dateString || 'N/A';
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return 'No description';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="act-regulations-container" style={pageStyle}>
      <div className="page-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="header-content"
        >
          <div className="header-icon">📸</div>
          <h1>Photo Gallery</h1>
          <p className="lead">
            Explore our collection of memorable moments and events
          </p>
        </motion.div>
      </div>

      <div className="container py-4">
        <div className="table-responsive-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading galleries...</p>
            </div>
          ) : galleries.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🖼️</div>
              <p className="empty-text">No galleries available at the moment.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="gallery-table-container"
            >
              <div className="table-wrapper" ref={tableRef}>
                <table className="gallery-table">
                  <thead>
                    <tr>
                      <th className="date-col">Date</th>
                      <th className="title-col">Title</th>
                      <th className="desc-col">Description</th>
                      <th className="count-col">Photos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleries.map((gallery, index) => (
                      <motion.tr
                        key={gallery._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => handleGalleryClick(gallery)}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`gallery-row ${hoveredRow === index ? 'hovered' : ''}`}
                      >
                        <td className="date-cell">
                          <div className="date-container">
                            <span className="date-badge">
                              {formatDate(gallery.createdAt)}
                            </span>
                          </div>
                        </td>
                        <td className="title-cell">
                          <div className="title-content">
                            <h6 className="gallery-title" title={gallery.title}>
                              {truncateText(gallery.title, 50)}
                            </h6>
                          </div>
                        </td>
                        <td className="description-cell">
                          <div className="description-content">
                            <p className="gallery-description" title={gallery.description}>
                              {truncateText(gallery.description, 120)}
                            </p>
                          </div>
                        </td>
                        <td className="photos-count">
                          <div className="count-container">
                            <span className="count-badge">
                              {gallery.images?.length || 0}
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Photogallery;