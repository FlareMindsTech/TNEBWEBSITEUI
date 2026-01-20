import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog, FaTag, FaFilter } from 'react-icons/fa';
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
          {spec.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              className="spec-tag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <FaTag size={10} />
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

  const specifications = [
    {
      id: 1,
      title: 'MOEF Environmental Parameters',
      tags: ['Environment', 'Standards', 'Compliance'],
      href: './documents/MOEF-7th-Dec-2015.pdf',
      category: 'environment'
    },
    {
      id: 2,
      title: 'FGD Technology Selection Guide',
      tags: ['Technology', 'Equipment', 'Selection'],
      href: './documents/Advice_on_-FGD_technology_selection_for_different_units_size.pdf',
      category: 'technology'
    },
    {
      id: 3,
      title: 'Disaster Management Guidelines',
      tags: ['Safety', 'Management', 'Guidelines'],
      href: './documents/DisastermanagementGuidelinesconsolidated.pdf',
      category: 'safety'
    },
    {
      id: 4,
      title: 'Distribution Standard Performance',
      tags: ['Performance', 'Standards', 'Distribution'],
      href: './documents/Distribution-Standard-Performance-1.pdf',
      category: 'performance'
    }
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Environment', value: 'environment' },
    { label: 'Technology', value: 'technology' },
    { label: 'Safety', value: 'safety' },
    { label: 'Performance', value: 'performance' }
  ];

  const filteredSpecs = selectedFilter === 'all' 
    ? specifications 
    : specifications.filter(spec => spec.category === selectedFilter);

  return (
    <div className="params-container">
      <motion.div
        className="params-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="params-hero-content"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FaCog className="params-hero-icon" />
          <h1>Technical Parameters</h1>
          <p>Industry standards and technical specifications</p>
        </motion.div>
      </motion.div>

      <div className="params-content">
        <motion.div
          className="params-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="filter-label">
            <FaFilter /> Filter by Category
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
