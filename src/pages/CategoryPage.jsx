import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, HOUSES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

export const CategoryPage = ({ houseId = 'crystals' }) => {
  const { navigateTo } = useShop();
  const [subFilter, setSubFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Find house info
  const house = HOUSES.find(h => h.id === houseId) || {
    id: houseId,
    number: houseId === 'flash-sale' ? 'LIMITED EDITION' : 'SACRED COLLECTION',
    title: houseId === 'shop-all' ? 'SHOP ALL' : houseId === 'flash-sale' ? 'FLASH SALE' : houseId.toUpperCase(),
    desc: 'Handcrafted spiritual jewelry strung for your highest alignment and conscious manifestation.',
    image: '/assets/01home_img_1.jpg',
    count: `${PRODUCTS.length} pieces available`
  };

  // Base products for this category
  const baseProducts = PRODUCTS.filter(p => {
    if (houseId === 'shop-all') return true;
    if (houseId === 'flash-sale') return p.isFlash;
    return p.house === houseId;
  });

  // Filter products for this page view
  let products = [...baseProducts];
  if (subFilter !== 'all') {
    products = products.filter(p => p.purpose?.toLowerCase() === subFilter.toLowerCase());
  }

  // Sorting
  if (sortBy === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div style={{ background: '#0A0810' }}>
      {/* Category Hero Banner (Exact Figma crystals.png) */}
      <section style={{
        position: 'relative',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(217, 174, 79, 0.15)'
      }}>
        <img
          src={house.image}
          alt={house.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.55
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #0A0810 0%, rgba(10, 8, 16, 0.85) 50%, rgba(10, 8, 16, 0.4) 100%)'
        }} />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, padding: '60px 24px' }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#AAA3AF',
            marginBottom: '20px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            <button
              onClick={() => navigateTo('home')}
              style={{ background: 'none', border: 'none', color: '#AAA3AF', cursor: 'pointer', padding: 0 }}
            >
              HOME
            </button>
            <span>/</span>
            <span style={{ color: '#D9AE4F', fontWeight: 600 }}>{house.title}</span>
          </div>

          <span className="section-eyebrow">{house.number}</span>
          <h1 style={{
            fontFamily: 'var(--font-brand)',
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: '#EDE8E1',
            lineHeight: 1.1,
            marginBottom: '16px'
          }}>
            {house.title}
          </h1>

          <p style={{
            fontSize: '16px',
            color: '#AAA3AF',
            maxWidth: '540px',
            lineHeight: 1.6,
            marginBottom: '28px'
          }}>
            {house.desc}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '12px',
              padding: '6px 14px',
              background: 'rgba(25, 18, 31, 0.7)',
              border: '1px solid rgba(217, 174, 79, 0.25)',
              borderRadius: '999px',
              color: '#EDE8E1'
            }}>
              {baseProducts.length} pieces
            </span>
            <span style={{
              fontSize: '12px',
              padding: '6px 14px',
              background: 'rgba(25, 18, 31, 0.7)',
              border: '1px solid rgba(217, 174, 79, 0.25)',
              borderRadius: '999px',
              color: '#EDE8E1'
            }}>
              Consecrated
            </span>
            <button
              onClick={() => navigateTo('studio')}
              style={{
                fontSize: '12px',
                padding: '6px 14px',
                background: 'rgba(217, 174, 79, 0.15)',
                border: '1px solid #D9AE4F',
                borderRadius: '999px',
                color: '#F5DC93',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Custom Studio</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* PIECES SECTION (Exact Figma layout) */}
      <section
        className="category-pieces-section"
        style={{
          background: 'linear-gradient(180deg, #F6EEDD 0%, #EFE3CA 100%)',
          paddingTop: '64px',
          paddingBottom: '80px',
          borderTop: '1px solid rgba(197, 165, 114, 0.35)',
          borderBottom: '1px solid rgba(197, 165, 114, 0.35)',
          position: 'relative'
        }}
      >
        <div className="container-custom">
          {/* Eyebrow & Controls */}
          <div style={{ marginBottom: '24px' }} className="reveal-on-scroll">
            <span className="section-eyebrow">THE COLLECTION</span>
            <h2 className="section-title">PIECES</h2>
          </div>

          {/* Filter Bar & Sort */}
          <div className="reveal-on-scroll" style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(197, 165, 114, 0.25)',
            marginBottom: '40px'
          }}>
            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSubFilter('all')}
                className={`pill-tab ${subFilter === 'all' ? 'active' : ''}`}
              >
                All ({baseProducts.length})
              </button>
              <button
                onClick={() => setSubFilter('Love')}
                className={`pill-tab ${subFilter === 'Love' ? 'active' : ''}`}
              >
                Love & Heart
              </button>
              <button
                onClick={() => setSubFilter('Money')}
                className={`pill-tab ${subFilter === 'Money' ? 'active' : ''}`}
              >
                Wealth & Abundance
              </button>
              <button
                onClick={() => setSubFilter('Peace')}
                className={`pill-tab ${subFilter === 'Peace' ? 'active' : ''}`}
              >
                Calm & Peace
              </button>
              <button
                onClick={() => setSubFilter('Protection')}
                className={`pill-tab ${subFilter === 'Protection' ? 'active' : ''}`}
              >
                Protection & Shield
              </button>
              <button
                onClick={() => setSubFilter('Confidence')}
                className={`pill-tab ${subFilter === 'Confidence' ? 'active' : ''}`}
              >
                Confidence & Power
              </button>
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '13px', color: '#695B44' }}>{products.length} pieces shown</span>
              <div style={{ position: 'relative' }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    background: '#FAF4E8',
                    color: '#1A160F',
                    border: '1px solid rgba(197, 165, 114, 0.35)',
                    borderRadius: '4px',
                    padding: '8px 32px 8px 14px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    outline: 'none',
                    appearance: 'none'
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#8C7245' }} />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', color: '#695B44' }}>
              <p style={{ fontSize: '16px', marginBottom: '16px' }}>No pieces found under this selected intention.</p>
              <button
                onClick={() => setSubFilter('all')}
                className="pill-tab active"
                style={{ padding: '8px 20px', cursor: 'pointer' }}
              >
                View All Pieces
              </button>
            </div>
          ) : (
            <div className="category-products-grid reveal-stagger">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* INSIDE THE HOUSE COLLECTIONS SUB-SECTION (Figma crystals.png) */}
          <div className="reveal-on-scroll" style={{ borderTop: '1px solid rgba(197, 165, 114, 0.25)', paddingTop: '64px' }}>
            <div style={{ marginBottom: '32px' }}>
              <span className="section-eyebrow">INSIDE THE HOUSE</span>
              <h2 className="section-title">
                {house.title} <span className="gold-italic">collections</span>
              </h2>
            </div>

            <div className="reveal-stagger" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {/* Card 1: Zodiac */}
              <div
                onClick={() => navigateTo('zodiac')}
                className="luxury-card"
                style={{
                  height: '280px',
                  position: 'relative',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <img
                  src="/assets/01home_img_4.jpg"
                  alt="Zodiac Bracelets"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,8,16,0.3) 0%, rgba(10,8,16,0.9) 100%)' }} />

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: '#D9AE4F', letterSpacing: '0.1em' }}>01</span>
                  <span style={{ fontSize: '11px', color: '#AAA3AF', padding: '2px 8px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px' }}>2 pieces</span>
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '22px', fontWeight: 700, color: '#EDE8E1' }}>
                    ZODIAC BRACELETS
                  </h3>
                  <p style={{ fontSize: '12px', color: '#AAA3AF', marginTop: '4px', marginBottom: '14px' }}>
                    Pieces composed around zodiac correspondences.
                  </p>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(217, 174, 79, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F5DC93'
                  }}>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>

              {/* Card 2: Numerology */}
              <div
                onClick={() => navigateTo('shop-all')}
                className="luxury-card"
                style={{
                  height: '280px',
                  position: 'relative',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <img
                  src="/assets/01home_img_6.jpg"
                  alt="Numerology Bracelets"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,8,16,0.3) 0%, rgba(10,8,16,0.9) 100%)' }} />

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: '#D9AE4F', letterSpacing: '0.1em' }}>02</span>
                  <span style={{ fontSize: '11px', color: '#AAA3AF', padding: '2px 8px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px' }}>1 piece</span>
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '22px', fontWeight: 700, color: '#EDE8E1' }}>
                    NUMEROLOGY BRACELETS
                  </h3>
                  <p style={{ fontSize: '12px', color: '#AAA3AF', marginTop: '4px', marginBottom: '14px' }}>
                    Collections guided by number and personal year.
                  </p>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(217, 174, 79, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F5DC93'
                  }}>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>

              {/* Card 3: Studio Customizer */}
              <div
                onClick={() => navigateTo('studio')}
                className="luxury-card"
                style={{
                  height: '280px',
                  position: 'relative',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid #D9AE4F'
                }}
              >
                <img
                  src="/assets/home-desktop1440_img_2.jpg"
                  alt="Customize Your Bracelet"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(34,23,58,0.4) 0%, rgba(10,8,16,0.92) 100%)' }} />

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: '#F5DC93', letterSpacing: '0.1em', fontWeight: 700 }}>STUDIO</span>
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '22px', fontWeight: 700, color: '#EDE8E1' }}>
                    CUSTOMIZE YOUR BRACELET
                  </h3>
                  <p style={{ fontSize: '12px', color: '#AAA3AF', marginTop: '4px', marginBottom: '14px' }}>
                    Build a personal piece by purpose and intention.
                  </p>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--gold-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0A0810'
                  }}>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .category-pieces-section .section-title {
          color: #1A160F;
        }
        .category-pieces-section .section-eyebrow {
          color: #8C7245;
        }
        .category-pieces-section .gold-italic {
          color: #9B783E;
        }
        .category-pieces-section .pill-tab {
          background: #FAF4E8;
          color: #3B3120;
          border: 1px solid rgba(197, 165, 114, 0.35);
        }
        .category-pieces-section .pill-tab:hover {
          border-color: #C5A572;
          background: #F3E7CF;
          color: #1A160F;
        }
        .category-pieces-section .pill-tab.active {
          background: #967439;
          border-color: #967439;
          color: #FFFFFF;
        }
        .category-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }
        @media (max-width: 1200px) {
          .category-products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 860px) {
          .category-products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .category-products-grid {
            grid-template-columns: 1fr;
            justify-items: center;
          }
        }
      `}</style>
    </div>
  );
};
