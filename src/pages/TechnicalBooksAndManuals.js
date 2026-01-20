import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';
import './TechnicalBooksAndManuals.css';

const BookCard = ({ book, index }) => {
  return (
    <motion.div
      className="book-spine"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
    >
      <motion.div
        className="book-item"
        whileHover={{ scale: 1.15, rotateX: 15 }}
        transition={{ type: 'spring', stiffness: 250, damping: 15 }}
      >
        <div className="book-cover" style={{ backgroundColor: book.color }}>
          <div className="book-shine" />
          <div className="book-content">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-category">{book.category}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TechnicalBooksAndManuals = () => {
  const books = [
    {
      id: 1,
      title: 'Beginning Vibration Analysis',
      category: 'Vibration',
      color: '#FF6B6B',
      description: 'Essential guide to vibration monitoring and analysis techniques for power systems.',
      href: '/documents/01-Beginning-Vibration-Analysis.pdf'
    },
    {
      id: 2,
      title: 'Reference Standards for Vibration Monitoring',
      category: 'Standards',
      color: '#4ECDC4',
      description: 'Comprehensive standards and guidelines for vibration monitoring and analysis procedures.',
      href: '/documents/02-Reference-Standards-for-Vibration-Monitoring-and-Analysis.pdf'
    }
  ];

  return (
    <div className="books-container">
      <motion.div
        className="books-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FaBookOpen className="books-header-icon" />
        <h1>Technical Library</h1>
        <p>Explore our collection of technical manuals and guides</p>
      </motion.div>

      <div className="books-shelf">
        <div className="shelf-wood" />
        <motion.div
          className="books-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="books-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="stat-item">
          <div className="stat-number">{books.length}</div>
          <div className="stat-label">Books Available</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-number">{books.length}</div>
          <div className="stat-label">Categories</div>
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalBooksAndManuals;
