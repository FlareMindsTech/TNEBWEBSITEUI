import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaBookOpen,
  FaAnglesLeft,
  FaAnglesRight,
  FaAngleLeft,
  FaAngleRight,
  FaXmark,
  FaMagnifyingGlassMinus,
  FaMagnifyingGlassPlus,
  FaArrowUpRightFromSquare,
  FaDownload,
  FaFilePdf,
  FaSpinner,
  FaExpand,
  FaCompress
} from 'react-icons/fa6';
import { PageFlip } from 'page-flip';
import '../pages/TechnicalBooksAndManuals.css';


/* ── Helper to dynamically load PDF.js from CDN ── */
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

// In-memory document render cache to make re-opening instant without re-rendering
const pdfRenderCache = new Map();

/* ── Helper to convert canvas to lightweight Blob URL ── */
const canvasToBlobUrl = (canvas) => {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          resolve(canvas.toDataURL('image/jpeg', 0.88));
        }
      },
      'image/jpeg',
      0.88
    );
  });
};

const FlipBookModal = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState('flip'); // 'flip' | 'pdf'
  const [jumpPageInput, setJumpPageInput] = useState('1');
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingError, setLoadingError] = useState(null);
  const [pageImages, setPageImages] = useState([]);
  const [zoom, setZoom] = useState(0.8);
  const [isFullscreen, setIsFullscreen] = useState(true);

  const bookContainerRef = useRef(null);
  const pageFlipInstanceRef = useRef(null);
  const docUrl = book?.docUrl || book?.path || book?.href || null;

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

  // 1. High-Performance PDF Page Extraction
  useEffect(() => {
    let isMounted = true;

    const extractPages = async () => {
      setLoading(true);
      setLoadingError(null);
      setLoadingProgress(0);

      // Check in-memory cache first for instant 0ms load
      if (docUrl && pdfRenderCache.has(docUrl)) {
        const cached = pdfRenderCache.get(docUrl);
        if (isMounted) {
          setPageImages(cached.images);
          setTotalPages(cached.totalPages);
          setLoading(false);
        }
        return;
      }

      // If pre-rendered pages exist
      if (Array.isArray(book?.pages) && book.pages.length > 0) {
        if (isMounted) {
          setPageImages(book.pages);
          setTotalPages(book.pages.length);
          setLoading(false);
        }
        return;
      }

      if (!docUrl || docUrl === '#') {
        if (isMounted) {
          setLoadingError('No document file attached.');
          setLoading(false);
        }
        return;
      }

      try {
        const pdfjs = await loadPdfJs();
        const loadingTask = pdfjs.getDocument({
          url: docUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        const count = doc.numPages;

        if (isMounted) {
          setTotalPages(count);
        }

        const images = [];

        // Off-screen reusable canvas for high efficiency
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { alpha: false });

        for (let i = 1; i <= count; i++) {
          if (!isMounted) return;

          const page = await doc.getPage(i);
          // Scale 1.6: Optimal sharpness while keeping rendering speed fast and memory footprint low
          const viewport = page.getViewport({ scale: 1.6 });

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          const blobUrl = await canvasToBlobUrl(canvas);
          images.push(blobUrl);

          if (isMounted) {
            setLoadingProgress(Math.round((i / count) * 100));
          }

          // Yield to main event loop to keep animations silky smooth
          await new Promise((r) => setTimeout(r, 0));
        }

        // If single page document, pad with a clean back page so it renders as a complete 2-page book spread
        if (images.length === 1) {
          const blankCanvas = document.createElement('canvas');
          blankCanvas.width = canvas.width || 1000;
          blankCanvas.height = canvas.height || 1400;
          const ctx = blankCanvas.getContext('2d');
          ctx.fillStyle = '#fafafc';
          ctx.fillRect(0, 0, blankCanvas.width, blankCanvas.height);
          const blankBlobUrl = await canvasToBlobUrl(blankCanvas);
          images.push(blankBlobUrl);
        }

        // Save to cache for instant re-loads
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
      } catch (err) {
        console.warn('PDF.js loading issue:', err);
        // Fallback for Cloudinary generated images if URL format matches
        if (docUrl && docUrl.includes('cloudinary.com')) {
          const total = Math.max(2, book?.pageCount || 6);
          const images = [];
          for (let i = 1; i <= total; i++) {
            let pUrl = docUrl
              .replace('/raw/upload/', '/image/upload/')
              .replace(/\.pdf$/i, '.jpg');
            if (pUrl.includes('/upload/')) {
              pUrl = pUrl.replace('/upload/', `/upload/pg_${i}/`);
            }
            images.push(pUrl);
          }
          if (isMounted) {
            setPageImages(images);
            setTotalPages(total);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setLoadingError('Could not load flipbook pages. Switching to PDF view.');
            setLoading(false);
            setViewMode('pdf');
          }
        }
      }
    };

    extractPages();

    return () => {
      isMounted = false;
      if (pageFlipInstanceRef.current) {
        try {
          pageFlipInstanceRef.current.destroy();
        } catch (e) {}
        pageFlipInstanceRef.current = null;
      }
    };
  }, [book, docUrl]);

  // 2. Initialize PageFlip when images and container are ready
  useEffect(() => {
    if (loading || viewMode !== 'flip' || pageImages.length === 0 || !bookContainerRef.current) {
      return;
    }

    if (pageFlipInstanceRef.current) {
      try {
        pageFlipInstanceRef.current.destroy();
      } catch (e) {}
      pageFlipInstanceRef.current = null;
    }

    const container = bookContainerRef.current;
    container.innerHTML = '';

    try {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
      const pageFlip = new PageFlip(container, {
        width: 550, // width of 1 page -> 2-page spread = 1100px
        height: 780, // height of page
        size: 'stretch',
        minWidth: 280,
        maxWidth: 1400,
        minHeight: 380,
        maxHeight: 1600,
        maxShadowOpacity: 0.65,
        showCover: false, // Immediately display full 2-page open book spread
        mobileScrollSupport: false,
        usePortrait: isMobile,
        flippingTime: 600,
        startPage: currentPage,
        drawShadow: true,
        autoSize: true,
        useMouseEvents: true,
        swipeDistance: 30,
        showPageCorners: true,
      });

      pageFlip.loadFromImages(pageImages);

      pageFlip.on('flip', (e) => {
        setCurrentPage(e.data);
        setJumpPageInput(String(e.data + 1));
      });

      // Recalculate size to ensure the book fills available viewport smoothly
      const timer = setTimeout(() => {
        try {
          if (pageFlipInstanceRef.current) {
            pageFlipInstanceRef.current.update();
          }
        } catch (e) {}
      }, 100);

      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          try {
            if (pageFlipInstanceRef.current) {
              pageFlipInstanceRef.current.update();
            }
          } catch (e) {}
        }, 150);
      };

      window.addEventListener('resize', handleResize);
      pageFlipInstanceRef.current = pageFlip;

      return () => {
        clearTimeout(timer);
        clearTimeout(resizeTimeout);
        window.removeEventListener('resize', handleResize);
        if (pageFlipInstanceRef.current) {
          try {
            pageFlipInstanceRef.current.destroy();
          } catch (e) {}
          pageFlipInstanceRef.current = null;
        }
      };
    } catch (err) {
      console.error('PageFlip initialization error:', err);
    }
  }, [loading, viewMode, pageImages]);

  // Page Turn Handlers
  const turnNext = () => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.flipNext();
    }
  };

  const turnPrev = () => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.flipPrev();
    }
  };

  const turnToFirst = () => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.turnToPage(0);
    }
  };

  const turnToLast = () => {
    if (pageFlipInstanceRef.current && totalPages > 0) {
      pageFlipInstanceRef.current.turnToPage(totalPages - 1);
    }
  };

  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const pNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pNum) && pNum >= 1 && pNum <= totalPages) {
      if (pageFlipInstanceRef.current) {
        pageFlipInstanceRef.current.turnToPage(pNum - 1);
      }
    } else {
      setJumpPageInput(String(currentPage + 1));
    }
  };

  // Listen for browser fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(() => {
        try {
          if (pageFlipInstanceRef.current) {
            pageFlipInstanceRef.current.update();
          }
        } catch (e) {}
      }, 100);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) onClose();
      if (e.key === 'ArrowRight') turnNext();
      if (e.key === 'ArrowLeft') turnPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="tbm-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className={`tbm-modal-content ${isFullscreen ? 'fullscreen' : ''}`}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* ── Modal Header Bar ── */}
        <div className="tbm-modal-header">
          <div className="tbm-header-left">
            <h2 className="tbm-modal-title" title={book?.title}>{book?.title}</h2>
          </div>

          <div className="tbm-header-actions">
            {/* View Mode Switcher */}
            {docUrl && (
              <div className="tbm-mode-toggle">
                <button
                  className={`tbm-toggle-btn ${viewMode === 'flip' ? 'active' : ''}`}
                  onClick={() => setViewMode('flip')}
                  title="3D FlipBook View"
                >
                  <FaBookOpen /> <span>3D FlipBook</span>
                </button>
                <button
                  className={`tbm-toggle-btn ${viewMode === 'pdf' ? 'active' : ''}`}
                  onClick={() => setViewMode('pdf')}
                  title="Standard PDF View"
                >
                  <FaFilePdf /> <span>PDF View</span>
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            {viewMode === 'flip' && !loading && (
              <div className="tbm-zoom-pill">
                <button
                  onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))}
                  title="Zoom Out"
                >
                  <FaMagnifyingGlassMinus />
                </button>
                <button
                  className="tbm-zoom-value"
                  onClick={() => setZoom(0.8)}
                  title="Reset to 80% Default"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  onClick={() => setZoom((z) => Math.min(1.5, +(z + 0.1).toFixed(2)))}
                  title="Zoom In"
                >
                  <FaMagnifyingGlassPlus />
                </button>
              </div>
            )}

            {/* Fullscreen Button */}
            <button
              className="tbm-action-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>

            {/* Download Button */}
            {docUrl && (
              <a
                href={docUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="tbm-action-btn"
                title="Download Document"
              >
                <FaDownload />
              </a>
            )}

            {/* Open in New Tab */}
            {docUrl && (
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tbm-action-btn"
                title="Open PDF in new tab"
              >
                <FaArrowUpRightFromSquare />
              </a>
            )}

            {/* Close Button */}
            <button className="tbm-close-btn" onClick={onClose} title="Close Reader (Esc)">
              <FaXmark />
            </button>
          </div>
        </div>


        {/* ── Reader Main Area ── */}
        <div className="tbm-reader-body">
          {viewMode === 'pdf' ? (
            /* Direct PDF View */
            <div className="tbm-pdf-frame-wrapper">
              <iframe
                title={book?.title}
                src={docUrl}
                className="tbm-pdf-frame"
              />
            </div>
          ) : loading ? (
            /* Loading State with Progress percentage */
            <div className="tbm-loading-container">
              <div className="tbm-loader-spinner">
                <FaSpinner className="tbm-spin-icon" />
              </div>
              <h3>Preparing 3D FlipBook</h3>
              <p>Rendering book pages… {loadingProgress}%</p>
            </div>
          ) : (
            /* 3D Realistic Double Page Flip Stage */
            <div className="tbm-flip-stage">
              {totalPages > 0 ? (
                <>
                  <div className="tbm-book-scene" style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease' }}>
                    {/* Navigation Arrow Left */}
                    <motion.button
                      className="tbm-nav-arrow left"
                      onClick={turnPrev}
                      disabled={currentPage === 0}
                      whileHover={{ scale: 1.1, x: -3 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Previous Page"
                      title="Previous Page (←)"
                    >
                      <FaAngleLeft />
                    </motion.button>

                    {/* StPageFlip Interactive Container */}
                    <div className="tbm-stpageflip-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div ref={bookContainerRef} className="tbm-stpageflip-book" />
                    </div>

                    {/* Navigation Arrow Right */}
                    <motion.button
                      className="tbm-nav-arrow right"
                      onClick={turnNext}
                      disabled={currentPage >= totalPages - 1}
                      whileHover={{ scale: 1.1, x: 3 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Next Page"
                      title="Next Page (→)"
                    >
                      <FaAngleRight />
                    </motion.button>
                  </div>

                  {/* ── Bottom Controls Toolbar ── */}
                  <div className="tbm-controls-toolbar">
                    <button
                      className="tbm-ctrl-btn"
                      onClick={turnToFirst}
                      disabled={currentPage === 0}
                      title="First Page"
                      aria-label="First Page"
                    >
                      <FaAnglesLeft />
                    </button>

                    <button
                      className="tbm-ctrl-btn"
                      onClick={turnPrev}
                      disabled={currentPage === 0}
                      title="Previous Page (←)"
                      aria-label="Previous Page"
                    >
                      <FaAngleLeft />
                    </button>

                    {/* Page Jump Form */}
                    <form onSubmit={handleJumpSubmit} className="tbm-page-jump-form">
                      <span className="tbm-page-label">Page</span>
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={jumpPageInput}
                        onChange={(e) => setJumpPageInput(e.target.value)}
                        onBlur={handleJumpSubmit}
                        className="tbm-page-input"
                        title="Type page number and press Enter"
                      />
                      <span className="tbm-page-total">of {totalPages}</span>
                    </form>

                    <button
                      className="tbm-ctrl-btn"
                      onClick={turnNext}
                      disabled={currentPage >= totalPages - 1}
                      title="Next Page (→)"
                      aria-label="Next Page"
                    >
                      <FaAngleRight />
                    </button>

                    <button
                      className="tbm-ctrl-btn"
                      onClick={turnToLast}
                      disabled={currentPage >= totalPages - 1}
                      title="Last Page"
                      aria-label="Last Page"
                    >
                      <FaAnglesRight />
                    </button>
                  </div>
                </>
              ) : (
                /* Fallback if no pages */
                <div className="tbm-fallback-viewer">
                  <div className="tbm-fallback-card">
                    <FaFilePdf className="tbm-fallback-icon" />
                    <h3>{book?.title}</h3>
                    <p>{loadingError || 'Direct PDF reader is available.'}</p>
                    <div className="tbm-fallback-actions">
                      <button
                        className="tbm-btn primary"
                        onClick={() => setViewMode('pdf')}
                      >
                        <FaBookOpen /> Open PDF Reader
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipBookModal;
