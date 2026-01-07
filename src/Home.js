// Home.js
import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaSearch, FaFilePdf, FaDownload, FaCalendar, FaBullhorn, FaExclamationTriangle, FaList, FaSmile } from 'react-icons/fa';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import carouselimage1 from './assets/1765821464_NationalEnergyConservationDay-2025_1.png';
import logo from './assets/tnebea_logo_cropped2.png';
import Navbar from './components/Navbar';
import carouselimage2 from './assets/1762262319_OS.jpg';
import carouselimage3 from './assets/1762262223_tr.jpg';
import carouselimage4 from './assets/1762262032_VP2.jpg';


const Home = () => {
  const [currentTime, setCurrentTime] = useState('');
  const marqueeRef = useRef(null);

  // Carousel images data
  const carouselImages = [
    {
      id: 1,
      src: carouselimage1,
      alt: "National Energy Conservation Day 2025",
      caption: null
    },
    {
      id: 2,
      src: carouselimage2,
      alt: "Swearing in - Organizing Secretary",
      caption: "Swearing in - Organizing Secretary"
    },
    {
      id: 3,
      src: carouselimage3,
      alt: "Swearing in - Treasurer",
      caption: "Swearing in - Treasurer"
    },
    {
      id: 4,
      src: carouselimage4,
      alt: "Swearing in - Vice President 2",
      caption: "Swearing in - Vice President 2"
    }
  ];

  // Latest Events Data
  const latestEvents = [
    {
      id: 1,
      day: "20",
      month: "Dec",
      title: "EA D 35 dt - 16.12.25 CMD MEET",
      link: "https://tnebeaengineers.in/uploads/notices/1765991527_EAD35dt-16.12.25CMDMEET.pdf",
      isNew: true
    },
    {
      id: 2,
      day: "20",
      month: "Dec",
      title: "EA D 34 work Allocation and staff pattern",
      link: "https://tnebeaengineers.in/uploads/notices/1765991634_EAD34workAllocationandstaffpattern.pdf",
      isNew: true
    },
    {
      id: 3,
      day: "20",
      month: "Dec",
      title: "EA D 31 dt 10.12.25 Extend the SLS benifits to the employees uniformly",
      link: "https://tnebeaengineers.in/uploads/notices/1765991771_EAD31dt10.12.25ExtendtheSLSbenifitstotheemployeesuniformly.pdf",
      isNew: true
    }
  ];

  // Important Notices Data
  const importantNotices = [
    {
      id: 1,
      title: "EA D 31 dt 10.12.25 Extend the SLS benifits to the employees uniformly",
      link: "uploads/notices/1765991771_EAD31dt10.12.25ExtendtheSLSbenifitstotheemployeesuniformly.pdf",
      date: "17 Dec 2025",
      size: "1,656.5 KB"
    },
    {
      id: 2,
      title: "EA D 34 work Allocation and staff pattern",
      link: "uploads/notices/1765991634_EAD34workAllocationandstaffpattern.pdf",
      date: "17 Dec 2025",
      size: "3,684.2 KB"
    },
    {
      id: 3,
      title: "EA D 35 dt - 16.12.25 CMD MEET",
      link: "uploads/notices/1765991527_EAD35dt-16.12.25CMDMEET.pdf",
      date: "17 Dec 2025",
      size: "1,379.7 KB"
    },
    {
      id: 4,
      title: "TNEBEA CEC/ EBF Election Result 2025-2027",
      link: "uploads/notices/1761625929_TNEBEAElectionResult2025.pdf",
      date: "28 Oct 2025",
      size: "2,854.3 KB"
    },
    {
      id: 5,
      title: "LM MASTER LIST",
      link: "uploads/notices/1758385146_LMMASTERLIST072025.pdf",
      date: "20 Sep 2025",
      size: "3,242.5 KB"
    }
  ];



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

  // Marquee effect for events (robust: uses mutable refs and cleans up listeners/clone)
  useEffect(() => {
    if (!marqueeRef.current) return;

    const content = marqueeRef.current;
    const container = content.parentNode;

    // Clone the content for continuous scrolling
    const clone = content.cloneNode(true);
    container.appendChild(clone);

    // mutable holders so event handlers can update values without re-declaring
    const state = { position: 0, speed: 0.5 };
    let animationId = null;

    const animate = () => {
      state.position -= state.speed;
      if (state.position <= -content.offsetHeight) {
        state.position = 0;
      }
      content.style.transform = `translateY(${state.position}px)`;
      clone.style.transform = `translateY(${state.position + content.offsetHeight}px)`;
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Pause on hover handlers
    const handleMouseEnter = () => { state.speed = 0; };
    const handleMouseLeave = () => { state.speed = 0.5; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup: stop animation, remove listeners and clone
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
      // reset transforms
      content.style.transform = '';
    };
  }, []);

  return (
    <div className="home-container">
      {/* Main Content Section */}
      <main className="main-content">
        <div className="container-fluid">
          <div className="row">
            {/* Left Side - Carousel (60%) */}
            <div className="col-lg-7 col-md-12">
              <div className="image-carousel-section" style={{objectFit:'cover'}}>
                <Carousel>
                  {carouselImages.map((image) => (
                    <Carousel.Item key={image.id}>
                      <img
                        className="d-block w-100 carousel-image"
                        src={image.src}
                        alt={image.alt}
                        style={{marginTop:'2%', objectFit:'contain'}}
                      />
                      {image.caption && (
                        <Carousel.Caption>
                          <p>{image.caption}</p>
                        </Carousel.Caption>
                      )}
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>

            {/* Right Side - Latest Events (40%) */}
            <div className="col-lg-5 col-md-12">
              <div className="latest-events-section">
                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">
                      <FaBullhorn className="mr-2" />
                      Latest Events / Updates
                    </h6>
                  </div>
                  <div className="card-body marquee-container">
                    <div ref={marqueeRef} className="marquee-content">
                      {latestEvents.map((event) => (
                        <div key={event.id} className="event-item">
                          <div className="event-date">
                            <div className="day">{event.day}</div>
                            <div className="month">{event.month}</div>
                          </div>
                          <div className="event-details">
                            <a href={event.link} target="_blank" rel="noopener noreferrer">
                              <span className="event-title">{event.title}</span>
                            </a>
                            {event.isNew && (
                              <span className="badge badge-success ml-2">New</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <a href="#" className="btn btn-outline-primary btn-sm">
                      More Updates
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notices Section */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:'10px'}}>
                  <FaExclamationTriangle className="mr-2" />
                  <h5 className="mb-0">
                    Important Notices
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {importantNotices.map((notice) => (
                      <div key={notice.id} className="col-md-6 col-lg-4 mb-3">
                        <div className="notice-item p-3 border rounded h-100">
                          <div className="d-flex align-items-start">
                            <div className="mr-3">
                              <FaFilePdf className="text-primary fa-2x" />
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">
                                <a 
                                  href={notice.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-decoration-none text-dark"
                                >
                                  {notice.title}
                                </a>
                              </h6>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                <small className="text-muted">
                                  <FaCalendar className="mr-1" />
                                  {notice.date}
                                </small>
                                <small className="text-muted">
                                  <FaDownload className="mr-1" />
                                  {notice.size}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <a href="#" className="btn btn-outline-primary btn-sm">
                      <FaList className="mr-1" />
                      View All Notices
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
};

export default Home;