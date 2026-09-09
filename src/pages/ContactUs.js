import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaBuilding } from 'react-icons/fa'
import './ContactUs.css'

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


  const onSubmit = (e) => {
    e.preventDefault()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('Please fill in all required fields.')
      return
    }
    if (!emailPattern.test(form.email)) {
      setStatus('Please enter a valid email address.')
      return
    }
    const templateParams = {
      name: form.name,
      email: form.email,
      service: form.service.trim() || 'General Inquiry',
      message: form.message,
    }
    emailjs
      .send('service_x2a3qgm', 'template_hr77rq9', templateParams, '0UmF7TCt7vOo0i_If')
      .then(
        () => {
          setStatus("✅ Message sent successfully! You'll hear from us soon.")
          setForm({ name: '', email: '', service: '', message: '' })
        },
        (error) => {
          console.error('EmailJS Error:', error)
          setStatus('❌ Something went wrong. Please try again later.')
        }
      )
  }
  return (
    <div className="contact-page">
      <div className="container mx-auto px-6 py-10">
        {/* Luxury Hero Banner */}
        <div className="contact-hero">
          <div className="contact-hero-ambient-glow"></div>
          <div className="contact-hero-content">
            <h1>
              <FaEnvelope className="me-2" style={{ verticalAlign: 'middle', fontSize: '0.85em', color: '#ffca38' }} />
              Contact <span className="title-highlight">Us</span>
            </h1>
            <div className="hero-divider"></div>
            <p className="contact-hero-tagline">We'd love to hear from you! Get in touch with us.</p>
          </div>
        </div>

        <div className="contact-grid">

          {/* FORM SECTION */}
          <div className="contact-form-section">
            <div className="form-header">
              <h3 className="form-section-title">Send us a Message</h3>
              <p className="form-section-subtitle">Have queries or need assistance? Fill out the form below and our team will get back to you promptly.</p>
              <div className="form-title-divider"></div>
            </div>

            <form onSubmit={onSubmit} className="contact-form-body">
              <div className="form-field">
                <label className="form-label" htmlFor="contact-name">
                  <span className="label-icon-wrap"><FaUser /></span>
                  <span>Full Name</span>
                </label>
                <input
                  id="contact-name"
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Enter your name"
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="contact-email">
                  <span className="label-icon-wrap"><FaEnvelope /></span>
                  <span>Email Address</span>
                </label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Enter your email address"
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="contact-service">
                  <span className="label-icon-wrap"><FaBuilding /></span>
                  <span>Subject / Purpose</span>
                </label>
                <input
                  id="contact-service"
                  type="text"
                  name="service"
                  value={form.service}
                  onChange={onChange}
                  placeholder="Enter subject or purpose"
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="contact-message">
                  <span className="label-icon-wrap"><FaCommentDots /></span>
                  <span>Your Message</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  placeholder="Write your message here..."
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <FaPaperPlane className="btn-icon" />
              </button>

              {status && (
                <div className={`status-msg-banner ${status.startsWith('✅') ? 'success' : 'error'}`}>
                  {status}
                </div>
              )}
            </form>
          </div>

          {/* CONTACT INFO SECTION */}
          <div className="contact-info-section">
            <div className="info-header-block">
              <h3 className="info-section-title">Contact Information</h3>
              <p className="info-section-subtitle">Official Headquarters &amp; Association Desk</p>
              <div className="info-title-divider"></div>
            </div>

            <div className="info-cards-list">
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <FaMapMarkerAlt className="contact-info-icon" />
                </div>
                <div className="info-content">
                  <span className="info-label">Headquarters Address</span>
                  <h5>144, Anna Salai, Chennai – 600 002.</h5>
                  <p className="info-subtext">(Regn. No. 217/94 | Recognised in G.O. No. 854 dt 06.04.1946)</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <FaBuilding className="contact-info-icon" />
                </div>
                <div className="info-content">
                  <span className="info-label">Organization</span>
                  <h5>General Secretary, TNEBEA</h5>
                  <p className="info-subtext">Tamil Nadu Electricity Board Engineers' Association</p>
                </div>
              </div>

              <div className="info-row-grid">
                <a href="tel:+919489774341" className="info-item info-link-card">
                  <div className="info-icon-wrapper">
                    <FaPhone className="contact-info-icon phone-flipped" />
                  </div>
                  <div className="info-content">
                    <span className="info-label">Phone Support</span>
                    <h5>+91 94897 74341</h5>
                  </div>
                </a>

                <a href="mailto:tnebea@gmail.com" className="info-item info-link-card">
                  <div className="info-icon-wrapper">
                    <FaEnvelope className="contact-info-icon" />
                  </div>
                  <div className="info-content">
                    <span className="info-label">Official Email</span>
                    <h5>tnebea@gmail.com</h5>
                  </div>
                </a>
              </div>
            </div>

            {/* Google Map Card */}
            <div className="map-container-wrap">
              <div className="map-badge-header">
                <FaMapMarkerAlt className="map-pin-icon" />
                <span>Locate Us on Google Maps</span>
              </div>
              <div className="map-frame-box">
                <iframe
                  title="TNEBEA Location Map"
                  src="https://www.google.com/maps/embed?pb=!4v1767466880327!6m8!1m7!1swyXhCUG8lD2rbTGSVGIdFw!2m2!1d13.06383379565387!2d80.26517472916669!3f310.9484141426706!4f-8.443127516870291!5f0.7820865974627469"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

        </div>

      </div>


      {/* Floating WhatsApp Button */}
      {/* <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          backgroundColor: '#25d366',
          color: '#FFF',
          borderRadius: '50px',
          textAlign: 'center',
          fontSize: '30px',
          boxShadow: '2px 2px 3px #999',
          zIndex: 100,
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <i className="fa fa-whatsapp"></i> 
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z" />
        </svg>
      </a> */}
    </div >
  )
}
