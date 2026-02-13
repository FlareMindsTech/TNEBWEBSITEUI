import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllGalleries } from '../api';
import './GalleryDetail.css';

const GalleryDetail = () => {
  const { galleryId } = useParams();
  const navigate = useNavigate();
  
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allGalleries, setAllGalleries] = useState([]);
  const [randomSuggestions, setRandomSuggestions] = useState([]);

  useEffect(() => {
    fetchGalleryDetails();
    window.scrollTo(0, 0);
    cleanupOldVisitedGalleries();
  }, [galleryId]);

  useEffect(() => {
    if (allGalleries.length > 0) {
      generateRandomSuggestions();
    }
  }, [allGalleries, galleryId]);

  const fetchGalleryDetails = async () => {
    try {
      setLoading(true);
      const response = await getAllGalleries();
      const currentGallery = response.find(g => g._id === galleryId);
      setGallery(currentGallery);
      setAllGalleries(response);
      
      // Save to localStorage with timestamp
      saveVisitedGallery(galleryId);
    } catch (error) {
      console.error('Error fetching gallery details:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveVisitedGallery = (id) => {
    const visited = JSON.parse(localStorage.getItem('visitedGalleries') || '[]');
    const timestamp = new Date().getTime();
    const existingIndex = visited.findIndex(v => v.id === id);
    
    if (existingIndex !== -1) {
      visited[existingIndex].timestamp = timestamp;
    } else {
      visited.push({ id, timestamp });
    }
    
    localStorage.setItem('visitedGalleries', JSON.stringify(visited));
  };

  const cleanupOldVisitedGalleries = () => {
    const visited = JSON.parse(localStorage.getItem('visitedGalleries') || '[]');
    const oneDayAgo = new Date().getTime() - (24 * 60 * 60 * 1000);
    
    const filtered = visited.filter(v => v.timestamp > oneDayAgo);
    localStorage.setItem('visitedGalleries', JSON.stringify(filtered));
  };

  const generateRandomSuggestions = () => {
    const otherGalleries = allGalleries.filter(g => g._id !== galleryId);
    
    if (otherGalleries.length === 0) {
      setRandomSuggestions([]);
      return;
    }
    
    // Shuffle and pick 2 random galleries
    const shuffled = [...otherGalleries].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(2, shuffled.length));
    setRandomSuggestions(selected);
  };

  const handleSuggestionClick = (suggestionId) => {
    navigate(`/gallery-detail/${suggestionId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString || 'N/A';
    }
  };

  const openImage = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (gallery?.images && currentImageIndex < gallery.images.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(gallery.images[nextIndex]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(gallery.images[prevIndex]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  if (loading) {
    return (
      <div className="gallery-album-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Opening Album...</p>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="gallery-album-error">
        <div className="error-content">
          <h2>Album Not Found</h2>
          <p>This gallery doesn't exist or has been moved.</p>
          <button onClick={() => navigate('/photo-gallery')}>
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-album-container">
      {/* Album Cover */}
      <motion.div 
        className="album-cover"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <button 
          className="album-back-btn"
          onClick={() => navigate('/photo-gallery')}
        >
          ← Back to Gallery
        </button>

        <div className="album-cover-inner">
          <motion.div 
            className="album-title-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="paper-page">
              <svg className="paper-texture" viewBox="0 0 200 200" preserveAspectRatio="none">
                <defs>
                  <filter id="paper-noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                    <feColorMatrix type="saturate" values="0"/>
                  </filter>
                </defs>
                <rect width="200" height="200" filter="url(#paper-noise)" opacity="0.05"/>
              </svg>
              
              <div className="page-content">
                <h1 className="album-title">
                  {gallery.title?.split('').map((char, index) => (
                    <span 
                      key={index} 
                      className="title-char"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h1>
                
                <div className="album-meta">
                  <span className="meta-date">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {formatDate(gallery.createdAt)}
                  </span>
                  <span className="meta-count">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    {gallery.images?.length || 0} Memories
                  </span>
                </div>

                {gallery.description && (
                  <p className="album-description">{gallery.description}</p>
                )}

                <div className="corner-decoration corner-tl"></div>
                <div className="corner-decoration corner-tr"></div>
                <div className="corner-decoration corner-bl"></div>
                <div className="corner-decoration corner-br"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Album Pages */}
      <div className="album-pages">
        <div className="album-content">
          <motion.div 
            className={`photos-grid ${gallery.images && gallery.images.length === 1 ? 'single-photo' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {gallery.images && gallery.images.length > 0 ? (
              gallery.images.map((image, index) => {
                const imageObj = typeof image === 'string' ? { url: image, caption: '' } : image;
                return (
                  <motion.div
                    key={index}
                    className="photo-frame"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div 
                      className="photo-wrapper"
                      onClick={() => openImage(imageObj, index)}
                    >
                      <img
                        src={imageObj.url || imageObj}
                        alt={imageObj.caption || `${gallery.title} - ${index + 1}`}
                        loading="lazy"
                      />
                      <div className="photo-overlay">
                        <span className="view-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                          </svg>
                        </span>
                      </div>
                      <span className="photo-number">{index + 1}</span>
                    </div>
                    {imageObj.caption && (
                      <p className="photo-caption">{imageObj.caption}</p>
                    )}
                    <div className="photo-corners">
                      <span className="corner corner-1"></span>
                      <span className="corner corner-2"></span>
                      <span className="corner corner-3"></span>
                      <span className="corner corner-4"></span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="no-photos">
                <p>No photos in this album yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="album-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <button className="lightbox-close" onClick={closeImage}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {gallery.images.length > 1 && (
              <>
                <button 
                  className={`lightbox-nav-btn prev ${currentImageIndex === 0 ? 'disabled' : ''}`}
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  disabled={currentImageIndex === 0}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <button 
                  className={`lightbox-nav-btn next ${currentImageIndex === gallery.images.length - 1 ? 'disabled' : ''}`}
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  disabled={currentImageIndex === gallery.images.length - 1}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </>
            )}

            <div className="lightbox-counter">
              {currentImageIndex + 1} / {gallery.images.length}
            </div>

            <motion.div 
              className="lightbox-image-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url || selectedImage}
                alt={selectedImage.caption || 'Gallery image'}
              />
              {selectedImage.caption && (
                <div className="lightbox-caption">
                  <p>{selectedImage.caption}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Random Suggestions */}
      {randomSuggestions.length > 0 && (
        <motion.div 
          className="suggestions-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="suggestions-container">
            <h3 className="suggestions-title">Explore More Galleries</h3>
            <div className="suggestions-grid">
              {randomSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion._id}
                  className="suggestion-card"
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + (index * 0.2), duration: 0.5 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  onClick={() => handleSuggestionClick(suggestion._id)}
                >
                  <div className="suggestion-content">
                    <div className="suggestion-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                    <h4 className="suggestion-card-title">{suggestion.title}</h4>
                    {suggestion.date && (
                      <p className="suggestion-date">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {formatDate(suggestion.date)}
                      </p>
                    )}
                    {suggestion.description && (
                      <p className="suggestion-description">{suggestion.description}</p>
                    )}
                    <div className="suggestion-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryDetail;