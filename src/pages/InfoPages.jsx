import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Shield, BookOpen, HelpCircle, Truck, RefreshCw } from 'lucide-react';

export const InfoPages = ({ type = 'about' }) => {
  const { navigateTo } = useShop();

  if (type === 'journal') {
    return (
      <div style={{
        minHeight: '85vh',
        background: 'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(191, 0, 255, 0.35), transparent 75%), radial-gradient(circle 600px at 85% 30%, rgba(160, 0, 255, 0.22), transparent), radial-gradient(circle 500px at 10% 65%, rgba(191, 0, 255, 0.16), transparent), linear-gradient(180deg, #320054 0%, #200038 35%, #130022 75%, #0B0014 100%)',
        padding: '60px 0 96px'
      }}>
        <div className="container-custom">
          <div style={{ marginBottom: '56px', textAlign: 'center' }}>
            <span className="section-eyebrow">CHRONICLES & VEDIC INSIGHTS</span>
            <h1 className="section-title">
              THE <span className="gold-italic">journal</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#AAA3AF', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
              Deep inquiries into sacred minerals, planetary correspondences, and intentional living.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px'
          }}>
            {[
              {
                title: "How to Cleanse & Consecrate Your Rudraksha Strand",
                category: "RUDRAKSHA RITUALS",
                date: "October 12, 2026",
                readTime: "5 min read",
                image: "/assets/home-desktop1440_img_4.jpg",
                excerpt: "The sacred seed carries living prana. Discover the ancient oil and gangajal bath methods to awaken five-faced beads."
              },
              {
                title: "The Geometry of 18 Beads: Why Mala Math Matters",
                category: "SACRED MATHEMATICS",
                date: "September 28, 2026",
                readTime: "7 min read",
                image: "/assets/home-desktop1440_img_2.jpg",
                excerpt: "From 108 cosmic beads to the 18-bead daily bracelet: how harmonic divisors focus subconscious intention."
              },
              {
                title: "Rose Quartz & Moonstone: The Synergy of the Open Heart",
                category: "CRYSTAL WISDOM",
                date: "September 15, 2026",
                readTime: "4 min read",
                image: "/assets/01home_img_4.jpg",
                excerpt: "Why pairing soft pink quartz with moonlit feldspar creates the ideal alchemy for emotional healing."
              }
            ].map((post, idx) => (
              <div
                key={idx}
                className="luxury-card"
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', color: '#D9AE4F', letterSpacing: '0.12em', fontWeight: 600 }}>
                    {post.category} · {post.readTime}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-brand)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#EDE8E1',
                    margin: '8px 0 10px',
                    lineHeight: 1.3
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#AAA3AF', lineHeight: 1.6, marginBottom: '20px' }}>
                    {post.excerpt}
                  </p>
                  <span style={{ marginTop: 'auto', fontSize: '12px', color: '#F5DC93', fontWeight: 600 }}>
                    Read full article →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'about') {
    return (
      <div style={{ background: '#0A0810', minHeight: '85vh', padding: '60px 0 96px' }}>
        <div className="container-custom" style={{ maxWidth: '840px' }}>
          <span className="section-eyebrow">ABOUT THE HOUSE</span>
          <h1 className="section-title" style={{ marginBottom: '24px' }}>
            HEAL. ALIGN. <span className="gold-italic">Attract abundance.</span>
          </h1>

          <div style={{
            fontSize: '16px',
            color: '#AAA3AF',
            lineHeight: 1.8,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginBottom: '48px'
          }}>
            <p>
              <strong style={{ color: '#EDE8E1' }}>KUBERSTONES</strong> was born from a singular reverence: 
              that sacred earth elements — natural crystals, consecrated rudraksha, and Vedic gemstones — 
              are not mere ornaments, but focal antennas for consciousness and conscious manifestation.
            </p>
            <p>
              In a modern world cluttered with mass-produced synthetic beads and hurried assembly, 
              we remain an intentional atelier. Every single bead in our house is hand-selected, 
              verified for vibrational integrity, and strung on high-tensile jewelers silk by master stringers in Jaipur and the foothills of Nepal.
            </p>
            <p>
              Before any piece departs our sanctuary, it is cleansed with pure holy water, 
              suffused with cedarwood and sandalwood smoke, and attuned to the frequency of abundance honoring Lord Kuber.
            </p>
          </div>

          <div style={{
            padding: '32px',
            background: '#120D19',
            border: '1px solid rgba(217, 174, 79, 0.25)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '20px', color: '#EDE8E1', marginBottom: '4px' }}>
                Explore The Atelier
              </h3>
              <p style={{ fontSize: '14px', color: '#AAA3AF' }}>Build your bespoke intention strand with our live 3D visualizer.</p>
            </div>
            <button
              onClick={() => navigateTo('studio')}
              className="btn-gold"
            >
              Compose Your Strand
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FAQ Page
  if (type === 'faq') {
    return (
      <div style={{ background: '#0A0810', minHeight: '85vh', padding: '60px 0 96px' }}>
        <div className="container-custom" style={{ maxWidth: '840px' }}>
          <span className="section-eyebrow">COMMON INQUIRIES</span>
          <h1 className="section-title" style={{ marginBottom: '32px' }}>
            FREQUENTLY <span className="gold-italic">asked questions</span>
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: "Are the crystals and gemstones 100% natural and authentic?",
                a: "Yes. Every single stone is certified natural and untreated. We do not use dyed glass, plastic, or synthetic imitations. Each high-value gemstone comes with a laboratory certification of authenticity."
              },
              {
                q: "How do I choose the right wrist size?",
                a: "Measure snugly around your wrist bone with a strip of paper or measuring tape. For a 14–15.5 cm wrist, choose Small (S). For a 16–17 cm wrist, choose Medium (M - Standard). For 17.5–19 cm, choose Large (L). If in doubt, Medium fits 85% of people."
              },
              {
                q: "How are the custom atelier strands created?",
                a: "When you design a strand in our Atelier, our master artisans pick each stone to match your exact count and intention. The strand is strung within 48 hours, consecrated, and shipped in a luxury velvet presentation box."
              },
              {
                q: "Can I wear my bracelet while showering or sleeping?",
                a: "We recommend removing crystal and rudraksha bracelets before showering, vigorous swimming, or using heavy chemical perfumes to protect the natural stones and elastic silk longevity."
              },
              {
                q: "What is your return or exchange policy?",
                a: "We offer an effortless 7-day exchange window if the size needs adjustment or if you wish to realign your intention."
              }
            ].map((faq, i) => (
              <div
                key={i}
                style={{
                  background: '#120D19',
                  border: '1px solid rgba(217, 174, 79, 0.16)',
                  borderRadius: '6px',
                  padding: '24px'
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#EDE8E1', marginBottom: '8px' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '14px', color: '#AAA3AF', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Shipping & Policies
  return (
    <div style={{ background: '#0A0810', minHeight: '85vh', padding: '60px 0 96px' }}>
      <div className="container-custom" style={{ maxWidth: '840px' }}>
        <span className="section-eyebrow">HOUSE POLICIES</span>
        <h1 className="section-title" style={{ marginBottom: '24px' }}>
          SHIPPING & <span className="gold-italic">delivery</span>
        </h1>

        <div style={{
          background: '#120D19',
          border: '1px solid rgba(217, 174, 79, 0.16)',
          borderRadius: '8px',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          color: '#AAA3AF',
          fontSize: '15px',
          lineHeight: 1.7
        }}>
          <p>
            <strong style={{ color: '#EDE8E1' }}>Free Insured Shipping:</strong> All orders above ₹999 qualify for complimentary insured domestic shipping across India.
          </p>
          <p>
            <strong style={{ color: '#EDE8E1' }}>Dispatch Timeline:</strong> Ready-to-wear pieces are dispatched within 24 hours. Custom Atelier strands are strung to order, consecrated, and dispatched within 48 hours.
          </p>
          <p>
            <strong style={{ color: '#EDE8E1' }}>Delivery Partners:</strong> We partner with BlueDart, Delhivery, and DTDC with end-to-end SMS and WhatsApp tracking.
          </p>
          <p>
            <strong style={{ color: '#EDE8E1' }}>Easy 7-Day Exchange:</strong> If your wrist measurement requires resizing or you wish to adjust stones, our concierge will arrange a seamless exchange.
          </p>
        </div>
      </div>
    </div>
  );
};
