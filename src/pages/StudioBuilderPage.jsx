import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  FLOW_CATEGORIES,
  FLOW_STEPS,
  PURPOSES_DATA,
  ZODIAC_SIGNS,
  CHARMS_DATA,
  THREADS_DATA,
  ADDONS_DATA,
  calculateVedicProfile,
  FULL_CRYSTAL_CATALOG,
  getRecommendedCrystalsForIntention
} from '../data/atelierFlowData';
import { LiveStrandViewer } from '../components/LiveStrandViewer';
import { Check, Plus, Minus, RotateCw, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudioBuilderPage = () => {
  const { addCustomStrandToCart, showToast, setIsCartOpen } = useShop();

  // Read initial step from query param or hash if provided (e.g. ?step=2 or #studio/2)
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const stepParam = parseInt(params.get('step'), 10);
      if (stepParam >= 1 && stepParam <= 5) return stepParam;
      const hash = window.location.hash;
      const match = hash.match(/studio\/([1-5])/);
      if (match) return parseInt(match[1], 10);
    }
    return 1;
  });

  // Category filter in Step 1 ('purpose' | 'zodiac' | 'numerology' | 'planetary' | 'profession')
  const [activeCategory, setActiveCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('cat');
      if (cat) return cat;
    }
    return 'purpose';
  });

  // Selected Purpose (Default: Love & Relationships)
  const [selectedPurpose, setSelectedPurpose] = useState(() => PURPOSES_DATA[0]);

  // Selected Zodiac (Default: Leo)
  const [selectedZodiac, setSelectedZodiac] = useState(() => ZODIAC_SIGNS[4]);

  // Selected Intention (Default: Open The Heart)
  const [selectedIntention, setSelectedIntention] = useState(() => PURPOSES_DATA[0]?.intentions[0]);

  // Date of Birth (Default: 14 Aug 1995, as in Figma)
  const [birthDate, setBirthDate] = useState({ day: '14', month: '8', year: '1995' });

  // Natal attunements added: Mulank (default: added), Bhagyank (default: skipped), Zodiac (default: added)
  const [natalAttunements, setNatalAttunements] = useState({
    mulank: true,
    bhagyank: false,
    zodiac: true
  });

  // Base crystals on strand (Default for Open the Heart: Rose Quartz, Rhodonite, Strawberry Quartz, Moonstone)
  const [strandCrystals, setStrandCrystals] = useState(() => PURPOSES_DATA[0]?.defaultCrystals || []);

  // Charm selection (Default: OM)
  const [selectedCharm, setSelectedCharm] = useState(() => CHARMS_DATA[0]);

  // Thread selection (Default: Korean Elastic)
  const [selectedThread, setSelectedThread] = useState(() => THREADS_DATA[0]);

  // View mode for strand ('front' | 'wrist')
  const [viewMode, setViewMode] = useState('front');
  const [isInteractingWith3D, setIsInteractingWith3D] = useState(false);
  const [strandRotation, setStrandRotation] = useState(0);

  // Edit Crystals Modal state
  const [isCrystalModalOpen, setIsCrystalModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return Boolean(params.get('modal'));
    }
    return false;
  });
  const [modalTab, setModalTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'strand' || tab === 'catalog') return tab;
    }
    return 'crystals';
  });
  const [modalStrandLength, setModalStrandLength] = useState(18);
  const [modalCrystals, setModalCrystals] = useState(() =>
    getRecommendedCrystalsForIntention('love', 'attract-love')
  );

  // Calculate Vedic profile based on birth date
  const vedicProfile = useMemo(() => {
    return calculateVedicProfile(birthDate.day, birthDate.month, birthDate.year);
  }, [birthDate]);

  // Synchronize when purpose changes - Clicking immediately opens Intention page (Step 2)
  const handleSelectPurpose = (purpose) => {
    setSelectedPurpose(purpose);
    const initialIntent = purpose.intentions[0];
    setSelectedIntention(initialIntent);
    setStrandCrystals(purpose.defaultCrystals);
    setCurrentStep(2);
  };

  // Synchronize when zodiac changes - Clicking immediately opens Intention page (Step 2)
  const handleSelectZodiac = (zodiac) => {
    setSelectedZodiac(zodiac);
    const matchedPurpose = PURPOSES_DATA.find(p => p.id === 'confidence') || PURPOSES_DATA[0];
    setSelectedPurpose(matchedPurpose);
    setSelectedIntention(matchedPurpose.intentions[0]);
    setStrandCrystals(matchedPurpose.defaultCrystals);
    setCurrentStep(2);
  };

  // Open Edit Crystals modal for an intention
  const openEditCrystalsModal = (intent) => {
    const targetIntent = intent || selectedIntention;
    if (intent) setSelectedIntention(intent);
    const rec = getRecommendedCrystalsForIntention(selectedPurpose.id, targetIntent?.id);
    setModalCrystals(rec);
    setModalTab('crystals');
    setModalStrandLength(18);
    setIsCrystalModalOpen(true);
  };

  const toggleModalCrystal = (id) => {
    setModalCrystals(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, active: !c.active };
      }
      return c;
    }));
  };

  const adjustModalCrystalCount = (id, delta) => {
    setModalCrystals(prev => prev.map(c => {
      if (c.id === id) {
        const next = Math.max(0, (c.count || 1) + delta);
        return { ...c, count: next, active: next > 0 };
      }
      return c;
    }));
  };

  const addCatalogCrystalToModal = (catItem) => {
    setModalCrystals(prev => {
      const exists = prev.find(c => c.id === catItem.id);
      if (exists) {
        return prev.map(c => c.id === catItem.id ? { ...c, count: (c.count || 1) + 1, active: true } : c);
      }
      return [...prev, { ...catItem, count: 1, active: true }];
    });
    showToast(`Added ${catItem.name} to strand`, 'gold');
  };

  const applyModalCrystals = () => {
    const activeOnes = modalCrystals.filter(c => c.active && (c.count || 0) > 0);
    if (activeOnes.length === 0) {
      showToast('Please select at least one crystal for your strand.', 'error');
      return;
    }
    setStrandCrystals(activeOnes);
    setIsCrystalModalOpen(false);
    showToast('Strand updated with customized crystals!', 'gold');
  };

  const modalActiveCrystals = useMemo(() => {
    return modalCrystals.filter(c => c.active && (c.count || 0) > 0);
  }, [modalCrystals]);

  const modalTotalBeads = useMemo(() => {
    return modalActiveCrystals.reduce((sum, c) => sum + (c.count || 0), 0);
  }, [modalActiveCrystals]);

  const modalBeadSubtotal = useMemo(() => {
    return modalActiveCrystals.reduce((sum, c) => sum + (c.count || 0) * (c.pricePerBead || 0), 0);
  }, [modalActiveCrystals]);

  const modalThreadCost = 140;
  const modalTotalWithThread = modalBeadSubtotal + modalThreadCost;

  // Bead count adjust for a crystal
  const adjustCrystalCount = (crystalId, delta) => {
    setStrandCrystals(prev => prev.map(c => {
      if (c.id === crystalId) {
        const next = Math.max(1, (c.count || 1) + delta);
        return { ...c, count: next };
      }
      return c;
    }));
  };

  // Toggle natal stone
  const toggleNatal = (key) => {
    setNatalAttunements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setAllNatal = (val) => {
    setNatalAttunements({
      mulank: val,
      bhagyank: val,
      zodiac: val
    });
  };

  // Build full list of crystals including active natal stones
  const activeAllCrystals = useMemo(() => {
    const list = [...strandCrystals];
    if (natalAttunements.mulank && vedicProfile.mulankInfo) {
      list.push({
        id: 'natal-mulank',
        name: vedicProfile.mulankInfo.stone,
        count: 1,
        pricePerBead: vedicProfile.mulankInfo.price,
        color: vedicProfile.mulankInfo.color,
        img: vedicProfile.mulankInfo.img,
        badge: 'NUMBER',
        isNatal: true
      });
    }
    if (natalAttunements.bhagyank && vedicProfile.bhagyankInfo) {
      list.push({
        id: 'natal-bhagyank',
        name: vedicProfile.bhagyankInfo.stone,
        count: 1,
        pricePerBead: vedicProfile.bhagyankInfo.price,
        color: vedicProfile.bhagyankInfo.color,
        img: vedicProfile.bhagyankInfo.img,
        badge: 'NUMBER',
        isNatal: true
      });
    }
    if (natalAttunements.zodiac && vedicProfile.zodiac) {
      list.push({
        id: 'natal-zodiac',
        name: vedicProfile.zodiac.stone || 'Citrine',
        count: 1,
        pricePerBead: vedicProfile.zodiac.price,
        color: vedicProfile.zodiac.color,
        img: vedicProfile.zodiac.img,
        badge: 'ZODIAC',
        isNatal: true
      });
    }
    return list;
  }, [strandCrystals, natalAttunements, vedicProfile]);

  // Total bead count
  const totalBeadCount = useMemo(() => {
    return activeAllCrystals.reduce((sum, c) => sum + (c.count || 0), 0);
  }, [activeAllCrystals]);

  // Crystals price sum
  const crystalsPriceSum = useMemo(() => {
    return activeAllCrystals.reduce((sum, c) => sum + ((c.count || 0) * (c.pricePerBead || 0)), 0);
  }, [activeAllCrystals]);

  // Detailed price components
  const priceComponents = useMemo(() => {
    const box = ADDONS_DATA.box; // 44
    const clasp = ADDONS_DATA.clasp; // 10
    const charm = selectedCharm.price; // 60
    const cz = ADDONS_DATA.cz; // 6
    const thread = selectedThread.price; // 20
    const total = crystalsPriceSum + box + clasp + charm + cz + thread;

    return {
      crystals: crystalsPriceSum,
      box,
      clasp,
      charm,
      cz,
      thread,
      total: Math.round(total * 100) / 100
    };
  }, [crystalsPriceSum, selectedCharm, selectedThread]);

  // Live total price
  const totalPrice = priceComponents.total;

  // Month names for select
  const monthNames = [
    { val: '1', label: 'Jan' },
    { val: '2', label: 'Feb' },
    { val: '3', label: 'Mar' },
    { val: '4', label: 'Apr' },
    { val: '5', label: 'May' },
    { val: '6', label: 'Jun' },
    { val: '7', label: 'Jul' },
    { val: '8', label: 'Aug' },
    { val: '9', label: 'Sep' },
    { val: '10', label: 'Oct' },
    { val: '11', label: 'Nov' },
    { val: '12', label: 'Dec' }
  ];

  // Specific Figma static image for step right preview
  const figmaStrandImage = useMemo(() => {
    if (viewMode === 'wrist') return '/assets/14studio3birth_img_6.jpg';
    if (currentStep === 2) return '/assets/studio2_img_2.png';
    if (currentStep === 3) return '/assets/studio3_img_8.png';
    if (currentStep === 4) return '/assets/studio4_img_1.png';
    return '/assets/studio5_img_8.png';
  }, [currentStep, viewMode]);

  // Order Placement
  const handlePlaceOrder = () => {
    confetti({
      particleCount: 130,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#ECC26A', '#D9AE4F', '#C5A572', '#FFFFFF']
    });

    const customPiece = {
      id: `bespoke-${Date.now()}`,
      title: `${selectedIntention?.title || selectedPurpose.title} Custom Strand`,
      price: totalPrice,
      image: '/assets/studio5_img_8.png',
      suggestedBeads: {
        primary: activeAllCrystals[0]?.name || 'Rose Quartz',
        secondary: activeAllCrystals[1]?.name || 'Rhodonite'
      }
    };

    addCustomStrandToCart(
      customPiece,
      activeAllCrystals,
      { label: `${selectedThread.name} · 6.5" (Free-size fit)`, beadCount: totalBeadCount },
      totalPrice
    );

    showToast(`Bespoke ${customPiece.title} added to your bag!`, 'gold');
    setTimeout(() => {
      setIsCartOpen(true);
    }, 500);
  };

  // Scroll to top on step transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(191, 0, 255, 0.35), transparent 75%), radial-gradient(circle 600px at 85% 30%, rgba(160, 0, 255, 0.22), transparent), radial-gradient(circle 500px at 10% 65%, rgba(191, 0, 255, 0.16), transparent), linear-gradient(180deg, #320054 0%, #200038 35%, #130022 75%, #0B0014 100%)',
      color: '#EDE8E1',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      position: 'relative',
      paddingBottom: '120px'
    }}>
      {/* ----------------------------------------------------
          TOP WORKSPACE CONTAINER (MAX-WIDTH 1380px)
         ---------------------------------------------------- */}
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        padding: '36px 36px 0',
        boxSizing: 'border-box'
      }}>
        {/* HEADER TITLE AREA */}
        <div style={{ marginBottom: '22px' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif, "Playfair Display", "Cormorant Garamond", serif)',
            fontSize: 'clamp(28px, 3.2vw, 38px)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            margin: '0 0 8px',
            textTransform: 'uppercase',
            lineHeight: 1.15
          }}>
            {currentStep === 1 && activeCategory === 'zodiac'
              ? 'WHAT IS THIS BRACELET FOR?'
              : currentStep === 1
              ? 'CHOOSE A PURPOSE'
              : currentStep === 2
              ? 'CHOOSE AN INTENTION'
              : currentStep === 3
              ? 'DATE OF BIRTH'
              : currentStep === 4
              ? 'CHARM AND THREAD'
              : 'REVIEW & ORDER'}
          </h1>
          <p style={{
            fontSize: '13.5px',
            color: '#8E8A9A',
            margin: 0,
            lineHeight: 1.5
          }}>
            {currentStep === 1 && activeCategory === 'zodiac'
              ? 'Begin with why you wear it. Your choice sets the crystals we suggest next.'
              : currentStep === 1
              ? 'Start with the feeling you want this piece to hold. Intentions appear only after you choose.'
              : `Purpose · ${selectedPurpose.shortTitle || selectedPurpose.title}`}
          </p>
        </div>

        {/* STEP 1 BEGIN BY PILLS */}
        {currentStep === 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '26px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: '10.5px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(237, 232, 225, 0.65)',
              fontWeight: 600,
              marginRight: '4px'
            }}>
              BEGIN BY
            </span>
            {FLOW_CATEGORIES.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    background: isSelected ? '#F5E8BA' : 'rgba(32, 10, 54, 0.72)',
                    color: isSelected ? '#0A0810' : '#EDE8E1',
                    border: isSelected ? '1px solid #F5E8BA' : '1px solid rgba(191, 0, 255, 0.25)',
                    borderRadius: '9999px',
                    padding: '6px 18px',
                    fontSize: '12px',
                    fontWeight: isSelected ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.02em',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* 5-STEP HORIZONTAL STEPPER BAR */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '36px',
          borderBottom: '1px solid rgba(191, 0, 255, 0.22)',
          marginBottom: '32px',
          overflowX: 'auto',
          paddingBottom: '0'
        }}>
          {FLOW_STEPS.map(st => {
            const isActive = currentStep === st.num;
            const isCompleted = currentStep > st.num;
            const labelText = activeCategory === 'zodiac' && st.zodiacLabel ? st.zodiacLabel : st.label;

            return (
              <button
                key={st.num}
                onClick={() => {
                  if (st.num <= currentStep || st.num === currentStep + 1) {
                    setCurrentStep(st.num);
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #E5C378' : '2px solid transparent',
                  padding: '8px 0 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isActive ? '#FFFFFF' : isCompleted ? '#BBB5C3' : '#6B6676',
                  fontSize: '11px',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '-1px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{
                  color: isActive ? '#E5C378' : isCompleted ? '#D4AF37' : '#6B6676',
                  fontWeight: 600
                }}>
                  {st.num}
                </span>
                <span>{labelText}</span>
              </button>
            );
          })}
        </div>

        {/* ====================================================
            MAIN TWO-COLUMN WORKSPACE
           ==================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 345px',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* --------------------------------------------------
              LEFT COLUMN: STEP CONTENT
             -------------------------------------------------- */}
          <div>
            {/* ================================================
                STEP 1: CHOOSE A PURPOSE (OR ZODIAC)
               ================================================ */}
            {currentStep === 1 && (
              <div>
                {/* ZODIAC GRID PATH (EXACT 5 COLUMNS PER FIGMA) */}
                {activeCategory === 'zodiac' ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '10px'
                  }}>
                    {ZODIAC_SIGNS.map(z => {
                      const isSelected = selectedZodiac.id === z.id;
                      return (
                        <div
                          key={z.id}
                          onClick={() => handleSelectZodiac(z)}
                          style={{
                            background: '#FAF5EB',
                            border: isSelected ? '2px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.35)',
                            boxShadow: isSelected ? '0 8px 24px rgba(160, 126, 68, 0.22), 0 0 16px rgba(217, 174, 79, 0.28)' : '0 4px 16px rgba(160, 126, 68, 0.08)',
                            borderRadius: '10px',
                            padding: '16px 12px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            minHeight: '235px'
                          }}
                        >
                          {isSelected && (
                            <div style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: '#D9AE4F',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#1A160F'
                            }}>
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                          <span style={{ fontSize: '10px', color: '#8C7245', marginBottom: '8px', fontWeight: 600 }}>
                            {z.num}
                          </span>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            margin: '4px 0 14px',
                            background: 'radial-gradient(circle, #ECC26A 0%, #B88E3E 100%)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#0A0810',
                            fontWeight: 700,
                            fontSize: '14px'
                          }}>
                            {z.sanskrit.charAt(0)}
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-serif, serif)',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            color: '#1A160F',
                            textTransform: 'uppercase',
                            marginBottom: '2px'
                          }}>
                            {z.name}
                          </div>
                          <div style={{ fontSize: '11px', color: '#8C6F3D', fontWeight: 600, marginBottom: '6px' }}>
                            {z.sanskrit}
                          </div>
                          <div style={{ fontSize: '10px', color: '#695B44', lineHeight: 1.45 }}>
                            {z.dates} · {z.traits}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* 17 PURPOSE CARDS (EXACT 5 COLUMNS) */
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '10px'
                  }}>
                    {PURPOSES_DATA.map(p => {
                      const isSelected = selectedPurpose.id === p.id;
                      return (
                        <div
                          key={p.id}
                          id={`purpose-card-${p.id}`}
                          onClick={() => handleSelectPurpose(p)}
                          style={{
                            background: '#FAF5EB',
                            border: isSelected ? '2px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.35)',
                            boxShadow: isSelected ? '0 8px 24px rgba(160, 126, 68, 0.22), 0 0 16px rgba(217, 174, 79, 0.28)' : '0 4px 16px rgba(160, 126, 68, 0.08)',
                            borderRadius: '10px',
                            padding: '16px 12px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            minHeight: '260px',
                            boxSizing: 'border-box'
                          }}
                        >
                          {isSelected && (
                            <div style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: '#D9AE4F',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#1A160F',
                              zIndex: 5
                            }}>
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                          <span style={{ fontSize: '10.5px', color: '#8C7245', marginBottom: '6px', fontWeight: 600 }}>
                            {p.num}
                          </span>
                          <div style={{
                            width: '104px',
                            height: '104px',
                            margin: '4px auto 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            WebkitMaskImage: 'radial-gradient(ellipse 46% 46% at 50% 49%, black 52%, rgba(0,0,0,0.75) 68%, transparent 88%)',
                            maskImage: 'radial-gradient(ellipse 46% 46% at 50% 49%, black 52%, rgba(0,0,0,0.75) 68%, transparent 88%)'
                          }}>
                            <img
                              src={p.icon}
                              alt={p.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'drop-shadow(0 4px 14px rgba(217, 174, 79, 0.25))'
                              }}
                            />
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-serif, serif)',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            color: '#1A160F',
                            textTransform: 'uppercase',
                            marginBottom: '6px',
                            lineHeight: 1.3
                          }}>
                            {p.title}
                          </div>
                          <div style={{
                            fontSize: '10.5px',
                            color: '#695B44',
                            lineHeight: 1.4,
                            marginTop: 'auto'
                          }}>
                            {p.description}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ================================================
                STEP 2: CHOOSE AN INTENTION
               ================================================ */}
            {currentStep === 2 && (
              <div>
                {/* YOUR PURPOSE BANNER WITH CHANGE BUTTON */}
                <div style={{
                  background: 'rgba(28, 7, 46, 0.78)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(191, 0, 255, 0.22)',
                  borderRadius: '6px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '22px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      WebkitMaskImage: 'radial-gradient(ellipse 46% 46% at 50% 49%, black 52%, rgba(0,0,0,0.75) 68%, transparent 88%)',
                      maskImage: 'radial-gradient(ellipse 46% 46% at 50% 49%, black 52%, rgba(0,0,0,0.75) 68%, transparent 88%)'
                    }}>
                      <img
                        src={selectedPurpose.icon}
                        alt={selectedPurpose.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '10px',
                        letterSpacing: '0.12em',
                        color: '#E5C378',
                        textTransform: 'uppercase',
                        fontWeight: 600
                      }}>
                        YOUR PURPOSE
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-serif, serif)',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase'
                      }}>
                        {selectedPurpose.title}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#EDE8E1',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Change
                  </button>
                </div>

                {/* SUBTITLE & INTENTIONS COUNT */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px'
                }}>
                  <span style={{ fontSize: '12.5px', color: '#8E8A9A' }}>
                    Choose one intention. Its crystals open next, and you can turn any of them off.
                  </span>
                  <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#6B6676', textTransform: 'uppercase' }}>
                    {selectedPurpose.intentions.length} INTENTIONS
                  </span>
                </div>

                {/* 4-COLUMN INTENTION CARDS GRID */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  {selectedPurpose.intentions.map((intent, idx) => {
                    const isSelected = selectedIntention?.id === intent.id;
                    const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

                    return (
                      <div
                        key={intent.id}
                        id={`intention-card-${intent.id}`}
                        onClick={() => openEditCrystalsModal(intent)}
                        style={{
                          background: '#FAF5EB',
                          border: isSelected ? '2px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.35)',
                          boxShadow: isSelected ? '0 8px 24px rgba(160, 126, 68, 0.22), 0 0 16px rgba(217, 174, 79, 0.28)' : '0 4px 16px rgba(160, 126, 68, 0.08)',
                          borderRadius: '10px',
                          padding: '16px 14px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          transition: 'all 0.2s ease',
                          minHeight: '160px'
                        }}
                      >
                        {isSelected && (
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: '#D9AE4F',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#1A160F'
                          }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                        <span style={{ fontSize: '10.5px', color: '#8C7245', marginBottom: '8px', fontWeight: 600 }}>
                          {numStr}
                        </span>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#1A160F',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          marginBottom: intent.badge ? '2px' : '6px',
                          paddingRight: isSelected ? '22px' : '0'
                        }}>
                          {intent.title}
                        </div>
                        {intent.badge && (
                          <div style={{
                            fontSize: '11px',
                            fontStyle: 'italic',
                            color: '#8C6F3D',
                            marginBottom: '6px',
                            fontWeight: 600
                          }}>
                            {intent.badge}
                          </div>
                        )}
                        <div style={{ fontSize: '11px', color: '#695B44', lineHeight: 1.45, marginBottom: '14px' }}>
                          {intent.desc}
                        </div>
                        <div
                          id={`edit-crystals-link-${intent.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditCrystalsModal(intent);
                          }}
                          style={{
                            marginTop: 'auto',
                            fontSize: '11px',
                            color: isSelected ? '#8C6F3D' : '#8C7245',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <span>{isSelected ? 'Edit crystals' : 'See crystals'}</span>
                          <span>→</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* BOTTOM INTENTION SUMMARY BOX */}
                <div style={{
                  background: '#FAF5EB',
                  border: '1px solid rgba(197, 165, 114, 0.4)',
                  boxShadow: '0 4px 16px rgba(160, 126, 68, 0.08)',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      color: '#8C6F3D',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      marginBottom: '2px'
                    }}>
                      {selectedIntention?.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#1A160F', fontWeight: 600 }}>
                      {strandCrystals.length} crystals · {totalBeadCount} beads
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <button
                      onClick={() => openEditCrystalsModal(selectedIntention)}
                      style={{
                        background: '#FAF4E8',
                        border: '1px solid rgba(197, 165, 114, 0.5)',
                        color: '#8C6F3D',
                        padding: '6px 14px',
                        borderRadius: '4px',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Edit crystals
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      style={{
                        background: 'linear-gradient(135deg, #ECC26A 0%, #D4AF37 100%)',
                        color: '#0A0810',
                        border: 'none',
                        padding: '6px 16px',
                        borderRadius: '4px',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================
                STEP 3: DATE OF BIRTH & PERSONAL BEADS
               ================================================ */}
            {currentStep === 3 && (
              <div>
                {/* YOUR DATE OF BIRTH BOX */}
                <div style={{
                  background: '#FAF5EB',
                  border: '1px solid rgba(197, 165, 114, 0.4)',
                  boxShadow: '0 4px 16px rgba(160, 126, 68, 0.08)',
                  borderRadius: '10px',
                  padding: '18px 20px',
                  marginBottom: '26px'
                }}>
                  <div style={{
                    fontSize: '10.5px',
                    letterSpacing: '0.12em',
                    color: '#8C6F3D',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}>
                    YOUR DATE OF BIRTH
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#695B44', marginBottom: '14px' }}>
                    Your Mulank, Bhagyank and zodiac sign are read from this date.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', color: '#8C7245', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                        DAY
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={birthDate.day}
                        onChange={(e) => setBirthDate({ ...birthDate, day: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#FAF4E8',
                          border: '1px solid rgba(197, 165, 114, 0.5)',
                          borderRadius: '4px',
                          color: '#1A160F',
                          padding: '10px 12px',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', color: '#8C7245', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                        MONTH
                      </label>
                      <select
                        value={birthDate.month}
                        onChange={(e) => setBirthDate({ ...birthDate, month: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#FAF4E8',
                          border: '1px solid rgba(197, 165, 114, 0.5)',
                          borderRadius: '4px',
                          color: '#1A160F',
                          padding: '10px 12px',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        {monthNames.map(m => (
                          <option key={m.val} value={m.val}>{m.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', color: '#8C7245', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                        YEAR
                      </label>
                      <input
                        type="number"
                        min="1940"
                        max="2025"
                        value={birthDate.year}
                        onChange={(e) => setBirthDate({ ...birthDate, year: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#FAF4E8',
                          border: '1px solid rgba(197, 165, 114, 0.5)',
                          borderRadius: '4px',
                          color: '#1A160F',
                          padding: '10px 12px',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* PERSONAL BEADS SECTION */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '10.5px',
                        letterSpacing: '0.12em',
                        color: '#E5C378',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        marginBottom: '2px'
                      }}>
                        PERSONAL BEADS
                      </div>
                      <div style={{ fontSize: '12px', color: '#BBB5C3' }}>
                        Each one adds a single bead of its crystal to the strand. Choose add or skip for all three.
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setAllNatal(true)}
                        style={{
                          background: '#FAF5EB',
                          border: '1px solid rgba(197, 165, 114, 0.5)',
                          color: '#8C6F3D',
                          fontWeight: 600,
                          borderRadius: '9999px',
                          padding: '5px 12px',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        Add all three
                      </button>
                      <button
                        onClick={() => setAllNatal(false)}
                        style={{
                          background: '#FAF5EB',
                          border: '1px solid rgba(197, 165, 114, 0.5)',
                          color: '#8C6F3D',
                          fontWeight: 600,
                          borderRadius: '9999px',
                          padding: '5px 12px',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        Skip all
                      </button>
                    </div>
                  </div>

                  {/* 3 NATAL BEAD CARDS */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px'
                  }}>
                    {/* MULANK */}
                    <div style={{
                      background: '#FAF5EB',
                      border: natalAttunements.mulank ? '2px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.35)',
                      boxShadow: natalAttunements.mulank ? '0 8px 24px rgba(160, 126, 68, 0.22), 0 0 16px rgba(217, 174, 79, 0.28)' : '0 4px 16px rgba(160, 126, 68, 0.08)',
                      borderRadius: '10px',
                      padding: '16px 14px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ fontSize: '10px', color: '#8C6F3D', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                        MULANK
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '4px 0 2px' }}>
                        <span style={{ fontSize: '26px', fontWeight: 700, color: '#1A160F' }}>
                          {vedicProfile.mulank}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img
                            src={vedicProfile.mulankInfo.img}
                            alt={vedicProfile.mulankInfo.stone}
                            style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(197, 165, 114, 0.5)' }}
                          />
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11.5px', color: '#1A160F', fontWeight: 600 }}>
                              {vedicProfile.mulankInfo.stone}
                            </div>
                            <div style={{ fontSize: '10px', color: '#695B44' }}>
                              ₹{vedicProfile.mulankInfo.price}/ bead
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#8C7245', marginBottom: '10px', fontWeight: 500 }}>
                        Your birth-day number
                      </div>
                      <div style={{ fontSize: '11px', color: '#695B44', lineHeight: 1.45, marginBottom: '16px' }}>
                        {vedicProfile.mulankInfo.desc}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
                        <button
                          onClick={() => setNatalAttunements({ ...natalAttunements, mulank: true })}
                          style={{
                            background: natalAttunements.mulank ? '#EAD7A5' : '#FAF4E8',
                            color: natalAttunements.mulank ? '#1A160F' : '#8C7245',
                            border: natalAttunements.mulank ? '1px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.4)',
                            borderRadius: '4px',
                            padding: '8px 4px',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {natalAttunements.mulank ? '✔ Add to strand' : 'Add to strand'}
                        </button>
                        <button
                          onClick={() => setNatalAttunements({ ...natalAttunements, mulank: false })}
                          style={{
                            background: !natalAttunements.mulank ? '#1A160F' : '#FAF4E8',
                            color: !natalAttunements.mulank ? '#FAF5EB' : '#8C7245',
                            border: !natalAttunements.mulank ? '1px solid #1A160F' : '1px solid rgba(197, 165, 114, 0.4)',
                            borderRadius: '4px',
                            padding: '8px 4px',
                            fontSize: '11px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Skip
                        </button>
                      </div>
                    </div>

                    {/* BHAGYANK */}
                    <div style={{
                      background: '#FAF5EB',
                      border: natalAttunements.bhagyank ? '2px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.35)',
                      boxShadow: natalAttunements.bhagyank ? '0 8px 24px rgba(160, 126, 68, 0.22), 0 0 16px rgba(217, 174, 79, 0.28)' : '0 4px 16px rgba(160, 126, 68, 0.08)',
                      borderRadius: '10px',
                      padding: '16px 14px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ fontSize: '10px', color: '#8C6F3D', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                        BHAGYANK
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '4px 0 2px' }}>
                        <span style={{ fontSize: '26px', fontWeight: 700, color: '#1A160F' }}>
                          {vedicProfile.bhagyank}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img
                            src={vedicProfile.bhagyankInfo.img}
                            alt={vedicProfile.bhagyankInfo.stone}
                            style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(197, 165, 114, 0.5)' }}
                          />
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11.5px', color: '#1A160F', fontWeight: 600 }}>
                              {vedicProfile.bhagyankInfo.stone}
                            </div>
                            <div style={{ fontSize: '10px', color: '#695B44' }}>
                              ₹{vedicProfile.bhagyankInfo.price}/ bead
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#8C7245', marginBottom: '10px', fontWeight: 500 }}>
                        Your full-date number
                      </div>
                      <div style={{ fontSize: '11px', color: '#695B44', lineHeight: 1.45, marginBottom: '16px' }}>
                        {vedicProfile.bhagyankInfo.desc}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
                        <button
                          onClick={() => setNatalAttunements({ ...natalAttunements, bhagyank: true })}
                          style={{
                            background: natalAttunements.bhagyank ? '#EAD7A5' : '#FAF4E8',
                            color: natalAttunements.bhagyank ? '#1A160F' : '#8C7245',
                            border: natalAttunements.bhagyank ? '1px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.4)',
                            borderRadius: '4px',
                            padding: '8px 4px',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {natalAttunements.bhagyank ? '✔ Add to strand' : 'Add to strand'}
                        </button>
                        <button
                          onClick={() => setNatalAttunements({ ...natalAttunements, bhagyank: false })}
                          style={{
                            background: !natalAttunements.bhagyank ? '#1A160F' : '#FAF4E8',
                            color: !natalAttunements.bhagyank ? '#FAF5EB' : '#8C7245',
                            border: !natalAttunements.bhagyank ? '1px solid #1A160F' : '1px solid rgba(197, 165, 114, 0.4)',
                            borderRadius: '4px',
                            padding: '8px 4px',
                            fontSize: '11px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Skip
                        </button>
                      </div>
                    </div>

                    {/* ZODIAC */}
                    <div style={{
                      background: '#FAF5EB',
                      border: natalAttunements.zodiac ? '2px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.35)',
                      boxShadow: natalAttunements.zodiac ? '0 8px 24px rgba(160, 126, 68, 0.22), 0 0 16px rgba(217, 174, 79, 0.28)' : '0 4px 16px rgba(160, 126, 68, 0.08)',
                      borderRadius: '10px',
                      padding: '16px 14px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ fontSize: '10px', color: '#8C6F3D', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                        ZODIAC
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '4px 0 2px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 700, color: '#1A160F' }}>
                          {vedicProfile.zodiac.name}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img
                            src={vedicProfile.zodiac.img}
                            alt={vedicProfile.zodiac.name}
                            style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(197, 165, 114, 0.5)' }}
                          />
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11.5px', color: '#1A160F', fontWeight: 600 }}>
                              {vedicProfile.zodiac.stone}
                            </div>
                            <div style={{ fontSize: '10px', color: '#695B44' }}>
                              ₹{vedicProfile.zodiac.price}/ bead
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#8C7245', marginBottom: '10px', fontWeight: 500 }}>
                        {vedicProfile.zodiac.dates}
                      </div>
                      <div style={{ fontSize: '11px', color: '#695B44', lineHeight: 1.45, marginBottom: '16px' }}>
                        Calibrated with {vedicProfile.zodiac.stone} for {vedicProfile.zodiac.traits.toLowerCase()}.
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
                        <button
                          onClick={() => setNatalAttunements({ ...natalAttunements, zodiac: true })}
                          style={{
                            background: natalAttunements.zodiac ? '#EAD7A5' : '#FAF4E8',
                            color: natalAttunements.zodiac ? '#1A160F' : '#8C7245',
                            border: natalAttunements.zodiac ? '1px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.4)',
                            borderRadius: '4px',
                            padding: '8px 4px',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {natalAttunements.zodiac ? '✔ Add to strand' : 'Add to strand'}
                        </button>
                        <button
                          onClick={() => setNatalAttunements({ ...natalAttunements, zodiac: false })}
                          style={{
                            background: !natalAttunements.zodiac ? '#1A160F' : '#FAF4E8',
                            color: !natalAttunements.zodiac ? '#FAF5EB' : '#8C7245',
                            border: !natalAttunements.zodiac ? '1px solid #1A160F' : '1px solid rgba(197, 165, 114, 0.4)',
                            borderRadius: '4px',
                            padding: '8px 4px',
                            fontSize: '11px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* YOUR STRAND CRYSTAL ROWS WITH COUNTERS */}
                <div>
                  <div style={{
                    fontSize: '10.5px',
                    letterSpacing: '0.12em',
                    color: '#E5C378',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '2px'
                  }}>
                    YOUR STRAND
                  </div>
                  <div style={{ fontSize: '12px', color: '#8E8A9A', marginBottom: '8px' }}>
                    {totalBeadCount} of 18 beads· the strand matches
                  </div>
                  <div style={{ height: '1px', background: 'rgba(217, 174, 79, 0.4)', marginBottom: '14px' }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeAllCrystals.map((crystal) => {
                      const subtotal = Math.round((crystal.count || 1) * (crystal.pricePerBead || 0) * 100) / 100;

                      return (
                        <div
                          key={crystal.id}
                          style={{
                            background: 'rgba(28, 7, 46, 0.72)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(191, 0, 255, 0.2)',
                            borderRadius: '6px',
                            padding: '12px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <img
                              src={crystal.img || '/assets/studio3_img_1.jpg'}
                              alt={crystal.name}
                              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
                                  {crystal.name}
                                </span>
                                {crystal.badge && (
                                  <span style={{
                                    fontSize: '9.5px',
                                    color: '#E5C378',
                                    border: '1px solid rgba(217, 174, 79, 0.3)',
                                    borderRadius: '3px',
                                    padding: '1px 5px',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase'
                                  }}>
                                    {crystal.badge}
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '11px', color: '#8E8A9A', marginTop: '2px' }}>
                                ₹{crystal.pricePerBead}/ bead · ₹{subtotal}
                              </div>
                            </div>
                          </div>

                          {/* COUNTER */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'rgba(16, 3, 28, 0.85)',
                            border: '1px solid rgba(191, 0, 255, 0.3)',
                            borderRadius: '4px',
                            padding: '4px 10px'
                          }}>
                            <button
                              onClick={() => {
                                if (crystal.isNatal) {
                                  if (crystal.id === 'natal-mulank') toggleNatal('mulank');
                                  if (crystal.id === 'natal-bhagyank') toggleNatal('bhagyank');
                                  if (crystal.id === 'natal-zodiac') toggleNatal('zodiac');
                                } else {
                                  adjustCrystalCount(crystal.id, -1);
                                }
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#AAA',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '2px'
                              }}
                            >
                              <Minus size={13} />
                            </button>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF', minWidth: '16px', textAlign: 'center' }}>
                              {crystal.count || 1}
                            </span>
                            <button
                              onClick={() => {
                                if (!crystal.isNatal) {
                                  adjustCrystalCount(crystal.id, 1);
                                }
                              }}
                              disabled={crystal.isNatal}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: crystal.isNatal ? '#444' : '#AAA',
                                cursor: crystal.isNatal ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '2px'
                              }}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ================================================
                STEP 4: CHARM AND THREAD
               ================================================ */}
            {currentStep === 4 && (
              <div>
                {/* CHARM AT THE CLASP */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{
                    fontSize: '10.5px',
                    letterSpacing: '0.12em',
                    color: '#E5C378',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    CHARM AT THE CLASP
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#8E8A9A', marginBottom: '16px' }}>
                    One charm sits at the clasp of every strand.
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 220px)', gap: '14px' }}>
                    {CHARMS_DATA.map(charm => {
                      const isSelected = selectedCharm.id === charm.id;
                      return (
                        <div
                          key={charm.id}
                          onClick={() => setSelectedCharm(charm)}
                          style={{
                            background: '#FAF5EB',
                            border: isSelected ? '2px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.35)',
                            boxShadow: isSelected ? '0 8px 24px rgba(160, 126, 68, 0.22), 0 0 16px rgba(217, 174, 79, 0.28)' : '0 4px 16px rgba(160, 126, 68, 0.08)',
                            borderRadius: '10px',
                            padding: '22px 18px',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          {isSelected && (
                            <div style={{
                              position: 'absolute',
                              top: '14px',
                              right: '14px',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: '#D9AE4F',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#1A160F'
                            }}>
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            border: '1px solid rgba(197, 165, 114, 0.5)',
                            background: '#FAF4E8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#8C6F3D',
                            fontSize: '20px',
                            marginBottom: '16px'
                          }}>
                            {charm.glyph}
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-serif, serif)',
                            fontSize: '14px',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            color: '#1A160F',
                            textTransform: 'uppercase',
                            marginBottom: '6px'
                          }}>
                            {charm.name}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#695B44', lineHeight: 1.45 }}>
                            {charm.subtitle}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* THREAD SECTION */}
                <div>
                  <div style={{
                    fontSize: '10.5px',
                    letterSpacing: '0.12em',
                    color: '#E5C378',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    THREAD
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#8E8A9A', marginBottom: '16px' }}>
                    Elastic slips on at any size; steel core is cut to your wrist size.
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 280px)', gap: '14px' }}>
                    {THREADS_DATA.map(thr => {
                      const isSelected = selectedThread.id === thr.id;
                      return (
                        <div
                          key={thr.id}
                          onClick={() => setSelectedThread(thr)}
                          style={{
                            background: '#FAF5EB',
                            border: isSelected ? '2px solid #D9AE4F' : '1px solid rgba(197, 165, 114, 0.35)',
                            boxShadow: isSelected ? '0 8px 24px rgba(160, 126, 68, 0.22), 0 0 16px rgba(217, 174, 79, 0.28)' : '0 4px 16px rgba(160, 126, 68, 0.08)',
                            borderRadius: '10px',
                            padding: '22px 18px',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px'
                          }}
                        >
                          {isSelected && (
                            <div style={{
                              position: 'absolute',
                              top: '14px',
                              right: '14px',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: '#D9AE4F',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#1A160F'
                            }}>
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '1px solid rgba(197, 165, 114, 0.5)',
                            background: '#FAF4E8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#8C6F3D',
                            fontSize: '16px',
                            flexShrink: 0
                          }}>
                            {thr.id === 'korean-elastic' ? '≈' : '◎'}
                          </div>
                          <div>
                            <div style={{
                              fontFamily: 'var(--font-serif, serif)',
                              fontSize: '13px',
                              fontWeight: 700,
                              letterSpacing: '0.04em',
                              color: '#1A160F',
                              textTransform: 'uppercase',
                              marginBottom: '2px'
                            }}>
                              {thr.name}
                            </div>
                            <div style={{ fontSize: '11px', color: '#695B44' }}>
                              {thr.badge}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ================================================
                STEP 5: REVIEW & ORDER
               ================================================ */}
            {currentStep === 5 && (
              <div>
                {/* THE COMPOSITION BANNER */}
                <div style={{
                  background: '#FAF5EB',
                  border: '1px solid rgba(197, 165, 114, 0.4)',
                  boxShadow: '0 4px 16px rgba(160, 126, 68, 0.08)',
                  borderRadius: '10px',
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  marginBottom: '20px'
                }}>
                  <div style={{ width: '52px', height: '52px', flexShrink: 0 }}>
                    <img
                      src={selectedPurpose.icon}
                      alt={selectedPurpose.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      color: '#8C6F3D',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      marginBottom: '2px'
                    }}>
                      THE COMPOSITION
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-serif, serif)',
                      fontSize: '22px',
                      fontWeight: 600,
                      color: '#1A160F',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: '2px'
                    }}>
                      {selectedIntention?.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#695B44' }}>
                      {selectedPurpose.title} · {selectedIntention?.title}
                    </div>
                  </div>
                </div>

                {/* 3-BOX SUMMARY ROW */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  {/* PURPOSE & INTENTION */}
                  <div style={{
                    background: '#FAF5EB',
                    border: '1px solid rgba(197, 165, 114, 0.35)',
                    boxShadow: '0 4px 16px rgba(160, 126, 68, 0.08)',
                    borderRadius: '10px',
                    padding: '16px 14px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10px', color: '#8C6F3D', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                        PURPOSE & INTENTION
                      </span>
                      <button
                        onClick={() => setCurrentStep(1)}
                        style={{ background: 'none', border: 'none', color: '#8C6F3D', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                      >
                        Edit
                      </button>
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#1A160F', marginBottom: '2px' }}>
                      {selectedPurpose.shortTitle || selectedPurpose.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#695B44' }}>
                      {selectedIntention?.title}
                    </div>
                  </div>

                  {/* YOUR READING */}
                  <div style={{
                    background: '#FAF5EB',
                    border: '1px solid rgba(197, 165, 114, 0.35)',
                    boxShadow: '0 4px 16px rgba(160, 126, 68, 0.08)',
                    borderRadius: '10px',
                    padding: '16px 14px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10px', color: '#8C6F3D', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                        YOUR READING
                      </span>
                      <button
                        onClick={() => setCurrentStep(3)}
                        style={{ background: 'none', border: 'none', color: '#8C6F3D', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                      >
                        Edit
                      </button>
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#1A160F', marginBottom: '6px' }}>
                      {birthDate.day} {monthNames.find(m => m.val === birthDate.month)?.label || 'Aug'} {birthDate.year}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '10.5px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#695B44' }}>
                        <span>Mulank {vedicProfile.mulank}</span>
                        <span style={{ color: natalAttunements.mulank ? '#8C6F3D' : '#999', fontWeight: natalAttunements.mulank ? 600 : 400 }}>
                          {vedicProfile.mulankInfo.stone} · {natalAttunements.mulank ? 'Added' : 'Skipped'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#695B44' }}>
                        <span>Bhagyank {vedicProfile.bhagyank}</span>
                        <span style={{ color: natalAttunements.bhagyank ? '#8C6F3D' : '#999', fontWeight: natalAttunements.bhagyank ? 600 : 400 }}>
                          {vedicProfile.bhagyankInfo.stone} · {natalAttunements.bhagyank ? 'Added' : 'Skipped'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#695B44' }}>
                        <span>{vedicProfile.zodiac.name}</span>
                        <span style={{ color: natalAttunements.zodiac ? '#8C6F3D' : '#999', fontWeight: natalAttunements.zodiac ? 600 : 400 }}>
                          {vedicProfile.zodiac.stone} · {natalAttunements.zodiac ? 'Added' : 'Skipped'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CHARM & THREAD */}
                  <div style={{
                    background: '#FAF5EB',
                    border: '1px solid rgba(197, 165, 114, 0.35)',
                    boxShadow: '0 4px 16px rgba(160, 126, 68, 0.08)',
                    borderRadius: '10px',
                    padding: '16px 14px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10px', color: '#8C6F3D', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                        CHARM & THREAD
                      </span>
                      <button
                        onClick={() => setCurrentStep(4)}
                        style={{ background: 'none', border: 'none', color: '#8C6F3D', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                      >
                        Edit
                      </button>
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#1A160F', marginBottom: '2px' }}>
                      {selectedCharm.name} · {selectedCharm.material}
                    </div>
                    <div style={{ fontSize: '11px', color: '#695B44', marginBottom: '2px' }}>
                      {selectedThread.desc}
                    </div>
                    <div style={{ fontSize: '11px', color: '#695B44' }}>
                      Bead size 8mm
                    </div>
                  </div>
                </div>

                {/* CRYSTALS ITEMIZED BOX */}
                <div style={{
                  background: '#FAF5EB',
                  border: '1px solid rgba(197, 165, 114, 0.35)',
                  boxShadow: '0 4px 16px rgba(160, 126, 68, 0.08)',
                  borderRadius: '10px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '10.5px', color: '#8C6F3D', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                      CRYSTALS · {totalBeadCount} BEADS
                    </span>
                    <button
                      onClick={() => setCurrentStep(3)}
                      style={{ background: 'none', border: 'none', color: '#8C6F3D', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                    >
                      Edit
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeAllCrystals.map(c => {
                      const rowTotal = Math.round((c.count || 1) * (c.pricePerBead || 0) * 100) / 100;
                      return (
                        <div
                          key={c.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBottom: '8px',
                            borderBottom: '1px solid rgba(197, 165, 114, 0.2)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={c.img || '/assets/studio3_img_1.jpg'}
                              alt={c.name}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(197, 165, 114, 0.5)' }}
                            />
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '12.5px', color: '#1A160F', fontWeight: 600 }}>
                                  {c.name}
                                </span>
                                {c.badge && (
                                  <span style={{
                                    fontSize: '9px',
                                    color: '#8C6F3D',
                                    border: '1px solid rgba(197, 165, 114, 0.5)',
                                    borderRadius: '2px',
                                    padding: '1px 4px',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    fontWeight: 600
                                  }}>
                                    {c.badge}
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '11px', color: '#695B44' }}>
                                {c.count || 1} × ₹{c.pricePerBead}
                              </div>
                            </div>
                          </div>
                          <span style={{ fontSize: '12.5px', color: '#1A160F', fontWeight: 600 }}>
                            ₹{rowTotal}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* DETAILED PRICE BREAKDOWN BOX */}
                <div style={{
                  background: '#FAF5EB',
                  border: '1px solid rgba(197, 165, 114, 0.35)',
                  boxShadow: '0 4px 16px rgba(160, 126, 68, 0.08)',
                  borderRadius: '10px',
                  padding: '20px 22px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#695B44' }}>
                      <span>Crystals</span>
                      <span>₹{priceComponents.crystals}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#695B44' }}>
                      <span>Box</span>
                      <span>₹{priceComponents.box}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#695B44' }}>
                      <span>Clasp</span>
                      <span>₹{priceComponents.clasp}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#695B44' }}>
                      <span>Charm</span>
                      <span>₹{priceComponents.charm}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#695B44' }}>
                      <span>CZ</span>
                      <span>₹{priceComponents.cz}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#695B44' }}>
                      <span>Thread</span>
                      <span>₹{priceComponents.thread}</span>
                    </div>
                  </div>

                  <div style={{
                    borderTop: '1px solid rgba(197, 165, 114, 0.3)',
                    paddingTop: '14px',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#8C7245', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      TOTAL
                    </span>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: '#1A160F' }}>
                      ₹{priceComponents.total}
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#8C7245' }}>
                    Delivery and taxes are worked out at checkout.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --------------------------------------------------
              RIGHT COLUMN: HOW IT WORKS (STEP 1) OR LIVE STRAND (STEP 2..5)
             -------------------------------------------------- */}
          <div>
            {currentStep === 1 ? (
              /* HOW IT WORKS CARD */
              <div style={{
                background: 'rgba(28, 7, 46, 0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(191, 0, 255, 0.24)',
                boxShadow: '0 8px 32px rgba(12, 0, 22, 0.45)',
                borderRadius: '6px',
                padding: '24px 22px'
              }}>
                <div style={{
                  fontSize: '10.5px',
                  letterSpacing: '0.12em',
                  color: '#E5C378',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '18px'
                }}>
                  HOW IT WORKS
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* STEP 1 */}
                  <div style={{ paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ fontSize: '10px', color: '#E5C378', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '2px' }}>
                      {activeCategory === 'zodiac' ? '01 CHOOSE' : '01 PURPOSE'}
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#FFFFFF', fontWeight: 600 }}>
                      {activeCategory === 'zodiac' ? 'What is this bracelet for?' : 'Choose a purpose'}
                    </div>
                  </div>

                  {/* STEP 2 */}
                  <div style={{ paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ fontSize: '10px', color: '#6B6676', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '2px' }}>
                      {activeCategory === 'zodiac' ? '02 CRYSTALS' : '02 INTENTION'}
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#8E8A9A' }}>
                      {activeCategory === 'zodiac' ? 'Choose your crystals' : 'Choose an intention'}
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div style={{ paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ fontSize: '10px', color: '#6B6676', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '2px' }}>
                      {activeCategory === 'zodiac' ? '03 BEADS' : '03 BIRTH'}
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#8E8A9A' }}>
                      {activeCategory === 'zodiac' ? 'Beads on this strand' : 'Date of birth'}
                    </div>
                  </div>

                  {/* STEP 4 */}
                  <div style={{ paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ fontSize: '10px', color: '#6B6676', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '2px' }}>
                      04 CHARM
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#8E8A9A' }}>
                      Charm and thread
                    </div>
                  </div>

                  {/* STEP 5 */}
                  <div style={{ paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ fontSize: '10px', color: '#6B6676', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '2px' }}>
                      05 REVIEW
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#8E8A9A' }}>
                      Review & order
                    </div>
                  </div>
                </div>

                <div style={{
                  fontSize: '11px',
                  color: '#6B6676',
                  lineHeight: 1.5,
                  marginTop: '16px'
                }}>
                  Each strand is composed from your choices. The live price appears once crystals are on the strand.
                </div>
              </div>
            ) : (
              /* LIVE STRAND RIGHT PANEL (STEPS 2..5) */
              <div style={{
                background: 'rgba(28, 7, 46, 0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(191, 0, 255, 0.24)',
                boxShadow: '0 8px 32px rgba(12, 0, 22, 0.45)',
                borderRadius: '6px',
                padding: '18px 18px',
                position: 'sticky',
                top: '90px'
              }}>
                {/* 3D STRAND VISUAL CONTAINER (USING EXACT FIGMA 3D GRAPHIC) */}
                <div
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(191, 0, 255, 0.2) 0%, rgba(16, 2, 28, 0.95) 100%)',
                    borderRadius: '6px',
                    border: '1px solid rgba(191, 0, 255, 0.25)',
                    height: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    cursor: isInteractingWith3D ? 'grab' : 'pointer'
                  }}
                  onDoubleClick={() => setIsInteractingWith3D(prev => !prev)}
                >
                  {isInteractingWith3D ? (
                    /* Interactive procedural 3D SVG strand */
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <LiveStrandViewer
                        crystals={activeAllCrystals}
                        charm={selectedCharm}
                        viewMode={viewMode}
                        rotation={strandRotation}
                        onRotate={setStrandRotation}
                        totalBeadCount={totalBeadCount}
                        totalPrice={totalPrice}
                        compact={true}
                      />
                    </div>
                  ) : (
                    /* Exact 1:1 Pixel Image from Figma */
                    <img
                      src={figmaStrandImage}
                      alt="Live Strand Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  )}

                  {/* Drag to turn subtle indicator (allows clicking to toggle 3D) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsInteractingWith3D(prev => !prev);
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '9px',
                      color: isInteractingWith3D ? '#E5C378' : 'rgba(255, 255, 255, 0.45)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      zIndex: 6,
                      background: 'rgba(10, 8, 16, 0.5)',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}
                    title="Click to toggle interactive 3D spin"
                  >
                    <RotateCw size={10} />
                    <span>{isInteractingWith3D ? '3D ACTIVE' : 'DRAG TO TURN'}</span>
                  </div>
                </div>

                {/* STRAND INFO */}
                {currentStep === 5 ? (
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginBottom: '14px'
                    }}>
                      <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#6B6676', textTransform: 'uppercase' }}>
                        TOTAL · {totalBeadCount} BEADS
                      </span>
                      <span style={{ fontSize: '26px', fontWeight: 700, color: '#FFFFFF' }}>
                        ₹{totalPrice}
                      </span>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #ECC26A 0%, #D9AE4F 60%, #B88E3E 100%)',
                        color: '#0A0810',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '14px',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        cursor: 'pointer',
                        boxShadow: '0 4px 18px rgba(217, 174, 79, 0.25)',
                        marginBottom: '10px',
                        transition: 'transform 0.15s ease'
                      }}
                      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      Place order
                    </button>

                    <div style={{ fontSize: '11px', color: '#6B6676', lineHeight: 1.45 }}>
                      The piece goes to your bag; delivery and taxes are added at checkout.
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '10px', color: '#E5C378', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>
                      LIVE STRAND
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-serif, serif)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: '2px'
                    }}>
                      {selectedIntention?.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#8E8A9A', marginBottom: '16px' }}>
                      {selectedPurpose.title} · {selectedIntention?.title}
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px', marginBottom: '14px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#6B6676', textTransform: 'uppercase', marginBottom: '8px' }}>
                        PRICE BREAKDOWN
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#BBB5C3', marginBottom: '2px' }}>
                        <span>Korean elastic thread · 6.5"</span>
                        <span>{currentStep === 2 ? 4 : totalBeadCount}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#6B6676' }}>
                        <span>(Free-size fit)</span>
                        <span>beads</span>
                      </div>
                    </div>

                    <div style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingTop: '12px',
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginBottom: '14px'
                    }}>
                      <span style={{ fontSize: '12px', color: '#BBB5C3' }}>Live total</span>
                      <span style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF' }}>
                        ₹{currentStep === 2 ? 298 : totalPrice}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px' }}>
                      <button
                        onClick={() => setCurrentStep(2)}
                        style={{ background: 'none', border: 'none', color: '#8E8A9A', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                      >
                        EDIT SELECTION
                      </button>
                      <button
                        onClick={() => {
                          setStrandCrystals(selectedPurpose.defaultCrystals);
                          setNatalAttunements({ mulank: false, bhagyank: false, zodiac: false });
                        }}
                        style={{ background: 'none', border: 'none', color: '#8E8A9A', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                      >
                        CLEAR
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          BOTTOM STICKY ACTION BAR (FAITHFUL TO FIGMA)
         ---------------------------------------------------- */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '74px',
        background: 'rgba(20, 3, 34, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(191, 0, 255, 0.3)',
        boxShadow: '0 -10px 30px rgba(12, 0, 22, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 50,
        boxSizing: 'border-box'
      }}>
        {/* Left helper text */}
        <div style={{ fontSize: '12px', color: '#8E8A9A', minWidth: '220px' }}>
          {currentStep === 1
            ? (activeCategory === 'zodiac' ? 'Choose your zodiac sign to continue.' : 'Choose a purpose to continue.')
            : currentStep === 2
            ? 'Choose an intention to continue.'
            : currentStep === 3
            ? 'Adjust beads or proceed.'
            : currentStep === 4
            ? 'Confirm charm & thread.'
            : 'Review your consecrated strand.'}
        </div>

        {/* Center / Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* BACK BUTTON */}
          <button
            onClick={() => {
              if (currentStep > 1) setCurrentStep(currentStep - 1);
            }}
            disabled={currentStep === 1}
            style={{
              background: 'none',
              border: 'none',
              color: currentStep === 1 ? '#444' : '#BBB5C3',
              fontSize: '11.5px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              padding: '8px 12px'
            }}
          >
            BACK
          </button>

          {/* STEP & PRICE COUNTER */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9.5px', letterSpacing: '0.1em', color: '#6B6676', textTransform: 'uppercase' }}>
              STEP {currentStep} OF 5
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
              {currentStep === 1
                ? '0 beads · ₹140'
                : currentStep === 2
                ? '4 beads · ₹298'
                : `${totalBeadCount} beads · ₹${totalPrice}`}
            </div>
          </div>

          {/* PRIMARY NEXT / ORDER CTA BUTTON */}
          <button
            onClick={() => {
              if (currentStep < 5) {
                setCurrentStep(currentStep + 1);
              } else {
                handlePlaceOrder();
              }
            }}
            style={{
              background: 'linear-gradient(135deg, #ECC26A 0%, #D9AE4F 60%, #B88E3E 100%)',
              color: '#0A0810',
              border: 'none',
              borderRadius: '4px',
              padding: '12px 28px',
              fontSize: '12.5px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(217, 174, 79, 0.25)',
              minWidth: '150px',
              textAlign: 'center'
            }}
          >
            {currentStep === 1
              ? (activeCategory === 'zodiac' ? 'Next · crystals' : 'Next · Intention')
              : currentStep === 2
              ? 'Next · Birth'
              : currentStep === 3
              ? 'Next · Charm'
              : currentStep === 4
              ? 'Next · Review'
              : 'Place order'}
          </button>
        </div>
      </div>

      {/* ====================================================
          EDIT CRYSTALS MODAL (REPLICATING FIGMA PIXEL-BY-PIXEL)
         ==================================================== */}
      {isCrystalModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 2, 12, 0.82)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}
          onClick={() => setIsCrystalModalOpen(false)}
        >
          <div
            style={{
              background: '#12091A',
              border: '1px solid rgba(217, 174, 79, 0.28)',
              borderRadius: '8px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(191, 0, 255, 0.25)',
              width: '100%',
              maxWidth: modalTab === 'catalog' ? '600px' : '620px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              color: '#EDE8E1'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsCrystalModalOpen(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '20px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(25, 12, 38, 0.7)',
                color: '#EDE8E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
            >
              <X size={15} />
            </button>

            {/* Modal Header */}
            <div style={{ padding: '24px 26px 14px' }}>
              <div style={{
                fontSize: '10.5px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#E5C378',
                fontWeight: 600,
                marginBottom: '4px'
              }}>
                {modalTab === 'catalog' ? 'CATALOG' : (selectedIntention?.title || selectedPurpose?.title)}
              </div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                margin: '0 0 16px',
                fontFamily: 'var(--font-sans, system-ui, sans-serif)'
              }}>
                {modalTab === 'crystals'
                  ? 'RECOMMENDED CRYSTALS'
                  : modalTab === 'strand'
                  ? 'BUILD YOUR BRACELET'
                  : 'ADD ANOTHER CRYSTAL'}
              </h2>

              {modalTab !== 'catalog' && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '16px'
                }}>
                  <button
                    onClick={() => setModalTab('crystals')}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: modalTab === 'crystals' ? '2px solid #E5C378' : '2px solid transparent',
                      padding: '6px 0 10px',
                      color: modalTab === 'crystals' ? '#E5C378' : '#8E8A9A',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      marginBottom: '-1px',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>01</span>
                    <span>CRYSTALS</span>
                  </button>

                  <button
                    onClick={() => setModalTab('strand')}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: modalTab === 'strand' ? '2px solid #E5C378' : '2px solid transparent',
                      padding: '6px 0 10px',
                      color: modalTab === 'strand' ? '#E5C378' : '#8E8A9A',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      marginBottom: '-1px',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>02</span>
                    <span>STRAND</span>
                  </button>
                </div>
              )}

              <p style={{
                fontSize: '12.5px',
                color: '#8E8A9A',
                margin: 0,
                lineHeight: 1.5
              }}>
                {modalTab === 'crystals'
                  ? 'These are the traditional stones for your choice. All start on the strand; tap one to leave it out.'
                  : modalTab === 'strand'
                  ? 'Set the strand length, then how many of each crystal.'
                  : 'Each one joins the strand with a single bead. Adjust the counts afterwards.'}
              </p>
            </div>

            {/* TAB 1: 01 CRYSTALS */}
            {modalTab === 'crystals' && (
              <>
                <div style={{ padding: '4px 26px 24px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px'
                  }}>
                    {modalCrystals.slice(0, 4).map((c) => {
                      const isSelected = c.active;
                      return (
                        <div
                          key={c.id}
                          onClick={() => toggleModalCrystal(c.id)}
                          style={{
                            background: isSelected ? 'rgba(38, 12, 60, 0.65)' : 'rgba(20, 8, 30, 0.45)',
                            border: isSelected ? '1.5px solid #D9AE4F' : '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '6px',
                            padding: '8px',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            boxShadow: isSelected ? '0 0 16px rgba(217, 174, 79, 0.25)' : 'none'
                          }}
                        >
                          <div style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '1/1',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            marginBottom: '8px'
                          }}>
                            <img
                              src={c.img}
                              alt={c.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: isSelected ? 1 : 0.4,
                                transition: 'opacity 0.2s ease'
                              }}
                            />
                            {!isSelected && (
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(10, 5, 18, 0.65)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <span style={{ fontSize: '10px', color: '#8E8A9A', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                                  Removed
                                </span>
                              </div>
                            )}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: isSelected ? '#FFFFFF' : '#8E8A9A',
                            marginBottom: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {c.name}
                          </div>
                          <div style={{ fontSize: '10.5px', color: '#8E8A9A' }}>
                            ₹{c.pricePerBead % 1 === 0 ? c.pricePerBead : c.pricePerBead.toFixed(2)} / bead
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '16px 26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(15, 7, 24, 0.95)'
                }}>
                  <span style={{
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#EDE8E1',
                    fontWeight: 600
                  }}>
                    {modalCrystals.slice(0, 4).filter(c => c.active).length} OF {modalCrystals.slice(0, 4).length} SELECTED
                  </span>
                  <button
                    onClick={() => setModalTab('strand')}
                    style={{
                      background: 'linear-gradient(135deg, #ECC26A 0%, #D4AF37 100%)',
                      color: '#0A0810',
                      fontWeight: 600,
                      fontSize: '12px',
                      padding: '10px 22px',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    Next · build the strand
                  </button>
                </div>
              </>
            )}

            {/* TAB 2: 02 STRAND */}
            {modalTab === 'strand' && (
              <>
                <div style={{ padding: '0 26px 20px', maxHeight: '420px', overflowY: 'auto' }}>
                  {/* Add another crystal button top row */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                    <button
                      onClick={() => setModalTab('catalog')}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(217, 174, 79, 0.5)',
                        color: '#EDE8E1',
                        borderRadius: '9999px',
                        padding: '6px 14px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Plus size={12} />
                      <span>Add another crystal</span>
                    </button>
                  </div>

                  {/* STRAND LENGTH */}
                  <div style={{ marginBottom: '22px' }}>
                    <div style={{
                      fontSize: '10.5px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#E5C378',
                      fontWeight: 600,
                      marginBottom: '10px'
                    }}>
                      STRAND LENGTH
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px'
                    }}>
                      {[
                        { count: 16, price: 2140 },
                        { count: 18, price: 2407.50 },
                        { count: 22, price: 2942.50 }
                      ].map(opt => {
                        const isSelected = modalStrandLength === opt.count;
                        return (
                          <button
                            key={opt.count}
                            onClick={() => setModalStrandLength(opt.count)}
                            style={{
                              background: isSelected ? 'rgba(38, 12, 60, 0.85)' : 'rgba(20, 8, 30, 0.6)',
                              border: isSelected ? '1.5px solid #D9AE4F' : '1px solid rgba(255, 255, 255, 0.12)',
                              borderRadius: '4px',
                              padding: '12px 10px',
                              color: '#FFFFFF',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              fontSize: '12.5px',
                              boxShadow: isSelected ? '0 0 16px rgba(217, 174, 79, 0.2)' : 'none',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span style={{ fontWeight: 600 }}>{opt.count} beads</span>
                            <span style={{ color: '#C5A572', fontSize: '11px' }}>
                              ₹{opt.price.toLocaleString('en-IN', { minimumFractionDigits: opt.price % 1 === 0 ? 0 : 2 })}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* BEADS ON THE STRAND */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}>
                      <span style={{
                        fontSize: '10.5px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#E5C378',
                        fontWeight: 600
                      }}>
                        BEADS ON THE STRAND
                      </span>
                      <span style={{
                        fontSize: '11px',
                        color: modalTotalBeads === modalStrandLength ? '#E5C378' : '#8E8A9A'
                      }}>
                        {modalTotalBeads} of {modalStrandLength} complete
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      {modalActiveCrystals.map((c) => {
                        const itemTotal = (c.count || 0) * (c.pricePerBead || 0);
                        return (
                          <div
                            key={c.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 12px',
                              background: 'rgba(25, 10, 38, 0.55)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '6px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={c.img}
                                alt={c.name}
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '6px',
                                  objectFit: 'cover'
                                }}
                              />
                              <div>
                                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#FFFFFF' }}>
                                  {c.name}
                                </div>
                                <div style={{ fontSize: '11px', color: '#8E8A9A' }}>
                                  ₹{c.pricePerBead % 1 === 0 ? c.pricePerBead : c.pricePerBead.toFixed(2)} / bead · ₹{itemTotal % 1 === 0 ? itemTotal : itemTotal.toFixed(2)}
                                </div>
                              </div>
                            </div>

                            {/* Counter Stepper */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '4px',
                              overflow: 'hidden',
                              background: 'rgba(15, 6, 22, 0.7)'
                            }}>
                              <button
                                onClick={() => adjustModalCrystalCount(c.id, -1)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#EDE8E1',
                                  padding: '5px 9px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Minus size={11} />
                              </button>
                              <span style={{
                                padding: '0 8px',
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                minWidth: '18px',
                                textAlign: 'center'
                              }}>
                                {c.count}
                              </span>
                              <button
                                onClick={() => adjustModalCrystalCount(c.id, 1)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#EDE8E1',
                                  padding: '5px 9px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '16px 26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(15, 7, 24, 0.95)'
                }}>
                  <div>
                    <div style={{
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#8E8A9A',
                      fontWeight: 600
                    }}>
                      {modalTotalBeads} BEADS
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#FFFFFF'
                    }}>
                      ₹{modalTotalWithThread.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => setModalTab('crystals')}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        color: '#EDE8E1',
                        padding: '8px 18px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={applyModalCrystals}
                      style={{
                        background: 'linear-gradient(135deg, #ECC26A 0%, #D4AF37 100%)',
                        color: '#0A0810',
                        fontWeight: 600,
                        fontSize: '12px',
                        padding: '9px 22px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      Use these crystals
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* TAB 3: CATALOG (ADD ANOTHER CRYSTAL) */}
            {modalTab === 'catalog' && (
              <>
                <div style={{ padding: '0 26px 20px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px',
                    maxHeight: '340px',
                    overflowY: 'auto',
                    padding: '4px 2px 14px'
                  }}>
                    {FULL_CRYSTAL_CATALOG.map((stone) => (
                      <div
                        key={stone.id}
                        onClick={() => addCatalogCrystalToModal(stone)}
                        style={{
                          background: 'rgba(25, 10, 38, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          padding: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '1/1',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          marginBottom: '8px'
                        }}>
                          <img
                            src={stone.img}
                            alt={stone.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: '6px',
                            right: '6px',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: 'rgba(10, 8, 16, 0.75)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF'
                          }}>
                            <Plus size={11} />
                          </div>
                        </div>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#FFFFFF',
                          marginBottom: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {stone.name}
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#8E8A9A' }}>
                          ₹{stone.pricePerBead.toLocaleString('en-IN', { minimumFractionDigits: stone.pricePerBead % 1 === 0 ? 0 : 2 })} / bead
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '16px 26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(15, 7, 24, 0.95)'
                }}>
                  <span style={{
                    fontSize: '10.5px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#C5A572',
                    fontWeight: 600
                  }}>
                    TAP A CRYSTAL TO ADD IT
                  </span>
                  <button
                    onClick={() => setModalTab('strand')}
                    style={{
                      background: 'linear-gradient(135deg, #ECC26A 0%, #D4AF37 100%)',
                      color: '#0A0810',
                      fontWeight: 600,
                      fontSize: '12px',
                      padding: '9px 24px',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
