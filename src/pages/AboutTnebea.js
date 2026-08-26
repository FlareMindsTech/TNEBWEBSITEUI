import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaAward, FaHistory, FaBook, FaHandHoldingHeart, FaBuilding,
  FaVoteYea, FaGlobe, FaCheckCircle, FaCalendarAlt,
  FaSearch, FaArrowRight, FaStar, FaLandmark,
  FaLayerGroup, FaShieldAlt, FaExternalLinkAlt,
  FaFileContract, FaNewspaper, FaBalanceScale, FaUsersCog,
  FaLightbulb, FaHeart, FaChevronDown, FaTimes, FaChevronRight, FaCheck,
  FaBookOpen, FaBroadcastTower, FaCogs, FaLeaf, FaIndustry, FaCopy, FaPenNib, FaBullhorn, FaFileAlt,
  FaUniversity, FaHome, FaBolt, FaHotel
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AboutTnebea.css';

// EBF Schemes Data
const ebfSchemes = [
  {
    id: 'ebf1',
    title: 'EBF Scheme I',
    year: '1974 / 1977',
    effectiveDate: '13.04.1977',
    subscription: '₹ 203',
    reliefAmount: '₹ 10,000',
    status: 'Concluded',
    isLatest: false,
    highlight: 'Pioneered mutual-aid benevolent protection for electricity engineers.'
  },
  {
    id: 'ebf2',
    title: 'EBF Scheme II',
    year: '1984',
    effectiveDate: '01.07.1984',
    subscription: '₹ 500',
    reliefAmount: '₹ 25,000',
    status: 'Concluded',
    isLatest: false,
    highlight: 'Scaled membership relief amidst growing state grid expansion.'
  },
  {
    id: 'ebf3',
    title: 'EBF Scheme III',
    year: '1989',
    effectiveDate: '01.01.1989',
    subscription: '₹ 1,000',
    reliefAmount: '₹ 50,000',
    status: 'Concluded',
    isLatest: false,
    highlight: 'Doubled protection cover ensuring economic stability for bereaved families.'
  },
  {
    id: 'ebf4',
    title: 'EBF Scheme IV',
    year: '1995',
    effectiveDate: '01.01.1995',
    subscription: '₹ 2,000',
    reliefAmount: '₹ 1,00,000',
    status: 'Concluded',
    isLatest: false,
    highlight: 'First ₹1-Lakh landmark welfare milestone in TNEB history.'
  },
  {
    id: 'ebf5',
    title: 'EBF Scheme V',
    year: '2001',
    effectiveDate: '01.01.2001',
    subscription: '₹ 4,000',
    reliefAmount: '₹ 2,00,000',
    status: 'Concluded',
    isLatest: false,
    highlight: 'Millennium upgrade doubling the corpus security net for engineers.'
  },
  {
    id: 'ebf6',
    title: 'EBF Scheme VI',
    year: '2010',
    effectiveDate: '01.01.2010',
    subscription: '₹ 6,000',
    reliefAmount: '₹ 3,00,000',
    status: 'Concluded',
    isLatest: false,
    highlight: 'Strengthened financial resilience during economic shifts.'
  },
  {
    id: 'ebf7',
    title: 'EBF Scheme VII',
    year: '2020',
    effectiveDate: '08.02.2020',
    subscription: '₹ 15,000',
    reliefAmount: '₹ 5,00,000',
    status: 'Active (Open for Admission)',
    isLatest: false,
    isOpen: true,
    highlight: 'Present active admission scheme providing half a million rupees in immediate family relief.'
  },
  {
    id: 'ebf8',
    title: 'EBF Scheme VIII',
    year: 'Upcoming / New Era',
    effectiveDate: 'Rollout Phase',
    subscription: '₹ 30,000',
    reliefAmount: '₹ 10,00,000',
    status: 'Upcoming with Add-on Benefits',
    isLatest: true,
    isOpen: true,
    highlight: 'Next-generation mega relief offering ₹10 Lakhs safety shield with enhanced welfare privileges.'
  }
];

// Minnagam Network
const minnagamList = [
  {
    id: 1,
    city: 'Chennai (Headquarters Minnagam)',
    established: '1976',
    inaugurated: '11.01.1977',
    highlight: 'First ever guest house in the Board & State for member families. Funded through benefit programs by Villupuram, Madras & Thanjavur branches.',
    icon: FaBuilding,
    status: 'Active & Upgraded'
  },
  {
    id: 2,
    city: 'Villupuram Minnagam',
    established: '1983',
    inaugurated: '1983',
    highlight: '2nd dedicated transit and stay facility established by the dynamic Villupuram branch.',
    icon: FaUniversity,
    status: 'Active'
  },
  {
    id: 3,
    city: 'Cuddalore Minnagam',
    established: '1999',
    inaugurated: '1999',
    highlight: '3rd regional welfare guest house serving coastal power corridor engineers.',
    icon: FaHotel,
    status: 'Active'
  },
  {
    id: 4,
    city: 'Dharmapuri Minnagam',
    established: '2006',
    inaugurated: 'April 2006',
    highlight: '4th branch guest house declared open during the Association Diamond Jubilee year.',
    icon: FaHome,
    status: 'Active'
  }
];

