import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBullhorn, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './LatestEvents.css';

const LatestEvents = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  // Convert events to date map
  const getEventsByDate = () => {
    const eventMap = {};
    events.forEach(event => {
      const monthMap = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      const month = monthMap[event.month];
      const day = parseInt(event.day);
      const year = currentDate.getFullYear();
      const dateKey = `${year}-${month}-${day}`;
      
      if (!eventMap[dateKey]) {
        eventMap[dateKey] = [];
      }
      eventMap[dateKey].push(event);
    });
    return eventMap;
  };

  const eventsByDate = getEventsByDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dateKey = `${year}-${month}-${day}`;
    
    if (eventsByDate[dateKey]) {
      const eventsForDate = eventsByDate[dateKey];
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      
      // Create HTML content for SweetAlert
      const eventListHtml = eventsForDate.map((event, index) => `
        <div style="
          display: flex;
          align-items: flex-start;
          padding: 15px;
          margin-bottom: ${index < eventsForDate.length - 1 ? '12px' : '0'};
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 8px;
          border-left: 4px solid #15458a;
          text-align: left;
        ">
          <div style="
            background: linear-gradient(135deg, #15458a 0%, #2a6cc7 100%);
            color: white;
            padding: 10px;
            border-radius: 8px;
            min-width: 50px;
            text-align: center;
            margin-right: 15px;
            box-shadow: 0 2px 8px rgba(21, 69, 138, 0.3);
          ">
            <div style="font-size: 20px; font-weight: bold; line-height: 1;">${event.day}</div>
            <div style="font-size: 12px; margin-top: 2px;">${event.month}</div>
          </div>
          <div style="flex: 1;">
            <a href="${event.link}" target="_blank" rel="noopener noreferrer" style="
              color: #15458a;
              text-decoration: none;
              font-weight: 600;
              font-size: 14px;
              line-height: 1.4;
              display: block;
              margin-bottom: 5px;
            ">
              ${event.title}
            </a>
            ${event.isNew ? '<span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">New</span>' : ''}
          </div>
        </div>
      `).join('');

      Swal.fire({
        title: `<strong style="color: #15458a;">Events on ${monthNames[month]} ${day}, ${year}</strong>`,
        html: `<div style="max-height: 400px; overflow-y: auto; padding: 10px;">${eventListHtml}</div>`,
        icon: 'info',
        confirmButtonText: 'Close',
        confirmButtonColor: '#15458a',
        width: '600px',
        customClass: {
          popup: 'event-swal-popup',
          title: 'event-swal-title',
          htmlContainer: 'event-swal-content'
        }
      });
    }
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
          <h6> Latest Events / Updates</h6>
        </div>
        
        {/* Calendar Section */}
        <div className="calendar-container">
          <div className="calendar-header">
            <button onClick={handlePrevMonth} className="calendar-nav-btn">
              <FaChevronLeft />
            </button>
            <h5 className="calendar-month-year">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h5>
            <button onClick={handleNextMonth} className="calendar-nav-btn">
              <FaChevronRight />
            </button>
          </div>

          <div className="calendar-grid">
            {/* Day names */}
            {dayNames.map((day) => (
              <div key={day} className="calendar-day-name">
                {day}
              </div>
            ))}

            {/*  days before month starts */}
            {[...Array(startingDayOfWeek)].map((_, index) => (
              <div key={`empty-${index}`} className="calendar-day empty"></div>
            ))}

            {/* Days of the month */}
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const month = currentDate.getMonth();
              const year = currentDate.getFullYear();
              const dateKey = `${year}-${month}-${day}`;
              const hasEvent = eventsByDate[dateKey];
              const isToday = new Date().getDate() === day && 
                             new Date().getMonth() === month && 
                             new Date().getFullYear() === year;

              return (
                <div
                  key={day}
                  className={`calendar-day ${hasEvent ? 'has-event' : ''} ${isToday ? 'today' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  <span className="day-number">{day}</span>
                  {hasEvent && <span className="event-dot"></span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrolling Events List */}
        {/* <div className="vertical-carousel-container">
          <div className="vertical-carousel">
            {events.map((event) => (
              <div key={event.id} className="carousel-event-item">
                <div className="event-date-circle">
                  <span className="event-date-day">{event.day}</span>
                  <span className="event-date-month">{event.month}</span>
                </div>
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
        </div> */}
{/* 
        <div className="carousel-footer">
          <a href="#" className="btn-more-updates">
            More Updates
          </a>
        </div> */}
      </div>
    </motion.div>
  );
};

export default LatestEvents;
