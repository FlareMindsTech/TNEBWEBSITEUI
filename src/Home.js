import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { getAllCarouselImages, getAllEvents } from './api';
import LatestEvents from './components/LatestEvents';
import tnebeaLogo from './assets/icons/tnebea_logo_cropped2.png';
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
      logos: [tnebeaLogo],
      url: 'https://www.tnebltd.org/en/tneb/'
    },
    {
      id: 2,
      name: 'TNPDCL',
      logos: [tnpdcl],
      url: 'https://www.tnpdcl.org/en/tnpdcl/'
    },
    {
      id: 3,
      name: 'TANTRANSCO',
      logos: [tantransco],
      url: 'https://www.tantransco.org/en/tantransco/'
    },
    {
      id: 4,
      name: 'TNGECL',
      logos: [tngecl],
      url: 'https://www.tngecl.org/en/greenenergy/'
    },
    {
      id: 5,
      name: 'TNPGCL',
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
          alt: item.title || item.alt || "TNEB Event",
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
    const fetchLatestEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await getAllEvents();
        const rawEvents = Array.isArray(response) ? response : [];
        const normalized = rawEvents.map((item, index) => {
          const title = item.title || item.name || item.eventTitle || item.eventname || 'Untitled Event';
          const link = item.link || item.url || item.pdfUrl || item.fileUrl || item.documentUrl || '';
          const dateValue = item.createdAt || item.date || item.eventDate || item.updatedAt || null;
          const dateObj = dateValue ? new Date(dateValue) : new Date(0);
          const isNew = dateValue
            ? Date.now() - dateObj.getTime() <= 7 * 24 * 60 * 60 * 1000
            : false;

          return {
            id: item._id || item.id || `${title}-${index}`,
            title,
            link,
            isNew,
            date: dateObj
          };
        });

        const sorted = normalized
          .sort((a, b) => b.date - a.date)
          .slice(0, 10)
          .map(({ date, ...event }) => event);

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
          <div className="row">
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
                    <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
                      {carouselImages.map((image) => (
                        <Carousel.Item key={image.id}>
                          <img
                            className="d-block w-100 carousel-image"
                            src={image.src}
                            alt={image.alt}
                          />
                          {image.caption && (
                            <Carousel.Caption>
                              <p>{image.caption}</p>
                            </Carousel.Caption>
                          )}
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    {carouselImages[activeIndex]?.subtitle && (
                      <div key={activeIndex} className="carousel-subtitle-plate">
                        {carouselImages[activeIndex].subtitle}
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
        <div className="container-fluid">
          <h3 className="trusted-sites-title">Explore Our Trusted Websites</h3>
          <div className="trusted-sites-grid">
            {trustedWebsites.map((site) => {
              const currentLogoIndex = logoIndexBySite[site.id] || 0;
              const currentLogo = site.logos?.[currentLogoIndex];
              const hasLogo = Boolean(currentLogo);

              const cardContent = (
                <>
                  <span className="trusted-site-logo-wrap">
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
                  </span>
                  <span className="trusted-site-name">{site.name}</span>
                </>
              );

              if (site.url) {
                return (
                  <a
                    key={site.id}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="trusted-site-card"
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <button
                  key={site.id}
                  type="button"
                  className="trusted-site-card trusted-site-button"
                  onClick={site.onClick}
                >
                  {cardContent}
                </button>
              );
            })}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;