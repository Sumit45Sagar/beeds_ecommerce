import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { ATELIER_PURPOSES } from '../data/atelier';
import { ArrowRight, Sparkles, Check, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export const STONE_FINDER_INTENTIONS = [
  {
    id: 'love',
    title: 'Love & Relationships',
    studioPurposeId: 'love',
    badgeText: 'LOVE & RELATIONSHIPS',
    stones: [
      {
        name: 'Rose Quartz',
        desc: 'Opens the heart to compassion, self-worth and tender connection.',
        image: '/assets/home-desktop1440_img_13.jpg'
      },
      {
        name: 'Strawberry Quartz',
        desc: 'Amplifies love energy with a lighter, optimistic charge.',
        image: '/assets/01home_img_11.jpg'
      },
      {
        name: 'Green Aventurine',
        desc: 'Opens pathways for opportunity, heart-led luck and steady gain.',
        image: '/assets/green_aventurine_beads.jpg'
      }
    ],
    bracelet: {
      id: 'heart-line-rose',
      name: 'Heart Line Rose Bracelet',
      price: 1899,
      image: '/assets/01home_img_4.jpg'
    }
  },
  {
    id: 'money',
    title: 'Money & Abundance',
    studioPurposeId: 'money',
    badgeText: 'MONEY & ABUNDANCE',
    stones: [
      {
        name: 'Pyrite',
        desc: 'Deflects scarcity mindsets and magnetizes golden merchant abundance.',
        image: '/assets/pyrite_beads_macro.jpg'
      },
      {
        name: 'Golden Citrine',
        desc: 'Warm solar vibration that stimulates cash flow, joy, and prosperity.',
        image: '/assets/01home_img_12.jpg'
      },
      {
        name: 'Green Aventurine',
        desc: 'Known as the stone of opportunity, aligning luck and steady expansion.',
        image: '/assets/green_aventurine_beads.jpg'
      }
    ],
    bracelet: {
      id: 'life-path-8',
      name: 'Life Path 8 Abundance Bracelet',
      price: 1899,
      image: '/assets/01home_img_6.jpg'
    }
  },
  {
    id: 'career',
    title: 'Career & Success',
    studioPurposeId: 'career',
    badgeText: 'CAREER & SUCCESS',
    stones: [
      {
        name: 'Golden Tiger Eye',
        desc: 'Sharpens strategic decision making, willpower, and executive focus.',
        image: '/assets/01home_img_13.jpg'
      },
      {
        name: 'Carnelian',
        desc: 'Ignites creative initiative, ambition, and charismatic leadership.',
        image: '/assets/01home_img_14.jpg'
      },
      {
        name: 'Solar Hematite',
        desc: 'Grounds high-pressure work tension and promotes steadfast resilience.',
        image: '/assets/01home_img_15.jpg'
      }
    ],
    bracelet: {
      id: 'aries-fire',
      name: 'Aries Fire Executive Strand',
      price: 1299,
      image: '/assets/01home_img_5.jpg'
    }
  },
  {
    id: 'confidence',
    title: 'Confidence & Personal Power',
    studioPurposeId: 'confidence',
    badgeText: 'CONFIDENCE & PERSONAL POWER',
    stones: [
      {
        name: 'Sunstone',
        desc: 'Channels radiant sovereign warmth, dissolving self-doubt and impostor feelings.',
        image: '/assets/home-desktop1440_img_10.jpg'
      },
      {
        name: 'Deep Garnet',
        desc: 'Strokes deep inner vitality, primal courage, and magnetic aura presence.',
        image: '/assets/14studio3birth_img_1.jpg'
      },
      {
        name: 'Golden Tiger Eye',
        desc: 'Radiates protective inner strength and unwavering self-assurance.',
        image: '/assets/01home_img_13.jpg'
      }
    ],
    bracelet: {
      id: 'aries-fire',
      name: 'Solar Vitality Sovereign Bracelet',
      price: 1299,
      image: '/assets/01home_img_5.jpg'
    }
  },
  {
    id: 'protection',
    title: 'Protection & Grounding',
    studioPurposeId: 'protection',
    badgeText: 'PROTECTION & GROUNDING',
    stones: [
      {
        name: 'Black Tourmaline',
        desc: 'Creates an impenetrable energetic boundary against psychic exhaustion and low vibrations.',
        image: '/assets/01home_img_15.jpg'
      },
      {
        name: 'Smoked Obsidian',
        desc: 'Vigorous volcanic talisman that absorbs negativity and clears heavy environmental fog.',
        image: '/assets/01home_img_8.jpg'
      },
      {
        name: 'Rainbow Moonstone',
        desc: 'Soothes emotional reactivity and restores peaceful cyclical equilibrium.',
        image: '/assets/14studio3birth_img_6.jpg'
      }
    ],
    bracelet: {
      id: 'tourmaline-grounding-shield',
      name: 'Black Tourmaline & Obsidian Shield',
      price: 1399,
      image: '/assets/01home_img_8.jpg'
    }
  },
  {
    id: 'clarity',
    title: 'Focus & Clarity',
    studioPurposeId: 'peace',
    badgeText: 'FOCUS & CLARITY',
    stones: [
      {
        name: 'Uruguayan Amethyst',
        desc: 'Stills mental restlessness, heightens perception, and quiets erratic thoughts.',
        image: '/assets/home-desktop1440_img_14.jpg'
      },
      {
        name: 'Rainbow Moonstone',
        desc: 'Master amplifier of intuition, dream recall, and peaceful cognitive coherence.',
        image: '/assets/14studio3birth_img_6.jpg'
      },
      {
        name: 'Lapis Lazuli',
        desc: 'Harmonizes analytical intellect with emotional truth, fostering calm concentration.',
        image: '/assets/04gemstones_img_2.jpg'
      }
    ],
    bracelet: {
      id: 'amethyst-calm-strand',
      name: 'Amethyst Calm Strand',
      price: 2499,
      image: '/assets/bag-desktop1440_img_2.jpg'
    }
  }
];

export function getZodiacSign(day, month) {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  if (isNaN(d) || isNaN(m) || d < 1 || d > 31 || m < 1 || m > 12) return null;

  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) {
    return { name: 'Aries', symbol: '♈', element: 'Fire', intentId: 'confidence' };
  } else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) {
    return { name: 'Taurus', symbol: '♉', element: 'Earth', intentId: 'money' };
  } else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) {
    return { name: 'Gemini', symbol: '♊', element: 'Air', intentId: 'clarity' };
  } else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) {
    return { name: 'Cancer', symbol: '♋', element: 'Water', intentId: 'love' };
  } else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) {
    return { name: 'Leo', symbol: '♌', element: 'Fire', intentId: 'confidence' };
  } else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) {
    return { name: 'Virgo', symbol: '♍', element: 'Earth', intentId: 'clarity' };
  } else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) {
    return { name: 'Libra', symbol: '♎', element: 'Air', intentId: 'love' };
  } else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) {
    return { name: 'Scorpio', symbol: '♏', element: 'Water', intentId: 'protection' };
  } else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) {
    return { name: 'Sagittarius', symbol: '♐', element: 'Fire', intentId: 'career' };
  } else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) {
    return { name: 'Capricorn', symbol: '♑', element: 'Earth', intentId: 'career' };
  } else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) {
    return { name: 'Aquarius', symbol: '♒', element: 'Air', intentId: 'clarity' };
  } else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) {
    return { name: 'Pisces', symbol: '♓', element: 'Water', intentId: 'love' };
  }
  return null;
}

