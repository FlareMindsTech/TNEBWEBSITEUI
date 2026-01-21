import React, { useState, useEffect } from 'react';
import { FaUser, FaSearch, FaFilePdf, FaDownload, FaCalendar, FaBullhorn, FaExclamationTriangle, FaList, FaSmile, FaFileContract, FaFileAlt, FaBook, FaClipboardList, FaFileSignature } from 'react-icons/fa';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import carouselimage1 from './assets/1765821464_NationalEnergyConservationDay-2025_1.png';
import logo from './assets/tnebea_logo_cropped2.png';
import Navbar from './components/Navbar';
import LatestEvents from './components/LatestEvents';
import carouselimage2 from './assets/1762262319_OS.jpg';
import carouselimage3 from './assets/1762262223_tr.jpg';
import carouselimage4 from './assets/1762262032_VP2.jpg';


const Home = () => {
  const [currentTime, setCurrentTime] = useState('');

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
      size: "1,656.5 KB",
      icon: FaFileContract,
      color: "#2563eb",
      type: "Benefits"
    },
    {
      id: 2,
      title: "EA D 34 work Allocation and staff pattern",
      link: "uploads/notices/1765991634_EAD34workAllocationandstaffpattern.pdf",
      date: "17 Dec 2025",
      size: "3,684.2 KB",
      icon: FaFileAlt,
      color: "#7c3aed",
      type: "Allocation"
    },
    {
      id: 3,
      title: "EA D 35 dt - 16.12.25 CMD MEET",
      link: "uploads/notices/1765991527_EAD35dt-16.12.25CMDMEET.pdf",
      date: "17 Dec 2025",
      size: "1,379.7 KB",
      icon: FaFileSignature,
      color: "#059669",
      type: "Meeting"
    },
    {
      id: 4,
      title: "TNEBEA CEC/ EBF Election Result 2025-2027",
      link: "uploads/notices/1761625929_TNEBEAElectionResult2025.pdf",
      date: "28 Oct 2025",
      size: "2,854.3 KB",
      icon: FaBook,
      color: "#dc2626",
      type: "Results"
    },
    {
      id: 5,
      title: "LM MASTER LIST",
      link: "uploads/notices/1758385146_LMMASTERLIST072025.pdf",
      date: "20 Sep 2025",
      size: "3,242.5 KB",
      icon: FaClipboardList,
      color: "#ea580c",
      type: "List"
    }
  ];

  const handleViewAllNotices = () => {
    window.open('https://tnebeaengineers.in/uploads/notices/', '_blank', 'noopener,noreferrer');
  };

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

            {/* Right Side - Latest Events*/}
            <LatestEvents events={latestEvents} />
          </div>

          {/* Important Notices Section */}
          <div className="row mt-4">
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
          </div>
        </div>
      </main>


    </div>
  );
};

export default Home;