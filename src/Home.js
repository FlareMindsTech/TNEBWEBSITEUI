import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { getAllCarouselImages, getAllEvents } from './api';
import LatestEvents from './components/LatestEvents';
import tnebeaLogo from './assets/icons/tneb_logo.png';
import tnpdcl from "./assets/icons/tnpdclelogo.png"
import tantransco from "./assets/icons/tantransco.png.png"
import tngecl from "./assets/icons/egelogo.png";
import tnpgcl from "./assets/icons/TNPGCL.jpeg"

// import VisitorCounter from './components/VisitorCounter';


const Home = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [carouselImages, setCarouselImages] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [latestEvents, setLatestEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [logoIndexBySite, setLogoIndexBySite] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const trustedWebsites = [
    {
      id: 1,
      name: 'TNEB',
      description: "Tamil Nadu Electricity Board Engineers' Association",
      accentColor: '#ffca38',
      logos: [tnebeaLogo],
      url: 'https://www.tnebltd.org/en/tneb/'
    },
    {
      id: 2,
      name: 'TNPDCL',
      description: 'Tamil Nadu Power Distribution Corporation Limited',
      accentColor: '#38bdf8',
      logos: [tnpdcl],
      url: 'https://www.tnpdcl.org/en/tnpdcl/'
    },
    {
      id: 3,
      name: 'TANTRANSCO',
      description: 'Tamil Nadu Transmission Corporation Limited',
      accentColor: '#f43f5e',
      logos: [tantransco],
      url: 'https://www.tantransco.org/en/tantransco/'
    },
    {
      id: 4,
      name: 'TNGECL',
      description: 'Tamil Nadu Generation and Distribution Corporation Limited',
      accentColor: '#10b981',
      logos: [tngecl],
      url: 'https://www.tngecl.org/en/greenenergy/'
    },
    {
      id: 5,
      name: 'TNPGCL',
      description: 'Tamil Nadu Power Generation Corporation Limited',
      accentColor: '#3b82f6',
      logos: [tnpgcl],
      url: 'https://www.tnpgcl.org/en/generation/'
    }
  ];

  const handleTrustedLogoError = (siteId, totalLogos) => {
    setLogoIndexBySite((prev) => {
      const currentIndex = prev[siteId] || 0;
      if (currentIndex >= totalLogos - 1) {
        return prev;
      }
      return { ...prev, [siteId]: currentIndex + 1 };
    });
  };

  // Fetch carousel images from API
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        setLoadingCarousel(true);
        const response = await getAllCarouselImages();

        // Transform API response to match component structure
        const transformedImages = response.map((item) => ({
          id: item._id,
          src: item.imageUrl, // Assuming backend returns imageUrl
          title: item.title || null,
          alt: item.title || item.alt || item.subtitle || "Carousel slide",
          caption: item.description || item.caption || null,
          subtitle: item.subtitle || null
        }));

        setCarouselImages(transformedImages);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
        // Fallback to empty array if API fails
        setCarouselImages([]);
      } finally {
        setLoadingCarousel(false);
      }
    };

    fetchCarouselImages();
  }, []);

  // Fetch latest events/news (show only newest 10)
  useEffect(() => {
    const MONTH_NAMES = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    const parseEventDate = (item) => {
      const title = item.title || item.name || '';
      const description = item.description || item.content || item.summary || '';
      const textToSearch = `${title} ${description}`;

      // 1. FIRST: Check if the title or description contains an explicit document date like "dt 13.05.2026", "dt 12.05.26", "13-05-2026", "13/05/2026"
      const dateRegexNumeric = /(?:dt\.?|dated|date)?\s*(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/i;
      const matchNumeric = textToSearch.match(dateRegexNumeric);

      if (matchNumeric) {
        const day = parseInt(matchNumeric[1], 10);
        const monthIndex = parseInt(matchNumeric[2], 10) - 1;
        let year = parseInt(matchNumeric[3], 10);
        if (year < 100) {
          year = year < 50 ? 2000 + year : 1900 + year;
        }

        if (monthIndex >= 0 && monthIndex < 12 && day > 0 && day <= 31 && year >= 1900 && year <= 2100) {
          return {
            day: day.toString(),
            month: MONTH_NAMES[monthIndex],
            year: year.toString(),
            monthYear: `${MONTH_NAMES[monthIndex]} ${year}`,
            dateObj: new Date(year, monthIndex, day)
          };
        }
      }

      // Check for named month dates like "13 May 2026", "12-Aug-2026"
      const dateRegexNamed = /(\d{1,2})[\s-]+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s-]+(\d{2,4})/i;
      const matchNamed = textToSearch.match(dateRegexNamed);
      if (matchNamed) {
        const day = parseInt(matchNamed[1], 10);
        const monthStr = matchNamed[2].toUpperCase().slice(0, 3);
        const monthIndex = MONTH_NAMES.indexOf(monthStr);
        let year = parseInt(matchNamed[3], 10);
        if (year < 100) year = year < 50 ? 2000 + year : 1900 + year;

        if (monthIndex >= 0 && day > 0 && day <= 31) {
          return {
            day: day.toString(),
            month: monthStr,
            year: year.toString(),
            monthYear: `${monthStr} ${year}`,
            dateObj: new Date(year, monthIndex, day)
          };
        }
      }

      // 2. SECOND: Check explicit backend date field from admin upload
      const rawDate = item.date || item.eventDate;
      if (rawDate) {
        if (typeof rawDate === 'string' && /^\d{4}-\d{2}-\d{2}/.test(rawDate)) {
          const cleanDate = rawDate.split('T')[0];
          const parts = cleanDate.split('-');
          const year = parseInt(parts[0], 10);
          const monthIndex = parseInt(parts[1], 10) - 1;
          const day = parseInt(parts[2], 10);

          if (!isNaN(year) && !isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12 && !isNaN(day)) {
            return {
              day: day.toString(),
              month: MONTH_NAMES[monthIndex],
              year: year.toString(),
              monthYear: `${MONTH_NAMES[monthIndex]} ${year}`,
              dateObj: new Date(year, monthIndex, day)
            };
          }
        }

        const parsed = new Date(rawDate);
        if (!isNaN(parsed.getTime())) {
          const day = parsed.getDate();
          const month = MONTH_NAMES[parsed.getMonth()];
          const year = parsed.getFullYear();
          return {
            day: day.toString(),
            month,
            year: year.toString(),
            monthYear: `${month} ${year}`,
            dateObj: parsed
          };
        }
      }

      // 3. THIRD: Use upload timestamp (createdAt / updatedAt)
      const uploadDate = item.createdAt || item.updatedAt;
      if (uploadDate) {
        const parsed = new Date(uploadDate);
        if (!isNaN(parsed.getTime())) {
          const day = parsed.getDate();
          const month = MONTH_NAMES[parsed.getMonth()];
          const year = parsed.getFullYear();
          return {
            day: day.toString(),
            month,
            year: year.toString(),
            monthYear: `${month} ${year}`,
            dateObj: parsed
          };
        }
      }

      const now = new Date();
      const day = now.getDate();
      const month = MONTH_NAMES[now.getMonth()];
      const year = now.getFullYear();
      return {
        day: day.toString(),
        month,
        year: year.toString(),
        monthYear: `${month} ${year}`,
        dateObj: now
      };
    };

    const fetchLatestEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await getAllEvents();
        const rawEvents = Array.isArray(response) ? response : [];
        const normalized = rawEvents.map((item, index) => {
          const title = item.title || item.name || item.eventTitle || item.eventname || 'Untitled Event';
          const description = item.description || item.content || item.summary || item.details || item.subtitle || '';
          const link = item.pdfUrl || item.link || item.url || item.fileUrl || item.documentUrl || '';

          const dateInfo = parseEventDate(item);

          const isNew = dateInfo.dateObj
            ? Math.abs(Date.now() - dateInfo.dateObj.getTime()) <= 30 * 24 * 60 * 60 * 1000 || item.isNew
            : item.isNew || false;

          return {
            id: item._id || item.id || `${title}-${index}`,
            title,
            description,
            link,
            isNew,
            day: dateInfo.day,
            monthYear: dateInfo.monthYear,
            dateObj: dateInfo.dateObj
          };
        });

        const sorted = normalized
          .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
          .slice(0, 10);

        setLatestEvents(sorted);
      } catch (error) {
        console.error('Error fetching latest events:', error);
        setLatestEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchLatestEvents();
  }, []);


  // Update current time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const day = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      setCurrentTime(`${day}, ${date}-${month}-${year}, ${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-container">
      {/* Main Content Section */}
      <main className="main-content">
        <div className="container-fluid">
          <div className="row g-3">
            {/* Left Side - Carousel */}
            <div className="col-lg-7 col-md-12">
              <div className="image-carousel-section">
                {loadingCarousel ? (
                  <div className="carousel-loading">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : carouselImages.length > 0 ? (
                  <>
                    <Carousel activeIndex={activeIndex} onSelect={handleSelect} className="premium-electric-carousel" touch={true}>
                      {carouselImages.map((image) => (
                        <Carousel.Item key={image.id}>
                          <div className="carousel-spotlight-stage">
                            {/* 1. Subtle enlarged blurred ambient layer */}
                            <img
                              className="carousel-stage-blur-bg"
                              src={image.src}
                              alt=""
                              aria-hidden="true"
                            />

                            {/* 2. Deep navy gradient overlay */}
                            <div className="carousel-stage-gradient-overlay"></div>

                            {/* 3. Center Spotlight Glow */}
                            <div className="carousel-center-spotlight"></div>

                            {/* 6. Centered Hero Portrait / Landscape Image */}
                            <div className="carousel-hero-frame">
                              <img
                                className="carousel-hero-image"
                                src={image.src}
                                alt={image.alt}
                              />
                            </div>
                          </div>

                          {image.caption && (
                            <Carousel.Caption>
                              <p>{image.caption}</p>
                            </Carousel.Caption>
                          )}
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    {/* Premium Bottom Caption Section */}
                    {(carouselImages[activeIndex]?.subtitle || carouselImages[activeIndex]?.title) && (
                      <div key={activeIndex} className="carousel-bottom-plate">
                        {carouselImages[activeIndex]?.subtitle ? (
                          <>
                            <div className="carousel-plate-title">
                              {carouselImages[activeIndex].subtitle}
                            </div>
                            {carouselImages[activeIndex]?.title && carouselImages[activeIndex].title !== carouselImages[activeIndex].subtitle && (
                              <div className="carousel-plate-subtitle">
                                {carouselImages[activeIndex].title}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="carousel-plate-title">
                            {carouselImages[activeIndex].title}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="carousel-no-data">
                    <p>No carousel images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Latest Events*/}
            <LatestEvents events={latestEvents} loading={loadingEvents} />
          </div>

          {/* Visitor Counter Section */}
          {/* <div className="row mt-4">
            <div className="col-12">
              <div className="visitor-counter-section">
                <VisitorCounter />
              </div>
            </div>
          </div> */}

          {/* Important Notices Section */}
          {/* <div className="row mt-4">
            <div className="col-12">
              <div className="card shadow-sm important-notices-card">
                <div className="card-header important-notices-header text-white" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:'10px'}}>
                  <FaExclamationTriangle className="mr-2" />
                  <h5 className="mb-0">
                    Important Notices
                  </h5>
                </div>
                <div className="card-body important-notices-body">
                  <div className="notices-grid">
                    {importantNotices.map((notice, index) => {
                      const IconComponent = notice.icon;
                      return (
                        <div key={notice.id} className="notice-card-wrapper" style={{'--card-index': index}}>
                          <div className="notice-card" style={{'--notice-color': notice.color}}>
                            <div className="notice-card-glow"></div>
                            <div className="notice-card-header">
                              <div className="notice-icon-wrapper" style={{background: `linear-gradient(135deg, ${notice.color}, ${notice.color}dd)`}}>
                                <IconComponent className="notice-icon" />
                              </div>
                              <span className="notice-type-badge" style={{background: `${notice.color}20`, color: notice.color}}>
                                {notice.type}
                              </span>
                            </div>
                            <div className="notice-card-body">
                              <h6 className="notice-card-title">
                                <a 
                                  href={notice.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="notice-link"
                                >
                                  {notice.title}
                                </a>
                              </h6>
                            </div>
                            <div className="notice-card-footer">
                              <div className="notice-meta-item">
                                <FaCalendar className="notice-meta-icon" />
                                <span>{notice.date}</span>
                              </div>
                              <div className="notice-meta-item">
                                <FaDownload className="notice-meta-icon" />
                                <span>{notice.size}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center mt-3">
                    <button type="button" className="btn-view-notices" onClick={handleViewAllNotices}>
                      <FaList className="mr-1" />
                      View All Notices
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </main>

      <section className="trusted-sites-section">
        <div className="container-fluid trusted-sites-container">
          <div className="trusted-header-wrap text-center">
            <div className="trusted-network-badge">
              <span className="trusted-badge-line"></span>
              <span className="trusted-badge-text">Our Network</span>
              <span className="trusted-badge-line"></span>
            </div>
            <h2 className="trusted-sites-title">Explore Our Trusted Websites</h2>
            <p className="trusted-sites-subtitle">
              Discover our group of official websites delivering power, progress and transparency.
            </p>
            <div className="trusted-ornament-divider">
              <span className="ornament-line"></span>
              <span className="ornament-diamond">◇</span>
              <span className="ornament-line"></span>
            </div>
          </div>

          <div className="trusted-sites-grid">
            {trustedWebsites.map((site) => {
              const currentLogoIndex = logoIndexBySite[site.id] || 0;
              const currentLogo = site.logos?.[currentLogoIndex];
              const hasLogo = Boolean(currentLogo);

              return (
                <a
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`trusted-site-card trusted-card-${site.id}`}
                >
                  {/* Subtle Electric Wave Background Canvas */}
                  <div className="trusted-card-bg-waves" aria-hidden="true">
                    {site.id === 1 && (
                      <svg viewBox="0 0 200 260" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-20,60 Q50,15 100,85 T220,65" stroke="rgba(147, 197, 253, 0.35)" strokeWidth="1.6" fill="none" />
                        <path d="M-20,95 Q60,140 120,55 T220,95" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1.2" fill="none" />
                        <path d="M-20,135 Q70,90 130,150 T220,135" stroke="rgba(147, 197, 253, 0.22)" strokeWidth="1" fill="none" />
                        <path d="M-20,170 Q40,210 110,145 T220,180" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
                      </svg>
                    )}
                    {site.id === 2 && (
                      <svg viewBox="0 0 200 260" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-20,80 Q40,30 110,100 T220,80" stroke="rgba(125, 211, 252, 0.35)" strokeWidth="1.6" fill="none" />
                        <path d="M-20,125 Q60,170 120,70 T220,125" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1.2" fill="none" />
                        <path d="M-20,165 Q70,110 130,180 T220,165" stroke="rgba(125, 211, 252, 0.2)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                      </svg>
                    )}
                    {site.id === 3 && (
                      <svg viewBox="0 0 200 260" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-20,70 Q50,20 100,90 T220,70" stroke="rgba(165, 180, 252, 0.3)" strokeWidth="1.5" fill="none" />
                        <path d="M-20,115 Q60,155 120,60 T220,115" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" fill="none" />
                        <path d="M-20,155 Q70,105 130,170 T220,150" stroke="rgba(165, 180, 252, 0.2)" strokeWidth="1" strokeDasharray="4 3" fill="none" />
                      </svg>
                    )}
                    {site.id === 4 && (
                      <svg viewBox="0 0 200 260" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-20,65 Q50,20 110,85 T220,65" stroke="rgba(94, 234, 212, 0.3)" strokeWidth="1.5" fill="none" />
                        <path d="M-20,110 Q60,150 120,60 T220,110" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" fill="none" />
                        <path d="M-20,155 Q70,100 130,165 T220,150" stroke="rgba(94, 234, 212, 0.2)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                      </svg>
                    )}
                    {site.id === 5 && (
                      <svg viewBox="0 0 200 260" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-20,70 Q40,25 100,95 T220,70" stroke="rgba(147, 197, 253, 0.35)" strokeWidth="1.6" fill="none" />
                        <path d="M-20,120 Q60,165 120,65 T220,120" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1.2" fill="none" />
                        <path d="M-20,165 Q70,110 130,175 T220,160" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                      </svg>
                    )}
                  </div>

                  {/* Top White Circular Logo Container */}
                  <div className="trusted-site-logo-wrap">
                    {hasLogo ? (
                      <img
                        src={currentLogo}
                        alt={site.name}
                        className="trusted-site-logo"
                        onError={() => handleTrustedLogoError(site.id, site.logos.length)}
                      />
                    ) : (
                      <span className="trusted-site-initial">{site.name.charAt(0)}</span>
                    )}
                  </div>

                  {/* Entity Text Content */}
                  <div className="trusted-site-text-wrap">
                    <h3 className="trusted-site-name">{site.name}</h3>
                    <p className="trusted-site-desc">{site.description}</p>
                  </div>

                  {/* Accent Dash Line */}
                  <div className="trusted-site-dash" style={{ backgroundColor: site.accentColor }}></div>

                  {/* Circular Blue Arrow Button */}
                  <div className="trusted-site-arrow-btn" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;