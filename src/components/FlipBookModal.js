import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PageFlip } from 'page-flip';
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
  FaArrowUpRightFromSquare,
  FaBookOpen,
  FaFileLines
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

const pdfRenderCache = new Map();

/* ── Helper to ensure Cloudinary & Web images load at HD print quality ── */
const enhanceImageUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    if (!url.includes('dn_300') && !url.includes('w_2400')) {
      return url.replace('/upload/', '/upload/dn_300,q_auto:best,w_2400,c_limit,f_auto/');
    }
  }
  return url;
};

/* ── Lossless PNG conversion for razor-sharp vector-grade clarity ── */
const canvasToBlobUrl = (canvas) => {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          resolve(canvas.toDataURL('image/png'));
        }
      },
      'image/png'
    );
  });
};

const FlipBookModal = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingError, setLoadingError] = useState(null);
  const [pageImages, setPageImages] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageInputVal, setPageInputVal] = useState('1');
  const [viewMode, setViewMode] = useState('flipbook'); // 'flipbook' | 'hd-scroll'

  const bookContainerRef = useRef(null);
  const pageFlipRef = useRef(null);
  const scrollStageRef = useRef(null);
  const pageCardRefs = useRef([]);

  const docUrl = book?.docUrl || book?.pdf?.url || book?.path || book?.href || null;

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

  const handleOpenInNewTab = () => {
    if (docUrl && docUrl !== '#') {
      window.open(docUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(2.0, +(prev + 0.15).toFixed(2)));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(0.5, +(prev - 0.15).toFixed(2)));
  };

  // 1. High-Performance PDF / Image Page Extraction at 4.0x DPI (350+ DPI)
  useEffect(() => {
    let isMounted = true;

    const extractPages = async () => {
      setLoading(true);
      setLoadingError(null);
      setLoadingProgress(0);

      // Check cache first
      if (docUrl && pdfRenderCache.has(docUrl)) {
        const cached = pdfRenderCache.get(docUrl);
        if (isMounted) {
          setPageImages(cached.images);
          setTotalPages(cached.totalPages);
          setLoading(false);
        }
        return;
      }

      // If we have docUrl (original vector PDF), render directly from PDF at native ultra HD DPI
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
          const count = doc.numPages;

          if (isMounted) {
            setTotalPages(count);
          }

          const images = [];
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d', { alpha: false });

          // Scale factor: 4.0 provides ultra-crisp vector-like clarity on all screens
          const renderScale = 4.0;

          for (let i = 1; i <= count; i++) {
            if (!isMounted) return;

            const page = await doc.getPage(i);
            const viewport = page.getViewport({ scale: renderScale });

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';

            await page.render({
              canvasContext: context,
              viewport: viewport,
              intent: 'print',
            }).promise;

            const blobUrl = await canvasToBlobUrl(canvas);
            images.push(blobUrl);

            if (isMounted) {
              setLoadingProgress(Math.round((i / count) * 100));
            }

            await new Promise((r) => setTimeout(r, 0));
          }

          if (docUrl) {
            pdfRenderCache.set(docUrl, {
              images,
              totalPages: count,
            });
          }

          if (isMounted) {
            setPageImages(images);
            setLoading(false);
          }
          return;
        } catch (err) {
          console.warn('Direct PDF.js extraction error, falling back to pre-rendered pages:', err);
        }
      }

      // Fallback to pre-rendered pages
      const rawDirectPages = Array.isArray(book?.pages) && book.pages.length > 0 
        ? book.pages 
        : (Array.isArray(book?.pdf?.pages) && book.pdf.pages.length > 0 ? book.pdf.pages : []);

      if (rawDirectPages.length > 0) {
        const directPages = rawDirectPages.map(enhanceImageUrl);
        if (isMounted) {
          setPageImages(directPages);
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

    extractPages();

    return () => {
      isMounted = false;
    };
  }, [book, docUrl]);

  // 2. Instantiate realistic 3D StPageFlip Engine
  useEffect(() => {
    if (loading || pageImages.length === 0 || viewMode !== 'flipbook' || !bookContainerRef.current) return;

    let pageFlipInstance = null;

    try {
      bookContainerRef.current.innerHTML = '';

      pageFlipInstance = new PageFlip(bookContainerRef.current, {
        width: 1000,
        height: 1414,
        size: 'stretch',
        minWidth: 320,
        maxWidth: 2400,
        minHeight: 420,
        maxHeight: 3400,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        usePortrait: true,
        startPage: currentPage,
        drawShadow: true,
        flippingTime: 850,
        useMouseEvents: true,
        swipeDistance: 25
      });

      pageFlipInstance.loadFromImages(pageImages);

      // Ensure smooth rendering and transparent canvas background
      const renderInstance = pageFlipInstance.getRender();
      if (renderInstance) {
        renderInstance.clear = function () {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.imageSmoothingEnabled = true;
          this.ctx.imageSmoothingQuality = 'high';
        };
        if (renderInstance.constructor && renderInstance.constructor.prototype) {
          renderInstance.constructor.prototype.clear = function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = 'high';
          };
        }
      }

      pageFlipInstance.on('flip', (e) => {
        const pageIdx = e.data;
        setCurrentPage(pageIdx);
        setPageInputVal(String(pageIdx + 1));
      });

      pageFlipRef.current = pageFlipInstance;
    } catch (err) {
      console.error('Error initializing PageFlip:', err);
    }

    return () => {
      if (pageFlipInstance) {
        try {
          pageFlipInstance.destroy();
        } catch (e) {}
      }
      pageFlipRef.current = null;
    };
  }, [loading, pageImages, viewMode]);

  // Scroll to page helper for HD reader mode
  const scrollToHdPage = (pageIndex) => {
    if (pageCardRefs.current[pageIndex]) {
      pageCardRefs.current[pageIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Spread Navigation Handlers
  const flipPrev = () => {
    if (viewMode === 'flipbook' && pageFlipRef.current) {
      pageFlipRef.current.flipPrev();
    } else if (currentPage > 0) {
      const prevIdx = currentPage - 1;
      setCurrentPage(prevIdx);
      setPageInputVal(String(prevIdx + 1));
      scrollToHdPage(prevIdx);
    }
  };

  const flipNext = () => {
    if (viewMode === 'flipbook' && pageFlipRef.current) {
      pageFlipRef.current.flipNext();
    } else if (currentPage < totalPages - 1) {
      const nextIdx = currentPage + 1;
      setCurrentPage(nextIdx);
      setPageInputVal(String(nextIdx + 1));
      scrollToHdPage(nextIdx);
    }
  };

  const goToFirst = () => {
    if (viewMode === 'flipbook' && pageFlipRef.current) {
      pageFlipRef.current.turnToPage(0);
    } else {
      setCurrentPage(0);
      setPageInputVal('1');
      scrollToHdPage(0);
    }
  };

  const goToLast = () => {
    if (totalPages > 0) {
      const lastIdx = totalPages - 1;
      if (viewMode === 'flipbook' && pageFlipRef.current) {
        pageFlipRef.current.turnToPage(lastIdx);
      } else {
        setCurrentPage(lastIdx);
        setPageInputVal(String(totalPages));
        scrollToHdPage(lastIdx);
      }
    }
  };

  const handlePageInputSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const parsed = parseInt(pageInputVal, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
        const targetIdx = parsed - 1;
        setCurrentPage(targetIdx);
        if (viewMode === 'flipbook' && pageFlipRef.current) {
          pageFlipRef.current.turnToPage(targetIdx);
        } else {
          scrollToHdPage(targetIdx);
        }
      } else {
        setPageInputVal(String(currentPage + 1));
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && viewMode === 'flipbook')) {
        e.preventDefault();
        flipNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        flipPrev();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        goToFirst();
      }
      if (e.key === 'End') {
        e.preventDefault();
        goToLast();
      }
      if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
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
  }, [onClose, totalPages, viewMode, currentPage]);

  const bookTitle = book?.title || (book?.month && book?.year ? `e-Minthiran — ${book.month} ${book.year}` : 'Document Reader');

  return (
    <motion.div
      className="reader-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="reader-modal-wrapper">
        {/* ── Top Bar ── */}
        <div className="reader-top-bar">
          <div className="reader-title-box">
            <h3 className="reader-book-title" title={bookTitle}>
              {bookTitle}
            </h3>
          </div>

          <div className="reader-top-controls">
            {/* View Mode Switcher */}
            <button
              className={`reader-mode-toggle-btn ${viewMode === 'hd-scroll' ? 'active' : ''}`}
              onClick={() => setViewMode(viewMode === 'flipbook' ? 'hd-scroll' : 'flipbook')}
              title={viewMode === 'flipbook' ? 'Switch to Crisp HD Full-Page Reader' : 'Switch to 3D FlipBook'}
            >
              {viewMode === 'flipbook' ? (
                <>
                  <FaFileLines />
                  <span>HD Reader</span>
                </>
              ) : (
                <>
                  <FaBookOpen />
                  <span>3D FlipBook</span>
                </>
              )}
            </button>

            {/* Zoom Out */}
            <button
              className="reader-tool-btn"
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              title="Zoom Out"
            >
              <FaMagnifyingGlassMinus />
            </button>

            {/* Zoom Percentage */}
            <span className="reader-zoom-badge">{Math.round(zoom * 100)}%</span>

            {/* Zoom In */}
            <button
              className="reader-tool-btn"
              onClick={zoomIn}
              disabled={zoom >= 2.0}
              title="Zoom In"
            >
              <FaMagnifyingGlassPlus />
            </button>

            {/* Fullscreen Toggle */}
            <button
              className="reader-tool-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>

            {/* Open Original Vector PDF in New Tab */}
            {docUrl && docUrl !== '#' && (
              <button
                className="reader-tool-btn"
                onClick={handleOpenInNewTab}
                title="Open Original Vector PDF in New Tab"
              >
                <FaArrowUpRightFromSquare />
              </button>
            )}

            {/* Close Button */}
            <button
              className="reader-tool-btn reader-close-btn"
              onClick={onClose}
              title="Close Viewer (Esc)"
            >
              <FaXmark />
            </button>
          </div>
        </div>

        {/* ── Main Book Stage ── */}
        <div className="reader-main-stage">
          {loading ? (
            <div className="reader-loading-card">
              <FaSpinner className="reader-spinner" />
              <h5 className="mt-3">Rendering Ultra-Crisp Pages… {loadingProgress}%</h5>
            </div>
          ) : pageImages.length > 0 ? (
            viewMode === 'flipbook' ? (
              /* 3D Interactive FlipBook View */
              <div className="reader-stage-inner">
                {/* Left Arrow */}
                <button
                  className="reader-arrow-pill left-arrow"
                  onClick={flipPrev}
                  disabled={currentPage === 0}
                  aria-label="Previous Page"
                  title="Previous Page (←)"
                >
                  <FaAngleLeft />
                </button>

                {/* Interactive 3D StPageFlip Viewport with Zoom Scale */}
                <div
                  className="reader-spread-viewport"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <div
                    ref={bookContainerRef}
                    className="stpageflip-book-wrapper"
                  />
                </div>

                {/* Right Arrow */}
                <button
                  className="reader-arrow-pill right-arrow"
                  onClick={flipNext}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Next Page"
                  title="Next Page (→)"
                >
                  <FaAngleRight />
                </button>
              </div>
            ) : (
              /* Full Crisp HD Reader View (Pixel-perfect reading matching screenshot) */
              <div ref={scrollStageRef} className="reader-hd-scroll-stage">
                <div
                  className="reader-hd-pages-container"
                  style={{ transform: `scale(${zoom})` }}
                >
                  {pageImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      ref={(el) => (pageCardRefs.current[idx] = el)}
                      className="reader-hd-page-card"
                    >
                      <img
                        src={imgSrc}
                        alt={`Page ${idx + 1}`}
                        className="reader-hd-page-img"
                        loading="lazy"
                      />
                      <div className="reader-hd-page-badge">
                        Page {idx + 1} of {totalPages}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="reader-error-card">
              <h5>{loadingError || 'No pages available for this document.'}</h5>
            </div>
          )}
        </div>

        {/* ── Bottom Floating Pill Navigation Toolbar ── */}
        {totalPages > 0 && (
          <div className="reader-bottom-bar">
            <div className="reader-nav-pill">
              {/* First Page */}
              <button
                className="reader-nav-btn"
                onClick={goToFirst}
                disabled={currentPage === 0}
                title="First Page"
              >
                <FaAnglesLeft />
              </button>

              {/* Prev Page */}
              <button
                className="reader-nav-btn"
                onClick={flipPrev}
                disabled={currentPage === 0}
                title="Previous Page"
              >
                <FaAngleLeft />
              </button>

              {/* Page Number Box */}
              <div className="reader-page-counter-box">
                <span className="reader-page-text">Page</span>
                <input
                  type="text"
                  className="reader-page-input"
                  value={pageInputVal}
                  onChange={(e) => setPageInputVal(e.target.value)}
                  onKeyDown={handlePageInputSubmit}
                  onBlur={handlePageInputSubmit}
                  aria-label="Current Page Number"
                />
                <span className="reader-page-text">of {totalPages}</span>
              </div>

              {/* Next Page */}
              <button
                className="reader-nav-btn"
                onClick={flipNext}
                disabled={currentPage >= totalPages - 1}
                title="Next Page"
              >
                <FaAngleRight />
              </button>

              {/* Last Page */}
              <button
                className="reader-nav-btn"
                onClick={goToLast}
                disabled={currentPage >= totalPages - 1}
                title="Last Page"
              >
                <FaAnglesRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FlipBookModal;
