import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTag, FaFilter, FaCog } from 'react-icons/fa';
import { getAllTechnicalParameters } from '../api';
import './TechnicalParameters.css';

const SpecCard = ({ spec, index }) => {

  return (
    <motion.div
      className="spec-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -10 }}
    >
      <div className="spec-card-inner">
        <motion.div
          className="spec-card-number"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        <h3 className="spec-card-title">{spec.title}</h3>
        <div className="spec-tags">
          {(spec.tags || []).map((tag, idx) => (
            <motion.span
              key={idx}
              className="spec-tag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <FaTag size={10} style={{ color: '#ffffff', marginRight: '4px' }} />
              {tag}
            </motion.span>
          ))}
        </div>

        <motion.a
          href={spec.href}
          target="_blank"
          rel="noopener noreferrer"
          className="spec-link"
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details →
        </motion.a>
      </div>
      <div className="spec-card-bg" />
    </motion.div>
  );
};

const TechnicalParameters = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const data = await getAllTechnicalParameters();
        if (Array.isArray(data)) {

          const formatted = data.map((spec, index) => {
            let tags = [];
            if (Array.isArray(spec.tags) && spec.tags.length > 0) {
              tags = spec.tags;
            } else if (typeof spec.tags === 'string' && spec.tags.trim()) {
              try {
                const parsed = JSON.parse(spec.tags);
                tags = Array.isArray(parsed) ? parsed : spec.tags.split(',').map(t => t.trim()).filter(Boolean);
              } catch {
                tags = spec.tags.split(',').map(t => t.trim()).filter(Boolean);
              }
            } else if (spec.tag) {
              tags = spec.tag.split(',').map(t => t.trim()).filter(Boolean);
            } else {
              tags = ['Standards', 'Guidelines'];
            }

            return {
              id: spec._id || spec.id || index + 1,
              title: spec.title,
              tags: tags,
              href: spec.docUrl || spec.href || '#',
              category: (spec.category || 'technology').toLowerCase().trim()
            };
          });
          setSpecifications(formatted);
        }
      } catch (err) {
        console.error('Error fetching technical parameters from backend:', err);
      }
    };

    fetchParams();
  }, []);

  const baseFilters = [
    { label: 'All', value: 'all' },
    { label: 'Environment', value: 'environment' },
    { label: 'Technology', value: 'technology' },
    { label: 'Safety', value: 'safety' },
    { label: 'Performance', value: 'performance' }
  ];

  // Dynamically include any additional categories from backend
  const existingValues = new Set(baseFilters.map(f => f.value));
  const extraFilters = [];
  specifications.forEach(spec => {
    const cat = (spec.category || '').toLowerCase().trim();
    if (cat && !existingValues.has(cat)) {
      existingValues.add(cat);
      extraFilters.push({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        value: cat
      });
    }
  });

  const filters = [...baseFilters, ...extraFilters];

  const filteredSpecs = selectedFilter === 'all' 
    ? specifications 
    : specifications.filter(spec => (spec.category || '').toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="params-container">
      {/* Hero Banner with Theme Background only and exact original text */}
      <div className="params-hero">
        <div className="params-hero-ambient-glow"></div>
        <div className="params-hero-content">
          <h1>
            <FaCog className="params-hero-icon" /> Technical <span className="title-highlight">Parameters</span>
          </h1>
          <div className="hero-divider"></div>
          <p className="params-hero-tagline">Industry standards and technical specifications</p>
        </div>
      </div>

      <div className="params-content">
        <motion.div
          className="params-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="filter-label">
            <FaFilter style={{ color: '#1b5baf', marginRight: '8px' }} /> Filter by Category
          </div>
          <div className="filter-buttons">
            {filters.map((filter) => (
              <motion.button
                key={filter.value}
                className={`filter-btn ${selectedFilter === filter.value ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="params-grid"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredSpecs.map((spec, index) => (
              <SpecCard key={spec.id} spec={spec} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSpecs.length === 0 && (
          <motion.div
            className="params-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No specifications found in this category</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TechnicalParameters;