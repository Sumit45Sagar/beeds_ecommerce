import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, Star, ShoppingBag, Truck, ShieldCheck, RefreshCw, Plus, Minus, ArrowLeft } from 'lucide-react';

export const ProductDetailPage = () => {
  const { selectedProductId, addToCart, toggleWishlist, isInWishlist, navigateTo } = useShop();

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedStone, setSelectedStone] = useState(product.stones?.[0] || 'Rose Quartz');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || 'M · 16 cm');
  const [qty, setQty] = useState(1);

  const wishlisted = isInWishlist(product.id);

  // Recommendations: Other products excluding current
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div style={{
      background: '#0A0810',
      minHeight: '90vh',
      paddingTop: '24px',
      paddingBottom: '96px'
    }}>
      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          color: '#AAA3AF',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => navigateTo('home')}
            style={{ background: 'none', border: 'none', color: '#AAA3AF', cursor: 'pointer', padding: 0 }}
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo(product.house)}
            style={{ background: 'none', border: 'none', color: '#AAA3AF', cursor: 'pointer', padding: 0 }}
          >
            {product.category}
          </button>
          <span>/</span>
          <span style={{ color: '#EDE8E1', fontWeight: 500 }}>{product.name}</span>
        </div>

        {/* Main Product Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '56px',
          alignItems: 'start',
          marginBottom: '96px'
        }}>
          {/* Left Gallery */}
          <div>
            {/* Hero Image */}
            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '8px',
              overflow: 'hidden',
              background: 'radial-gradient(circle, #22173A 0%, #0D0914 100%)',
              border: '1px solid rgba(217, 174, 79, 0.25)',
              marginBottom: '16px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
            }}>
              <img
                src={selectedImage}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {(product.gallery || [product.image]).map((img, idx) => {
                const isActive = selectedImage === img;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: isActive ? '2px solid #D9AE4F' : '1px solid rgba(217, 174, 79, 0.15)',
                      background: '#120D19',
                      padding: 0,
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 0 12px rgba(217, 174, 79, 0.35)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Product Info */}
          <div>
            {/* Category / Purpose Tag */}
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#D9AE4F',
              display: 'block',
              marginBottom: '8px'
            }}>
              {product.category} · {product.purpose}
            </span>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-brand)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              lineHeight: 1.15,
              color: '#EDE8E1',
              marginBottom: '12px'
            }}>
              {product.name}
            </h1>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px', color: '#D9AE4F' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="#D9AE4F" stroke="#D9AE4F" />
                ))}
              </div>
              <span style={{ fontSize: '13px', color: '#EDE8E1', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ fontSize: '13px', color: '#7D7682' }}>·</span>
              <span style={{ fontSize: '13px', color: '#AAA3AF' }}>{product.reviewsCount} reviews</span>
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <span style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '32px',
                fontWeight: 700,
                color: '#EDE8E1'
              }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>

              {product.originalPrice && (
                <span style={{
                  fontSize: '16px',
                  color: '#7D7682',
                  textDecoration: 'line-through'
                }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}

              {product.badge && (
                <span className="badge-flash">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '15px',
              color: '#AAA3AF',
              lineHeight: 1.7,
              marginBottom: '28px'
            }}>
              {product.description}
            </p>

            {/* STONES Selection */}
            {product.stones && (
              <div style={{ marginBottom: '24px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#EDE8E1',
                  display: 'block',
                  marginBottom: '10px'
                }}>
                  STONES
                </span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.stones.map(st => {
                    const isSelected = selectedStone === st;
                    return (
                      <button
                        key={st}
                        onClick={() => setSelectedStone(st)}
                        className={`pill-tab ${isSelected ? 'active' : ''}`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* WRIST SIZE Selection */}
            {product.sizes && (
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#EDE8E1'
                  }}>
                    WRIST SIZE
                  </span>
                  <span style={{ fontSize: '11px', color: '#D9AE4F', cursor: 'pointer' }}>Size Guide</span>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.sizes.map(sz => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`pill-tab ${isSelected ? 'active' : ''}`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag CTAs */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '32px' }}>
              {/* Stepper */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(217, 174, 79, 0.25)',
                borderRadius: '4px',
                height: '48px',
                padding: '0 4px'
              }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#AAA3AF',
                    padding: '8px 12px',
                    cursor: 'pointer'
                  }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '15px', fontWeight: 600, minWidth: '24px', textAlign: 'center', color: '#EDE8E1' }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#AAA3AF',
                    padding: '8px 12px',
                    cursor: 'pointer'
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Bag Button (Gold Radiant) */}
              <button
                onClick={() => addToCart(product, selectedSize, selectedStone, qty)}
                className="btn-gold"
                style={{ flexGrow: 1, height: '48px', fontSize: '13px' }}
              >
                <ShoppingBag size={16} />
                <span>Add to bag</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '4px',
                  border: '1px solid rgba(217, 174, 79, 0.3)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: wishlisted ? '#D9AE4F' : '#EDE8E1',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Wishlist toggle"
              >
                <Heart size={18} fill={wishlisted ? '#D9AE4F' : 'none'} />
              </button>
            </div>

            {/* Free shipping & Consecration seal card */}
            <div style={{
              background: '#120D19',
              border: '1px solid rgba(217, 174, 79, 0.16)',
              borderRadius: '6px',
              padding: '18px 22px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '18px'
            }}>
              <img
                src="/assets/kuber-logo-transparent.png"
                alt="Kuberstones Royal Seal"
                style={{
                  width: '46px',
                  height: 'auto',
                  flexShrink: 0,
                  filter: 'drop-shadow(0 2px 10px rgba(197, 165, 114, 0.45))'
                }}
              />
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#EDE8E1',
                  marginBottom: '4px'
                }}>
                  Vedic Consecration & Free Shipping over ₹999
                </div>
                <p style={{ fontSize: '13px', color: '#AAA3AF', lineHeight: 1.5, margin: 0 }}>
                  Blessed in Haridwar, strung to order with certified authentic minerals. Easy 7-day exchange.
                </p>
              </div>
            </div>

            {/* Sacred Intent & Vedic Craft Accordion */}
            {product.benefits && (
              <div style={{
                borderTop: '1px solid rgba(217, 174, 79, 0.14)',
                paddingTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D9AE4F', fontWeight: 600 }}>
                  SACRED ENERGY & BENEFITS
                </span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.benefits.map((b, idx) => (
                    <li key={idx} style={{ fontSize: '13px', color: '#AAA3AF', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#D9AE4F' }}>✦</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* SECTION: YOU MAY ALSO LIKE (Exact Figma) */}
        <div className="reveal-on-scroll" style={{ borderTop: '1px solid rgba(217, 174, 79, 0.16)', paddingTop: '64px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 className="section-title">
              YOU MAY <span className="gold-italic">also like</span>
            </h2>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 320px))',
            gap: '24px'
          }}>
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
