import React from 'react';
import { Link } from 'react-router-dom';
import { FaSmile } from 'react-icons/fa';
import IPDSImage from '../assets/IPDS-1.gif';
import Cea from '../assets/cea.png';
import Mnre from '../assets/mnre_0.png';
import DigitalIndia from '../assets/digitalindia_0-1.png';
import Natportal from '../assets/natportal_0.png';
import PowerGrid from '../assets/powergrid_1.png';
import Pfcl from '../assets/pfcl.png';
import Minofpower from '../assets/minofpower_3.png';
import Mygov from '../assets/mygov_7.png';


const Footer = () => {
  // Footer slider images
  const footerImages = [
    { id: 1, src: Cea, alt: "CEA", link: "http://cea.nic.in/" },
    { id: 2, src: Mnre, alt: "MNRE", link: "https://mnre.gov.in/" },
    { id: 3, src: DigitalIndia, alt: "Digital India", link: "https://www.digitalindia.gov.in/" },
    { id: 4, src: IPDSImage, alt: "IPDS", link: "http://www.ipds.gov.in/" },
    { id: 5, src: Natportal, alt: "National Portal", link: "https://npp.gov.in/" },
    { id: 6, src: PowerGrid, alt: "Power Grid", link: "http://www.powergridindia.com/" },
    { id: 7, src: Pfcl, alt: "PFC", link: "https://www.pfcindia.com/" },
    { id: 8, src: Minofpower, alt: "Ministry of Power", link: "https://powermin.nic.in/" },
    { id: 9, src: Mygov, alt: "MyGov", link: "https://www.mygov.in/" }
  ];

  return (
    <footer className="footer-section">
      <div className="footer-slider">
        <div className="container">
          <div className="slider-circular">
            {[...footerImages, ...footerImages].map((img, index) => (
              <div key={index} className="slider-item">
                <a href={img.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="img-fluid footer-slider-img"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 text-left text-white">
              <FaSmile className="mr-1" />
              <span className="small">TNEBEA</span>
            </div>
            <div className="col-md-6 text-center">
              <span className="text-white">Copyright © TNEBEA 2025</span>
            </div>
            <div className="col-md-3 text-right footer-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
