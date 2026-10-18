import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, HOUSES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { StoneFinder } from '../components/StoneFinder';
import {
  ArrowRight,
  Star,
  Sparkles,
  Compass,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Award,
  Heart,
  ShoppingBag,
  ShoppingCart,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  MapPin,
  Calendar
} from 'lucide-react';
// Curated sacred specimens for the homepage hero carousel
const HERO_SLIDES = [
  {
    id: 'amethyst-citrine',
    image: '/assets/01home_img_0.jpg',
    alt: 'Faceted Amethyst and Citrine Kuberstones sacred talisman on silk',
    eyebrow: 'SACRED ENERGY · NATURAL SPECIMENS · CONSECRATION',
    plaque: 'TALISMAN SPECIMEN · AMETHYST & CITRINE',
    tagline: 'Aura Harmony & Abundance',
    objectPosition: 'center 30%'
  },
  {
    id: 'himalayan-altar-mala',
    image: '/assets/home-desktop1440_img_15.jpg',
    alt: 'Consecrated sacred Himalayan talisman on altar with lotus candles',
    eyebrow: 'VEDIC CONSECRATION · PRANA PRATISHTHA · RISHIKESH',
    plaque: 'SACRED ARTIFACT · CONSECRATED TEMPLE MALA',
    tagline: 'Divine Peace & Serenity',
    objectPosition: 'center center'
  },
  {
    id: 'rose-quartz-citrine',
    image: '/assets/01home_img_1.jpg',
    alt: 'Madagascan Rose Quartz and Golden Citrine prisms with raw minerals',
    eyebrow: 'EARTH TALISMANS · 100% UNTREATED SPECIMENS',
    plaque: 'TALISMAN SPECIMEN · ROSE QUARTZ & CITRINE',
    tagline: 'Heart Chakra & Prosperity',
    objectPosition: 'center 40%'
  },
  {
    id: 'sacred-rudraksha',
    image: '/assets/01home_img_2.jpg',
    alt: 'Sacred Himalayan Panchamukhi Rudraksha on altar with brass diya',
    eyebrow: 'ANCIENT ROOTS · HIGH ALTITUDE HIMALAYAS',
    plaque: 'SACRED SPECIMEN · PANCHAMUKHI RUDRAKSHA',
    tagline: 'Protection & Shielding Energy',
    objectPosition: 'center 35%'
  },
  {
    id: 'navratna-gemstones',
    image: '/assets/01home_img_3.jpg',
    alt: 'Royal Navratna Nine Gemstones talisman on white marble',
    eyebrow: 'JYOTISH ASTROLOGY · CELESTIAL ALIGNMENT',
    plaque: 'TALISMAN SPECIMEN · ROYAL NAVRATNA NINE',
    tagline: 'Planetary Harmony & Fortune',
    objectPosition: 'center 45%'
  }
];

