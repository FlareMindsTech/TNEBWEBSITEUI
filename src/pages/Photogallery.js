import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllGalleries } from '../api';
import './Photogallery.css';

const Photogallery = () => {
  const pageStyle = {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    minHeight: '100vh'
  };
  
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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

  const openGallery = (gallery) => {
    setSelectedGallery(gallery);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
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
                        onClick={() => openGallery(gallery)}
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

      {/* Gallery Details Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="gallery-details-modal"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="gallery-details-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="details-close-btn" onClick={closeGallery}>
                ×
              </button>
              
              <div className="details-header">
                <div className="details-info">
                  <div className="details-title-container">
                    <h3>{selectedGallery.title}</h3>
                  </div>
                  <p className="details-date">
                    <span className="date-icon">📅</span>
                    {formatDate(selectedGallery.createdAt)}
                  </p>
                  {selectedGallery.description && (
                    <div className="details-description-container">
                      <p className="details-description">{selectedGallery.description}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="images-grid">
                <div className="images-header">
                  <h5 className="images-title">
                    Gallery Images <span className="images-count">({selectedGallery.images?.length || 0})</span>
                  </h5>
                </div>
                <div className="grid-scroll-container">
                  <div className="grid-container">
                    {selectedGallery.images?.map((image, idx) => {
                      const imageObj = typeof image === 'string' ? { url: image, caption: '' } : image;
                      return (
                        <motion.div
                          key={idx}
                          className="image-grid-item"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          onClick={() => openImageModal({
                            url: imageObj.url || imageObj,
                            caption: imageObj.caption || ''
                          })}
                        >
                          <div className="image-container">
                            <img
                              src={imageObj.url || imageObj}
                              alt={`${selectedGallery.title} - Image ${idx + 1}`}
                              className="grid-image"
                              loading="lazy"
                            />
                            <div className="image-index">{idx + 1}</div>
                          </div>
                          {imageObj.caption && (
                            <div className="image-caption-overlay">
                              <p>{imageObj.caption}</p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="image-lightbox"
            onClick={closeImageModal}
          >
            <button className="lightbox-close-btn" onClick={closeImageModal}>
              ×
            </button>
            <div className="lightbox-container">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImage.url}
                alt="Full size"
                className="lightbox-image"
              />
              {selectedImage.caption && (
                <div className="lightbox-caption">
                  <p>{selectedImage.caption}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photogallery;