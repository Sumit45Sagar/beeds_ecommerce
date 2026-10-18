import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cartOpen,
    setCartOpen,
    cart,
    removeFromCart,
    updateQty,
    rawSubtotal,
    offerDiscount,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    gst,
    finalTotal,
    totalItemsCount,
    navigateTo
  } = useShop();

  // Prevent background scrolling while drawer is open (modern web practice)
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(5, 4, 8, 0.75)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    }}
      onClick={() => setCartOpen(false)}
    >
      {/* Drawer Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          height: '100%',
          background: '#0E0916',
          borderLeft: '1px solid rgba(217, 174, 79, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid rgba(217, 174, 79, 0.12)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: '#0E0916',
          zIndex: 10
        }}>
          <div>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#D9AE4F',
              display: 'block',
              marginBottom: '4px'
            }}>
              YOUR BAG
            </span>
            <h2 style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '26px',
              fontWeight: 700,
              color: '#EDE8E1',
              letterSpacing: '0.04em'
            }}>
              BAG.
            </h2>
            <p style={{ fontSize: '13px', color: '#AAA3AF', marginTop: '2px' }}>
              {totalItemsCount} {totalItemsCount === 1 ? 'piece' : 'pieces'}, chosen with intention.
            </p>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(217, 174, 79, 0.2)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#AAA3AF',
              cursor: 'pointer'
            }}
            aria-label="Close Bag"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          padding: '12px 28px',
          background: 'rgba(34, 23, 58, 0.4)',
          borderBottom: '1px solid rgba(217, 174, 79, 0.08)',
          fontSize: '12px',
          color: '#D9AE4F',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} />
          <span>
            {rawSubtotal >= 999
              ? '✨ You have unlocked Free Insured Shipping!'
              : `Add ₹${(999 - rawSubtotal).toLocaleString('en-IN')} more for Free Insured Shipping`}
          </span>
        </div>

        {/* Cart Items List */}
        <div style={{ flexGrow: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0' }}>
              <img
                src="/assets/kuber-logo-transparent.png"
                alt="Kuberstones"
                style={{
                  width: '76px',
                  height: 'auto',
                  margin: '0 auto 18px',
                  display: 'block',
                  filter: 'drop-shadow(0 4px 16px rgba(197, 165, 114, 0.45))'
                }}
              />
              <h3 style={{ fontFamily: 'var(--font-brand)', color: '#EDE8E1', marginBottom: '8px' }}>Your Bag is Empty</h3>
              <p style={{ fontSize: '13px', marginBottom: '24px' }}>Begin your intention by exploring our sacred stones or the custom atelier.</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigateTo('shop-all');
                }}
                className="btn-gold"
              >
                Explore All Pieces
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(217, 174, 79, 0.1)'
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: '#19121F',
                  flexShrink: 0,
                  border: '1px solid rgba(217, 174, 79, 0.2)'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#D9AE4F',
                    fontWeight: 600
                  }}>
                    {item.category}
                  </span>
                  <h4 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#EDE8E1',
                    marginTop: '2px'
                  }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#AAA3AF', marginTop: '2px' }}>
                    {item.stone} · {item.size}
                  </p>

                  {/* Quantity and Actions */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '12px'
                  }}>
                    {/* Stepper */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(217, 174, 79, 0.2)',
                      borderRadius: '4px'
                    }}>
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#AAA3AF',
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '12px', fontWeight: 600, padding: '0 6px', color: '#EDE8E1' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#AAA3AF',
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#EDE8E1'
                      }}>
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#7D7682',
                          fontSize: '11px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#7D7682'}
                      >
                        <Trash2 size={13} />
                        <span>REMOVE</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary (Matching Figma layout) */}
        {cart.length > 0 && (
          <div style={{
            padding: '24px 28px',
            background: '#120D19',
            borderTop: '1px solid rgba(217, 174, 79, 0.2)',
            position: 'sticky',
            bottom: 0,
            zIndex: 10
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigateTo('checkout');
                }}
                className="btn-gold"
                style={{ width: '100%', padding: '14px' }}
              >
                <span>Checkout</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setCartOpen(false)}
                className="btn-outline"
                style={{ width: '100%', padding: '11px' }}
              >
                Continue shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