// Historic Achievements Data
const achievements = [
  {
    id: 'ach-1',
    category: 'Cadre & Status',
    title: 'Accord of Gazetted Status to Assistant Engineers',
    summary: 'Secured official Gazetted rank and prestige for Assistant Engineers (previously designated as Junior Engineers).',
    impact: 'Elevated administrative authority, statutory signatory privileges, and executive respect across all board operations.'
  },
  {
    id: 'ach-2',
    category: 'Cadre & Status',
    title: 'Cadre Redesignation Hierarchy (JE → AE & AE → ADE)',
    summary: 'Spearheaded the systemic restructuring of engineering designations to align with contemporary national engineering standards.',
    impact: 'Junior Engineers redesignated as Assistant Engineers; Assistant Engineers elevated to Assistant Divisional Engineers (now AEE).'
  },
  {
    id: 'ach-3',
    category: 'Pay & Allowances',
    title: 'Dearness Allowance on Par with Government of Tamil Nadu',
    summary: 'Won permanent parity for TNEB officers with Tamil Nadu State Government DA revisions.',
    impact: 'Guaranteed 100% inflation-shielded income parity for tens of thousands of engineering officers.'
  },
  {
    id: 'ach-4',
    category: 'Pay & Allowances',
    title: 'Sanction of Telescopic Pay with Equal Rate Increments',
    summary: 'Eliminated stagnation pay bottlenecks by implementing equal-rate progressive telescopic pay scales.',
    impact: 'Ensured fair and predictable career-long financial progression for all engineering cadres.'
  },
  {
    id: 'ach-5',
    category: 'Pay & Allowances',
    title: 'Sanction of Peon Surrender Allowance',
    summary: 'Negotiated financial compensation/allowance in lieu of attendant facilities for officers.',
    impact: 'Direct monetary benefit and operational flexibility for field and office engineers.'
  },
  {
    id: 'ach-6',
    category: 'Workplace & Operations',
    title: 'Scientific Evaluation of Engineering Workload',
    summary: 'Institutionalized rational workload norms to prevent burnout and ensure fair distribution of responsibilities.',
    impact: 'Formed the foundation for new section creations, sub-station staffing, and safety protocols.'
  },
  {
    id: 'ach-7',
    category: 'Cadre Elevation',
    title: 'Upgradation to Assistant Executive Engineers in HQ & Hydro Stations',
    summary: 'Upgraded Assistant Engineer posts to Assistant Executive Engineers (AEE) in the headquarters office and vital hydro power stations.',
    impact: 'Enhanced technical oversight and generated accelerated promotion avenues for junior officers.'
  },
  {
    id: 'ach-8',
    category: 'Executive Expansion',
    title: 'Creation of Executive Engineers / MRT, Operation & Superintending Engineers',
    summary: 'Secured new sanctions for EE/MRT, EE/Operation, and SE/Operation posts across the statewide grid.',
    impact: 'Strengthened grid protection, relay testing, and operations while multiplying apex promotional posts.'
  },
  {
    id: 'ach-9',
    category: 'Promotion Policy',
    title: 'Cancellation of Written Exams, Interviews & Scrapping of Special Field Experience Barrier',
    summary: 'Removed arbitrary qualification barriers for promotions by eliminating redundant exams/interviews and scrapping biased field experience prerequisites.',
    impact: 'Transparent, merit-and-seniority-driven equitable promotion pathways without bureaucratic roadblocks.'
  },
  {
    id: 'ach-10',
    category: 'Direct Recruits & Compassionate',
    title: 'Reduction of Training Period for 1995 & 2000 Recruits & Compassionate Appointees',
    summary: 'Successfully reduced the mandatory training duration for Assistant Engineers appointed through direct recruitment and compassionate grounds.',
    impact: 'Accelerated regular service absorption, probation clearance, and entitlement to regular annual increments.'
  },
  {
    id: 'ach-11',
    category: 'Welfare & Hardship',
    title: 'Sanction of Hydro Allowance for Remote Hydro Generating Stations',
    summary: 'Won special hardship Hydro Allowances for engineers and staff serving in hazardous, isolated, and high-altitude hydro generation reservoirs.',
    impact: 'Recognized difficult terrain hardships and provided generous monthly compensatory allowances.'
  }
];

