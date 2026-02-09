import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllGalleries } from '../api';
import './ActRegulations.css';

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

      <style>{`
        .gallery-table-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          max-width: 1100px;
          margin: 0 auto;
        }

        .gallery-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
          table-layout: fixed;
        }

        .gallery-table thead {
          background: linear-gradient(135deg, #1b5baf 0%, #2a6cc7 100%);
          color: white;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .gallery-table thead th {
          padding: 18px 16px;
          text-align: left;
          font-size: 0.85rem;
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
          word-wrap: break-word;
        }

        .gallery-table thead th:last-child {
          text-align: center;
          width: 100px;
        }

        .gallery-table tbody tr {
          border-bottom: 1px solid #e5e7eb;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .gallery-table tbody tr:last-child {
          border-bottom: none;
        }

        .gallery-table tbody tr:hover {
          background: linear-gradient(135deg, rgba(27, 91, 175, 0.05), rgba(42, 108, 199, 0.05));
          box-shadow: inset 0 0 0 2px rgba(27, 91, 175, 0.1);
        }

        .gallery-table td {
          padding: 16px 16px;
          vertical-align: middle;
          word-wrap: break-word;
        }

        .date-cell {
          width: 120px;
          font-weight: 600;
          text-align: left;
        }

        .date-badge {
          background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%);
          color: #1b5baf;
          padding: 6px 12px;
          border-radius: 20px;
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(27, 91, 175, 0.2);
        }

        .title-cell {
          width: auto;
          text-align: left;
        }

        .gallery-title {
          margin: 0;
          color: #1b5baf;
          font-weight: 700;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .gallery-row:hover .gallery-title {
          color: #2a6cc7;
        }

        .description-cell {
          text-align: left;
          width: auto;
        }

        .gallery-description {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .photos-count {
          width: 100px;
          text-align: center;
        }

        .count-badge {
          background: linear-gradient(135deg, #fef3c7 0%, #fef08a 100%);
          color: #92400e;
          padding: 6px 12px;
          border-radius: 20px;
          display: inline-block;
          font-weight: 600;
          font-size: 0.9rem;
          border: 1px solid rgba(217, 119, 6, 0.2);
        }

        .gallery-details-modal {
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
          overflow-y: auto;
        }

        .gallery-details-content {
          background: white;
          border-radius: 16px;
          padding: 40px;
          max-width: 1400px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .details-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #1b5baf, #2a6cc7);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 28px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .details-close-btn:hover {
          background: linear-gradient(135deg, #15458a, #1b5baf);
          transform: rotate(90deg);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        .details-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
        }

        .details-info h3 {
          color: #1b5baf;
          font-weight: 700;
          font-size: 2rem;
          margin: 0 0 10px;
        }

        .details-date {
          color: #666;
          font-weight: 600;
          font-size: 0.95rem;
          margin: 0;
        }

        .details-description {
          color: #555;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 12px 0 0;
        }

        .images-grid {
          margin-top: 30px;
        }

        .images-title {
          color: #1b5baf;
          font-weight: 700;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .grid-container {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 16px;
          padding-bottom: 10px;
        }

        .grid-container::-webkit-scrollbar {
          height: 8px;
        }

        .grid-container::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 10px;
        }

        .grid-container::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #1b5baf, #2a6cc7);
          border-radius: 10px;
        }

        .grid-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #15458a, #1b5baf);
        }

        .image-grid-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          aspect-ratio: 1;
          flex: 0 0 200px;
          min-width: 200px;
        }

        .image-grid-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(27, 91, 175, 0.2);
        }

        .grid-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .image-grid-item:hover .grid-image {
          transform: scale(1.1);
        }

        .image-caption-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
          color: white;
          padding: 16px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .image-grid-item:hover .image-caption-overlay {
          transform: translateY(0);
        }

        .image-caption-overlay p {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .image-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.98);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .lightbox-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 90%;
          max-height: 90vh;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .lightbox-caption {
          color: white;
          text-align: center;
          margin-top: 20px;
          max-width: 600px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .lightbox-caption p {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
        }

        .lightbox-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          color: #1b5baf;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 28px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .lightbox-close-btn:hover {
          background: #1b5baf;
          color: white;
          transform: rotate(90deg);
        }

        @media (max-width: 1024px) {
          .gallery-details-content {
            padding: 30px;
          }

          .grid-container {
            gap: 12px;
          }

          .image-grid-item {
            flex: 0 0 160px;
            min-width: 160px;
          }

          .details-info h3 {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 768px) {
          .gallery-table thead {
            font-size: 0.75rem;
          }

          .gallery-table thead th {
            padding: 12px 10px;
          }

          .gallery-table td {
            padding: 12px 10px;
            font-size: 0.85rem;
          }

          .date-cell {
            width: 100px;
          }

          .title-cell {
            width: auto;
            min-width: 150px;
          }

          .description-cell {
            display: none;
          }

          .gallery-details-content {
            padding: 20px;
          }

          .grid-container {
            gap: 12px;
          }

          .image-grid-item {
            flex: 0 0 140px;
            min-width: 140px;
          }

          .details-info h3 {
            font-size: 1.5rem;
          }

          .gallery-title {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .gallery-table {
            font-size: 0.8rem;
          }

          .gallery-table thead {
            font-size: 0.65rem;
          }

          .gallery-table thead th {
            padding: 8px 5px;
          }

          .gallery-table td {
            padding: 8px 5px;
          }

          .date-cell {
            width: 70px;
          }

          .title-cell {
            width: auto;
            min-width: 100px;
          }

          .photos-count {
            width: 50px;
          }

          .gallery-details-content {
            padding: 20px;
            border-radius: 12px;
          }

          .grid-container {
            gap: 10px;
          }

          .image-grid-item {
            flex: 0 0 120px;
            min-width: 120px;
          }

          .details-info h3 {
            font-size: 1.3rem;
          }

          .lightbox-image {
            max-height: 70vh;
          }
        }
      `}</style>
    </div>
  );
};

export default Photogallery;