import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaBullhorn,
  FaFileAlt,
  FaBell,
  FaGavel,
  FaUsers,
  FaClipboardList
} from 'react-icons/fa';
import './LatestEvents.css';

const LatestEvents = ({ events = [], loading = false }) => {
  const scrollRef = useRef(null);
  const firstSetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const touchTimeoutRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || loading || !events || events.length === 0) return;

    let animationFrameId;
    let accumulatedScroll = container.scrollTop;

    const step = () => {
      if (!isHovered && container) {
        // Continuous smooth subpixel increment
        accumulatedScroll += 0.6;
        
        // Exact pixel height of one full set of items
        const firstSetHeight = firstSetRef.current ? firstSetRef.current.offsetHeight : container.scrollHeight / 2;
        
        if (firstSetHeight > 0 && accumulatedScroll >= firstSetHeight) {
          accumulatedScroll -= firstSetHeight;
        }
        
        container.scrollTop = accumulatedScroll;
      } else if (container) {
        // Sync position when user scrolls manually
        accumulatedScroll = container.scrollTop;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, [isHovered, events, loading]);

  const handleTouchStart = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollTop;
      }
      setIsHovered(false);
    }, 1200);
  };

  const getEventIcon = (title = '', index = 0) => {
    const lower = title.toLowerCase();
    if (lower.includes('court') || lower.includes('order') || lower.includes('legal') || lower.includes('madres') || lower.includes('judgment')) {
      return <FaGavel className="news-icon" />;
    }
    if (lower.includes('reminder') || lower.includes('urgent') || lower.includes('mandatory') || lower.includes('alert') || lower.includes('notice')) {
      return <FaBell className="news-icon" />;
    }
    if (lower.includes('engineers') || lower.includes('seniority') || lower.includes('committee') || lower.includes('council') || lower.includes('members') || lower.includes('association')) {
      return <FaUsers className="news-icon" />;
    }
    if (lower.includes('panel') || lower.includes('promotion') || lower.includes('list') || lower.includes('checklist')) {
      return <FaClipboardList className="news-icon" />;
    }

    const defaultIcons = [
      <FaClipboardList className="news-icon" />,
      <FaBell className="news-icon" />,
      <FaGavel className="news-icon" />,
      <FaUsers className="news-icon" />,
      <FaFileAlt className="news-icon" />
    ];
    return defaultIcons[index % defaultIcons.length];
  };

  const renderEventList = (items, prefix = 'main') => (
    items.map((event, index) => (
      <div key={`${prefix}-${event.id || index}-${index}`} className="carousel-event-item">
        {/* Left: Golden Timeline Connector Node */}
        <div className="timeline-connector-track">
          <span className="timeline-node-bead"></span>
          <span className="timeline-horizontal-stem"></span>
        </div>

        {/* News Card */}
        <div className="news-card-item">
          {/* Left: Circular Icon */}
          <div className="news-icon-circle">
            {getEventIcon(event.title, index)}
          </div>

          {/* Center: News Title & Badge */}
          <div className="news-content-box">
            <div className="news-title-row">
              {event.link ? (
                <a
                  href={event.link.startsWith('http') ? event.link : `https://tnebeaengineers.in/${event.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-title-link"
                >
                  {event.title}
                </a>
              ) : (
                <span className="news-title-text">{event.title}</span>
              )}
              {event.isNew && (
                <span className="news-badge-new">New</span>
              )}
            </div>
          </div>

          {/* Right: Calendar Date Card */}
          <div className="news-calendar-badge">
            <span className="calendar-binder-ring ring-left"></span>
            <span className="calendar-binder-ring ring-right"></span>
            <div className="calendar-header-bar">
              {event.monthYear}
            </div>
            <div className="calendar-day-number">
              {event.day}
            </div>
          </div>
        </div>
      </div>
    ))
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="col-lg-5 col-md-12 mb-3"
    >
      <div className="carousel-events-wrapper mt-3">
        {/* Header with Title */}
        <div className="carousel-events-header d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center gap-2">
            <FaBullhorn className="header-icon1" />
            <h6 className="mb-0">Latest News / Updates</h6>
          </div>
        </div>

        {/* Auto-scrolling Events Cards with Left Golden Timeline */}
        <div
          className="vertical-carousel-container"
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="vertical-carousel">
            {loading ? (
              <div className="carousel-event-item">
                <div className="timeline-connector-track">
                  <span className="timeline-node-bead"></span>
                  <span className="timeline-horizontal-stem"></span>
                </div>
                <div className="news-card-item">
                  <div className="news-icon-circle">
                    <FaFileAlt className="news-icon" />
                  </div>
                  <div className="news-content-box">
                    <span className="news-title-text">Loading updates...</span>
                  </div>
                </div>
              </div>
            ) : events.length === 0 ? (
              <div className="carousel-event-item">
                <div className="timeline-connector-track">
                  <span className="timeline-node-bead"></span>
                  <span className="timeline-horizontal-stem"></span>
                </div>
                <div className="news-card-item">
                  <div className="news-icon-circle">
                    <FaFileAlt className="news-icon" />
                  </div>
                  <div className="news-content-box">
                    <span className="news-title-text">No updates available</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Primary Set */}
                <div ref={firstSetRef} className="events-set-block">
                  {renderEventList(events, 'set1')}
                </div>
                {/* Seamless Duplicate Set for Infinite Scroll */}
                <div className="events-set-block" aria-hidden="true">
                  {renderEventList(events, 'set2')}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestEvents;
