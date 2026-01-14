import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  useEffect(() => {
    if (window.Swiper) {
      const swiper = new window.Swiper(".swiperCarousel", {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 10,
        keyboard: {
          enabled: true,
        },
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        speed: 800,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        },
      });

      const slides = document.getElementsByClassName("swiper-slide");
      for (const slide of slides) {
        slide.addEventListener("click", () => {
          const { className } = slide;
          if (className.includes("swiper-slide-next")) {
            swiper.slideNext();
          } else if (className.includes("swiper-slide-prev")) {
            swiper.slidePrev();
          }
        });
      }

      return () => {
        if (swiper) swiper.destroy(true, true);
      };
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="col-lg-7 col-md-12 mb-3"
    >
      <div className="swiper-carousel-container">
        <div className="swiper swiperCarousel">
          <div className="swiper-wrapper">
            {images.map((image) => (
              <div key={image.id} className="swiper-slide">
                <div className="carousel-card">
                  <img className="carousel-avatar my-5" src={image.src} alt={image.alt} />
                  <svg className="quote-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="125px" height="125px">
                    <path d="M 16.482422 8.9921875 A 1.50015 1.50015 0 0 0 15.943359 9.1074219 C 15.943359 9.1074219 13.068414 10.279429 10.357422 13.464844 C 7.6464301 16.650259 5 21.927419 5 30 A 1.50015 1.50015 0 0 0 5.015625 30.21875 A 8.5 8.5 0 0 0 13.5 39 A 8.5 8.5 0 0 0 13.5 22 A 8.5 8.5 0 0 0 8.7089844 23.480469 C 9.5777265 19.777157 11.122152 17.196657 12.642578 15.410156 C 14.931586 12.720571 17.056641 11.892578 17.056641 11.892578 A 1.50015 1.50015 0 0 0 16.482422 8.9921875 z M 37.482422 8.9921875 A 1.50015 1.50015 0 0 0 36.943359 9.1074219 C 36.943359 9.1074219 34.068414 10.279429 31.357422 13.464844 C 28.64643 16.650259 26 21.927419 26 30 A 1.50015 1.50015 0 0 0 26.015625 30.21875 A 8.5 8.5 0 0 0 34.5 39 A 8.5 8.5 0 0 0 34.5 22 A 8.5 8.5 0 0 0 29.708984 23.480469 C 30.577727 19.777157 32.122152 17.196657 33.642578 15.410156 C 35.931586 12.720571 38.056641 11.892578 38.056641 11.892578 A 1.50015 1.50015 0 0 0 37.482422 8.9921875 z" />
                  </svg>
                  <div className="carousel-header mt-4">
                    <h1 className="carousel-title-text">{image.alt}</h1>
                  </div>
                  {image.caption && (
                    <div className="carousel-quote-container">
                      <p className="carousel-quote">{image.caption}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCarousel;
