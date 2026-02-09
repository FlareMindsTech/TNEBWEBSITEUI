import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllGalleries } from '../api';
import './Photogallery.css';

const Photogallery = () => {
  const pageStyle = {
    background: '#ffffff'
  };
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await getAllGalleries();
      // Sort by date descending if available
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
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    setSelectedImage(null);
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

  return (
    <div className="act-regulations-container" style={pageStyle}>
      <div className="page-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Photo Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lead"
        >
          Explore our collection of memorable moments and events
        </motion.p>
      </div>

      <div className="container py-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading galleries...</p>
          </div>
        ) : galleries.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No galleries available at the moment.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="gallery-table-wrapper"
          >
            <table className="gallery-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th style={{ width: '80px' }}>Photos</th>
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
                    className="gallery-row"
                  >
                    <td className="date-cell">
                      <span className="date-badge">
                        {formatDate(gallery.createdAt)}
                      </span>
                    </td>
                    <td className="title-cell">
                      <h6 className="gallery-title">{gallery.title}</h6>
                    </td>
                    <td className="description-cell">
                      <p className="gallery-description">
                        {gallery.description || 'No description'}
                      </p>
                    </td>
                    <td className="photos-count">
                      <span className="count-badge">
                        {gallery.images?.length || 0}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      {/* Gallery Details Modal */}
      {selectedGallery && (
        <div className="gallery-details-modal" onClick={closeGallery}>
          <div className="gallery-details-content" onClick={(e) => e.stopPropagation()}>
            <button className="details-close-btn" onClick={closeGallery}>
              ×
            </button>
            
            <div className="details-header">
              <div className="details-info">
                <h3>{selectedGallery.title}</h3>
                <p className="details-date">
                  📅 {formatDate(selectedGallery.createdAt)}
                </p>
                {selectedGallery.description && (
                  <p className="details-description">{selectedGallery.description}</p>
                )}
              </div>
            </div>

            <div className="images-grid">
              <h5 className="images-title">Gallery Images ({selectedGallery.images?.length || 0})</h5>
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
                      <img
                        src={imageObj.url || imageObj}
                        alt={`Gallery ${idx + 1}`}
                        className="grid-image"
                      />
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
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div className="image-lightbox" onClick={closeImageModal}>
          <button className="lightbox-close-btn" onClick={closeImageModal}>
            ×
          </button>
          <div className="lightbox-container">
            <img src={selectedImage.url} alt="Full size" className="lightbox-image" />
            {selectedImage.caption && (
              <div className="lightbox-caption">
                <p>{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Photogallery;