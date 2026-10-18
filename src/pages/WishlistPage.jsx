import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist, navigateTo } = useShop();

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div style={{
      background: 'linear-gradient(180deg, #F6EEDD 0%, #EFE3CA 100%)',
      minHeight: '85vh',
      padding: '60px 0 96px',
      borderTop: '1px solid rgba(197, 165, 114, 0.35)',
      borderBottom: '1px solid rgba(197, 165, 114, 0.35)'
    }}>
      <div className="container-custom">
        <div style={{ marginBottom: '44px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8C7245',
            display: 'block',
            marginBottom: '6px'
          }}>
            SAVED FOR INTENTION
          </span>
          <h1 style={{
            fontFamily: 'var(--font-brand)',
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#1A160F',
            margin: 0
          }}>
            SACRED <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#8C7245' }}>wishlist</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#695B44', marginTop: '8px' }}>
            Pieces attuned to your spirit, held in quiet contemplation.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: '#FAF4E8',
            borderRadius: '12px',
            border: '1px solid rgba(197, 165, 114, 0.35)',
            boxShadow: '0 4px 20px rgba(160, 126, 68, 0.08)'
          }}>
            <img
              src="/assets/kuber-logo-transparent.png"
              alt="Kuberstones"
              style={{
                width: '72px',
                height: 'auto',
                margin: '0 auto 16px',
                display: 'block',
                filter: 'drop-shadow(0 4px 14px rgba(197, 165, 114, 0.45))'
              }}
            />
            <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: '24px', color: '#1A160F', marginBottom: '8px', fontWeight: 700 }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ fontSize: '14px', color: '#695B44', maxWidth: '420px', margin: '0 auto 24px' }}>
              Tap the sacred heart on any crystal, gemstone, or rudraksha piece to keep it close.
            </p>
            <button
              onClick={() => navigateTo('shop-all')}
              className="btn-gold"
              style={{ padding: '12px 28px' }}
            >
              <span>Explore All Pieces</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 320px))',
            gap: '24px'
          }}>
            {wishlistedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
