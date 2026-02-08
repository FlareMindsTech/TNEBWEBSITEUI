import React from 'react';
import { motion } from 'framer-motion';
import { FaBullhorn } from 'react-icons/fa';
import './LatestEvents.css';

const LatestEvents = ({ events }) => {

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="col-lg-5 col-md-12 mb-3"
    >
      <div className="carousel-events-wrapper mt-3">
        <div className="carousel-events-header">
          <FaBullhorn className="header-icon1" />
          <h6> Latest News / Updates</h6>
        </div>
        
        {/* Auto-scrolling Events Cards */}
        <div className="vertical-carousel-container">
          <div className="vertical-carousel">
            {events.concat(events).map((event, index) => (
              <div key={`${event.id}-${index}`} className="carousel-event-item">
                {/* <div className="event-date-circle">
                  <span className="event-date-day">{event.day}</span>
                  <span className="event-date-month">{event.month}</span>
                </div> */}
                <div className="event-info-box">
                  <div className="event-info-content">
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="event-info-title">
                      {event.title}
                    </a>
                    {event.isNew && (
                      <span className="badge-new">New</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestEvents;
