import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
  FaXmark,
  FaMagnifyingGlassMinus,
  FaMagnifyingGlassPlus,
  FaSpinner,
  FaExpand,
  FaCompress,
  FaTableCellsLarge
} from 'react-icons/fa6';
import './FlipBookModal.css';

/* ── PDF.js Dynamic Loader ── */
const loadPdfJs = () => {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) {
      resolve(window.pdfjsLib);
      return;
    }
    const existingScript = document.getElementById('pdfjs-cdn-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.pdfjsLib));
      existingScript.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.id = 'pdfjs-cdn-script';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('PDF.js failed to load'));
      }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

/* ── Helper for Image-Only Documents ── */
const enhanceImageUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    if (!url.includes('dn_300') && !url.includes('w_2400')) {
      return url.replace('/upload/', '/upload/dn_300,q_auto:best,w_2400,c_limit,f_auto/');
    }
  }
  return url;
};

/* ── Global In-Memory Render Cache for 0ms Instant Slide Transitions ── */
const globalPageCache = new Map();
const activePreloadJobs = new Set();

const calculateSlideDimensions = (unscaledViewport, stageW, stageH, zoom) => {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
  const paddingV = isMobile ? 8 : 16;
  const paddingH = isMobile ? 12 : (isTablet ? 70 : 130);

  const availH = Math.max(stageH - paddingV * 2, 320);
  const availW = Math.max(stageW - paddingH * 2, 240);

  const pdfAspect = unscaledViewport.width / unscaledViewport.height;

  let targetH = availH;
  let targetW = targetH * pdfAspect;

  if (targetW > availW) {
    targetW = availW;
    targetH = targetW / pdfAspect;
  }

  const baseDisplayScale = targetH / unscaledViewport.height;
  const effectiveScale = baseDisplayScale * zoom;

  const displayW = Math.round(unscaledViewport.width * effectiveScale);
  const displayH = Math.round(unscaledViewport.height * effectiveScale);

  return { displayW, displayH, effectiveScale };
};

