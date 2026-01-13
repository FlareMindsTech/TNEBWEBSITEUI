import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import { FaPlus } from 'react-icons/fa'
import './ContactUs.css'

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [services, setServices] = useState([
    'Web Development',
    'SEO Optimization',
    'Social Media Marketing',
  ])
  const [newService, setNewService] = useState('')
  const [status, setStatus] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


  const onSubmit = (e) => {
    e.preventDefault()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.name.trim() || !form.email.trim() || !form.service.trim() || !form.message.trim()) {
      setStatus('Please fill in all fields.')
      return
    }
    if (!emailPattern.test(form.email)) {
      setStatus('Please enter a valid email address.')
      return
    }
    const templateParams = {
      name: form.name,
      email: form.email,
      service: form.service,
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
      <div className="container mx-auto px-6 py-16">



        <div className="contact-grid">

          {/* FORM SECTION */}
          <div className="contact-form-section">
            <form onSubmit={onSubmit} className="space-y-4">
              <h4 style={{float:'left', color: '#2563eb'}}>Name</h4>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
                className="form-input"
              />
              <h4 style={{float:'left', color: '#2563eb'}}>Email</h4>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Your email"
                className="form-input"
              />
              <h4 style={{float:'left', color: '#2563eb'}}>Type a Message</h4>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={onChange}
                rows={6}
                placeholder="Type Your message"
                className="form-textarea"
              />

              <button type="submit" className="btn" >
                <span className="btnText">Send Message</span>
                <div className="btnShine"></div>
              </button>

              {status && (
                <p className={`status-msg ${status.startsWith('✅') ? 'success' : 'error'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>
          <div className="contact-info-section">
            <h4>Address</h4>
            <p>144, Anna Salai, Chennai – 600 002. (Regn.No.217/94) (Recognised in G.O.No.854 dated 06.04.1946)</p>
            <p>GS TNEBEA</p>
            <p>+91 94897 74341</p>
            <p>tnebea@gmail.com</p>


            <div className="map-container" style={{ width: "100%", height: "300px", marginTop: "20px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1767466880327!6m8!1m7!1swyXhCUG8lD2rbTGSVGIdFw!2m2!1d13.06383379565387!2d80.26517472916669!3f310.9484141426706!4f-8.443127516870291!5f0.7820865974627469"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