export const HomePage = () => {
  const { navigateTo, addToCart, showToast } = useShop();
  const [activeFilter, setActiveFilter] = useState('featured');

  // Hero Image Carousel State
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const touchStartX = useRef(null);

  // Auto-advance hero carousel every 5.5s unless hovered or paused
  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHeroPaused, heroSlide]);

  const handlePrevHeroSlide = () => {
    setHeroSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextHeroSlide = () => {
    setHeroSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const handleHeroTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleHeroTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextHeroSlide();
      } else {
        handlePrevHeroSlide();
      }
    }
    touchStartX.current = null;
  };

  const handleHeroKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevHeroSlide();
    } else if (e.key === 'ArrowRight') {
      handleNextHeroSlide();
    }
  };

  // Flash Sale Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 15,
    minutes: 46,
    seconds: 28
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'muted');
      return;
    }
    setSubscribed(true);
    showToast('✨ Welcome to the sacred lunar circle', 'gold');
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#DFCA9E', '#C5A572']
    });
  };

  // Kundali Offer Modal State
  const [isKundaliModalOpen, setIsKundaliModalOpen] = useState(false);
  const [kundaliForm, setKundaliForm] = useState({
    name: '',
    placeOfBirth: '',
    dob: '',
    tob: '',
  });
  const [kundaliSubmitted, setKundaliSubmitted] = useState(false);

  const handleKundaliSubmit = (e) => {
    e.preventDefault();
    if (!kundaliForm.name || !kundaliForm.placeOfBirth || !kundaliForm.dob) {
      showToast('Please provide Name, Place of Birth, and Date of Birth', 'muted');
      return;
    }
    setKundaliSubmitted(true);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#DFCA9E', '#C5A572', '#FAF8F5']
    });
    showToast('✨ Sacred Kundali reserved! Valid with orders above ₹2,000.', 'gold');
  };

  const resetKundaliModal = () => {
    setIsKundaliModalOpen(false);
  };

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isKundaliModalOpen) {
        setIsKundaliModalOpen(false);
      }
    };
    if (isKundaliModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isKundaliModalOpen]);

  // Filter products for "Chosen Often" section
  const [productPage, setProductPage] = useState(0);

  const filteredProducts = PRODUCTS.filter(product => {
    if (activeFilter === 'featured') return product.featured;
    if (activeFilter === 'new') return product.isFlash || product.price > 1800;
    if (activeFilter === 'under1500') return product.price <= 1500;
    return true;
  });

  const itemsPerPage = 4;
  const maxPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const handleNextPage = () => {
    setProductPage(prev => (prev + 1) % maxPages);
  };

  const handlePrevPage = () => {
    setProductPage(prev => (prev - 1 + maxPages) % maxPages);
  };

  const startIndex = productPage * itemsPerPage;
  const currentSpread = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const displayProducts = currentSpread.length > 0
    ? (currentSpread.length >= 4 ? currentSpread : [...currentSpread, ...filteredProducts.slice(0, 4 - currentSpread.length)])
    : filteredProducts.slice(0, 4);

  // Spotlight product & companions for other sections
  const spotlightProduct = filteredProducts[0] || PRODUCTS[0];
  const companionProducts = filteredProducts.slice(1, 4);

  // Flash products
  const flashProducts = PRODUCTS.filter(p => p.isFlash || p.id === 'heart-line-rose' || p.id === 'aries-fire').slice(0, 2);



  return (
    <div className="homepage-root">

      {/* =========================================================================
          SECTION 1: HERO — ASYMMETRICAL EDITORIAL PROVENANCE
         ========================================================================= */}
      {/* =========================================================================
          SECTION 1: HERO — ASYMMETRICAL EDITORIAL PROVENANCE & IMAGE CAROUSEL
         ========================================================================= */}
      <section
        className="hero-section"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        onTouchStart={handleHeroTouchStart}
        onTouchEnd={handleHeroTouchEnd}
        onKeyDown={handleHeroKeyDown}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Kuberstones Sacred Talismans Gallery"
      >
        {/* Full-bleed hero photography with cross-fade image layers */}
        <div className="hero-bg" aria-hidden="true">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hero-slide-layer ${idx === heroSlide ? 'is-active' : ''}`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="hero-bg-img"
                style={{ objectPosition: slide.objectPosition || 'center 30%' }}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
          <div className="hero-overlay-dark" />
        </div>

        {/* Floating Side Chevron Navigation (Left & Right) */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handlePrevHeroSlide(); }}
          className="hero-nav-chevron hero-nav-prev"
          aria-label="Previous talisman slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleNextHeroSlide(); }}
          className="hero-nav-chevron hero-nav-next"
          aria-label="Next talisman slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Asymmetrical Editorial Content */}
        <div className="hero-content container-custom">
          <div className="hero-editorial-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/assets/kuber-logo-transparent.png"
                alt="Kuberstones Sacred Talisman"
                style={{
                  height: '36px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 10px rgba(197, 165, 114, 0.45))'
                }}
              />
              <span className="section-eyebrow hero-eyebrow" style={{ margin: 0 }}>
                {HERO_SLIDES[heroSlide].eyebrow}
              </span>
            </div>

            <h1 className="hero-headline">
              HEAL. ALIGN.<br />
              <span className="hero-headline-italic">
                Attract abundance.
              </span>
            </h1>

            <p className="hero-subtext">
              Natural crystals, rare Himalayan rudraksha, and gemological specimens — strung by hand and energized for the sacred intention you carry.
            </p>

            <div className="hero-actions">
              <button
                onClick={() => navigateTo('studio')}
                className="btn-gold hero-btn-primary"
              >
                <span>Compose in Atelier</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => navigateTo('shop-all')}
                className="btn-outline hero-btn-secondary"
              >
                View Catalogue
              </button>
            </div>
          </div>

          {/* Luxury Editorial Floating Dock in bottom right */}
          <div className="hero-carousel-dock">
            <div className="hero-dock-badge">
              <span className="hero-dock-dot" />
              <span className="hero-dock-specimen">{HERO_SLIDES[heroSlide].plaque}</span>
            </div>

            <div className="hero-dock-controls">
              <span className="hero-dock-counter">
                <strong>0{heroSlide + 1}</strong>
                <span className="counter-slash">/</span>
                <span className="counter-total">0{HERO_SLIDES.length}</span>
              </span>

              <div className="hero-dock-bars">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setHeroSlide(idx)}
                    className={`hero-dock-bar ${idx === heroSlide ? 'is-active' : ''}`}
                    title={slide.plaque}
                    aria-label={`Switch to slide ${idx + 1}: ${slide.plaque}`}
                  >
                    <span
                      key={idx === heroSlide ? `fill-${heroSlide}-${isHeroPaused ? 'p' : 'r'}` : `idle-${idx}`}
                      className="hero-dock-fill"
                      style={{
                        animationPlayState: isHeroPaused ? 'paused' : 'running'
                      }}
                    />
                  </button>
                ))}
              </div>

              <div className="hero-dock-arrows">
                <button
                  type="button"
                  onClick={handlePrevHeroSlide}
                  className="hero-dock-arrow"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleNextHeroSlide}
                  className="hero-dock-arrow"
                  aria-label="Next slide"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Value Bar */}
        <div className="hero-value-bar reveal-on-scroll">
          <div className="container-custom">
            <div className="value-bar-grid">
              <div className="value-bar-item">
                <span className="value-roman">I</span>
                <span>CONSECRATED IN SACRED RISHIKESH</span>
              </div>
              <div className="value-bar-item value-bar-item-border">
                <span className="value-roman">II</span>
                <span>GENUINE LAB-VERIFIED MINERALS</span>
              </div>
              <div className="value-bar-item">
                <span className="value-roman">III</span>
                <span>COMPOSED BY SACRED NUMEROLOGY</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2: THE HOUSES — ASYMMETRICAL STAGGERED MUSEUM GALLERY
         ========================================================================= */}
      <section className="section-houses">
        <div className="container-custom">
          <div className="section-header-editorial reveal-on-scroll">
            <span className="section-eyebrow">THE HOUSES · THREE LINEAGES</span>
            <div className="section-header-split">
              <h2 className="section-title">
                SACRED <span className="gold-italic">houses</span>
              </h2>
              <p className="section-subtitle">
                Each house holds its own Vedic tradition and geological frequency. Begin where your personal intention resonates.
              </p>
            </div>
          </div>

          <div className="houses-editorial-layout reveal-stagger">
            {/* DOMINANT MONUMENTAL CARD — HOUSE I (CRYSTALS) */}
            <div
              onClick={() => navigateTo('crystals')}
              className="luxury-card house-plate house-plate-primary"
            >
              <div className="house-plate-img-wrap">
                <img
                  src="/assets/01home_img_1.jpg"
                  alt="House of Crystals"
                  className="house-img"
                />
                <div className="house-plate-gradient" />
              </div>
              <div className="house-plate-content">
                <div className="house-plate-top">
                  <span className="house-roman-label">HOUSE I · INTENTION</span>
                  <span className="house-specimen-count">24 PIECES</span>
                </div>
                <h3 className="house-title">CRYSTALS</h3>
                <p className="house-desc">
                  Strands composed for intention — color frequency, mineral density, and sacred bead counts held with architectural restraint.
                </p>
                <div className="house-action-line">
                  <span>Explore House I</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>

            {/* ASYMMETRICAL STAGGERED COLUMN — HOUSE II, ATELIER, HOUSE III */}
            <div className="houses-staggered-col">
              {/* CARD 2: HOUSE II (RUDRAKSHA) */}
              <div
                onClick={() => navigateTo('rudraksha')}
                className="luxury-card house-plate house-plate-secondary"
              >
                <div className="house-plate-img-wrap">
                  <img
                    src="/assets/01home_img_2.jpg"
                    alt="House of Rudraksha"
                    className="house-img"
                  />
                  <div className="house-plate-gradient" />
                </div>
                <div className="house-plate-content">
                  <div className="house-plate-top">
                    <span className="house-roman-label">HOUSE II · SEED OF SHIVA</span>
                    <span className="house-specimen-count">16 PIECES</span>
                  </div>
                  <h3 className="house-title-sm">RUDRAKSHA</h3>
                  <p className="house-desc-sm">
                    Authentic Nepal 5-Mukhi seeds selected for high density and energized with consecrated Gangotri water.
                  </p>
                  <div className="house-action-line">
                    <span>Explore House II</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>

              {/* CARD 3: THE ATELIER BESPOKE CTA */}
              <div
                onClick={() => navigateTo('studio')}
                className="luxury-card house-plate house-plate-atelier"
              >
                <div className="house-plate-content">
                  <div className="house-plate-top">
                    <span className="house-roman-label">THE ATELIER · BESPOKE</span>
                    <Sparkles size={13} color="#C5A572" />
                  </div>
                  <h3 className="house-title-sm">COMPOSE YOUR OWN</h3>
                  <p className="house-desc-sm">
                    Select your purpose, handpick each mineral bead individually, and configure with our live atelier builder.
                  </p>
                  <div className="house-action-line">
                    <span>Open Atelier Visualizer</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>

              {/* CARD 4: HOUSE III (GEMSTONES) */}
              <div
                onClick={() => navigateTo('gemstones')}
                className="luxury-card house-plate house-plate-secondary"
              >
                <div className="house-plate-img-wrap">
                  <img
                    src="/assets/01home_img_3.jpg"
                    alt="House of Gemstones"
                    className="house-img"
                  />
                  <div className="house-plate-gradient" />
                </div>
                <div className="house-plate-content">
                  <div className="house-plate-top">
                    <span className="house-roman-label">HOUSE III · GEMOLOGICAL</span>
                    <span className="house-specimen-count">8 PIECES</span>
                  </div>
                  <h3 className="house-title-sm">GEMSTONES</h3>
                  <p className="house-desc-sm">
                    Rare untreated minerals including Burmese jade, Lapis Lazuli, and Ethiopian opals set on jewelers silk.
                  </p>
                  <div className="house-action-line">
                    <span>Explore House III</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 3: MOST LOVED (CHOSEN OFTEN) — 4-CARD SHOWCASE SPREAD
         ========================================================================= */}
      <section className="section-featured">
        <div className="container-custom">
          {/* Header Row with "OUR COLLECTION —", "Chosen often", pills and pagination */}
          <div className="collection-header-row reveal-on-scroll">
            <div className="collection-title-col">
              <div className="collection-eyebrow-wrap">
                <span className="collection-eyebrow">OUR COLLECTION</span>
                <span className="collection-eyebrow-dash" />
              </div>
              <h2 className="collection-title">
                Chosen <span className="collection-italic">often</span>
              </h2>
              <p className="collection-subtitle">
                Pieces our community keeps coming back to.
              </p>
            </div>

            <div className="collection-controls-col">
              <div className="collection-pills">
                <button
                  onClick={() => {
                    setActiveFilter('featured');
                    setProductPage(0);
                  }}
                  className={`collection-pill ${activeFilter === 'featured' ? 'is-active' : ''}`}
                >
                  Featured
                </button>
                <button
                  onClick={() => {
                    setActiveFilter('new');
                    setProductPage(0);
                  }}
                  className={`collection-pill ${activeFilter === 'new' ? 'is-active' : ''}`}
                >
                  New In
                </button>
                <button
                  onClick={() => {
                    setActiveFilter('under1500');
                    setProductPage(0);
                  }}
                  className={`collection-pill ${activeFilter === 'under1500' ? 'is-active' : ''}`}
                >
                  Under ₹1,500
                </button>
              </div>

              <div className="collection-nav-arrows">
                <button
                  onClick={handlePrevPage}
                  className="collection-arrow-btn"
                  aria-label="Previous pieces"
                >
                  <ChevronLeft size={16} strokeWidth={1.8} />
                </button>
                <button
                  onClick={handleNextPage}
                  className="collection-arrow-btn"
                  aria-label="Next pieces"
                >
                  <ChevronRight size={16} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>

          {/* 4-Card Responsive Grid */}
          <div className="chosen-often-grid reveal-stagger">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="section-cta-center">
            <button
              onClick={() => navigateTo('shop-all')}
              className="collection-see-all-btn"
            >
              Explore Full Sacred Catalogue
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 4: FLASH OFFER — LUNAR CYCLE DROP WITH EDITORIAL COUNTDOWN
         ========================================================================= */}
      <section className="section-flash">
        <div className="container-custom">
          <div className="flash-editorial-grid">
            {/* Left Info & Architectural Countdown */}
            <div className="flash-info reveal-left">
              <span className="section-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={12} color="#C5A572" />
                LIMITED OFFER · LUNAR CYCLE DROP
              </span>

              <h2 className="section-title" style={{ marginBottom: '20px' }}>
                LUNAR <span className="gold-italic">drop</span>
              </h2>

              <p className="flash-desc">
                Curated sanctified specimens offered at transitional seasonal pricing before the next full moon cycle. Every strand is energized with Vedic chants by Rishikesh priests.
              </p>

              {/* Minimalist Monolith Countdown */}
              <div className="countdown-row">
                <div className="countdown-box">
                  <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="countdown-label">HOURS</div>
                </div>
                <span className="countdown-divider">/</span>
                <div className="countdown-box">
                  <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="countdown-label">MINUTES</div>
                </div>
                <span className="countdown-divider">/</span>
                <div className="countdown-box">
                  <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="countdown-label">SECONDS</div>
                </div>
              </div>

              <button
                onClick={() => navigateTo('shop-all')}
                className="btn-gold"
                style={{ padding: '16px 38px' }}
              >
                <span>Acquire From Lunar Drop</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Right Flash Specimen Plates */}
            <div className="flash-products-stagger reveal-right">
              {flashProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={`flash-specimen-card ${idx === 1 ? 'stagger-down' : ''}`}
                >
                  <div
                    onClick={() => navigateTo('product', product.id)}
                    className="flash-img-plate"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-img"
                    />
                    <div className="flash-badge-architectural">
                      LUNAR CYCLE -15%
                    </div>
                  </div>

                  <div className="flash-specimen-info">
                    <div>
                      <div className="flash-stars-row">
                        <span style={{ color: '#C5A572', fontSize: '11px' }}>★</span>
                        <span className="flash-rating">5.0 · CONSECRATED</span>
                      </div>
                      <h4
                        onClick={() => navigateTo('product', product.id)}
                        className="flash-specimen-name"
                      >
                        {product.name}
                      </h4>
                      <p className="flash-specimen-tagline">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="flash-specimen-footer">
                      <div className="flash-pricing-wrap">
                        <span className="flash-price">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="flash-original-price">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="flash-acquire-btn"
                      >
                        <ShoppingBag size={12} />
                        <span>Acquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 5: EXCLUSIVE OFFER — YOUR KUNDALI, ON US
         ========================================================================= */}
      <section className="section-kundali-offer">
        <div className="container-custom">
          <div className="kundali-banner-wrapper">
            {/* High-Definition Seamless Panorama Backdrop */}
            <div className="kundali-banner-backdrop">
              <picture>
                <source srcSet="/assets/kundali-banner-ultra-hq.webp" type="image/webp" />
                <img
                  src="/assets/kundali-banner-ultra-hq.png"
                  alt="Personalized Kundali Gift Box and Rosette Offer"
                  className="kundali-backdrop-img"
                />
              </picture>
            </div>

            {/* Vector Scalloped Rosette Seal (100% Crisp / Resolution-Independent) */}
            <div className="kundali-rosette-seal">
              <svg viewBox="0 0 200 200" className="rosette-svg">
                <defs>
                  <linearGradient id="sealGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DFCA9E" />
                    <stop offset="35%" stopColor="#C5A572" />
                    <stop offset="70%" stopColor="#F0DFB8" />
                    <stop offset="100%" stopColor="#9E7D46" />
                  </linearGradient>
                  <radialGradient id="sealDarkGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#251233" />
                    <stop offset="100%" stopColor="#120617" />
                  </radialGradient>
                  <filter id="sealGlow" x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.85" />
                    <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#C5A572" floodOpacity="0.25" />
                  </filter>
                </defs>
                <g filter="url(#sealGlow)">
                  {/* Outer 24-petal scalloped rosette */}
                  <path
                    d="M 188.00,100.00 Q 194.19,112.40 185.00,122.78 Q 187.77,136.35 176.21,144.00 Q 175.37,157.83 162.23,162.23 Q 157.83,175.37 144.00,176.21 Q 136.35,187.77 122.78,185.00 Q 112.40,194.19 100.00,188.00 Q 87.60,194.19 77.22,185.00 Q 63.65,187.77 56.00,176.21 Q 42.17,175.37 37.77,162.23 Q 24.63,157.83 23.79,144.00 Q 12.23,136.35 15.00,122.78 Q 5.81,112.40 12.00,100.00 Q 5.81,87.60 15.00,77.22 Q 12.23,63.65 23.79,56.00 Q 24.63,42.17 37.77,37.77 Q 42.17,24.63 56.00,23.79 Q 63.65,12.23 77.22,15.00 Q 87.60,5.81 100.00,12.00 Q 112.40,5.81 122.78,15.00 Q 136.35,12.23 144.00,23.79 Q 157.83,24.63 162.23,37.77 Q 175.37,42.17 176.21,56.00 Q 187.77,63.65 185.00,77.22 Q 194.19,87.60 188.00,100.00 Z"
                    fill="url(#sealDarkGrad)"
                    stroke="url(#sealGoldGrad)"
                    strokeWidth="2.4"
                  />
                  {/* Inner 24-petal scalloped accent border */}
                  <path
                    d="M 180.00,100.00 Q 185.26,111.23 177.27,120.71 Q 179.45,132.91 169.28,140.00 Q 168.23,152.35 156.57,156.57 Q 152.35,168.23 140.00,169.28 Q 132.91,179.45 120.71,177.27 Q 111.23,185.26 100.00,180.00 Q 88.77,185.26 79.29,177.27 Q 67.09,179.45 60.00,169.28 Q 47.65,168.23 43.43,156.57 Q 31.77,152.35 30.72,140.00 Q 20.55,132.91 22.73,120.71 Q 14.74,111.23 20.00,100.00 Q 14.74,88.77 22.73,79.29 Q 20.55,67.09 30.72,60.00 Q 31.77,47.65 43.43,43.43 Q 47.65,31.77 60.00,30.72 Q 67.09,20.55 79.29,22.73 Q 88.77,14.74 100.00,20.00 Q 111.23,14.74 120.71,22.73 Q 132.91,20.55 140.00,30.72 Q 152.35,31.77 156.57,43.43 Q 168.23,47.65 169.28,60.00 Q 179.45,67.09 177.27,79.29 Q 185.26,88.77 180.00,100.00 Z"
                    fill="none"
                    stroke="url(#sealGoldGrad)"
                    strokeWidth="1.1"
                    opacity="0.88"
                  />
                  {/* Fine dotted interior concentric guideline */}
                  <circle cx="100" cy="100" r="74" fill="none" stroke="url(#sealGoldGrad)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />

                  {/* Gift Box Icon */}
                  <g transform="translate(88, 35) scale(0.65)" stroke="url(#sealGoldGrad)" strokeWidth="1.6" fill="none">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </g>

                  {/* FREE Heading */}
                  <text x="100" y="86" textAnchor="middle" fill="url(#sealGoldGrad)" fontFamily="'Cinzel', serif" fontSize="23" fontWeight="800" letterSpacing="0.08em">FREE</text>

                  {/* KUNDALI Subheading */}
                  <text x="100" y="106" textAnchor="middle" fill="url(#sealGoldGrad)" fontFamily="'Cinzel', serif" fontSize="13.5" fontWeight="600" letterSpacing="0.26em">KUNDALI</text>

                  {/* Decorative Rule */}
                  <line x1="56" y1="117" x2="144" y2="117" stroke="url(#sealGoldGrad)" strokeWidth="0.8" opacity="0.75" />

                  {/* ON ORDERS ABOVE */}
                  <text x="100" y="130" textAnchor="middle" fill="#DFCA9E" fontFamily="'Outfit', sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="0.18em">ON ORDERS ABOVE</text>

                  {/* ₹2,000 */}
                  <text x="100" y="153" textAnchor="middle" fill="url(#sealGoldGrad)" fontFamily="'Cinzel', serif" fontSize="18" fontWeight="800" letterSpacing="0.04em">₹2,000</text>
                </g>
              </svg>
            </div>

            {/* Foreground Content Layer */}
            <div className="kundali-content-layer">
              {/* Top Eyebrow */}
              <div className="kundali-eyebrow">
                <span className="eyebrow-rule" />
                <span className="eyebrow-lotus">
                  <svg width="22" height="16" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 2C12 2 8 8 8 13C8 15.2 9.8 17 12 17C14.2 17 16 15.2 16 13C16 8 12 2 12 2Z" />
                    <path d="M12 17C9 17 5 14 4 10C6 10 9 12 11 15" />
                    <path d="M12 17C15 17 19 14 20 10C18 10 15 12 13 15" />
                    <path d="M3 13C3 13 4 15 6 16" />
                    <path d="M21 13C21 13 20 15 18 16" />
                  </svg>
                </span>
                <span className="eyebrow-text">EXCLUSIVE OFFER</span>
                <span className="eyebrow-rule" />
              </div>

              {/* Main Headline */}
              <h2 className="kundali-title">
                Your Kundali,
                <br />
                <span className="kundali-title-italic">on us</span>
                <span className="kundali-sparkle">✦</span>
              </h2>

              {/* Description Paragraph with Bold Highlights */}
              <p className="kundali-paragraph">
                Bring home your chosen spiritual pieces and receive a{' '}
                <strong className="kundali-bold-text">complimentary personalized Kundali</strong> with every order above{' '}
                <strong className="kundali-bold-text">₹2,000</strong>.
              </p>

              {/* 3 Steps Horizontal Process Track */}
              <div className="kundali-steps-track">
                {/* Horizontal Guide Dotted Line */}
                <div className="kundali-steps-line" />

                {/* Step 1 */}
                <div className="kundali-step-item">
                  <div className="kundali-step-header">
                    <span className="kundali-step-badge">1</span>
                    <span className="kundali-step-icon">
                      <ShoppingBag size={22} strokeWidth={1.3} />
                    </span>
                  </div>
                  <h4 className="kundali-step-heading">
                    Shop<br />Your Sacred Pieces
                  </h4>
                  <p className="kundali-step-desc">
                    Explore handcrafted malas and spiritual keepsakes.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="kundali-step-item">
                  <div className="kundali-step-header">
                    <span className="kundali-step-badge">2</span>
                    <span className="kundali-step-icon">
                      <ShoppingCart size={22} strokeWidth={1.3} />
                    </span>
                  </div>
                  <h4 className="kundali-step-heading">
                    Order Above<br />₹2,000
                  </h4>
                  <p className="kundali-step-desc">
                    Add your favorite pieces and place an order worth ₹2,000 or more.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="kundali-step-item">
                  <div className="kundali-step-header">
                    <span className="kundali-step-badge">3</span>
                    <span className="kundali-step-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <circle cx="12" cy="14" r="3" strokeDasharray="1.5 1.5" />
                        <line x1="9" y1="14" x2="15" y2="14" />
                        <line x1="12" y1="11" x2="12" y2="17" />
                      </svg>
                    </span>
                  </div>
                  <h4 className="kundali-step-heading">
                    Receive Your<br />Personalized Kundali
                  </h4>
                  <p className="kundali-step-desc">
                    Your Kundali, prepared by our expert astrologers, is included as a complimentary gift with your order.
                  </p>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="kundali-cta-row">
                <button
                  onClick={() => setIsKundaliModalOpen(true)}
                  className="btn-kundali-action"
                >
                  <span>AVAIL THE OFFER</span>
                  <span className="btn-circle-arrow">
                    <ArrowRight size={13} strokeWidth={2} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KUNDALI OFFER POPUP MODAL (AVAIL THE OFFER)
         ========================================================================= */}
      {isKundaliModalOpen && (
        <div 
          className="kundali-modal-backdrop" 
          onClick={resetKundaliModal}
        >
          <div 
            className="kundali-modal-card" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Ambient Celestial & Diya Glow */}
            <div className="modal-ambient-glow" />
            <div className="modal-diya-glow" />

            {/* Close Button */}
            <button 
              className="modal-close-btn" 
              onClick={resetKundaliModal}
              aria-label="Close dialog"
            >
              <X size={17} strokeWidth={2} />
            </button>

            {!kundaliSubmitted ? (
              <div className="modal-inner-content">
                {/* Eyebrow */}
                <div className="modal-eyebrow">
                  <span className="eyebrow-rule" />
                  <span className="eyebrow-lotus">
                    <svg width="22" height="16" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M12 2C12 2 8 8 8 13C8 15.2 9.8 17 12 17C14.2 17 16 15.2 16 13C16 8 12 2 12 2Z" />
                      <path d="M12 17C9 17 5 14 4 10C6 10 9 12 11 15" />
                      <path d="M12 17C15 17 19 14 20 10C18 10 15 12 13 15" />
                    </svg>
                  </span>
                  <span className="eyebrow-text">FREE VEDIC KUNDALI OFFER</span>
                  <span className="eyebrow-rule" />
                </div>

                {/* Headline */}
                <h3 className="modal-title">
                  Inscribe Your <span className="gold-italic">Birth Details</span>
                </h3>

                <p className="modal-subtext">
                  Provide your exact birth coordinates. Our Rishikesh astrologers will prepare your complimentary personalized Kundali chart included with every order above <strong style={{ color: '#F8F6F0' }}>₹2,000</strong>.
                </p>

                {/* Form */}
                <form onSubmit={handleKundaliSubmit} className="kundali-modal-form">
                  {/* Name Field */}
                  <div className="form-group">
                    <label className="form-label">
                      <User size={13} className="label-icon" />
                      <span>Full Name</span>
                    </label>
                    <div className="input-wrap">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arjun Sharma"
                        value={kundaliForm.name}
                        onChange={(e) => setKundaliForm({ ...kundaliForm, name: e.target.value })}
                        className="modal-input"
                      />
                    </div>
                  </div>

                  {/* Place of Birth */}
                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={13} className="label-icon" />
                      <span>Place of Birth (City / State / Country)</span>
                    </label>
                    <div className="input-wrap">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Varanasi, Uttar Pradesh"
                        value={kundaliForm.placeOfBirth}
                        onChange={(e) => setKundaliForm({ ...kundaliForm, placeOfBirth: e.target.value })}
                        className="modal-input"
                      />
                    </div>
                  </div>

                  {/* Date & Time Duo */}
                  <div className="form-row-duo">
                    {/* Date of Birth */}
                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={13} className="label-icon" />
                        <span>Date of Birth</span>
                      </label>
                      <div className="input-wrap">
                        <input
                          type="date"
                          required
                          value={kundaliForm.dob}
                          onChange={(e) => setKundaliForm({ ...kundaliForm, dob: e.target.value })}
                          className="modal-input date-input"
                        />
                      </div>
                    </div>

                    {/* Time of Birth */}
                    <div className="form-group">
                      <label className="form-label">
                        <Clock size={13} className="label-icon" />
                        <span>Time of Birth</span>
                      </label>
                      <div className="input-wrap">
                        <input
                          type="time"
                          value={kundaliForm.tob}
                          onChange={(e) => setKundaliForm({ ...kundaliForm, tob: e.target.value })}
                          className="modal-input time-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-hint">
                    * Exact birth time enables precise Ascendant (Lagna), planetary decan, and gemstone alignment.
                  </div>

                  {/* Submit Button */}
                  <div className="modal-actions">
                    <button type="submit" className="btn-kundali-action modal-submit-btn">
                      <span>CONFIRM & AVAIL OFFER</span>
                      <span className="btn-circle-arrow">
                        <ArrowRight size={13} strokeWidth={2} />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="modal-success-content">
                <div className="success-badge-rosette">
                  <span className="success-check-icon">✓</span>
                </div>

                <div className="modal-eyebrow" style={{ justifyContent: 'center' }}>
                  <span className="eyebrow-rule" />
                  <span className="eyebrow-text">VEDIC CONSECRATION RESERVED</span>
                  <span className="eyebrow-rule" />
                </div>

                <h3 className="modal-title" style={{ marginBottom: '12px' }}>
                  Your Kundali Is <span className="gold-italic">Reserved</span>
                </h3>

                <p className="modal-subtext" style={{ maxWidth: '440px', margin: '0 auto 24px' }}>
                  Birth coordinates for <strong style={{ color: '#F8F6F0' }}>{kundaliForm.name}</strong> ({kundaliForm.placeOfBirth}) have been successfully inscribed into our register. Your personalized physical Kundali box will be included complimentary with your order of ₹2,000 or more.
                </p>

                <div className="success-summary-card">
                  <div className="summary-row">
                    <span className="summary-label">Native:</span>
                    <span className="summary-val">{kundaliForm.name}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Birth Coordinates:</span>
                    <span className="summary-val">{kundaliForm.placeOfBirth}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Date & Time:</span>
                    <span className="summary-val">
                      {kundaliForm.dob} {kundaliForm.tob ? `· ${kundaliForm.tob}` : ''}
                    </span>
                  </div>
                  <div className="summary-row" style={{ borderTop: '1px solid rgba(197, 165, 114, 0.15)', paddingTop: '6px', marginTop: '2px' }}>
                    <span className="summary-label">Status:</span>
                    <span className="summary-val" style={{ color: '#DFCA9E' }}>COMPLIMENTARY ON ₹2,000+ ORDERS</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsKundaliModalOpen(false);
                    navigateTo('shop-all');
                  }}
                  className="btn-kundali-action"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>EXPLORE SACRED PIECES (₹2,000+)</span>
                  <span className="btn-circle-arrow">
                    <ArrowRight size={13} strokeWidth={2} />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}


      {/* =========================================================================
          SECTION 6: STONE FINDER (THE ORACLE)
         ========================================================================= */}
      <StoneFinder />





      {/* =========================================================================
          SECTION 8: NEPAL RUDRAKSHA — SACRED ORIGINS
         ========================================================================= */}
      <section className="section-rudraksha">
        <div className="container-custom">
          <div className="rudraksha-editorial-grid">
            {/* Left Image Plate */}
            <div className="rudraksha-visual-plate reveal-left">
              <img
                src="/assets/01home_img_2.jpg"
                alt="Authentic Nepal Rudraksha"
                className="rudraksha-main-img"
              />
              <div className="rudraksha-origin-plaque">
                NEPAL HIGH-ALTITUDE ORIGIN · GRADE A VEDIC SEED
              </div>
            </div>

            {/* Right Feature Breakdown */}
            <div className="rudraksha-content reveal-right">
              <span className="section-eyebrow">SACRED ORIGINS</span>
              <h2 className="section-title" style={{ marginBottom: '20px' }}>
                NEPAL <span className="gold-italic">rudraksha</span>
              </h2>
              <p className="rudraksha-text">
                Every bead is harvested sustainably from ancient Elaeocarpus ganitrus trees in the high Himalayas of Eastern Nepal, hand-inspected for natural mukhi channel clarity, water-tested for seed density, and consecrated with Vedic mantras.
              </p>

              <div className="rudraksha-attrs-grid">
                <div className="rudraksha-attr-cell">
                  <span className="attr-label">HIGH ALTITUDE</span>
                  <p className="attr-desc">Harvested above 2,000 meters in the sanctified Himalayan foothills.</p>
                </div>
                <div className="rudraksha-attr-cell">
                  <span className="attr-label">X-RAY VERIFIED</span>
                  <p className="attr-desc">Confirmed internal density and unbroken mukhi compartments.</p>
                </div>
                <div className="rudraksha-attr-cell">
                  <span className="attr-label">5 MUKHI VEDIC</span>
                  <p className="attr-desc">Ruled by Jupiter and aligned with universal peace and equanimity.</p>
                </div>
                <div className="rudraksha-attr-cell">
                  <span className="attr-label">CONSECRATED</span>
                  <p className="attr-desc">Sanctified with holy Ganga jal and infused with Vedic bija mantras.</p>
                </div>
              </div>

              <button
                onClick={() => navigateTo('rudraksha')}
                className="btn-outline"
                style={{ padding: '16px 38px' }}
              >
                <span>Explore Rudraksha Lineage</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 9: COMMUNITY TESTIMONIALS
         ========================================================================= */}
      <section className="section-reviews">
        <div className="container-custom">
          <div className="reviews-editorial-layout">
            {/* Left Big Score Display */}
            <div className="reviews-score-col reveal-left">
              <span className="section-eyebrow">TESTIMONIAL ARCHIVE</span>
              <div className="reviews-number-wrap">
                <span className="reviews-number">4.9</span>
                <div className="reviews-stars-block">
                  <div className="reviews-stars-row">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#C5A572', fontSize: '16px' }}>★</span>
                    ))}
                  </div>
                  <span className="reviews-verified-label">
                    1,480+ VERIFIED SEEKERS
                  </span>
                </div>
              </div>
              <h3 className="reviews-heading">Uncompromising Reverence</h3>
              <p className="reviews-text">
                Every bracelet is received as a consecrated talisman. Read candid reflections from wearers across the subcontinent.
              </p>
              <div className="reviews-verified-badge">
                <CheckCircle2 size={14} color="#C5A572" />
                <span>100% Authenticated Acquisitions</span>
              </div>
            </div>

            {/* Right Asymmetrical Testimonial Blocks */}
            <div className="reviews-cards-flow reveal-stagger">
              {[
                {
                  text: '“The pyrite and tiger eye combination has genuinely shifted my focus in high-stakes negotiations. The architectural restraint of the strand is unmatched.”',
                  name: 'Aarav M.',
                  location: 'Mumbai',
                  product: 'Life Path 8 Talisman'
                },
                {
                  text: '“The wooden keepsake box, authenticity seal, and sandalwood fragrance upon opening felt like receiving a temple blessing. Truly elevated craftsmanship.”',
                  name: 'Priyansha S.',
                  location: 'Bangalore',
                  product: 'Heart Line Rose'
                },
                {
                  text: '“Genuine high-grade Nepali seeds. The density and grounding vibration were tangible the moment I slipped it over my wrist. Worn daily.”',
                  name: 'Vikram D.',
                  location: 'New Delhi',
                  product: 'Five Mukhi Himalayan Strand'
                },
                {
                  text: '“Composed my own piece in the studio for meditation. The Uruguayan amethyst beads have an ethereal clarity that draws compliments constantly.”',
                  name: 'Ananya R.',
                  location: 'Pune',
                  product: 'Custom Atelier Piece'
                }
              ].map((review, idx) => (
                <div key={idx} className={`review-editorial-card ${idx % 2 === 1 ? 'review-stagger' : ''}`}>
                  <div className="review-stars-line">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#C5A572', fontSize: '11px' }}>★</span>
                    ))}
                  </div>
                  <p className="review-quote">{review.text}</p>
                  <div className="review-citation">
                    <strong style={{ color: '#F4F1EC', fontWeight: 500 }}>{review.name}</strong> · {review.location}
                    <span className="review-product-tag">{review.product}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* =========================================================================
          SECTION 11: SACRED PROMISES / VALUE PILLARS
         ========================================================================= */}
      <section className="section-promises">
        <div className="container-custom">
          <div className="promises-monolith-grid reveal-stagger">
            {[
              { icon: <ShieldCheck size={18} strokeWidth={1.5} />, title: '100% Certified Natural', desc: 'Every mineral verified authentic through rigorous gemological testing.' },
              { icon: <Sparkles size={18} strokeWidth={1.5} />, title: 'Hand-Strung in Rishikesh', desc: 'Crafted by generational temple artisans on durable jewelers silk.' },
              { icon: <Award size={18} strokeWidth={1.5} />, title: 'Vedic Consecration', desc: 'Sanctified with holy Ganga jal and planetary mantras prior to dispatch.' },
              { icon: <CheckCircle2 size={18} strokeWidth={1.5} />, title: '7-Day Sacred Guarantee', desc: 'Effortless millimeter size adjustment and complimentary restringing.' }
            ].map((item, idx) => (
              <div key={idx} className="promise-monolith-cell">
                <div className="promise-monolith-icon">
                  {item.icon}
                </div>
                <div>
                  <h4 className="promise-title">{item.title}</h4>
                  <p className="promise-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 12: PANORAMIC LUNAR DISPATCH NEWSLETTER
         ========================================================================= */}
      <section className="section-newsletter">
        <img
          src="/assets/home-desktop1440_img_15.jpg"
          alt="Wear your intention"
          className="newsletter-bg-img"
        />
        <div className="newsletter-dark-overlay" />

        <div className="newsletter-content reveal-scale">
          <span className="section-eyebrow" style={{ display: 'block', margin: '0 auto 16px' }}>
            THE LUNAR DISPATCH
          </span>

          <h2 className="newsletter-headline">
            A BRACELET WITH A<br />
            <span className="gold-italic">sacred intention</span>
          </h2>

          <p className="newsletter-subtext">
            Subscribe for astrological transit advisories, lunar eclipse consecration updates, and exclusive access to uncirculated Himalayan gemstone drops.
          </p>

          {!subscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your sacred email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="newsletter-input"
              />
              <button
                type="submit"
                className="btn-gold newsletter-btn"
              >
                Join the Circle
              </button>
            </form>
          ) : (
            <div className="newsletter-success-box">
              <Check size={14} color="#C5A572" />
              <span>You are now inscribed in the sacred lunar register</span>
            </div>
          )}

          <div className="newsletter-disclaimer">
            We transmit only purposeful astrological notices. Zero superfluous communications.
          </div>
        </div>
      </section>


      {/* =========================================================================
          EMBEDDED EDITORIAL STYLES
         ========================================================================= */}
      <style>{`
        /* ===== HOMEPAGE ROOT ===== */
        .homepage-root {
          background: #12091E;
          color: #F4F1EC;
          overflow-x: hidden;
        }

        /* ===== SECTION 1: HERO IMAGE CAROUSEL ===== */
        .hero-section {
          position: relative;
          min-height: calc(100vh - 76px);
          max-height: 620px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #12091E;
          overflow: hidden;
          border-bottom: 1px solid rgba(197, 165, 114, 0.15);
          outline: none;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hero-slide-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 1.2s;
          pointer-events: none;
        }
        .hero-slide-layer.is-active {
          opacity: 1;
          visibility: visible;
          z-index: 1;
        }
        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.8) contrast(1.06);
          transform: scale(1.0);
          transition: transform 7s ease-out;
        }
        .hero-slide-layer.is-active .hero-bg-img {
          transform: scale(1.05);
        }
        .hero-overlay-dark {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(90deg, rgba(18,9,30,0.88) 0%, rgba(18,9,30,0.65) 45%, rgba(18,9,30,0.2) 78%, rgba(18,9,30,0.5) 100%),
            linear-gradient(180deg, rgba(18,9,30,0.5) 0%, rgba(18,9,30,0.15) 35%, rgba(18,9,30,0.96) 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* Floating Side Chevrons — Revealed elegantly on hover to keep editorial copy pristine */
        .hero-nav-chevron {
          position: absolute;
          top: 48%;
          transform: translateY(-50%);
          z-index: 4;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(18, 9, 30, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(197, 165, 114, 0.35);
          color: #DFCA9E;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          opacity: 0;
          pointer-events: none;
        }
        .hero-section:hover .hero-nav-chevron {
          opacity: 0.85;
          pointer-events: auto;
        }
        .hero-nav-chevron:hover {
          opacity: 1 !important;
          background: rgba(197, 165, 114, 0.25);
          border-color: #C5A572;
          color: #FAF8F5;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 4px 24px rgba(197, 165, 114, 0.4);
        }
        .hero-nav-prev {
          left: 14px;
        }
        .hero-nav-next {
          right: 14px;
        }
        @media (max-width: 768px) {
          .hero-nav-chevron {
            display: none;
          }
        }

        /* Hero Content & Layout */
        .hero-content {
          position: relative;
          z-index: 3;
          padding-top: 36px;
          padding-bottom: 24px;
          margin-top: auto;
          margin-bottom: auto;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }
        .hero-editorial-wrap {
          max-width: 620px;
        }

        /* Luxury Carousel Dock (Bottom Right) */
        .hero-carousel-dock {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          background: rgba(18, 9, 30, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(197, 165, 114, 0.25);
          padding: 12px 18px;
          border-radius: 4px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          animation: fadeIn 0.8s ease 0.3s both;
          user-select: none;
        }
        .hero-dock-badge {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hero-dock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C5A572;
          box-shadow: 0 0 8px #C5A572;
        }
        .hero-dock-specimen {
          font-family: var(--font-sans);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: #DFCA9E;
          text-transform: uppercase;
        }
        .hero-dock-controls {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .hero-dock-counter {
          font-family: var(--font-sans);
          font-size: 11px;
          letter-spacing: 0.15em;
          color: #A8A39D;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .hero-dock-counter strong {
          color: #F4F1EC;
          font-weight: 600;
          font-size: 12px;
        }
        .counter-slash {
          color: rgba(197, 165, 114, 0.4);
        }
        .counter-total {
          color: #8E8896;
        }
        .hero-dock-bars {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-dock-bar {
          position: relative;
          width: 28px;
          height: 3px;
          border: none;
          background: rgba(197, 165, 114, 0.22);
          border-radius: 2px;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.2s, transform 0.2s;
        }
        .hero-dock-bar:hover {
          background: rgba(197, 165, 114, 0.45);
          transform: scaleY(1.4);
        }
        .hero-dock-bar.is-active {
          width: 38px;
          background: rgba(197, 165, 114, 0.3);
        }
        .hero-dock-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #DFCA9E, #C5A572);
          transform: scaleX(0);
          transform-origin: left;
        }
        .hero-dock-bar.is-active .hero-dock-fill {
          animation: heroFillProgress 5.5s linear forwards;
        }
        @keyframes heroFillProgress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .hero-dock-arrows {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 2px;
        }
        .hero-dock-arrow {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid rgba(197, 165, 114, 0.25);
          background: rgba(18, 9, 30, 0.5);
          color: #DFCA9E;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          padding: 0;
        }
        .hero-dock-arrow:hover {
          background: #C5A572;
          color: #12091E;
          border-color: #C5A572;
          transform: scale(1.1);
        }
        @media (max-width: 900px) {
          .hero-content {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-carousel-dock {
            align-self: flex-start;
            margin-top: 16px;
          }
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding-top: 40px;
          padding-bottom: 24px;
          margin-top: auto;
          margin-bottom: auto;
          width: 100%;
        }
        .hero-editorial-wrap {
          max-width: 620px;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-size: 11px;
        }
        .hero-headline {
          font-family: var(--font-editorial);
          font-size: clamp(42px, 5.8vw, 64px);
          font-weight: 300;
          letter-spacing: 0.02em;
          line-height: 1.05;
          color: #F4F1EC;
          margin-bottom: 14px;
        }
        .hero-headline-italic {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          color: #C5A572;
        }
        .hero-subtext {
          font-size: 15.5px;
          line-height: 1.65;
          color: #A8A39D;
          max-width: 490px;
          margin-bottom: 22px;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .hero-btn-primary {
          padding: 12px 28px;
        }
        .hero-btn-secondary {
          padding: 11px 26px;
          background: rgba(18, 9, 30, 0.7);
          backdrop-filter: blur(8px);
        }
        .hero-value-bar {
          position: relative;
          z-index: 2;
          background: rgba(18, 9, 30, 0.94);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(197, 165, 114, 0.15);
        }
        .value-bar-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          text-align: center;
        }
        .value-bar-item {
          padding: 13px 16px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: #F4F1EC;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .value-roman {
          font-family: var(--font-editorial);
          color: #C5A572;
          font-size: 14px;
          font-weight: 600;
        }
        .value-bar-item-border {
          border-left: 1px solid rgba(197, 165, 114, 0.12);
          border-right: 1px solid rgba(197, 165, 114, 0.12);
        }

        /* ===== SECTION 2: HOUSES (ASYMMETRICAL) ===== */
        .section-houses {
          padding: 56px 0;
          background: #12091E;
          border-bottom: 1px solid rgba(197, 165, 114, 0.15);
        }
        .section-header-editorial {
          margin-bottom: 24px;
        }
        .section-header-split {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
          flex-wrap: wrap;
        }
        .section-subtitle {
          font-size: 14.5px;
          line-height: 1.6;
          color: #A8A39D;
          max-width: 460px;
        }
        .houses-editorial-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          align-items: stretch;
        }
        .house-plate {
          position: relative;
          border-radius: 0;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: #180D28;
          border: 1px solid rgba(197, 165, 114, 0.15);
          transition: border-color 0.4s ease, background 0.4s ease;
        }
        .house-plate:hover {
          border-color: rgba(197, 165, 114, 0.45);
        }
        .house-plate-primary {
          min-height: 380px;
          padding: 22px 24px;
        }
        .house-staggered-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .house-plate-secondary {
          min-height: 114px;
          padding: 14px 16px;
        }
        .house-plate-atelier {
          padding: 16px 18px;
          background: #1F1134;
          border-left: 2px solid #C5A572;
        }
        .house-plate-img-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .house-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
          filter: brightness(0.85) contrast(1.05);
        }
        .house-plate:hover .house-img {
          transform: scale(1.04);
          filter: brightness(0.92) contrast(1.08);
        }
        .house-plate-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(18,9,30,0.2) 0%, rgba(18,9,30,0.7) 60%, rgba(18,9,30,0.96) 100%);
          pointer-events: none;
        }
        .house-plate-content {
          position: relative;
          z-index: 2;
        }
        .house-plate-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .house-roman-label {
          font-family: var(--font-sans);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #C5A572;
        }
        .house-specimen-count {
          font-family: var(--font-sans);
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #A8A39D;
        }
        .house-title {
          font-family: var(--font-editorial);
          font-size: 30px;
          font-weight: 400;
          letter-spacing: 0.03em;
          color: #F4F1EC;
          margin-bottom: 6px;
        }
        .house-title-sm {
          font-family: var(--font-editorial);
          font-size: 21px;
          font-weight: 400;
          letter-spacing: 0.03em;
          color: #F4F1EC;
          margin-bottom: 4px;
        }
        .house-desc {
          font-size: 14px;
          color: #A8A39D;
          line-height: 1.55;
          margin-bottom: 12px;
          max-width: 420px;
        }
        .house-desc-sm {
          font-size: 12px;
          color: #A8A39D;
          line-height: 1.45;
          margin-bottom: 8px;
        }
        .house-action-line {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C5A572;
          transition: gap 0.25s ease;
        }
        .house-plate:hover .house-action-line {
          gap: 10px;
          color: #DFCA9E;
        }

        /* ===== SECTION 3: FEATURED (CHOSEN OFTEN) ===== */
        .section-featured {
          padding: 60px 0 68px 0;
          background: linear-gradient(180deg, #F6EEDD 0%, #EFE3CA 100%);
          border-top: 1px solid rgba(197, 165, 114, 0.35);
          border-bottom: 1px solid rgba(197, 165, 114, 0.35);
          position: relative;
        }
        .collection-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 32px;
        }
        .collection-title-col {
          display: flex;
          flex-direction: column;
        }
        .collection-eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .collection-eyebrow {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #8C7245;
          text-transform: uppercase;
        }
        .collection-eyebrow-dash {
          width: 34px;
          height: 1.5px;
          background: #C5A572;
          display: inline-block;
        }
        .collection-title {
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(36px, 4.2vw, 48px);
          font-weight: 500;
          color: #1A160F;
          line-height: 1.15;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
        }
        .collection-italic {
          font-style: italic;
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          color: #9B783E;
          font-weight: 400;
        }
        .collection-subtitle {
          font-family: var(--font-sans);
          font-size: 15px;
          color: #695B44;
          margin: 0;
          line-height: 1.4;
        }
        .collection-controls-col {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .collection-pills {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .collection-pill {
          padding: 9px 20px;
          border-radius: 9999px;
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 500;
          border: 1px solid rgba(197, 165, 114, 0.35);
          background: #FAF4E8;
          color: #3B3120;
          cursor: pointer;
          transition: all 0.2s ease;
          line-height: 1;
        }
        .collection-pill:hover {
          border-color: #C5A572;
          background: #F3E7CF;
          color: #1A160F;
        }
        .collection-pill.is-active {
          background: #967439;
          border-color: #967439;
          color: #FFFFFF;
        }
        .collection-nav-arrows {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .collection-arrow-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(197, 165, 114, 0.35);
          background: #FAF4E8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #55442A;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .collection-arrow-btn:hover {
          border-color: #C5A572;
          color: #1A160F;
          background: #F3E7CF;
        }
        .chosen-often-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .chosen-often-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .chosen-often-grid {
            grid-template-columns: 1fr;
          }
        }
        .section-cta-center {
          text-align: center;
          margin-top: 36px;
        }
        .collection-see-all-btn {
          padding: 13px 34px;
          border: 1px solid rgba(197, 165, 114, 0.4);
          background: #FAF4E8;
          color: #262016;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .collection-see-all-btn:hover {
          border-color: #C5A572;
          color: #1A160F;
          background: #F3E7CF;
        }

        /* ===== SECTION 4: FLASH OFFER ===== */
        .section-flash {
          padding: 56px 0;
          background: #12091E;
          
          position: relative;
        }
        .flash-editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          align-items: center;
          gap: 36px;
        }
        .flash-info {
          max-width: 440px;
        }
        .flash-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: #A8A39D;
          margin-bottom: 20px;
        }
        .countdown-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        .countdown-box {
          background: #180D28;
          border: 1px solid rgba(197, 165, 114, 0.18);
          border-radius: 0;
          padding: 8px 12px;
          text-align: center;
          min-width: 58px;
        }
        .countdown-value {
          font-family: var(--font-editorial);
          font-size: 28px;
          font-weight: 400;
          color: #F4F1EC;
          line-height: 1;
        }
        .countdown-label {
          font-size: 10px;
          color: #C5A572;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .countdown-divider {
          font-family: var(--font-editorial);
          font-size: 20px;
          color: rgba(197, 165, 114, 0.3);
        }
        .flash-products-stagger {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .flash-specimen-card.stagger-down {
          margin-top: 18px;
        }
        .flash-specimen-card {
          background: #180D28;
          border: 1px solid rgba(197, 165, 114, 0.15);
          border-radius: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s ease;
        }
        .flash-specimen-card:hover {
          border-color: rgba(197, 165, 114, 0.45);
        }
        .flash-img-plate {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          cursor: pointer;
          overflow: hidden;
          background: #12091E;
        }
        .flash-img-plate .product-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .flash-specimen-card:hover .flash-img-plate .product-card-img {
          transform: scale(1.05);
        }
        .flash-badge-architectural {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(18, 9, 30, 0.9);
          border: 1px solid rgba(197, 165, 114, 0.3);
          padding: 4px 10px;
          border-radius: 0;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #C5A572;
          text-transform: uppercase;
        }
        .flash-specimen-info {
          padding: 14px 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-top: 1px solid rgba(197, 165, 114, 0.12);
        }
        .flash-stars-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 4px;
        }
        .flash-rating {
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #A8A39D;
          text-transform: uppercase;
        }
        .flash-specimen-name {
          font-family: var(--font-editorial);
          font-size: 19px;
          font-weight: 400;
          color: #F4F1EC;
          cursor: pointer;
          margin-bottom: 4px;
        }
        .flash-specimen-tagline {
          font-size: 12.5px;
          color: #A8A39D;
          line-height: 1.45;
          margin-bottom: 12px;
        }
        .flash-specimen-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid rgba(197, 165, 114, 0.1);
        }
        .flash-pricing-wrap {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .flash-price {
          font-family: var(--font-sans);
          font-size: 14.5px;
          font-weight: 600;
          color: #C5A572;
        }
        .flash-original-price {
          font-size: 12px;
          color: #75716B;
          text-decoration: line-through;
        }
        .flash-acquire-btn {
          background: transparent;
          border: 1px solid rgba(197, 165, 114, 0.35);
          color: #F4F1EC;
          padding: 7px 12px;
          border-radius: 0;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.2s ease;
        }
        .flash-acquire-btn:hover {
          background: #C5A572;
          color: #12091E;
          border-color: #C5A572;
        }

        /* ===== SECTION 5: KUNDALI OFFER (EXCLUSIVE OFFER) ===== */
        .section-kundali-offer {
          padding: 30px 0;
          background: #12091E;
          position: relative;
          
          border-bottom: 1px solid rgba(197, 165, 114, 0.12);
          overflow: hidden;
        }

        /* Banner Outer Frame */
        .kundali-banner-wrapper {
          position: relative;
          width: 100%;
          min-height: 520px;
          border-radius: 4px;
          background: #12091E;
          border: 1px solid rgba(197, 165, 114, 0.18);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        /* High-Definition Seamless Panorama Backdrop */
        .kundali-banner-backdrop {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        .kundali-backdrop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
          display: block;
          filter: contrast(1.04) brightness(1.02);
        }

        /* Enhanced Multi-Directional Fade Blending */
        .kundali-banner-backdrop::after {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            /* Smooth left content darkening so typography has 100% legibility */
            linear-gradient(to right, #12091E 0%, #12091E 34%, rgba(18, 9, 30, 0.85) 46%, rgba(18, 9, 30, 0.3) 58%, transparent 68%),
            /* Right edge enhanced fade blending into dark theme #12091E */
            linear-gradient(to left, #12091E 0%, rgba(18, 9, 30, 0.9) 6%, rgba(18, 9, 30, 0.45) 14%, transparent 24%),
            /* Top and bottom subtle atmospheric blending */
            linear-gradient(to bottom, #12091E 0%, rgba(18, 9, 30, 0.4) 6%, transparent 16%, transparent 84%, rgba(18, 9, 30, 0.5) 94%, #12091E 100%);
          pointer-events: none;
        }

        /* Vector Scalloped Rosette Seal */
        .kundali-rosette-seal {
          position: absolute;
          top: 14%;
          left: clamp(480px, 48.5%, 650px);
          width: 175px;
          height: 175px;
          z-index: 3;
          pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kundali-banner-wrapper:hover .kundali-rosette-seal {
          transform: translateY(-3px) scale(1.02);
        }
        .rosette-svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        /* Foreground Content Layer */
        .kundali-content-layer {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 530px;
          padding: 44px 0 44px 56px;
        }

        /* Top Eyebrow */
        .kundali-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .eyebrow-rule {
          width: 34px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(197, 165, 114, 0.55));
        }
        .kundali-eyebrow .eyebrow-rule:last-child {
          background: linear-gradient(to left, transparent, rgba(197, 165, 114, 0.55));
        }
        .eyebrow-lotus {
          display: flex;
          align-items: center;
          color: #C5A572;
        }
        .eyebrow-text {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.28em;
          color: #C5A572;
          text-transform: uppercase;
        }

        /* Main Headline */
        .kundali-title {
          font-family: var(--font-editorial);
          font-size: clamp(38px, 4vw, 54px);
          line-height: 1.06;
          font-weight: 500;
          color: #F8F6F0;
          letter-spacing: -0.015em;
          margin-bottom: 16px;
        }
        .kundali-title-italic {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          color: #CFA968;
        }
        .kundali-sparkle {
          display: inline-block;
          font-size: 0.55em;
          vertical-align: 4px;
          margin-left: 8px;
          color: #E8CF94;
          font-style: normal;
          filter: drop-shadow(0 0 8px rgba(232, 207, 148, 0.8));
        }

        /* Subtitle Paragraph */
        .kundali-paragraph {
          font-family: var(--font-sans);
          font-size: 14.5px;
          line-height: 1.55;
          color: #9E9893;
          max-width: 440px;
          margin-bottom: 26px;
        }
        .kundali-bold-text {
          color: #F8F6F0;
          font-weight: 600;
        }

        /* 3 Steps Process Track */
        .kundali-steps-track {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
          position: relative;
        }
        .kundali-steps-line {
          position: absolute;
          top: 11px;
          left: 28px;
          right: 28px;
          height: 1px;
          border-top: 1px dotted rgba(197, 165, 114, 0.35);
          pointer-events: none;
          z-index: 1;
        }
        .kundali-step-item {
          position: relative;
          z-index: 2;
        }
        .kundali-step-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .kundali-step-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #C79D58;
          color: #12091E;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
          flex-shrink: 0;
        }
        .kundali-step-icon {
          color: #C79D58;
          display: flex;
          align-items: center;
          transition: transform 0.25s ease;
        }
        .kundali-step-item:hover .kundali-step-icon {
          transform: translateY(-2px);
          color: #DFCA9E;
        }
        .kundali-step-heading {
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 600;
          color: #F8F6F0;
          line-height: 1.25;
          margin-bottom: 6px;
          min-height: 34px;
        }
        .kundali-step-desc {
          font-family: var(--font-sans);
          font-size: 11px;
          line-height: 1.45;
          color: #8C8680;
          max-width: 135px;
        }

        /* Call To Action Button */
        .kundali-cta-row {
          display: flex;
          align-items: center;
        }
        .btn-kundali-action {
          background: #C79D58;
          color: #12091E;
          border: none;
          padding: 13px 26px;
          font-family: var(--font-sans);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
        }
        .btn-kundali-action:hover {
          background: #DFCA9E;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(197, 165, 114, 0.45);
        }
        .btn-circle-arrow {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1.5px solid #12091E;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }
        .btn-kundali-action:hover .btn-circle-arrow {
          transform: translateX(3px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .kundali-banner-wrapper {
            flex-direction: column;
            min-height: auto;
          }
          .kundali-content-layer {
            max-width: 100%;
            padding: 36px 24px 24px;
          }
          .kundali-banner-backdrop {
            position: relative;
            height: 400px;
          }
          .kundali-backdrop-img {
            object-position: center;
          }
          .kundali-rosette-seal {
            top: auto;
            bottom: 270px;
            left: 50%;
            transform: translateX(-50%);
            width: 145px;
            height: 145px;
          }
        }
        @media (max-width: 640px) {
          .kundali-steps-track {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .kundali-steps-line {
            display: none;
          }
          .kundali-step-desc {
            max-width: 100%;
          }
          .kundali-banner-backdrop {
            height: 320px;
          }
          .kundali-rosette-seal {
            bottom: 220px;
            width: 130px;
            height: 130px;
          }
        }

        /* ===== KUNDALI OFFER POPUP MODAL ===== */
        .kundali-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(8, 3, 14, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.25s ease-out forwards;
        }

        .kundali-modal-card {
          position: relative;
          width: 100%;
          max-width: 520px;
          background: linear-gradient(145deg, #180D28 0%, #12091E 100%);
          border: 1px solid rgba(197, 165, 114, 0.32);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.9), 0 0 45px rgba(197, 165, 114, 0.15);
          padding: 38px 36px 34px;
          border-radius: 4px;
          color: #F8F6F0;
          overflow: hidden;
          animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .modal-ambient-glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 165, 114, 0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .modal-diya-glow {
          position: absolute;
          bottom: -40px;
          left: -40px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(235, 160, 60, 0.14) 0%, transparent 70%);
          pointer-events: none;
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(18, 9, 30, 0.85);
          border: 1px solid rgba(197, 165, 114, 0.25);
          color: #A8A39D;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          z-index: 5;
        }
        .modal-close-btn:hover {
          color: #F8F6F0;
          border-color: #C5A572;
          background: rgba(197, 165, 114, 0.18);
          transform: rotate(90deg);
        }

        .modal-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .modal-title {
          font-family: var(--font-editorial);
          font-size: clamp(26px, 3.2vw, 32px);
          font-weight: 500;
          line-height: 1.15;
          color: #F8F6F0;
          margin-bottom: 10px;
        }

        .modal-subtext {
          font-family: var(--font-sans);
          font-size: 13.5px;
          line-height: 1.55;
          color: #A8A39D;
          margin-bottom: 22px;
        }

        .kundali-modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C5A572;
        }
        .label-icon {
          color: #C5A572;
        }

        .input-wrap {
          position: relative;
        }

        .modal-input {
          width: 100%;
          background: rgba(14, 6, 22, 0.75);
          border: 1px solid rgba(197, 165, 114, 0.25);
          border-radius: 0;
          color: #F8F6F0;
          font-family: var(--font-sans);
          font-size: 13.5px;
          padding: 11px 14px;
          outline: none;
          transition: all 0.2s ease;
        }
        .modal-input:focus {
          border-color: #C5A572;
          box-shadow: 0 0 12px rgba(197, 165, 114, 0.22);
          background: rgba(18, 9, 30, 0.95);
        }
        .modal-input::placeholder {
          color: #6C665F;
        }

        .form-row-duo {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .date-input, .time-input {
          color-scheme: dark;
        }

        .form-hint {
          font-family: var(--font-sans);
          font-size: 11px;
          color: #8C8680;
          font-style: italic;
          line-height: 1.45;
        }

        .modal-submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px 24px;
          margin-top: 4px;
        }

        /* Success Card inside Modal */
        .modal-success-content {
          text-align: center;
          padding: 8px 0;
        }
        .success-badge-rosette {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #DFCA9E 0%, #C5A572 100%);
          color: #12091E;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-weight: 800;
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(197, 165, 114, 0.4);
        }
        .success-summary-card {
          background: rgba(14, 6, 22, 0.75);
          border: 1px solid rgba(197, 165, 114, 0.22);
          padding: 14px 18px;
          margin-bottom: 22px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 12.5px;
        }
        .summary-label {
          color: #A8A39D;
        }
        .summary-val {
          color: #C5A572;
          font-weight: 500;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 540px) {
          .kundali-modal-card {
            padding: 28px 18px 24px;
          }
          .form-row-duo {
            grid-template-columns: 1fr;
          }
        }



        /* ===== SECTION 8: RUDRAKSHA ===== */
        .section-rudraksha {
          padding: 56px 0;
          background: #12091E;
          border-bottom: 1px solid rgba(197, 165, 114, 0.15);
        }
        .rudraksha-editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 36px;
        }
        .rudraksha-visual-plate {
          position: relative;
          border-radius: 0;
          overflow: hidden;
          border: 1px solid rgba(197, 165, 114, 0.18);
          background: #180D28;
        }
        .rudraksha-main-img {
          width: 100%;
          aspect-ratio: 16 / 11;
          object-fit: cover;
          display: block;
          filter: brightness(0.88) contrast(1.05);
        }
        .rudraksha-origin-plaque {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(18, 9, 30, 0.9);
          border: 1px solid rgba(197, 165, 114, 0.25);
          padding: 6px 14px;
          border-radius: 0;
          font-size: 10.5px;
          font-weight: 600;
          color: #C5A572;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .rudraksha-text {
          font-size: 15.5px;
          line-height: 1.65;
          color: #A8A39D;
          margin-bottom: 22px;
        }
        .rudraksha-attrs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 26px;
        }
        .rudraksha-attr-cell {
          background: #180D28;
          border: 1px solid rgba(197, 165, 114, 0.15);
          border-radius: 0;
          padding: 12px 14px;
        }
        .attr-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #C5A572;
          display: block;
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .attr-desc {
          font-size: 12.5px;
          color: #A8A39D;
          line-height: 1.45;
        }

        /* ===== SECTION 9: REVIEWS ===== */
        .section-reviews {
          padding: 56px 0;
          background: #12091E;
          border-bottom: 1px solid rgba(197, 165, 114, 0.15);
        }
        .reviews-editorial-layout {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 36px;
          align-items: start;
        }
        .reviews-score-col {
          max-width: 320px;
        }
        .reviews-number-wrap {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin: 10px 0 6px;
        }
        .reviews-number {
          font-family: var(--font-editorial);
          font-size: 48px;
          font-weight: 300;
          color: #F4F1EC;
          line-height: 1;
        }
        .reviews-stars-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .reviews-stars-row {
          display: flex;
          gap: 2px;
        }
        .reviews-verified-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #C5A572;
          text-transform: uppercase;
        }
        .reviews-heading {
          font-family: var(--font-editorial);
          font-size: 21px;
          font-weight: 400;
          color: #F4F1EC;
          margin-bottom: 6px;
        }
        .reviews-text {
          font-size: 14.5px;
          line-height: 1.6;
          color: #A8A39D;
          margin-bottom: 18px;
        }
        .reviews-verified-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: #C5A572;
          text-transform: uppercase;
        }
        .reviews-cards-flow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .review-editorial-card.review-stagger {
          margin-top: 16px;
        }
        .review-editorial-card {
          background: #180D28;
          border: 1px solid rgba(197, 165, 114, 0.15);
          border-radius: 0;
          padding: 18px 20px;
          transition: border-color 0.3s ease;
        }
        .review-editorial-card:hover {
          border-color: rgba(197, 165, 114, 0.4);
        }
        .review-stars-line {
          display: flex;
          gap: 2px;
          margin-bottom: 8px;
        }
        .review-quote {
          font-size: 13.5px;
          color: #F4F1EC;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .review-citation {
          font-size: 12px;
          color: #A8A39D;
        }
        .review-product-tag {
          display: block;
          font-size: 11px;
          color: #C5A572;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* ===== SECTION 11: PROMISES ===== */
        .section-promises {
          padding: 44px 0;
          background: #12091E;
          border-bottom: 1px solid rgba(197, 165, 114, 0.15);
        }
        .promises-monolith-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .promise-monolith-cell {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .promise-monolith-icon {
          width: 36px;
          height: 36px;
          border-radius: 0;
          background: #180D28;
          border: 1px solid rgba(197, 165, 114, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C5A572;
          flex-shrink: 0;
        }
        .promise-title {
          font-size: 12px;
          font-weight: 600;
          color: #F4F1EC;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 4px;
        }
        .promise-desc {
          font-size: 13px;
          color: #A8A39D;
          line-height: 1.45;
        }

        /* ===== SECTION 12: NEWSLETTER ===== */
        .section-newsletter {
          position: relative;
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #12091E;
          overflow: hidden;
          text-align: center;
          padding: 48px 20px;
        }
        .newsletter-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.22;
          filter: grayscale(100%) contrast(1.2);
        }
        .newsletter-dark-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(18,9,30,0.7) 0%, rgba(18,9,30,0.98) 85%);
        }
        .newsletter-content {
          position: relative;
          z-index: 2;
          max-width: 580px;
        }
        .newsletter-headline {
          font-family: var(--font-editorial);
          font-size: clamp(32px, 3.8vw, 44px);
          font-weight: 400;
          letter-spacing: 0.02em;
          color: #F4F1EC;
          line-height: 1.15;
          margin-bottom: 10px;
        }
        .newsletter-subtext {
          font-size: 14.5px;
          color: #A8A39D;
          line-height: 1.6;
          margin-bottom: 22px;
        }
        .newsletter-form {
          display: flex;
          max-width: 460px;
          margin: 0 auto;
          gap: 8px;
        }
        .newsletter-input {
          flex: 1;
          background: #180D28;
          border: 1px solid rgba(197, 165, 114, 0.25);
          border-radius: 0;
          padding: 13px 18px;
          color: #F4F1EC;
          font-size: 14px;
          outline: none;
          font-family: var(--font-sans);
          transition: border-color 0.25s;
        }
        .newsletter-input:focus {
          border-color: #C5A572;
        }
        .newsletter-btn {
          padding: 13px 26px;
          font-size: 12px;
          white-space: nowrap;
        }
        .newsletter-success-box {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 22px;
          background: rgba(197, 165, 114, 0.08);
          border: 1px solid rgba(197, 165, 114, 0.3);
          border-radius: 0;
          color: #C5A572;
          font-size: 11px;
          letter-spacing: 0.1em;
        }

        /* ===== RESPONSIVE BREAKPOINTS ===== */
        @media (max-width: 1200px) {
          .editorial-products-spread {
            grid-template-columns: 1fr;
          }
          .companion-card-wrap.stagger-offset {
            margin-top: 0;
          }
          .beads-editorial-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 992px) {
          .houses-editorial-layout {
            grid-template-columns: 1fr;
          }
          .house-plate-primary {
            min-height: 320px;
          }
          .flash-editorial-grid {
            grid-template-columns: 1fr;
          }
          .flash-specimen-card.stagger-down {
            margin-top: 0;
          }
          .atelier-editorial-grid {
            grid-template-columns: 1fr;
          }
          .rudraksha-editorial-grid {
            grid-template-columns: 1fr;
          }
          .reviews-editorial-layout {
            grid-template-columns: 1fr;
          }
          .journal-editorial-grid {
            grid-template-columns: 1fr;
          }
          .journal-entry-card.journal-stagger {
            margin-top: 0;
          }
          .promises-monolith-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .value-bar-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .value-bar-item-border {
            border-left: none;
            border-right: none;
            border-top: 1px solid rgba(197, 165, 114, 0.12);
            border-bottom: 1px solid rgba(197, 165, 114, 0.12);
          }
        }
        @media (max-width: 768px) {
          .section-houses,
          .section-featured,
          .section-flash,
          .section-atelier,
          .section-beads,
          .section-rudraksha,
          .section-reviews,
          .section-journal {
            padding: 44px 0;
          }
          .companion-gallery-col {
            grid-template-columns: 1fr;
          }
          .flash-products-stagger {
            grid-template-columns: 1fr;
          }
          .beads-editorial-grid {
            grid-template-columns: 1fr;
          }
          .reviews-cards-flow {
            grid-template-columns: 1fr;
          }
          .review-editorial-card.review-stagger {
            margin-top: 0;
          }
          .promises-monolith-grid {
            grid-template-columns: 1fr;
          }
          .section-header-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-content {
            padding-top: 40px;
            padding-bottom: 24px;
          }
          .hero-floating-plaque {
            top: auto;
            bottom: 100px;
            left: 16px;
          }
        }
        @media (max-width: 480px) {
          .newsletter-form {
            flex-direction: column;
          }
          .filter-tabs {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};