const renderPdfPageToCache = async (pdfDoc, pageIndex, stageDimensions, zoom) => {
  const cacheKey = `p_${pageIndex}_${Math.round(stageDimensions.width)}_${Math.round(stageDimensions.height)}_${zoom}`;
  if (globalPageCache.has(cacheKey)) {
    return globalPageCache.get(cacheKey);
  }
  if (activePreloadJobs.has(cacheKey)) {
    return null;
  }

  activePreloadJobs.add(cacheKey);

  try {
    const page = await pdfDoc.getPage(pageIndex + 1);
    const stageW = stageDimensions.width || (window.innerWidth - 32);
    const stageH = stageDimensions.height || (window.innerHeight - 120);

    const unscaledViewport = page.getViewport({ scale: 1.0 });
    const { displayW, displayH, effectiveScale } = calculateSlideDimensions(unscaledViewport, stageW, stageH, zoom);

    const dpr = window.devicePixelRatio || 1;
    const outputScale = Math.max(dpr, 1.5);
    const renderViewport = page.getViewport({ scale: effectiveScale * outputScale });

    const offscreen = document.createElement('canvas');
    offscreen.width = Math.floor(renderViewport.width);
    offscreen.height = Math.floor(renderViewport.height);

    const ctx = offscreen.getContext('2d', { alpha: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    await page.render({
      canvasContext: ctx,
      viewport: renderViewport,
      intent: 'print',
    }).promise;

    const entry = {
      canvas: offscreen,
      displayW,
      displayH,
      width: offscreen.width,
      height: offscreen.height,
    };

    globalPageCache.set(cacheKey, entry);
    activePreloadJobs.delete(cacheKey);
    return entry;
  } catch (e) {
    activePreloadJobs.delete(cacheKey);
    return null;
  }
};

const FlipBookModal = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [fallbackImages, setFallbackImages] = useState([]);
  const [thumbnailUrls, setThumbnailUrls] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageInputVal, setPageInputVal] = useState('1');
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 });

  const [direction, setDirection] = useState(1);

  const stageRef = useRef(null);
  const thumbnailsTrackRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const docUrl = book?.docUrl || book?.pdf?.url || book?.path || book?.href || null;

  // 1. Fullscreen Toggle & Safe Exit
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleCloseModal = useCallback(() => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
    setIsFullscreen(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Ensure fullscreen is always exited if modal unmounts
  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };
  }, []);

  const zoomIn = () => {
    setZoom((prev) => Math.min(3.0, +(prev + 0.25).toFixed(2)));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(0.6, +(prev - 0.25).toFixed(2)));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  // 2. Measure available stage dimensions dynamically using ResizeObserver
  useEffect(() => {
    if (!stageRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setStageDimensions({
            width: Math.floor(width),
            height: Math.floor(height)
          });
        }
      }
    });

    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  // 3. Load PDF Document Instance
  useEffect(() => {
    let isMounted = true;

    const loadDocument = async () => {
      setLoading(true);
      setLoadingError(null);

      if (docUrl && docUrl !== '#') {
        try {
          const pdfjs = await loadPdfJs();
          const loadingTask = pdfjs.getDocument({
            url: docUrl,
            cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
            cMapPacked: true,
            enableXfa: true,
          });

          const doc = await loadingTask.promise;
          if (!isMounted) return;

          setPdfDoc(doc);
          setTotalPages(doc.numPages);
          setLoading(false);

          // Generate lightweight thumbnail previews in background
          generateThumbnails(doc);
          return;
        } catch (err) {
          console.warn('PDF.js loading failed, falling back to pre-rendered pages:', err);
        }
      }

      // Fallback for image-only books
      const rawDirectPages = Array.isArray(book?.pages) && book.pages.length > 0 
        ? book.pages 
        : (Array.isArray(book?.pdf?.pages) && book.pdf.pages.length > 0 ? book.pdf.pages : []);

      if (rawDirectPages.length > 0) {
        const directPages = rawDirectPages.map(enhanceImageUrl);
        if (isMounted) {
          setFallbackImages(directPages);
          setThumbnailUrls(directPages);
          setTotalPages(directPages.length);
          setLoading(false);
        }
        return;
      }

      if (isMounted) {
        setLoadingError('Could not load document pages.');
        setLoading(false);
      }
    };

    const generateThumbnails = async (doc) => {
      const thumbs = [];
      const thumbCanvas = document.createElement('canvas');
      const thumbCtx = thumbCanvas.getContext('2d');
      const thumbScale = 0.22;

      for (let i = 1; i <= Math.min(doc.numPages, 100); i++) {
        if (!isMounted) return;
        try {
          const page = await doc.getPage(i);
          const viewport = page.getViewport({ scale: thumbScale });
          thumbCanvas.width = viewport.width;
          thumbCanvas.height = viewport.height;

          await page.render({
            canvasContext: thumbCtx,
            viewport: viewport,
          }).promise;

          thumbs.push(thumbCanvas.toDataURL('image/jpeg', 0.8));
          if (isMounted) {
            setThumbnailUrls([...thumbs]);
          }
        } catch (e) {
          // ignore thumb generation err
        }
      }
    };

    loadDocument();

    return () => {
      isMounted = false;
    };
  }, [book, docUrl]);

  // Proactive Background Pre-Rendering Queue (+1, -1, +2, +3, -2)
  useEffect(() => {
    if (!pdfDoc || totalPages <= 0) return;

    let isSubscribed = true;

    const preloadSurroundingPages = async () => {
      // Prioritize next page first, then previous, then 2-3 pages ahead
      const priorityIndices = [
        currentPage + 1,
        currentPage - 1,
        currentPage + 2,
        currentPage + 3,
        currentPage - 2
      ];

      for (const idx of priorityIndices) {
        if (!isSubscribed) break;
        if (idx >= 0 && idx < totalPages) {
          await renderPdfPageToCache(pdfDoc, idx, stageDimensions, zoom);
        }
      }
    };

    // Run slightly deferred to allow the active page render priority
    const timer = setTimeout(preloadSurroundingPages, 40);

    return () => {
      isSubscribed = false;
      clearTimeout(timer);
    };
  }, [pdfDoc, currentPage, totalPages, stageDimensions, zoom]);

  // Keep thumbnail in view when current page changes
  useEffect(() => {
    if (showThumbnails && thumbnailsTrackRef.current) {
      const activeThumb = thumbnailsTrackRef.current.querySelector(`.slide-thumb-item.active`);
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentPage, showThumbnails]);

  // Slide Navigation Handlers with Direction Tracking
  const goToSlide = useCallback((pageIndex, customDir = null) => {
    if (pageIndex < 0 || pageIndex >= totalPages) return;
    const dir = customDir !== null ? customDir : (pageIndex > currentPage ? 1 : -1);
    setDirection(dir);
    setCurrentPage(pageIndex);
    setPageInputVal(String(pageIndex + 1));
  }, [currentPage, totalPages]);

  const nextSlide = useCallback(() => {
    if (currentPage < totalPages - 1) {
      goToSlide(currentPage + 1, 1);
    }
  }, [currentPage, totalPages, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentPage > 0) {
      goToSlide(currentPage - 1, -1);
    }
  }, [currentPage, goToSlide]);

  const goToFirst = useCallback(() => {
    goToSlide(0, -1);
  }, [goToSlide]);

  const goToLast = useCallback(() => {
    if (totalPages > 0) {
      goToSlide(totalPages - 1, 1);
    }
  }, [totalPages, goToSlide]);

  const handlePageInputSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const parsed = parseInt(pageInputVal, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
        goToSlide(parsed - 1);
      } else {
        setPageInputVal(String(currentPage + 1));
      }
    }
  };

  // Touch Swipe Support for Mobile/Tablets
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Ensure horizontal gesture is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseModal();
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && e.target.tagName !== 'INPUT')) {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        goToFirst();
      }
      if (e.key === 'End') {
        e.preventDefault();
        goToLast();
      }
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomIn();
      }
      if (e.key === '-') {
        e.preventDefault();
        zoomOut();
      }
      if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
      if (e.key.toLowerCase() === 'f' && e.target.tagName !== 'INPUT') {
        toggleFullscreen();
      }
      if (e.key.toLowerCase() === 't' && e.target.tagName !== 'INPUT') {
        setShowThumbnails((prev) => !prev);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleCloseModal, nextSlide, prevSlide, goToFirst, goToLast]);

  const bookTitle = book?.title || (book?.month && book?.year ? `e-Minthiran — ${book.month} ${book.year}` : 'Document Slide Viewer');

  return (
    <motion.div
      className="reader-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseModal();
      }}
    >
      <div className="reader-modal-wrapper">
        {/* ── Top Bar ── */}
        <div className="reader-top-bar">
          <div className="reader-title-box">
            <span className="reader-badge-pill">PDF SLIDE VIEWER</span>
            <h3 className="reader-book-title" title={bookTitle}>
              {bookTitle}
            </h3>
          </div>

          <div className="reader-top-controls">
            {/* Thumbnail Strip Toggle */}
            <button
              className={`reader-tool-btn ${showThumbnails ? 'active-tool' : ''}`}
              onClick={() => setShowThumbnails((prev) => !prev)}
              title="Toggle Thumbnails Grid (T)"
            >
              <FaTableCellsLarge />
            </button>

            {/* Zoom Out */}
            <button
              className="reader-tool-btn"
              onClick={zoomOut}
              disabled={zoom <= 0.6}
              title="Zoom Out (-)"
            >
              <FaMagnifyingGlassMinus />
            </button>

            {/* Zoom Percentage / Reset */}
            <button
              className="reader-zoom-badge-btn"
              onClick={resetZoom}
              title="Reset Zoom to 100% (0)"
            >
              {Math.round(zoom * 100)}%
            </button>

            {/* Zoom In */}
            <button
              className="reader-tool-btn"
              onClick={zoomIn}
              disabled={zoom >= 3.0}
              title="Zoom In (+)"
            >
              <FaMagnifyingGlassPlus />
            </button>

            {/* Fullscreen Toggle */}
            <button
              className="reader-tool-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>

            {/* Close Button */}
            <button
              className="reader-tool-btn reader-close-btn"
              onClick={handleCloseModal}
              title="Close Viewer (Esc)"
            >
              <FaXmark />
            </button>
          </div>
        </div>

        {/* ── Main Presentation Slide Stage ── */}
        <div
          className="reader-main-stage"
          ref={stageRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {loading ? (
            <div className="reader-loading-card">
              <FaSpinner className="reader-spinner" />
              <h5 className="mt-3">Loading Original Vector PDF…</h5>
            </div>
          ) : totalPages > 0 ? (
            /* 3D Carousel Slide Deck View with Smooth Continuous Slide-In Motion */
            <div className="reader-3d-stage">
              {/* Left Chevron Button */}
              <button
                className="reader-chevron-btn left-chevron"
                onClick={prevSlide}
                disabled={currentPage === 0}
                aria-label="Previous Page"
                title="Previous Page (← / PageUp)"
              >
                <FaAngleLeft />
              </button>

              {/* 3D Coverflow Deck Container */}
              <div className="reader-3d-deck-container">
                {[-2, -1, 0, 1, 2]
                  .map((d) => currentPage + d)
                  .filter((idx) => idx >= 0 && idx < totalPages)
                  .map((pageIdx) => (
                    <SlideDeckCard
                      key={pageIdx}
                      pdfDoc={pdfDoc}
                      pageIndex={pageIdx}
                      delta={pageIdx - currentPage}
                      fallbackImg={fallbackImages[pageIdx]}
                      thumbImg={thumbnailUrls[pageIdx]}
                      zoom={zoom}
                      stageDimensions={stageDimensions}
                      totalPages={totalPages}
                      isMobile={window.innerWidth <= 768}
                      onClick={() => {
                        if (pageIdx !== currentPage) {
                          goToSlide(pageIdx);
                        }
                      }}
                    />
                  ))}
              </div>

              {/* Right Chevron Button */}
              <button
                className="reader-chevron-btn right-chevron"
                onClick={nextSlide}
                disabled={currentPage >= totalPages - 1}
                aria-label="Next Page"
                title="Next Page (→ / PageDown / Space)"
              >
                <FaAngleRight />
              </button>
            </div>
          ) : (
            <div className="reader-error-card">
              <h5>{loadingError || 'No pages available for this document.'}</h5>
            </div>
          )}
        </div>

        {/* ── Bottom Thumbnail Drawer Filmstrip ── */}
        <AnimatePresence>
          {showThumbnails && totalPages > 0 && (
            <motion.div
              className="reader-thumbnails-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 110, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="thumbnails-scroll-track" ref={thumbnailsTrackRef}>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`slide-thumb-item ${idx === currentPage ? 'active' : ''}`}
                    onClick={() => goToSlide(idx)}
                    title={`Go to Slide ${idx + 1}`}
                  >
                    <div className="thumb-preview-box">
                      {thumbnailUrls[idx] ? (
                        <img src={thumbnailUrls[idx]} alt={`Thumb ${idx + 1}`} className="thumb-img" />
                      ) : (
                        <div className="thumb-placeholder">{idx + 1}</div>
                      )}
                    </div>
                    <span className="thumb-label">{idx + 1}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom Scrubber Progress Bar Matching Reference Screenshot ── */}
        {totalPages > 0 && (
          <div className="reader-bottom-bar">
            <div className="reader-bottom-scrubber-wrapper">
              <input
                type="range"
                min="0"
                max={totalPages - 1}
                value={currentPage}
                onChange={(e) => goToSlide(Number(e.target.value))}
                className="reader-scrubber-slider"
                aria-label="Slide scrubber"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── Unified 3D Slide Deck Card with Continuous Slide-In Motion ── */
const SlideDeckCard = ({
  pdfDoc,
  pageIndex,
  delta,
  fallbackImg,
  thumbImg,
  zoom,
  stageDimensions,
  totalPages,
  isMobile,
  onClick,
}) => {
  const canvasRef = useRef(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    const displayPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const cacheKey = `p_${pageIndex}_${Math.round(stageDimensions.width)}_${Math.round(stageDimensions.height)}_${zoom}`;

      // 1. Instant 0ms draw from pre-render memory cache
      if (globalPageCache.has(cacheKey)) {
        const entry = globalPageCache.get(cacheKey);
        canvas.width = entry.width;
        canvas.height = entry.height;
        canvas.style.width = `${entry.displayW}px`;
        canvas.style.height = `${entry.displayH}px`;
        const ctx = canvas.getContext('2d', { alpha: false });
        ctx.drawImage(entry.canvas, 0, 0);
        setRendered(true);
        return;
      }

      // 2. Render and cache
      const entry = await renderPdfPageToCache(pdfDoc, pageIndex, stageDimensions, zoom);
      if (!isCurrent || !entry || !canvasRef.current) return;

      canvas.width = entry.width;
      canvas.height = entry.height;
      canvas.style.width = `${entry.displayW}px`;
      canvas.style.height = `${entry.displayH}px`;
      const ctx = canvas.getContext('2d', { alpha: false });
      ctx.drawImage(entry.canvas, 0, 0);
      setRendered(true);
    };

    displayPage();

    return () => {
      isCurrent = false;
    };
  }, [pdfDoc, pageIndex, zoom, stageDimensions]);

  const stageW = stageDimensions.width || (window.innerWidth - 32);

  // Position, 3D Rotation, Scale, and Opacity calculations based on delta (offset from active page)
  let targetX = 0;
  let targetScale = 1;
  let targetRotateY = 0;
  let targetOpacity = 1;
  let zIndex = 25;

  if (delta === 0) {
    targetX = 0;
    targetScale = 1;
    targetRotateY = 0;
    targetOpacity = 1;
    zIndex = 25;
  } else if (delta === 1) {
    targetX = isMobile ? stageW * 0.95 : Math.min(stageW * 0.38, 430);
    targetScale = 0.88;
    targetRotateY = -22;
    targetOpacity = isMobile ? 0 : 0.72;
    zIndex = 15;
  } else if (delta === 2) {
    targetX = isMobile ? stageW * 1.5 : Math.min(stageW * 0.68, 760);
    targetScale = 0.76;
    targetRotateY = -28;
    targetOpacity = isMobile ? 0 : 0.42;
    zIndex = 10;
  } else if (delta === -1) {
    targetX = isMobile ? -stageW * 0.95 : -Math.min(stageW * 0.38, 430);
    targetScale = 0.88;
    targetRotateY = 22;
    targetOpacity = isMobile ? 0 : 0.72;
    zIndex = 15;
  } else if (delta === -2) {
    targetX = isMobile ? -stageW * 1.5 : -Math.min(stageW * 0.68, 760);
    targetScale = 0.76;
    targetRotateY = 28;
    targetOpacity = isMobile ? 0 : 0.42;
    zIndex = 10;
  } else {
    targetX = delta > 0 ? stageW * 1.2 : -stageW * 1.2;
    targetScale = 0.65;
    targetRotateY = delta > 0 ? -32 : 32;
    targetOpacity = 0;
    zIndex = 2;
  }

  return (
    <motion.div
      className={`reader-deck-card ${delta === 0 ? 'active-deck-card' : 'neighbor-deck-card'}`}
      initial={false}
      animate={{
        x: targetX,
        scale: targetScale,
        rotateY: targetRotateY,
        opacity: targetOpacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 270,
        damping: 26,
        mass: 0.65,
      }}
      style={{
        zIndex,
        pointerEvents: delta === 0 ? 'auto' : (targetOpacity > 0 ? 'auto' : 'none'),
      }}
      onClick={onClick}
      title={delta !== 0 ? `Go to Page ${pageIndex + 1}` : undefined}
    >
      {/* Instant thumbnail backdrop */}
      {thumbImg && pdfDoc && !rendered && (
        <img
          src={thumbImg}
          alt=""
          className="reader-slide-thumb-backdrop"
          aria-hidden="true"
        />
      )}

      {pdfDoc ? (
        <canvas ref={canvasRef} className="reader-pdf-canvas" />
      ) : fallbackImg ? (
        <img
          src={fallbackImg}
          alt={`Slide ${pageIndex + 1}`}
          className="reader-slide-img"
          draggable={false}
        />
      ) : (
        <div className="reader-slide-loading-placeholder">
          <FaSpinner className="reader-spinner small" />
          <span>Slide {pageIndex + 1}…</span>
        </div>
      )}

      {delta !== 0 && <div className="reader-neighbor-overlay-glass" />}

      {delta === 0 && (
        <div className="reader-slide-floating-badge">
          Slide {pageIndex + 1} of {totalPages}
        </div>
      )}
    </motion.div>
  );
};

export default FlipBookModal;



