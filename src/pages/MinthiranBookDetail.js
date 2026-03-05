import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaAngleLeft,
  FaAngleRight,
  FaBookOpen,
  FaArrowLeft,
  FaMagnifyingGlassMinus,
  FaMagnifyingGlassPlus,
} from "react-icons/fa6";
import { getMinthiranById } from "../api";
import "./MinthiranBookDetail.css";

const MIN_ZOOM = 0.8;
const MAX_ZOOM = 2.4;
const ZOOM_STEP = 0.2;
const PAGE_TURN_DURATION = 1.1;

/* ─── Page-Turn Component ─── */
const PageTurn = ({ leavingImage, enteringImage, direction, onComplete }) => {
  const isForward = direction > 0;

  return (
    <motion.div className="page-turn-container" initial={false}>
      {/* Shadow that sweeps across */}
      <motion.div
        className="turn-shadow"
        initial={{
          opacity: 0,
          x: isForward ? "0%" : "100%",
          scaleX: isForward ? 1 : -1,
        }}
        animate={{
          opacity: [0, 0.18, 0],
          x: isForward ? ["0%", "50%", "100%"] : ["100%", "50%", "0%"],
        }}
        transition={{ duration: PAGE_TURN_DURATION, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* The turning page */}
      <motion.div
        className={`page-turn-sheet ${isForward ? "forward" : "backward"}`}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isForward ? -180 : 180 }}
        transition={{ duration: PAGE_TURN_DURATION, ease: [0.4, 0, 0.2, 1] }}
        onAnimationComplete={onComplete}
      >
        {/* Front face – the page leaving */}
        <div className="turn-face turn-front">
          <img src={leavingImage} alt="Turning page front" draggable={false} />
          <div className="turn-front-shadow" />
        </div>
        {/* Back face – the new page */}
        <div className="turn-face turn-back">
          <img
            src={enteringImage}
            alt="Turning page back"
            draggable={false}
            style={{ transform: "scaleX(-1)" }}
          />
          <div className="turn-back-shadow" />
        </div>
      </motion.div>

      {/* Curl at the fold */}
      <motion.div
        className={`page-curl ${isForward ? "forward" : "backward"}`}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
        transition={{ duration: PAGE_TURN_DURATION, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.div>
  );
};

/* ─── Corner Peel Hint ─── */
const CornerPeel = ({ side }) => (
  <motion.div
    className={`corner-peel ${side}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    whileHover={{ scale: 1.6 }}
    transition={{ duration: 0.25 }}
  />
);

const MinthiranBookDetail = () => {
  const { bookId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [book, setBook] = useState(state?.book || null);
  const [loading, setLoading] = useState(!state?.book);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Stores the "snapshot" for the turn animation
  const [turnState, setTurnState] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );
  const [showPageFlash, setShowPageFlash] = useState(false);

  const viewportRef = useRef(null);
  const pageStackRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  const pageImages = useMemo(() => book?.pdf?.pages || [], [book]);
  const pageCount = pageImages.length;
  const currentImage = pageImages[currentPage];
  const effectiveZoom = zoom;
  const touchDistanceRef = useRef(0);

  /* ── Clamp pan ── */
  const clampPan = useCallback(
    (nextX, nextY, nextZoom = zoom) => {
      const viewport = viewportRef.current;
      const pageStack = pageStackRef.current;
      if (!viewport || !pageStack || nextZoom <= 1) return { x: 0, y: 0 };
      const scaledWidth = pageStack.offsetWidth * nextZoom;
      const scaledHeight = pageStack.offsetHeight * nextZoom;
      const maxX = Math.max(0, (scaledWidth - viewport.clientWidth) / 2);
      const maxY = Math.max(0, (scaledHeight - viewport.clientHeight) / 2);
      return {
        x: Math.min(maxX, Math.max(-maxX, nextX)),
        y: Math.min(maxY, Math.max(-maxY, nextY)),
      };
    },
    [zoom],
  );

  /* ── Fetch ── */
  const fetchBook = useCallback(async () => {
    if (!bookId || state?.book) return;
    try {
      setLoading(true);
      setError("");
      const data = await getMinthiranById(bookId);
      setBook(data);
    } catch (err) {
      console.error("Error fetching Minthiran book:", err);
      setError("Unable to load this book right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [bookId, state?.book]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  /* ── Responsive ── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── Clear pan when zoom resets ── */
  useEffect(() => {
    if (zoom === 1) {
      setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  /* ── Page Turn Core ── */
  const turnToPage = useCallback(
    (nextPage) => {
      if (
        nextPage < 0 ||
        nextPage >= pageCount ||
        nextPage === currentPage ||
        isAnimating
      )
        return;
      const dir = nextPage > currentPage ? 1 : -1;
      setDirection(dir);
      setIsAnimating(true);
      setTurnState({
        leaving: pageImages[currentPage],
        entering: pageImages[nextPage],
        dir,
      });
      setCurrentPage(nextPage);
      setPan({ x: 0, y: 0 });
    },
    [currentPage, pageCount, isAnimating, pageImages],
  );

  const handleTurnComplete = useCallback(() => {
    setTurnState(null);
    setIsAnimating(false);
    setShowPageFlash(true);
    setTimeout(() => setShowPageFlash(false), 300);
  }, []);

  /* ── Zoom ── */
  const zoomIn = useCallback(() => {
    setZoom((prev) => {
      const next = Math.min(MAX_ZOOM, +(prev + ZOOM_STEP).toFixed(2));
      setPan((p) => clampPan(p.x, p.y, next));
      return next;
    });
  }, [clampPan]);

  const zoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(MIN_ZOOM, +(prev - ZOOM_STEP).toFixed(2));
      setPan((p) => clampPan(p.x, p.y, next));
      return next;
    });
  }, [clampPan]);

  const setZoomLevel = useCallback((newZoom) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
    setZoom(clamped);
    setPan((p) => clampPan(p.x, p.y, clamped));
  }, [clampPan]);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  /* ── Keyboard ── */
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "ArrowRight") turnToPage(currentPage + 1);
      if (e.key === "ArrowLeft") turnToPage(currentPage - 1);
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    },
    [currentPage, turnToPage, zoomIn, zoomOut],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  /* ── Mouse drag ── */
  const handleMouseDown = (e) => {
    if (effectiveZoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const handleMouseMove = (e) => {
    if (!isDragging || effectiveZoom <= 1) return;
    setPan(clampPan(e.clientX - dragStart.x, e.clientY - dragStart.y));
  };
  const stopDragging = () => setIsDragging(false);

  /* ── Pinch zoom for touch ── */
  const handleTouchStart = (e) => {
    if (!e.touches?.length) return;
    
    // Pinch zoom: two fingers
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(t2.clientX - t1.clientX, 2) + Math.pow(t2.clientY - t1.clientY, 2)
      );
      touchDistanceRef.current = distance;
      touchStartRef.current = { zoom };
      e.preventDefault();
    } else if (e.touches.length === 1) {
      // Single touch: prepare for swipe or drag
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY, time: Date.now(), zoom };
      if (effectiveZoom > 1) {
        setIsDragging(true);
        setDragStart({ x: t.clientX - pan.x, y: t.clientY - pan.y });
      }
    }
  };

  const handleTouchMove = (e) => {
    if (!e.touches?.length) return;
    
    // Pinch zoom
    if (e.touches.length === 2 && touchDistanceRef.current > 0) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(t2.clientX - t1.clientX, 2) + Math.pow(t2.clientY - t1.clientY, 2)
      );
      const scale = distance / touchDistanceRef.current;
      const newZoom = touchStartRef.current.zoom * scale;
      setZoomLevel(newZoom);
    } else if (e.touches.length === 1 && isDragging && effectiveZoom > 1) {
      // Single touch drag when zoomed
      e.preventDefault();
      const t = e.touches[0];
      setPan(clampPan(t.clientX - dragStart.x, t.clientY - dragStart.y));
    }
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches?.length) return;
    
    // If pinch zoom was active, reset the distance
    if (e.touches.length < 2) {
      touchDistanceRef.current = 0;
    }
    
    // Single touch swipe (only if not dragging while zoomed)
    if (e.touches.length === 0 && effectiveZoom <= 1) {
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartRef.current.x;
      const dy = t.clientY - touchStartRef.current.y;
      const elapsed = Date.now() - touchStartRef.current.time;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && elapsed < 900) {
        dx < 0 ? turnToPage(currentPage + 1) : turnToPage(currentPage - 1);
      }
    }
    
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
  };

  /* ─── Render: Loading ─── */
  if (loading)
    return (
      <div className="mbr-wrapper">
        <div className="mbr-loader">
          <div className="mbr-loader-book">
            <div className="loader-page p1" />
            <div className="loader-page p2" />
            <div className="loader-page p3" />
          </div>
          <p>Loading book…</p>
        </div>
      </div>
    );

  /* ─── Render: Error ─── */
  if (error || !book)
    return (
      <div className="mbr-wrapper">
        <div className="mbr-error-card">
          <FaBookOpen size={48} color="#b0c4de" />
          <h2>Book Not Available</h2>
          <p>{error || "This book could not be found."}</p>
          <button
            className="mbr-btn primary"
            onClick={() => navigate("/Minthiran")}
          >
            <FaArrowLeft /> Back to Minthiran
          </button>
        </div>
      </div>
    );

  const progressPct = pageCount > 1 ? (currentPage / (pageCount - 1)) * 100 : 0;

  return (
    <div className="mbr-wrapper">
      {/* ── Ambient background orbs ── */}
      <div className="mbr-ambient">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* ── Header ── */}
      <header className="mbr-header">
        <button
          className="mbr-btn ghost"
          onClick={() => navigate("/Minthiran")}
        >
          <FaArrowLeft /> <span>Back</span>
        </button>
        <div className="mbr-title">
          <span className="mbr-title-badge">e-Minthiran</span>
          <h1>
            {book.month} {book.year}
          </h1>
        </div>
        <div className="mbr-header-right">
          <div className="mbr-zoom-pill">
            <button
              onClick={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              title="Zoom out (-)"
            >
              <FaMagnifyingGlassMinus />
            </button>
            <button
              className="zoom-reset"
              onClick={resetZoom}
              disabled={zoom === 1}
              title="Reset zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              title="Zoom in (+)"
            >
              <FaMagnifyingGlassPlus />
            </button>
          </div>
        </div>
      </header>

      {pageCount > 0 ? (
        <>
          {/* ── Progress bar ── */}
          <div className="mbr-progress-track">
            <motion.div
              className="mbr-progress-fill"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <span className="mbr-progress-label">
              {currentPage + 1} / {pageCount}
            </span>
          </div>

          {/* ── Book Shell ── */}
          <div className="mbr-scene">
            {/* Left page edge lines */}
            <div className="mbr-spine-left">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="spine-line" />
              ))}
            </div>
            <div className="mbr-spine-right">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="spine-line" />
              ))}
            </div>

            <div className="mbr-book-body">
              {/* Left nav arrow */}
              <motion.button
                className="mbr-nav-arrow left"
                onClick={() => turnToPage(currentPage - 1)}
                disabled={currentPage === 0 || isAnimating}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous page"
              >
                <FaAngleLeft />
              </motion.button>

              {/* Book viewport */}
              <div
                ref={viewportRef}
                className={`mbr-viewport ${effectiveZoom > 1 ? "can-pan" : ""} ${isDragging ? "is-dragging" : ""}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="mbr-zoom-stage"
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${effectiveZoom})`,
                  }}
                >
                  <div ref={pageStackRef} className="mbr-page-stack">
                    {/* Stacked paper effect – pages beneath */}
                    <div className="paper-stack ps-3" />
                    <div className="paper-stack ps-2" />
                    <div className="paper-stack ps-1" />

                    {/* Base page */}
                    <motion.img
                      key={currentPage}
                      src={currentImage}
                      alt={`Page ${currentPage + 1}`}
                      className="mbr-page-img base-page"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      draggable={false}
                    />

                    {/* Page flash on turn complete */}
                    <AnimatePresence>
                      {showPageFlash && (
                        <motion.div
                          className="page-flash"
                          initial={{ opacity: 0.35 }}
                          animate={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Corner peel hints */}
                    {!isAnimating && currentPage < pageCount - 1 && (
                      <CornerPeel side="right" />
                    )}
                    {!isAnimating && currentPage > 0 && (
                      <CornerPeel side="left" />
                    )}

                    {/* Realistic page turn overlay */}
                    <AnimatePresence>
                      {turnState && (
                        <PageTurn
                          key={`turn-${currentPage}`}
                          leavingImage={turnState.leaving}
                          enteringImage={turnState.entering}
                          direction={turnState.dir}
                          onComplete={handleTurnComplete}
                        />
                      )}
                    </AnimatePresence>

                    {/* Inner spine shadow */}
                    <div className="mbr-inner-shadow" />
                  </div>
                </div>
              </div>

              {/* Right nav arrow */}
              <motion.button
                className="mbr-nav-arrow right"
                onClick={() => turnToPage(currentPage + 1)}
                disabled={currentPage === pageCount - 1 || isAnimating}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next page"
              >
                <FaAngleRight />
              </motion.button>
            </div>

            {/* Book base shadow */}
            <div className="mbr-book-shadow" />
          </div>

          {/* ── Controls bar ── */}
          <div className="mbr-controls">
            <button
              className="mbr-ctrl-btn"
              onClick={() => turnToPage(0)}
              disabled={currentPage === 0 || isAnimating}
              aria-label="First page"
              title="First page"
            >
              <FaAnglesLeft />
            </button>
            <button
              className="mbr-ctrl-btn"
              onClick={() => turnToPage(currentPage - 1)}
              disabled={currentPage === 0 || isAnimating}
              aria-label="Previous page"
              title="Previous"
            >
              <FaAngleLeft />
            </button>

            <div className="mbr-page-badge">
              <span className="page-num">{currentPage + 1}</span>
              <span className="page-sep">of</span>
              <span className="page-total">{pageCount}</span>
            </div>

            <button
              className="mbr-ctrl-btn"
              onClick={() => turnToPage(currentPage + 1)}
              disabled={currentPage === pageCount - 1 || isAnimating}
              aria-label="Next page"
              title="Next"
            >
              <FaAngleRight />
            </button>
            <button
              className="mbr-ctrl-btn"
              onClick={() => turnToPage(pageCount - 1)}
              disabled={currentPage === pageCount - 1 || isAnimating}
              aria-label="Last page"
              title="Last page"
            >
              <FaAnglesRight />
            </button>

            {isMobile && effectiveZoom === 1 && (
              <div className="mbr-swipe-hint">
                <span>Pinch to zoom • Swipe to turn pages</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="mbr-fallback">
          <p>Page preview is not available. Reading directly from PDF.</p>
          <iframe
            title="Minthiran PDF Reader"
            src={book?.pdf?.url}
            className="mbr-pdf-frame"
          />
        </div>
      )}
    </div>
  );
};

export default MinthiranBookDetail;
