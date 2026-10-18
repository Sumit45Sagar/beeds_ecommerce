import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Sparkles, RefreshCw, Truck } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useShop();

  return (
    <footer style={{
      background: '#12091E',
      borderTop: '1px solid rgba(197, 165, 114, 0.15)',
      paddingTop: '80px',
      paddingBottom: '48px',
      position: 'relative'
    }}>
      {/* Trust Badges Strip */}
      <div className="container-custom" style={{
        marginBottom: '64px',
        paddingBottom: '48px',
        borderBottom: '1px solid rgba(197, 165, 114, 0.12)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 0,
              background: '#180D28',
              border: '1px solid rgba(197, 165, 114, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C5A572',
              flexShrink: 0
            }}>
              <Sparkles size={16} strokeWidth={1.5} />
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#F4F1EC', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '4px' }}>Certified Authentic</h4>
              <p style={{ fontSize: '12px', color: '#A8A39D', lineHeight: 1.6 }}>100% genuine lab-verified mineral specimens</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 0,
              background: '#180D28',
              border: '1px solid rgba(197, 165, 114, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C5A572',
              flexShrink: 0
            }}>
              <Truck size={16} strokeWidth={1.5} />
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#F4F1EC', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '4px' }}>Insured Dispatch</h4>
              <p style={{ fontSize: '12px', color: '#A8A39D', lineHeight: 1.6 }}>Complimentary on orders above ₹999 in India</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 0,
              background: '#180D28',
              border: '1px solid rgba(197, 165, 114, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C5A572',
              flexShrink: 0
            }}>
              <RefreshCw size={16} strokeWidth={1.5} />
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#F4F1EC', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '4px' }}>Restringing Guarantee</h4>
              <p style={{ fontSize: '12px', color: '#A8A39D', lineHeight: 1.6 }}>7-day complimentary sizing adjustment</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 0,
              background: '#180D28',
              border: '1px solid rgba(197, 165, 114, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C5A572',
              flexShrink: 0
            }}>
              <ShieldCheck size={16} strokeWidth={1.5} />
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#F4F1EC', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '4px' }}>Vedic Consecration</h4>
              <p style={{ fontSize: '12px', color: '#A8A39D', lineHeight: 1.6 }}>Strung with sacred mantras before departure</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          marginBottom: '64px'
        }}>
          {/* Brand Manifesto Column */}
          <div style={{ gridColumn: 'span 2' }}>
            <div
              onClick={() => navigateTo('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', marginBottom: '22px' }}
            >
              <img
                src="/assets/kuber-logo-transparent.png"
                alt="Kuberstones Logo"
                style={{
                  height: '46px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 2px 12px rgba(197, 165, 114, 0.45))'
                }}
              />
              <span style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.24em',
                color: '#F4F1EC',
                textTransform: 'uppercase'
              }}>
                KUBERSTONES
              </span>
            </div>

            <p style={{
              color: '#A8A39D',
              fontSize: '13px',
              lineHeight: 1.8,
              maxWidth: '400px',
              marginBottom: '28px'
            }}>
              Heal. Align. Attract abundance. Sacred spiritual jewellery composed with restraint — natural crystals, rare rudraksha, and consecrated gemstones, made entirely by hand.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{
                fontSize: '10px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#C5A572',
                padding: '6px 14px',
                border: '1px solid rgba(197, 165, 114, 0.25)',
                borderRadius: 0
              }}>
                Vedic Provenance
              </span>
              <span style={{
                fontSize: '10px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#A8A39D',
                padding: '6px 14px',
                border: '1px solid rgba(197, 165, 114, 0.15)',
                borderRadius: 0
              }}>
                Fair Mineral Trade
              </span>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C5A572',
              marginBottom: '22px'
            }}>
              THE HOUSES
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'House of Crystals', page: 'crystals' },
                { label: 'House of Rudraksha', page: 'rudraksha' },
                { label: 'House of Gemstones', page: 'gemstones' },
                { label: 'The Custom Atelier', page: 'studio' },
                { label: 'Full Sacred Catalogue', page: 'shop-all' }
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#A8A39D',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                      transition: 'color 0.2s ease',
                      fontFamily: 'var(--font-sans)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#F4F1EC'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#A8A39D'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CLIENT SERVICE Column */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C5A572',
              marginBottom: '22px'
            }}>
              ATELIER SERVICE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Sanctuary Member Sign In', page: 'login' },
                { label: 'Join Abundance Circle', page: 'signup' },
                { label: 'Consecration & Sizing', page: 'about' },
                { label: 'Shipping & Delivery', page: 'shipping' },
                { label: 'Returns & Exchange', page: 'returns' },
                { label: 'Authenticity Certificates', page: 'faq' },
                { label: 'Grievance Officer', page: 'grievance' }
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#A8A39D',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                      transition: 'color 0.2s ease',
                      fontFamily: 'var(--font-sans)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#F4F1EC'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#A8A39D'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid rgba(197, 165, 114, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: '#75716B'
        }}>
          <div>
            © {new Date().getFullYear()} KUBERSTONES ATELIER. ARCHITECTURAL VEDIC JEWELLERY.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>SECURE CHECKOUT</span>
            <span>RISHIKESH · JAIPUR · NEPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
