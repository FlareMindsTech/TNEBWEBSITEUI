import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf, FaDownload, FaCalendar, FaExclamationTriangle, FaList } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import carouselimage1 from './assets/1765821464_NationalEnergyConservationDay-2025_1.png';
import carouselimage2 from './assets/1762262319_OS.jpg';
import carouselimage3 from './assets/1762262223_tr.jpg';
import carouselimage4 from './assets/1762262032_VP2.jpg';
import ImageCarousel from './components/ImageCarousel';
import LatestEvents from './components/LatestEvents';


const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Carousel images data
  const carouselImages = [
    {
      id: 1,
      src: carouselimage1,
      alt: "National Energy Conservation Day 2025",
      caption: "National Energy Conservation Day 2025"
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

  return (
    <div className="home-container">
      {/* Main Content Section */}
      <main className="main-content">
        <div className="container-fluid">
          <div className="row">
            {/* Left Side - Swiper Carousel */}
            <ImageCarousel images={carouselImages} />

            {/* Right Side - Latest Events */}
            <LatestEvents events={latestEvents} />
          </div>

          {/* Important Notices Section */}
          <motion.div
            className="row mt-4 important-notices-wrapper"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="col-12">
              <div className="card shadow-sm important-notices-card">
                <div className="card-header bg-primary text-white" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <FaExclamationTriangle className="mr-2" />
                  <h5 className="mb-0">
                    Important Notices
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <AnimatePresence>
                      {importantNotices.map((notice) => (
                        <motion.div
                          key={notice.id}
                          variants={itemVariants}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          className="col-md-6 col-lg-4 mb-3"
                        >
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
                        </motion.div>
                      ))}
                    </AnimatePresence>
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
          </motion.div>
        </div>
      </main>


    </div>
  );
};

export default Home;