const AboutTnebea = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeHeroTab, setActiveHeroTab] = useState('history');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('ebf8');
  const [expandedAchievement, setExpandedAchievement] = useState(null);

  const handleHeroTabClick = (tabId, elementId) => {
    setActiveHeroTab(tabId);
    setActiveTab(tabId);
    const elem = document.getElementById(elementId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filtering achievements
  const filteredAchievements = useMemo(() => {
    return achievements.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [searchTerm]);

  const selectedSchemeData = ebfSchemes.find(s => s.id === selectedScheme) || ebfSchemes[7];

  return (
    <div className="about-tnebea-page">
      {/* 1. SIGNATURE 2-COLUMN LUXURY HERO BANNER */}
      <div className="about-hero-wrapper">
        <div className="about-hero-card">
          <div className="about-hero-ambient-glow"></div>
          <div className="container-fluid px-lg-4">
            <div className="row align-items-center g-4 g-xl-5">
              {/* Left Column: Text & Navigation Actions */}
              <div className="col-lg-7 text-start">
                {/* Top Inline Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="d-flex align-items-center gap-2 flex-wrap mb-3"
                >
                  <span className="hero-gold-pill-badge">
                    <FaStar className="me-1 text-gold-glow" /> 1946 – 2026 • 80 GLORIOUS YEARS
                  </span>
                  <span className="hero-blue-pill-badge">
                    Pre-Independence Legacy
                  </span>
                </motion.div>

                {/* Majestic Editorial Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="hero-majestic-heading m-0"
                >
                  Majestically Marching<br />
                  <span className="hero-gold-serif-line">Into Our 80th Year</span>
                </motion.h1>

                {/* Golden Flourish Ornament Divider */}
                <div className="hero-flourish-divider my-3">
                  <span className="flourish-diamond">❖</span>
                </div>

                {/* Subtitle Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hero-description-lead"
                >
                  Tamil Nadu Electricity Board Engineers’ Association (TNEBEA) stands as the beacon of engineering excellence, unbroken democratic leadership, and revolutionary welfare schemes since <strong>June 4, 1946</strong>.
                </motion.p>

                {/* Action Buttons (Clean Single Row) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="hero-action-buttons d-flex flex-wrap align-items-center gap-2 gap-xl-3 mt-4"
                >
                  <button
                    type="button"
                    className={`btn ${activeHeroTab === 'history' ? 'btn-gold-hero' : 'btn-outline-hero'}`}
                    onClick={() => handleHeroTabClick('history', 'history')}
                  >
                    <FaHistory className="me-2" /> Explore Our 80-Year History <FaChevronRight className="ms-1 small-arrow" />
                  </button>
                  <button
                    type="button"
                    className={`btn ${activeHeroTab === 'ebf' ? 'btn-gold-hero' : 'btn-outline-hero'}`}
                    onClick={() => handleHeroTabClick('ebf', 'benevolent-fund')}
                  >
                    <FaHandHoldingHeart className="me-2" /> EBF Scheme Evolution
                  </button>
                  <button
                    type="button"
                    className={`btn ${activeHeroTab === 'achievements' ? 'btn-gold-hero' : 'btn-outline-hero'}`}
                    onClick={() => handleHeroTabClick('achievements', 'achievements')}
                  >
                    <FaAward className="me-2" /> 11+ Landmark Achievements
                  </button>
                </motion.div>
              </div>

              {/* Right Column: Prominent Large 3D 80th Anniversary Majestic Crest */}
              <div className="col-lg-5 text-center d-flex align-items-center justify-content-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="hero-emblem-right-wrapper"
                >
                  <div className="hero-emblem-radial-backdrop"></div>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/tnebea_80_emblem.png`}
                    alt="TNEBEA 80 Years (1946 - 2026)"
                    className="hero-80-split-img"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. STATS BAR ALIGNED UNDER HERO (Centered Vertical Cards) */}
        <div className="container-fluid px-lg-4 mt-4">
          <div className="row g-3 g-xl-4">
            {/* 80+ Years */}
            <div className="col-12 col-sm-6 col-xl-3">
              <motion.div whileHover={{ y: -6 }} className="kpi-stat-card-luxury text-center">
                <div className="kpi-navy-circle mx-auto mb-3">
                  <FaAward className="kpi-gold-icon" />
                </div>
                <div className="kpi-val-number">80+</div>
                <div className="kpi-val-label">YEARS OF UNDISPUTED GLORY</div>
                <div className="kpi-val-pill amber-pill mx-auto mt-2">Est. 04.06.1946</div>
                <div className="kpi-bottom-accent"></div>
              </motion.div>
            </div>

            {/* G.O. 854 */}
            <div className="col-12 col-sm-6 col-xl-3">
              <motion.div whileHover={{ y: -6 }} className="kpi-stat-card-luxury text-center">
                <div className="kpi-navy-circle mx-auto mb-3">
                  <FaFileContract className="kpi-gold-icon" />
                </div>
                <div className="kpi-val-number">G.O. 854</div>
                <div className="kpi-val-label">PRE-INDEPENDENCE GOVT RECOGNITION</div>
                <div className="kpi-val-pill amber-pill mx-auto mt-2">Prior to MSEB (1957)</div>
                <div className="kpi-bottom-accent"></div>
              </motion.div>
            </div>

            {/* 8 Eras */}
            <div className="col-12 col-sm-6 col-xl-3">
              <motion.div whileHover={{ y: -6 }} className="kpi-stat-card-luxury text-center">
                <div className="kpi-navy-circle mx-auto mb-3">
                  <FaHeart className="kpi-gold-icon" />
                </div>
                <div className="kpi-val-number">8 Eras</div>
                <div className="kpi-val-label">EBF BENEVOLENT FUND SCHEMES</div>
                <div className="kpi-val-pill blue-pill mx-auto mt-2">Up to ₹10 Lakhs Cover</div>
                <div className="kpi-bottom-accent"></div>
              </motion.div>
            </div>

            {/* 4 Minnagam Hubs */}
            <div className="col-12 col-sm-6 col-xl-3">
              <motion.div whileHover={{ y: -6 }} className="kpi-stat-card-luxury text-center">
                <div className="kpi-navy-circle mx-auto mb-3">
                  <FaBuilding className="kpi-gold-icon" />
                </div>
                <div className="kpi-val-number">4</div>
                <div className="kpi-val-label">MINNAGAM GUEST HOUSE HUBS</div>
                <div className="kpi-val-pill green-pill mx-auto mt-2">Chennai • VPM • CUD • DPI</div>
                <div className="kpi-bottom-accent"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STICKY LUXURY NAVIGATION TABS */}
      <div className="sticky-nav-strip">
        <div className="container">
          <div className="nav-tabs-pill-row">
            <button
              className={`pill-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <FaLayerGroup className="me-2" /> Overview
            </button>
            <button
              className={`pill-tab ${activeTab === 'legacy' ? 'active' : ''}`}
              onClick={() => { setActiveTab('legacy'); document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <FaHistory className="me-2" /> History & Recognition
            </button>
            <button
              className={`pill-tab ${activeTab === 'ebf' ? 'active' : ''}`}
              onClick={() => { setActiveTab('ebf'); document.getElementById('benevolent-fund')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <FaHandHoldingHeart className="me-2" /> Benevolent Fund (EBF)
            </button>
            <button
              className={`pill-tab ${activeTab === 'publications' ? 'active' : ''}`}
              onClick={() => { setActiveTab('publications'); document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <FaBook className="me-2" /> Publications
            </button>
            <button
              className={`pill-tab ${activeTab === 'minnagam' ? 'active' : ''}`}
              onClick={() => { setActiveTab('minnagam'); document.getElementById('minnagam')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <FaBuilding className="me-2" /> Minnagam Network
            </button>
            <button
              className={`pill-tab ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => { setActiveTab('achievements'); document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <FaAward className="me-2" /> Achievements
            </button>
            <button
              className={`pill-tab ${activeTab === 'governance' ? 'active' : ''}`}
              onClick={() => { setActiveTab('governance'); document.getElementById('governance')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <FaVoteYea className="me-2" /> Democracy & Affiliation
            </button>
          </div>
        </div>
      </div>

      <div className="about-main-body-container container py-5">
        {/* 4. HISTORIC PRE-INDEPENDENCE RECOGNITION (G.O. 854) */}
        <section className="themed-section-wrapper mb-5" id="history">
          <div className="themed-section-banner">
            <div className="section-ambient-glow"></div>
            <div className="section-banner-content">
              <span className="section-mini-badge"><FaLandmark className="me-1" /> Historic Cornerstone</span>
              <h2 className="section-main-heading">
                Unique Pre-Independence <span className="title-highlight">Recognition</span>
              </h2>
              <div className="hero-divider-small"></div>
              <p className="section-main-sub">
                A privilege unmatched by any other trade union or association in the power board.
              </p>
            </div>
          </div>

          <div className="row g-4 align-items-stretch mt-1">
            {/* Left Card: G.O.Ms. 854 Recognition */}
            <div className="col-lg-6">
              <div className="recognition-highlight-card h-100 position-relative">
                {/* Top-Right Clean Gold Corner Ribbon (Old Design) */}
                <div className="corner-gold-ribbon"></div>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="recognition-navy-badge">
                    <FaFileContract className="recognition-gold-doc-icon" />
                  </div>
                  <div>
                    <h3 className="recognition-card-title m-0">G.O.Ms. 854 • dt. 04.06.1946</h3>
                    <span className="recognition-card-subtitle">OFFICIAL STATE RECOGNITION ORDER</span>
                  </div>
                </div>

                <div className="card-title-gold-divider mb-3"></div>

                <p className="recognition-intro-text mb-4">
                  The Association was officially recognized by the Government of Tamil Nadu vide
                  <strong> G.O.Ms.854 dt. 04.06.1946</strong>. This milestone holds unprecedented significance:
                </p>

                <ul className="recognition-checklist">
                  <li>
                    <div className="navy-circle-check">
                      <FaCheck className="gold-check-svg" />
                    </div>
                    <div>
                      <strong>Prior to Indian Independence:</strong> Established and recognized on 04.06.1946, well ahead of August 15, 1947.
                    </div>
                  </li>
                  <li>
                    <div className="navy-circle-check">
                      <FaCheck className="gold-check-svg" />
                    </div>
                    <div>
                      <strong>Prior to Board Constitution:</strong> Pre-dates the formation of Madras State Electricity Board (01.07.1957) by over a decade.
                    </div>
                  </li>
                  <li>
                    <div className="navy-circle-check">
                      <FaCheck className="gold-check-svg" />
                    </div>
                    <div>
                      <strong>Diamond Jubilee Milestone:</strong> Proudly celebrated its Diamond Jubilee on <strong>06.04.2006</strong>.
                    </div>
                  </li>
                  <li>
                    <div className="navy-circle-check">
                      <FaCheck className="gold-check-svg" />
                    </div>
                    <div>
                      <strong>Sole Privilege:</strong> No other union or association functioning in the Board possesses such a long-cherished, uninterrupted history of 80 years.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Card: Evolution of Association Nomenclature */}
            <div className="col-lg-6">
              <div className="evolution-timeline-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="recognition-navy-badge">
                      <FaHistory className="recognition-gold-doc-icon" />
                    </div>
                    <div>
                      <h3 className="recognition-card-title m-0">Evolution of Association Nomenclature</h3>
                      <div className="title-short-gold-bar mt-1"></div>
                    </div>
                  </div>

                  <div className="evolution-connected-timeline mt-4">
                    <div className="evolution-timeline-item">
                      <div className="evolution-year-node">1946</div>
                      <div className="evolution-text-block">
                        <h5 className="node-title"><span className="node-blue-dot"></span>Madras Government Electricity Department Electrical Engineers’ Association</h5>
                        <p className="node-desc">Active prior to the constitution of the State Electricity Board.</p>
                      </div>
                    </div>

                    <div className="evolution-timeline-item">
                      <div className="evolution-year-node">1957</div>
                      <div className="evolution-text-block">
                        <h5 className="node-title"><span className="node-blue-dot"></span>Madras State Electricity Board Engineers’ Association (MSEBEA)</h5>
                        <p className="node-desc">Renamed upon the official constitution of MSEB on <strong>01.07.1957</strong>.</p>
                      </div>
                    </div>

                    <div className="evolution-timeline-item active-node">
                      <div className="evolution-year-node gold-active">1969</div>
                      <div className="evolution-text-block">
                        <h5 className="node-title"><span className="node-blue-dot"></span>Tamil Nadu Electricity Board Engineers’ Association (TNEBEA)</h5>
                        <p className="node-desc">Unanimously resolved by the General Council on <strong>05.01.1969</strong>, marching majestically forward ever since.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="evolution-quote-banner mt-4 d-flex align-items-start gap-3">
                  <span className="quote-gold-mark">“</span>
                  <p className="quote-body-text m-0">
                    First, we must feel proud to be a member of this prestigious Association, which has a multitude of achievements to its credit in its cheerful history of 80 years.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ENGINEERS' BENEVOLENT FUND (EBF) */}
        <section className="themed-section-wrapper mb-5" id="benevolent-fund">
          <div className="themed-section-banner">
            <div className="section-ambient-glow"></div>
            <div className="section-banner-content">
              <span className="section-mini-badge"><FaHandHoldingHeart className="me-1" /> National Benchmark in Welfare</span>
              <h2 className="section-main-heading">
                Engineers’ Benevolent <span className="title-highlight">Fund (EBF)</span>
              </h2>
              <div className="hero-divider-small"></div>
              <p className="section-main-sub">
                The Association has introduced eight generations of the Engineers’ Benevolent Fund, with EBF Scheme VII currently active and EBF Scheme VIII proposed as the next-generation scheme — delivering immediate, record-time financial relief to families of in-service engineers.
              </p>
            </div>
          </div>

          {/* 3 Fact Highlights */}
          <div className="row g-3 my-4">
            <div className="col-md-4">
              <div className="ebf-highlight-pill-card h-100">
                <span className="badge-year">Conceived 1972</span>
                <h5>Silver Jubilee Inauguration</h5>
                <p>Launched by the Hon’ble Chief Minister of Tamil Nadu during Silver Jubilee on 01.11.1972.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ebf-highlight-pill-card h-100">
                <span className="badge-year">Effective 13.04.1977</span>
                <h5>Scheme I Implementation</h5>
                <p>Resolved by General Council on 20.02.1977; launched with initial subscription of ₹200–203.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ebf-highlight-pill-card highlighted h-100">
                <span className="badge-year gold">8 Generations</span>
                <h5>EBF VII (Active) & EBF VIII (Proposed)</h5>
                <p>EBF Scheme VII active (₹5 Lakhs relief); EBF Scheme VIII proposed as next-gen scheme (₹10 Lakhs relief).</p>
              </div>
            </div>
          </div>

          {/* Interactive Scheme Matrix */}
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="scheme-list-card p-3">
                <h4 className="scheme-list-heading mb-3">
                  <FaShieldAlt className="me-2 text-warning" /> Select EBF Generation
                </h4>
                <div className="scheme-buttons-stack">
                  {ebfSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      className={`scheme-select-item ${selectedScheme === scheme.id ? 'active' : ''} ${scheme.isLatest ? 'is-upcoming' : ''}`}
                      onClick={() => setSelectedScheme(scheme.id)}
                    >
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                          <strong className="d-block text-start">{scheme.title}</strong>
                          <span className="scheme-year-text">{scheme.year}</span>
                        </div>
                        <span className={`pill-badge ${scheme.isLatest ? 'badge-upcoming' : scheme.isOpen ? 'badge-active' : 'badge-concluded'}`}>
                          {scheme.isLatest ? 'Upcoming' : scheme.isOpen ? 'Active' : 'Archived'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className={`scheme-detail-box p-4 ${selectedSchemeData.isLatest ? 'gold-border-glow' : ''}`}>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                  <div>
                    <span className="scheme-top-tag">{selectedSchemeData.year}</span>
                    <h3 className="scheme-name-title m-0 mt-1">{selectedSchemeData.title}</h3>
                  </div>
                  <span className={`status-bubble ${selectedSchemeData.isOpen ? 'status-green' : 'status-grey'}`}>
                    {selectedSchemeData.status}
                  </span>
                </div>

                <div className="scheme-kpi-grid">
                  <div className="scheme-kpi-block">
                    <span className="kpi-hdr">Subscription Amount</span>
                    <span className="kpi-amt blue-text">{selectedSchemeData.subscription}</span>
                    <span className="kpi-ftr">One-time / Scheduled Deposit</span>
                  </div>
                  <div className="scheme-kpi-block relief-block">
                    <span className="kpi-hdr">Family Relief Amount</span>
                    <span className="kpi-amt green-text">{selectedSchemeData.reliefAmount}</span>
                    <span className="kpi-ftr">Immediate Distress Disbursement</span>
                  </div>
                  <div className="scheme-kpi-block">
                    <span className="kpi-hdr">Effective Date</span>
                    <span className="kpi-amt">{selectedSchemeData.effectiveDate}</span>
                    <span className="kpi-ftr">Implementation Timeline</span>
                  </div>
                </div>

                <div className="scheme-feature-strip mt-4">
                  <FaLightbulb className="me-2 text-warning" />
                  <span><strong>Key Feature:</strong> {selectedSchemeData.highlight}</span>
                </div>

                {selectedSchemeData.isOpen && (
                  <div className="scheme-active-admission-row mt-4 d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <FaCheckCircle className="text-success" />
                      <span>Fresh Admission is actively facilitated under <strong>{selectedSchemeData.title}</strong></span>
                    </div>
                    <Link to="/cec" className="btn btn-sm btn-gold-solid">
                      View CEC Trustees <FaArrowRight className="ms-1" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="ebf-empathy-card mt-3 p-3 d-flex align-items-center gap-3">
                <div className="empathy-icon">
                  <FaHeart />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Unwavering Commitment to Bereaved Families</h6>
                  <p className="m-0 text-muted small">
                    Even as market interest rates plummeted and unforeseen eventualities mounted, the Association has never failed to disburse the relief in record time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Tabular Comparison */}
          <div className="elite-table-card mt-4 p-4">
            <h4 className="table-card-heading mb-3">
              <FaLayerGroup className="me-2 text-warning" /> Comprehensive Comparative Matrix (Scheme I to VIII)
            </h4>
            <div className="table-responsive">
              <table className="table elite-data-table align-middle">
                <thead>
                  <tr>
                    <th>Scheme</th>
                    <th>Launch Date</th>
                    <th>Subscription</th>
                    <th>Relief Cover</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ebfSchemes.map((s) => (
                    <tr key={s.id} className={s.isLatest ? 'row-gold-glow' : s.isOpen ? 'row-active-glow' : ''}>
                      <td><strong>{s.title}</strong></td>
                      <td>{s.effectiveDate}</td>
                      <td><span className="table-sub-badge">{s.subscription}</span></td>
                      <td><span className="table-relief-badge">{s.reliefAmount}</span></td>
                      <td>
                        <span className={`table-status-pill ${s.isLatest ? 'upcoming' : s.isOpen ? 'open' : 'closed'}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6. WORLD-RENOWNED PUBLICATIONS */}
        <section className="themed-section-wrapper mb-5" id="publications">
          <div className="themed-section-banner">
            <div className="section-ambient-glow"></div>
            <div className="section-banner-content">
              <span className="section-mini-badge"><FaBook className="me-1" /> Engineering & Literary Mastery</span>
              <h2 className="section-main-heading">
                World-Renowned Engineering <span className="title-highlight">Publications</span>
              </h2>
              <div className="hero-divider-small"></div>
              <p className="section-main-sub">
                Pioneering practical engineering literature and unceasing monthly newsletters for over seven decades.
              </p>
            </div>
          </div>

          <div className="row g-4 align-items-stretch mt-1">
            {/* Left Card: Power Engineer's Handbook */}
            <div className="col-lg-7">
              <div className="publication-master-card h-100 d-flex flex-column justify-content-between">
                <div>
                  {/* Navy Header Strip */}
                  <div className="publication-card-header-strip">
                    <div className="d-flex align-items-center gap-3">
                      <div className="publication-gold-ring-circle">
                        <FaBookOpen className="gold-ring-icon" />
                      </div>
                      <div>
                        <h3 className="pub-strip-title m-0">Power Engineer’s Handbook</h3>
                        <span className="pub-strip-subtitle">6 Editions & 2 Reprints • Worldwide Acclaim</span>
                      </div>
                    </div>
                    <Link to="/hand-book" className="btn-gold-action">
                      View Handbook <FaExternalLinkAlt className="ms-1" />
                    </Link>
                  </div>

                  {/* Card Body */}
                  <div className="publication-card-body p-4">
                    <p className="publication-intro-text mb-4 text-center">
                      Recognized worldwide among practicing power engineers, the <strong>Power Engineer’s Handbook</strong> originated
                      as a <em>Technical Diary</em> in <strong>1947</strong> and has since evolved into the definitive engineering reference manual across utilities.
                    </p>

                    {/* 2x4 Grid with Sapphire Gradient, Gold Ring Icons, and Chevron Arrow */}
                    <div className="handbook-edition-grid">
                      {/* 1947 */}
                      <div className="handbook-edition-sapphire-box">
                        <span className="edition-top-tag">1947</span>
                        <div className="edition-gold-ring-circle">
                          <FaFileAlt className="edition-gold-icon" />
                        </div>
                        <div className="edition-text-content flex-grow-1">
                          <h6 className="edition-name-white m-0">Technical Diary</h6>
                          <p className="edition-sub-blue m-0">The genesis technical reference companion published in the year of Independence.</p>
                        </div>
                        <FaChevronRight className="edition-gold-arrow" />
                      </div>

                      {/* 1957 */}
                      <div className="handbook-edition-sapphire-box">
                        <span className="edition-top-tag">1957</span>
                        <div className="edition-gold-ring-circle">
                          <FaBookOpen className="edition-gold-icon" />
                        </div>
                        <div className="edition-text-content flex-grow-1">
                          <h6 className="edition-name-white m-0">1st Edition</h6>
                          <p className="edition-sub-blue m-0">Inaugural complete Power Engineers Handbook coinciding with MSEB formation.</p>
                        </div>
                        <FaChevronRight className="edition-gold-arrow" />
                      </div>

                      {/* 1959 */}
                      <div className="handbook-edition-sapphire-box">
                        <span className="edition-top-tag">1959</span>
                        <div className="edition-gold-ring-circle">
                          <FaBroadcastTower className="edition-gold-icon" />
                        </div>
                        <div className="edition-text-content flex-grow-1">
                          <h6 className="edition-name-white m-0">2nd Edition</h6>
                          <p className="edition-sub-blue m-0">Expanded transmission & distribution engineering computations.</p>
                        </div>
                        <FaChevronRight className="edition-gold-arrow" />
                      </div>

                      {/* 1964 */}
                      <div className="handbook-edition-sapphire-box">
                        <span className="edition-top-tag">1964</span>
                        <div className="edition-gold-ring-circle">
                          <FaCogs className="edition-gold-icon" />
                        </div>
                        <div className="edition-text-content flex-grow-1">
                          <h6 className="edition-name-white m-0">3rd Edition</h6>
                          <p className="edition-sub-blue m-0">Integration of regional grid synchronization principles.</p>
                        </div>
                        <FaChevronRight className="edition-gold-arrow" />
                      </div>

                      {/* 1968 */}
                      <div className="handbook-edition-sapphire-box">
                        <span className="edition-top-tag">1968</span>
                        <div className="edition-gold-ring-circle">
                          <FaLeaf className="edition-gold-icon" />
                        </div>
                        <div className="edition-text-content flex-grow-1">
                          <h6 className="edition-name-white m-0">4th Edition</h6>
                          <p className="edition-sub-blue m-0">Comprehensive thermal and hydro generation standards.</p>
                        </div>
                        <FaChevronRight className="edition-gold-arrow" />
                      </div>

                      {/* 1976 */}
                      <div className="handbook-edition-sapphire-box">
                        <span className="edition-top-tag">1976</span>
                        <div className="edition-gold-ring-circle">
                          <FaIndustry className="edition-gold-icon" />
                        </div>
                        <div className="edition-text-content flex-grow-1">
                          <h6 className="edition-name-white m-0">5th Edition</h6>
                          <p className="edition-sub-blue m-0">Landmark edition widely referenced across power utilities nationwide.</p>
                        </div>
                        <FaChevronRight className="edition-gold-arrow" />
                      </div>

                      {/* 1984 & 1989 */}
                      <div className="handbook-edition-sapphire-box">
                        <span className="edition-top-tag">1984 & 1989</span>
                        <div className="edition-gold-ring-circle">
                          <FaCopy className="edition-gold-icon" />
                        </div>
                        <div className="edition-text-content flex-grow-1">
                          <h6 className="edition-name-white m-0">Reprints</h6>
                          <p className="edition-sub-blue m-0">Massive demand prompted two national reprints.</p>
                        </div>
                        <FaChevronRight className="edition-gold-arrow" />
                      </div>

                      {/* 2002 */}
                      <div className="handbook-edition-sapphire-box">
                        <span className="edition-top-tag">2002</span>
                        <div className="edition-gold-ring-circle">
                          <FaAward className="edition-gold-icon" />
                        </div>
                        <div className="edition-text-content flex-grow-1">
                          <h6 className="edition-name-white m-0">6th Enlarged & Revised</h6>
                          <p className="edition-sub-blue m-0">Enlarged modern edition recognized worldwide among practicing electrical engineers.</p>
                        </div>
                        <FaChevronRight className="edition-gold-arrow" />
                      </div>
                    </div>

                    {/* Bottom Golden Laurel Banner */}
                    <div className="handbook-laurel-banner mt-4">
                      <span className="gold-laurel-leaf">🌾</span>
                      <div className="text-center">
                        <h6 className="laurel-title m-0">A Trusted Companion for Generations of Power Engineers</h6>
                        <span className="laurel-sub">Authoritative • Practical • Timeless</span>
                      </div>
                      <span className="gold-laurel-leaf flip">🌾</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Official Journal: Minthiran */}
            <div className="col-lg-5">
              <div className="publication-master-card h-100 d-flex flex-column justify-content-between">
                <div>
                  {/* Navy Header Strip */}
                  <div className="publication-card-header-strip">
                    <div className="d-flex align-items-center gap-3">
                      <div className="publication-gold-ring-circle">
                        <FaNewspaper className="gold-ring-icon" />
                      </div>
                      <div>
                        <h3 className="pub-strip-title m-0">Official Journal: Minthiran</h3>
                        <span className="pub-strip-subtitle">Unbroken Publication Since 1961</span>
                      </div>
                    </div>
                    <Link to="/minthiran" className="btn-gold-action">
                      Browse <FaExternalLinkAlt className="ms-1" />
                    </Link>
                  </div>

                  {/* Card Body */}
                  <div className="publication-card-body p-4 d-flex flex-column justify-content-between h-100">
                    <div>
                      <p className="publication-intro-text mb-4 text-center">
                        TNEBEA has been publishing its official newsletter to keep members informed of technical, policy, and welfare news.
                      </p>

                      {/* Connected Step Cards with Pill and Icon */}
                      <div className="minthiran-connected-timeline">
                        {/* 1961 */}
                        <div className="journal-step-row">
                          <div className="journal-pill-badge">1961</div>
                          <div className="journal-card-box">
                            <div className="journal-icon-circle">
                              <FaBookOpen />
                            </div>
                            <div className="journal-text-block">
                              <h6 className="journal-title m-0">Original Newsletters</h6>
                              <p className="journal-sub m-0">Inaugural printed volumes sharing vital Board developments.</p>
                            </div>
                          </div>
                        </div>

                        {/* April 1971 */}
                        <div className="journal-step-row">
                          <div className="journal-pill-badge">April 1971</div>
                          <div className="journal-card-box">
                            <div className="journal-icon-circle">
                              <FaPenNib />
                            </div>
                            <div className="journal-text-block">
                              <h6 className="journal-title m-0">Christened “MINPORIYALAR”</h6>
                              <p className="journal-sub m-0">Reflecting professional electrical engineering authority.</p>
                            </div>
                          </div>
                        </div>

                        {/* Nov 1973 – Present */}
                        <div className="journal-step-row active-step-row">
                          <div className="journal-pill-badge navy-gold">Nov 1973 – Present</div>
                          <div className="journal-card-box active-blue-box">
                            <div className="journal-icon-circle active-blue">
                              <FaBullhorn />
                            </div>
                            <div className="journal-text-block">
                              <h6 className="journal-title active-title m-0">Christened “MINTHIRAN”</h6>
                              <p className="journal-sub m-0">Continuing monthly as the premier voice of power engineers.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Emerald Laurel Banner */}
                    <div className="minthiran-laurel-banner mt-4">
                      <span className="green-laurel-leaf">🌿</span>
                      <div className="d-flex align-items-center gap-3">
                        <div className="green-globe-circle">
                          <FaGlobe />
                        </div>
                        <div>
                          <h6 className="emerald-title m-0">1st in Board & State</h6>
                          <span className="emerald-sub">
                            TNEBEA was the first to launch an official website (<strong>tnebeaengineers.in</strong>)
                          </span>
                        </div>
                      </div>
                      <span className="green-laurel-leaf flip">🌿</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. MINNAGAM GUEST HOUSE NETWORK */}
        <section className="themed-section-wrapper mb-5" id="minnagam">
          <div className="themed-section-banner">
            <div className="section-ambient-glow"></div>
            <div className="section-banner-content">
              <span className="section-mini-badge"><FaBuilding className="me-1" /> Hospitality & Transit Network</span>
              <h2 className="section-main-heading">
                The Minnagam Guest House <span className="title-highlight">Network</span>
              </h2>
              <div className="hero-divider-small"></div>
              <p className="section-main-sub">
                First among all trade unions in the Board and State to secure and maintain dedicated guest houses for members and their families.
              </p>
            </div>
          </div>

          <div className="row g-4 mt-1">
            {minnagamList.map((m) => {
              const IconComp = m.icon;
              return (
                <div key={m.id} className="col-md-6 col-lg-3">
                  <motion.div whileHover={{ y: -6 }} className="minnagam-grid-card h-100">
                    <div className="hub-navy-circle-badge mx-auto mb-2">
                      <IconComp />
                    </div>
                    <span className="hub-est-badge">EST. {m.established}</span>
                    <h4 className="hub-city-name">{m.city}</h4>
                    <div className="hub-opened-date">
                      <FaCalendarAlt className="me-1 text-muted" /> Opened: <strong>{m.inaugurated}</strong>
                    </div>
                    <p className="hub-desc-text flex-grow-1">{m.highlight}</p>
                    <div className="hub-active-foot">
                      <span className="green-pulse-dot"></span> {m.status}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="minnagam-portal-banner text-center mt-4 p-4">
            <h4 className="text-white mb-2">Plan Your Stay or View Amenities</h4>
            <p className="text-light-50 mb-3 small">
              Explore room availability, transit accommodations, and booking details.
            </p>
            <Link to="/minnagam" className="btn btn-gold-solid">
              <FaBuilding className="me-2" /> Go to Minnagam Booking Portal
            </Link>
          </div>
        </section>

        {/* 8. LANDMARK ACHIEVEMENTS */}
        <section className="themed-section-wrapper mb-5" id="achievements">
          <div className="themed-section-banner">
            <div className="section-ambient-glow"></div>
            <div className="section-banner-content">
              <span className="section-mini-badge"><FaAward className="me-1" /> Transformative Reforms</span>
              <h2 className="section-main-heading">
                Historic Cadre & Policy <span className="title-highlight">Achievements</span>
              </h2>
              <div className="hero-divider-small"></div>
              <p className="section-main-sub">
                Over the course of 80 glorious years, TNEBEA has spearheaded groundbreaking cadre, pay, and service reforms.
              </p>
            </div>
          </div>

          {/* Floating Search Bar */}
          <div className="achievement-search-wrapper my-4">
            <div className="achievement-search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search achievements (e.g. Gazetted, Pay, Promotion, Hydro, Training)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-field"
              />
              {searchTerm && (
                <button className="clear-btn" onClick={() => setSearchTerm('')}>
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="search-count-text text-end text-muted small mt-1">
              Showing <strong>{filteredAchievements.length}</strong> of <strong>{achievements.length}</strong> landmark achievements
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="row g-3 g-md-4">
            {filteredAchievements.map((item, index) => {
              const isExpanded = expandedAchievement === item.id;
              return (
                <div key={item.id} className="col-lg-6">
                  <motion.div
                    className={`achievement-elite-card ${isExpanded ? 'active-expanded' : ''}`}
                    onClick={() => setExpandedAchievement(isExpanded ? null : item.id)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <div className="ach-num-circle">
                        {index + 1}
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <span className="ach-cat-pill">{item.category}</span>
                          <FaChevronDown className={`chevron-rotator ${isExpanded ? 'rotated' : ''}`} />
                        </div>
                        <h4 className="ach-title mt-2">{item.title}</h4>
                        <p className="ach-summary">{item.summary}</p>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ach-impact-card mt-3 p-3"
                            >
                              <span className="impact-hdr">
                                <FaCheckCircle className="text-success me-1" /> Historic Impact & Benefit:
                              </span>
                              <p className="impact-body m-0 mt-1">{item.impact}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No achievements found matching your search. Try another keyword.</p>
            </div>
          )}
        </section>

        {/* 9. DEMOCRATIC SOVEREIGNTY & AFFILIATIONS */}
        <section className="themed-section-wrapper mb-5" id="governance">
          <div className="themed-section-banner">
            <div className="section-ambient-glow"></div>
            <div className="section-banner-content">
              <span className="section-mini-badge"><FaVoteYea className="me-1" /> Sovereign Representation</span>
              <h2 className="section-main-heading">
                Democratic Governance & <span className="title-highlight">Affiliations</span>
              </h2>
              <div className="hero-divider-small"></div>
              <p className="section-main-sub">
                Sovereign election by members since 1968 and apex affiliations uniting power engineers nationwide.
              </p>
            </div>
          </div>

          <div className="row g-4 align-items-stretch mt-1">
            {/* Left Card: 100% Democratic Mode */}
            <div className="col-lg-6">
              <div className="elite-glass-card h-100 p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="recognition-navy-badge">
                      <FaVoteYea className="recognition-gold-doc-icon" />
                    </div>
                    <div>
                      <h3 className="recognition-card-title m-0">100% Democratic Mode</h3>
                      <span className="recognition-card-subtitle">ELECTIONS ON PAR WITH GENERAL ELECTIONS</span>
                    </div>
                  </div>

                  <div className="card-title-gold-divider mb-3"></div>

                  <p className="card-text-lead mb-3">
                    Above all, we take immense pride that our association conducts elections for office bearers through the best possible
                    <strong> democratic mode on par with the pattern of a general election</strong>.
                  </p>
                  <p className="card-text-lead mb-4">
                    In <strong>1968</strong>, the routine appointment of office bearers by the board was dispensed with, transferring the sovereign right to elect representatives directly to members.
                  </p>
                </div>

                <div className="evolution-quote-banner mt-auto d-flex align-items-start gap-3">
                  <span className="quote-gold-mark">“</span>
                  <p className="quote-body-text m-0">
                    It is all the more important that contest has to be healthy to keep the prestigious association healthy and vibrant.”
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card: Federation Affiliations */}
            <div className="col-lg-6">
              <div className="elite-glass-card h-100 p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="recognition-navy-badge">
                      <FaGlobe className="recognition-gold-doc-icon" />
                    </div>
                    <div>
                      <h3 className="recognition-card-title m-0">Federation Affiliations</h3>
                      <span className="recognition-card-subtitle">SOLIDARITY ACROSS STATE & NATION</span>
                    </div>
                  </div>

                  <div className="card-title-gold-divider mb-3"></div>

                  <div className="affiliation-stack mt-3">
                    <div className="affiliation-row p-3 mb-3">
                      <div className="aff-ico-box">
                        <FaUniversity />
                      </div>
                      <div>
                        <h6 className="aff-title m-0">Tamil Nadu Engineers Federation (TNEF)</h6>
                        <span className="aff-desc">Apex forum of Graduate Engineers of all Tamil Nadu Government Departments & Undertakings.</span>
                      </div>
                    </div>

                    <div className="affiliation-row p-3 mb-3">
                      <div className="aff-ico-box orange">
                        <FaBolt />
                      </div>
                      <div>
                        <h6 className="aff-title m-0">All India Power Engineers Federation (AIPEF)</h6>
                        <span className="aff-desc">Key constituent representing power engineering professionals nationwide.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="unity-motto-strip mt-auto p-3 text-center d-flex align-items-center justify-content-center gap-2">
                  <FaBalanceScale className="gold-scale-icon" />
                  <strong>“Unity is Our Strength. Let Us Keep It In Mind.”</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 10. SOLEMN CREED FOOTER BANNER */}
      <div className="about-anthem-wrapper text-center py-5">
        <div className="container">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="anthem-seal-circle mb-3">
              <FaAward className="gold-seal-ico" />
            </div>
            <h2 className="anthem-title">
              LONG LIVE TNEB ENGINEERS’ <span className="title-highlight">ASSOCIATION</span>
            </h2>
            <div className="hero-divider"></div>
            <p className="anthem-subtitle">
              Proud of Our 80-Year Legacy • Dedicated to the Tamil Nadu Grid • Committed to Member Welfare
            </p>
            <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
              <Link to="/role-of-honour" className="btn btn-gold-hero">
                <FaAward className="me-2" /> View Roll of Honour
              </Link>
              <Link to="/contactus" className="btn btn-gold-hero">
                <FaUsersCog className="me-2" /> Connect with Association Leaders
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutTnebea;
