import React from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHotel, FaBed, FaPhone, FaMapMarkerAlt, FaSnowflake, FaUsers, FaFileAlt } from 'react-icons/fa';
import './Minnagam.css';

const RoomCard = ({ room, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="room-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(27, 91, 175, 0.3)" }}
    >
      <div className="room-icon-wrapper">
        {room.icon}
      </div>
      <h3 className="room-title">{room.title}</h3>
      <p className="room-description">{room.description}</p>
      <div className="room-price">
        <span className="price-amount">₹{room.price}</span>
        <span className="price-period">{room.period}</span>
      </div>
      {room.monthlyPrice && (
        <div className="room-monthly">
          <span>Monthly: ₹{room.monthlyPrice}</span>
        </div>
      )}
      <div className="room-features">
        {room.features.map((feature, idx) => (
          <span key={idx} className="feature-tag">{feature}</span>
        ))}
      </div>
    </motion.div>
  );
};

const ContactCard = ({ contact, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="contact-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <FaPhone className="contact-icon" />
      <h4 className="contact-role">{contact.role}</h4>
      <p className="contact-name">{contact.name}</p>
      <a href={`tel:${contact.phone}`} className="contact-phone">{contact.phone}</a>
    </motion.div>
  );
};

const Minnagam = () => {
  const rooms = [
    {
      title: "AC Rooms",
      description: "Deluxe air-conditioned rooms with double bed",
      price: "400",
      period: "/ Day",
      icon: <FaSnowflake />,
      features: ["Double Bed", "Air Conditioning", "Daily Cleaning"]
    },
    {
      title: "Non-AC Deluxe Rooms",
      description: "Comfortable rooms with modern amenities",
      price: "250",
      period: "/ Day",
      icon: <FaBed />,
      features: ["Double Bed", "Spacious", "Well Ventilated"]
    },
    {
      title: "Dormitory",
      description: "Budget-friendly shared accommodation",
      price: "75",
      period: "/ Day",
      monthlyPrice: "1,500",
      icon: <FaUsers />,
      features: ["16 Units", "Monthly Option", "Affordable"]
    }
  ];

  const contacts = [
    {
      role: "Care Taker",
      name: "Sekar",
      phone: "9042183530"
    },
    {
      role: "Secretary (Minnagam)",
      name: "Er. S. SENTHIL",
      phone: "9894812568"
    }
  ];

  return (
    <div className="minnagam-container">
      <motion.div
        className="minnagam-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="hero-content"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <FaHotel className="hero-icon" />
          <h1 className="hero-title">MINNAGAM</h1>
          <div className="hero-subtitle">
            <FaMapMarkerAlt className="location-icon" />
            <span>APR Mansion, Royapettah High Road, Chennai</span>
          </div>
          <p className="hero-description">Residential Accommodation for Engineers</p>
          <div className="hero-badge">Information Only</div>
        </motion.div>
      </motion.div>

      <div className="minnagam-content">
        <motion.div
          className="facilities-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="section-title">Available Facilities</h2>
          <p className="section-subtitle">Two AC Rooms, Four Non-AC Deluxe Rooms and 16 Dormitories Available</p>
        </motion.div>

        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} index={index} />
          ))}
        </div>

        <motion.div
          className="contact-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2 className="section-title">Contact Information</h2>
          <p className="section-subtitle">For bookings and inquiries, please reach out to</p>
        </motion.div>

        <div className="contacts-grid">
          {contacts.map((contact, index) => (
            <ContactCard key={index} contact={contact} index={index} />
          ))}
        </div>

        <motion.div
          className="proposal-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <FaFileAlt className="proposal-icon" />
          <h3>Future Development</h3>
          <p>Learn about our upcoming multipurpose complex project</p>
          <motion.a
            href="https://tnebeaengineers.in/wp-content/uploads/2024/05/CONSTRUCTION-OF-MULTIPURPOSE-COMPLEX-AT-MINNAGAM-CHENNAI-PROPOSAL.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="proposal-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Construction Proposal
          </motion.a>
        </motion.div>

        <motion.div
          className="welcome-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p>Have a Pleasant Stay at Minnagam!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Minnagam;
