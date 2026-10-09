import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaBookmark, FaFilePdf } from 'react-icons/fa6';
import { getAllTechnicalBooks } from '../api';
import FlipBookModal from '../components/FlipBookModal';
import './TechnicalBooksAndManuals.css';

// Exact Hero Banner Theme for 3D Books
const HERO_BOOK_THEME = {
  bg: 'radial-gradient(ellipse at 50% 20%, #1b5baf 0%, #061c3d 85%, #030e20 100%)',
  spine: '#030e20',
  accent: '#ffca38',
  border: 'rgba(255, 202, 56, 0.45)',
};

/* ─── Main Technical Books and Manuals Component ─── */
const TechnicalBooksAndManuals = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllTechnicalBooks();
        if (Array.isArray(data)) {
          const formatted = data.map((book, index) => {
            let cat = 'TECHNICAL MANUAL';
            if (Array.isArray(book.tags) && book.tags.length > 0) {
              cat = book.tags[0];
            } else if (book.tag) {
              cat = book.tag.split(',')[0].trim();
            } else if (book.category) {
              cat = book.category;
            }

            return {
              id: book._id || book.id || index + 1,
              title: book.title,
              category: cat.toUpperCase(),
              tags: book.tags || (book.tag ? [book.tag] : []),
              theme: HERO_BOOK_THEME,
              description: book.description || '',
              docUrl: book.docUrl || book.href || null,
              href: book.docUrl || book.href || '#',
              pages: Array.isArray(book.pages) ? book.pages : [],
              pageCount: book.pageCount || (Array.isArray(book.pages) ? book.pages.length : null),
            };
          });
          setBooks(formatted);
        }
      } catch (err) {
        console.error('Error fetching technical books from backend:', err);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const categoryCount = new Set(books.map((b) => (b.category || '').toLowerCase()).filter(Boolean)).size || books.length;

  return (
    <div className="books-container">
      {/* Hero Banner */}
      <div className="books-hero">
        <div className="books-hero-ambient-glow"></div>
        <div className="books-hero-content">
          <h1>
            <FaBookOpen className="books-header-icon" /> Technical <span className="title-highlight">Library</span>
          </h1>
          <div className="hero-divider"></div>
          <p className="books-hero-tagline">Explore our collection of technical manuals and engineering references</p>
        </div>
      </div>

      {/* 3D Showcase Bookshelf */}
      <div className="books-shelf-showcase">
        <div className="shelf-ambient-backlight" />
        
        <div className="books-shelf">
          <motion.div
            className="books-3d-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                className="book-3d-card-wrapper"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                onClick={() => handleBookClick(book)}
                title={`Click to read: ${book.title}`}
              >
                {/* 3D Realistic Book */}
                <div className="book-3d-volume">
                  {/* Bookmark Ribbon */}
                  <div className="book-3d-ribbon" />

                  {/* Left Spine Texture Ridge */}
                  <div className="book-3d-spine-edge" style={{ backgroundColor: book.theme.spine }} />
                  
                  {/* Front Hardcover Face */}
                  <div
                    className="book-3d-front"
                    style={{
                      background: book.theme.bg,
                      borderColor: book.theme.border,
                    }}
                  >
                    {/* Ornamental Gold Inset Border */}
                    <div className="book-3d-gold-border" style={{ borderColor: book.theme.border }}>
                      {/* Top Category Badge */}
                      <div className="book-3d-badge-pill" style={{ color: book.theme.accent, borderColor: book.theme.border }}>
                        <FaBookmark style={{ fontSize: '0.65rem' }} /> {book.category}
                      </div>

                      {/* Emblem Icon */}
                      <div className="book-3d-emblem" style={{ color: book.theme.accent }}>
                        <FaBookOpen />
                      </div>

                      {/* Clean Professional Title */}
                      <h3 className="book-3d-title">
                        {book.title}
                      </h3>

                      {/* Bottom Footer Info */}
                      <div className="book-3d-footer">
                        <span className="book-3d-pages-info">
                          <FaFilePdf /> {book.pageCount ? `${book.pageCount} Pages` : 'Document'}
                        </span>
                        <span className="book-3d-read-tag">3D READ</span>
                      </div>
                    </div>

                    {/* Sheen & Lighting Overlays */}
                    <div className="book-3d-sheen" />
                    <div className="book-3d-spine-shadow" />
                  </div>

                  {/* 3D White Page Edge (Depth) */}
                  <div className="book-3d-page-thickness" />

                  {/* Realistic Ground Floor Shadow */}
                  <div className="book-3d-ground-shadow" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Luxury Bookshelf Base */}
          <div className="shelf-luxury-wood">
            <div className="shelf-brass-inlay" />
            <div className="shelf-shadow-depth" />
          </div>
        </div>
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
          <div className="stat-number">{categoryCount}</div>
          <div className="stat-label">Categories</div>
        </div>
      </motion.div>

      {/* ── FlipBook Reader Modal ── */}
      <AnimatePresence>
        {selectedBook && (
          <FlipBookModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechnicalBooksAndManuals;