export const StoneFinder = () => {
  const { navigateTo, setSelectedPurpose, setStudioStep, showToast } = useShop();

  const [selectedIntentId, setSelectedIntentId] = useState('love');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [zodiacFeedback, setZodiacFeedback] = useState(null);

  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const currentIntent = STONE_FINDER_INTENTIONS.find(i => i.id === selectedIntentId) || STONE_FINDER_INTENTIONS[0];

  const handleDayChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(val);
    if (val.length === 2 && monthRef.current) {
      monthRef.current.focus();
    }
  };

  const handleMonthChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonth(val);
    if (val.length === 2 && yearRef.current) {
      yearRef.current.focus();
    }
  };

  const handleYearChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(val);
  };

  const handleDateSubmit = (e) => {
    if (e) e.preventDefault();
    if (!day || !month) {
      showToast('Please enter your birth day (DD) and month (MM)', 'muted');
      return;
    }
    const sign = getZodiacSign(day, month);
    if (sign) {
      setSelectedIntentId(sign.intentId);
      const matched = STONE_FINDER_INTENTIONS.find(i => i.id === sign.intentId);
      setZodiacFeedback({
        sign: sign.name,
        symbol: sign.symbol,
        element: sign.element,
        title: matched?.title
      });
      showToast(`✨ ${sign.name} (${sign.symbol}) aligned with ${matched?.title}!`, 'gold');
    } else {
      showToast('Please enter a valid calendar date', 'muted');
    }
  };

  const handleSelectIntent = (id) => {
    setSelectedIntentId(id);
    setZodiacFeedback(null);
  };

  const handleCompose = () => {
    const targetPurpose = ATELIER_PURPOSES.find(p => p.id === currentIntent.studioPurposeId) || ATELIER_PURPOSES[0];
    setSelectedPurpose(targetPurpose);
    setStudioStep(2);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F5DC93', '#D9AE4F', '#ECC870', '#C39AF0']
    });

    showToast(`Stones for ${currentIntent.title} loaded into Studio Atelier`, 'gold');
    navigateTo('studio');
  };

  return (
    <section id="stone-finder" className="section-oracle-finder">
      <div className="container-custom">
        {/* Main Architectural Card in "OUR COLLECTION" Warm Luxury Language */}
        <div className="oracle-showcase-card reveal-on-scroll">
          <div className="oracle-grid-layout">
            
            {/* =========================================================
                LEFT COLUMN: INTENTION & NATAL BIRTH DATE SELECTOR
               ========================================================= */}
            <div className="oracle-left-col">
              {/* Eyebrow in exact OUR COLLECTION format */}
              <div className="collection-eyebrow-wrap oracle-eyebrow-row">
                <span className="collection-eyebrow">THE ORACLE</span>
                <span className="collection-eyebrow-dash" />
                <span className="collection-eyebrow" style={{ color: '#967439' }}>STONE FINDER</span>
              </div>

              {/* Serif Headline with Italic Accent */}
              <h2 className="collection-title oracle-title">
                FIND YOUR <span className="collection-italic">stone.</span>
              </h2>

              {/* Subtitle */}
              <p className="collection-subtitle oracle-subtitle">
                Disclose your spiritual focus or sacred date of birth. We identify mineral frequencies aligned with your energy centres.
              </p>

              {/* Step I Header */}
              <div className="oracle-step-header">
                <div className="oracle-step-badge">I</div>
                <span className="oracle-step-label">SELECT INTENTION OR ALIGNMENT</span>
              </div>

              {/* 6 Intentions — Styled as Refined Pill Cards referencing Chosen Often */}
              <div className="oracle-intentions-grid">
                {STONE_FINDER_INTENTIONS.map((intent) => {
                  const isSelected = intent.id === selectedIntentId;
                  return (
                    <button
                      key={intent.id}
                      onClick={() => handleSelectIntent(intent.id)}
                      className={`oracle-intent-pill ${isSelected ? 'is-active' : ''}`}
                      type="button"
                    >
                      <span className="intent-pill-title">{intent.title}</span>
                      <span className="intent-pill-check">
                        {isSelected ? <Check size={12} strokeWidth={2.8} /> : <span className="intent-dot" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Natal Date Divider */}
              <div className="oracle-date-divider">
                <span className="date-divider-line" />
                <span className="date-divider-text">OR BY NATAL BIRTH DATE</span>
                <span className="date-divider-line" />
              </div>

              {/* Birth Date Input Row */}
              <form onSubmit={handleDateSubmit} className="oracle-date-form">
                <div className="oracle-date-inputs">
                  <div className="date-field">
                    <input
                      type="text"
                      placeholder="DD"
                      value={day}
                      onChange={handleDayChange}
                      maxLength={2}
                      className="oracle-input"
                      aria-label="Birth Day"
                    />
                    <span className="date-field-sub">Day</span>
                  </div>

                  <span className="date-sep">/</span>

                  <div className="date-field">
                    <input
                      ref={monthRef}
                      type="text"
                      placeholder="MM"
                      value={month}
                      onChange={handleMonthChange}
                      maxLength={2}
                      className="oracle-input"
                      aria-label="Birth Month"
                    />
                    <span className="date-field-sub">Month</span>
                  </div>

                  <span className="date-sep">/</span>

                  <div className="date-field date-field-year">
                    <input
                      ref={yearRef}
                      type="text"
                      placeholder="YYYY"
                      value={year}
                      onChange={handleYearChange}
                      maxLength={4}
                      className="oracle-input oracle-input-year"
                      aria-label="Birth Year"
                    />
                    <span className="date-field-sub">Year</span>
                  </div>
                </div>

                <button
                  type="submit"
                  title="Find stones for your birth date"
                  className="oracle-date-btn"
                  aria-label="Calculate natal stones"
                >
                  <ArrowRight size={16} strokeWidth={2} />
                </button>

                {/* Zodiac Feedback Pill inlined if calculated */}
                {zodiacFeedback && (
                  <div className="oracle-zodiac-pill">
                    <Sparkles size={13} className="zodiac-sparkle" />
                    <span>
                      <strong>{zodiacFeedback.sign}</strong> {zodiacFeedback.symbol} ({zodiacFeedback.element})
                    </span>
                  </div>
                )}
              </form>
            </div>

            {/* Vertical Divider for Desktop Separation */}
            <div className="oracle-col-divider" />

            {/* =========================================================
                RIGHT COLUMN: 3 CONSECRATED MINERALS & READY-MADE TALISMAN
               ========================================================= */}
            <div className="oracle-right-col">
              {/* Step II Header */}
              <div className="oracle-step-header">
                <div className="oracle-step-badge">II</div>
                <span className="oracle-step-label">
                  CONSECRATED MINERALS · {currentIntent.badgeText}
                </span>
              </div>

              {/* 3 Stone Specimens Grid — Proportion Modeled on Product Cards */}
              <div className="oracle-stones-trio">
                {currentIntent.stones.map((stone, idx) => (
                  <div key={idx} className="oracle-stone-card">
                    {/* Visual Specimen Container with smooth zoom */}
                    <div className="stone-card-visual">
                      <img
                        src={stone.image}
                        alt={stone.name}
                        className="stone-card-img"
                        loading="lazy"
                      />
                      <div className="stone-specimen-badge">
                        <span>SPECIMEN {idx + 1}</span>
                      </div>
                    </div>

                    {/* Stone Details */}
                    <div className="stone-card-info">
                      <h4 className="stone-name">{stone.name}</h4>
                      <p className="stone-desc">{stone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Ready-Made Bracelet Card in Chosen Often ProductCard Language */}
              <div
                onClick={() => navigateTo('product', currentIntent.bracelet.id)}
                className="oracle-featured-bracelet"
              >
                <div className="featured-bracelet-left">
                  <div className="featured-img-wrap">
                    <img
                      src={currentIntent.bracelet.image}
                      alt={currentIntent.bracelet.name}
                      className="featured-thumb"
                    />
                  </div>

                  <div className="featured-info">
                    <div className="featured-badge-row">
                      <span className="modern-card-badge badge-bestseller">
                        READY-MADE SPECIMEN
                      </span>
                      <div className="featured-stars">
                        <Star size={11} fill="#C5A572" color="#C5A572" />
                        <span className="featured-star-val">5.0</span>
                      </div>
                    </div>
                    <h5 className="featured-title">{currentIntent.bracelet.name}</h5>
                    <div className="featured-price-line">
                      <span className="featured-price">
                        ₹{currentIntent.bracelet.price.toLocaleString('en-IN')}
                      </span>
                      <span className="featured-subtext">
                        · Ready to wear with these specimens
                      </span>
                    </div>
                  </div>
                </div>

                <div className="featured-bracelet-action">
                  <span className="featured-acquire-btn">
                    <span>Acquire</span>
                    <ArrowRight size={13} strokeWidth={2} />
                  </span>
                </div>
              </div>

              {/* Primary Action Button: "Compose in Atelier" matching collection-see-all-btn */}
              <div className="oracle-cta-row">
                <button
                  onClick={handleCompose}
                  className="oracle-compose-btn"
                >
                  <Sparkles size={15} />
                  <span>Compose in Atelier</span>
                  <ArrowRight size={15} strokeWidth={2} />
                </button>
                <span className="oracle-cta-note">
                  Loads these specimens directly onto your Rishikesh master strand
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>

      <style>{`
        /* ===== SECTION CONTAINER: LUXURIOUS BALANCED HEIGHT ===== */
        .section-oracle-finder {
          padding: 38px 0 44px 0;
          background: 
            radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.55) 0%, transparent 45%),
            radial-gradient(circle at 88% 82%, rgba(197, 165, 114, 0.16) 0%, transparent 55%),
            linear-gradient(180deg, #F6EEDD 0%, #EFE3CA 100%);
          border-top: 1px solid rgba(197, 165, 114, 0.35);
          border-bottom: 1px solid rgba(197, 165, 114, 0.35);
          position: relative;
        }

        /* ===== MAIN ELEVATED CARD (BALANCED LUXURY PROPORTIONS) ===== */
        .oracle-showcase-card {
          background: #FAF5EB;
          border-radius: 16px;
          border: 1px solid rgba(197, 165, 114, 0.38);
          box-shadow: 
            0 10px 36px rgba(160, 126, 68, 0.13),
            0 2px 8px rgba(160, 126, 68, 0.05);
          padding: 30px 36px 28px 36px;
          position: relative;
          overflow: hidden;
        }

        /* Two-Column Grid */
        .oracle-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1px 1.22fr;
          gap: 32px;
          align-items: stretch;
        }

        .oracle-left-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .oracle-col-divider {
          background: linear-gradient(180deg, rgba(197, 165, 114, 0.1) 0%, rgba(197, 165, 114, 0.35) 25%, rgba(197, 165, 114, 0.35) 75%, rgba(197, 165, 114, 0.1) 100%);
          height: 100%;
          width: 1px;
        }

        .oracle-right-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Eyebrow */
        .oracle-eyebrow-row {
          margin-bottom: 6px !important;
          gap: 10px !important;
        }
        .oracle-eyebrow-row .collection-eyebrow {
          font-size: 11px !important;
          letter-spacing: 0.15em !important;
        }
        .oracle-eyebrow-row .collection-eyebrow-dash {
          width: 28px !important;
          height: 1.5px !important;
        }

        /* Title */
        .oracle-title {
          font-size: clamp(26px, 2.7vw, 33px) !important;
          line-height: 1.14 !important;
          margin-bottom: 6px !important;
        }

        /* Subtitle */
        .oracle-subtitle {
          font-size: 12.5px !important;
          line-height: 1.45 !important;
          margin-bottom: 16px !important;
          max-width: 460px;
        }

        /* Step Headers */
        .oracle-step-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .oracle-step-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FAF4E8;
          border: 1px solid rgba(197, 165, 114, 0.45);
          color: #967439;
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 5px rgba(140, 105, 50, 0.08);
          flex-shrink: 0;
        }
        .oracle-step-label {
          font-family: var(--font-sans);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          color: #8C7245;
        }

        /* Intentions 6-Pills Grid */
        .oracle-intentions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }
        .oracle-intent-pill {
          background: #FAF4E8;
          border: 1px solid rgba(197, 165, 114, 0.35);
          color: #3B3120;
          border-radius: 9999px;
          padding: 9px 15px;
          font-family: var(--font-sans);
          font-size: 11.8px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0.9, 0.3, 1);
          box-shadow: 0 1px 5px rgba(140, 105, 50, 0.04);
          text-align: left;
        }
        .oracle-intent-pill:hover {
          background: #F3E7CF;
          border-color: #C5A572;
          color: #1A160F;
          transform: translateY(-1px);
        }
        .oracle-intent-pill.is-active {
          background: #967439;
          border-color: #967439;
          color: #FFFFFF;
          box-shadow: 0 3px 12px rgba(150, 116, 57, 0.26);
        }
        .intent-pill-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .intent-pill-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: rgba(197, 165, 114, 0.25);
          flex-shrink: 0;
        }
        .oracle-intent-pill.is-active .intent-pill-check {
          background: #FFFFFF;
          color: #967439;
        }
        .intent-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #C5A572;
        }

        /* Natal Date Divider */
        .oracle-date-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 6px 0 12px;
        }
        .date-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(197, 165, 114, 0.25);
        }
        .date-divider-text {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.19em;
          text-transform: uppercase;
          color: #8C7245;
          white-space: nowrap;
        }

        /* Natal Date Form */
        .oracle-date-form {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .oracle-date-inputs {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #FAF4E8;
          border: 1px solid rgba(197, 165, 114, 0.35);
          border-radius: 10px;
          padding: 4px 10px;
          box-shadow: inset 0 1px 2px rgba(140, 105, 50, 0.04);
        }
        .date-field {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .oracle-input {
          width: 38px;
          height: 28px;
          background: transparent;
          border: none;
          color: #1A160F;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          outline: none;
          padding: 0;
        }
        .oracle-input::placeholder {
          color: #A89C8A;
          font-weight: 400;
        }
        .oracle-input-year {
          width: 52px;
        }
        .date-field-sub {
          font-size: 8.5px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8C7245;
          font-weight: 500;
          line-height: 1;
        }
        .date-sep {
          color: rgba(197, 165, 114, 0.5);
          font-weight: 300;
          font-size: 14px;
          margin-bottom: 9px;
        }
        .oracle-date-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: #967439;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 3px 10px rgba(150, 116, 57, 0.24);
          flex-shrink: 0;
        }
        .oracle-date-btn:hover {
          background: #7D602E;
          transform: scale(1.05);
        }

        /* Inlined Compact Zodiac Result Pill */
        .oracle-zodiac-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          background: #FAF4E8;
          border: 1px solid rgba(197, 165, 114, 0.45);
          border-radius: 9999px;
          font-family: var(--font-sans);
          font-size: 11px;
          letter-spacing: 0.03em;
          color: #8C7245;
          box-shadow: 0 1px 5px rgba(140, 105, 50, 0.06);
          animation: oracleFadeIn 0.3s ease;
        }
        .zodiac-sparkle {
          color: #967439;
        }

        /* ===== RIGHT COLUMN: 3 BALANCED STONES ===== */
        .oracle-stones-trio {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 14px;
        }

        /* Single Stone Card */
        .oracle-stone-card {
          background: #FAF5EB;
          border-radius: 12px;
          border: 1px solid rgba(197, 165, 114, 0.32);
          overflow: hidden;
          box-shadow: 0 3px 14px rgba(160, 126, 68, 0.07);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .oracle-stone-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(160, 126, 68, 0.18);
          border-color: rgba(197, 165, 114, 0.75);
        }

        .stone-card-visual {
          position: relative;
          width: 100%;
          aspect-ratio: 1.18;
          background: #EFE4CF;
          overflow: hidden;
        }
        .stone-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .oracle-stone-card:hover .stone-card-img {
          transform: scale(1.07);
        }

        .stone-specimen-badge {
          position: absolute;
          top: 6px;
          left: 6px;
          background: rgba(27, 33, 26, 0.85);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 2.5px 6px;
          border-radius: 3px;
        }

        .stone-card-info {
          padding: 9px 11px 11px 11px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .stone-name {
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-size: 15px;
          font-weight: 500;
          color: #1A160F;
          margin: 0 0 3px 0;
          letter-spacing: 0.01em;
          line-height: 1.22;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stone-desc {
          font-family: var(--font-sans);
          font-size: 10.5px;
          line-height: 1.4;
          color: #695B44;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ===== FEATURED BRACELET CARD ===== */
        .oracle-featured-bracelet {
          background: #FAF5EB;
          border-radius: 12px;
          border: 1px solid rgba(197, 165, 114, 0.35);
          padding: 9px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(160, 126, 68, 0.07);
          transition: all 0.25s ease;
        }
        .oracle-featured-bracelet:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(160, 126, 68, 0.16);
          border-color: #967439;
        }

        .featured-bracelet-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .featured-img-wrap {
          width: 46px;
          height: 46px;
          border-radius: 8px;
          overflow: hidden;
          background: #EFE4CF;
          border: 1px solid rgba(197, 165, 114, 0.35);
          flex-shrink: 0;
        }
        .featured-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .featured-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .featured-badge-row {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 2px;
        }
        .featured-badge-row .modern-card-badge {
          font-size: 8.5px;
          padding: 2.5px 6px;
        }
        .featured-stars {
          display: inline-flex;
          align-items: center;
          gap: 2.5px;
          font-size: 10px;
          font-weight: 600;
          color: #8C7245;
        }
        .featured-star-val {
          color: #8C7245;
        }
        .featured-title {
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-size: 15px;
          font-weight: 500;
          color: #1A160F;
          margin: 0 0 2px 0;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .featured-price-line {
          display: flex;
          align-items: baseline;
          gap: 6px;
          flex-wrap: wrap;
        }
        .featured-price {
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 700;
          color: #967439;
        }
        .featured-subtext {
          font-family: var(--font-sans);
          font-size: 10.5px;
          color: #695B44;
        }

        .featured-acquire-btn {
          padding: 7px 15px;
          border-radius: 9999px;
          background: #FAF4E8;
          border: 1px solid rgba(197, 165, 114, 0.4);
          color: #3B3120;
          font-family: var(--font-sans);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .oracle-featured-bracelet:hover .featured-acquire-btn {
          background: #967439;
          border-color: #967439;
          color: #FFFFFF;
        }

        /* ===== COMPOSE IN ATELIER CTA ===== */
        .oracle-cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .oracle-compose-btn {
          padding: 10px 26px;
          border: 1px solid #967439;
          background: #967439;
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 9999px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(150, 116, 57, 0.26);
          transition: all 0.2s cubic-bezier(0.2, 0.9, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .oracle-compose-btn:hover {
          background: #7D602E;
          border-color: #7D602E;
          transform: translateY(-1px);
          box-shadow: 0 7px 18px rgba(150, 116, 57, 0.34);
        }
        .oracle-cta-note {
          font-family: var(--font-sans);
          font-size: 11px;
          color: #695B44;
          font-style: italic;
          max-width: 300px;
          line-height: 1.3;
        }

        @keyframes oracleFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ===== RESPONSIVE BREAKPOINTS ===== */
        @media (max-width: 1080px) {
          .oracle-grid-layout {
            grid-template-columns: 1fr;
            gap: 26px;
          }
          .oracle-col-divider {
            display: none;
          }
          .oracle-subtitle {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .section-oracle-finder {
            padding: 24px 0 28px 0;
          }
          .oracle-showcase-card {
            padding: 22px 18px 20px 18px;
            border-radius: 14px;
          }
          .oracle-intentions-grid {
            grid-template-columns: 1fr;
          }
          .oracle-stones-trio {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .stone-card-info {
            padding: 7px 8px 8px 8px;
          }
          .stone-name {
            font-size: 13.5px;
          }
          .stone-desc {
            font-size: 10px;
          }
          .oracle-featured-bracelet {
            flex-direction: column;
            align-items: flex-start;
          }
          .featured-bracelet-action {
            width: 100%;
          }
          .featured-acquire-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 520px) {
          .oracle-stones-trio {
            grid-template-columns: 1fr;
          }
          .stone-card-visual {
            aspect-ratio: 16 / 9;
          }
          .oracle-date-form {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }
          .oracle-date-inputs {
            width: 100%;
            justify-content: center;
          }
          .oracle-date-btn {
            width: 100%;
            border-radius: 9999px;
            height: 38px;
          }
          .oracle-cta-row {
            flex-direction: column;
            align-items: stretch;
          }
          .oracle-compose-btn {
            justify-content: center;
          }
          .oracle-cta-note {
            max-width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};
