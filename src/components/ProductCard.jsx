import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist } = useShop();
  const wishlisted = isInWishlist(product.id);

  // Determine badge styling based on badge text
  const badgeText = product.badge || (product.isFlash ? 'Flash -12%' : null);
  const isFlash = badgeText && badgeText.toLowerCase().includes('flash');
  const isBestseller = badgeText && (badgeText.toLowerCase().includes('bestseller') || badgeText.toLowerCase().includes('popular'));

  // Rating format: 5 instead of 5.0, or 4.9
  const ratingFormatted = product.rating ? (product.rating % 1 === 0 ? product.rating.toFixed(0) : product.rating.toFixed(1)) : '5';
  const reviewsCount = product.reviewsCount || 214;

  return (
    <div
      className="modern-product-card"
      onClick={() => navigateTo('product', product.id)}
    >
      {/* Visual Container */}
      <div className="modern-card-visual">
        <img
          src={product.image}
          alt={product.name}
          className="modern-card-img"
          loading="lazy"
        />

        {/* Badge (Top-Left) */}
        {badgeText && (
          <div className="modern-badge-wrap">
            <span className={`modern-card-badge ${isFlash ? 'badge-flash' : isBestseller ? 'badge-bestseller' : 'badge-default'}`}>
              {badgeText.toUpperCase()}
            </span>
          </div>
        )}

        {/* Wishlist Button (Top-Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`modern-wishlist-btn ${wishlisted ? 'is-active' : ''}`}
          aria-label="Wishlist toggle"
        >
          <Heart
            size={16}
            stroke={wishlisted ? '#E05353' : '#222222'}
            fill={wishlisted ? '#E05353' : 'none'}
            strokeWidth={1.8}
          />
        </button>

        {/* Subtle Quick Add Overlay on Hover */}
        <div className="modern-quick-add">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="modern-quick-add-btn"
          >
            <ShoppingBag size={13} strokeWidth={1.8} />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="modern-card-info">
        {/* Row 1: Name and Pricing */}
        <div className="modern-info-top">
          <h3 className="modern-product-title">{product.name}</h3>
          <div className="modern-price-col">
            <span className="modern-current-price">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="modern-original-price">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Tagline / Stones subtitle */}
        <div className="modern-product-subtitle">
          {product.tagline}
        </div>

        {/* Row 3: Rating and Reviews */}
        <div className="modern-rating-row">
          <span className="modern-rating-star">★</span>
          <span className="modern-rating-val">{ratingFormatted}</span>
          <span className="modern-reviews-count">· {reviewsCount} reviews</span>
        </div>
      </div>

      <style>{`
        .modern-product-card {
          display: flex;
          flex-direction: column;
          background: #FAF5EB;
          border-radius: 12px;
          border: 1px solid rgba(197, 165, 114, 0.32);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 20px rgba(160, 126, 68, 0.1);
          transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          width: 100%;
          max-width: 360px;
        }

        .modern-product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 34px rgba(160, 126, 68, 0.22);
          border-color: rgba(197, 165, 114, 0.7);
        }

        .modern-card-visual {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: #EFE4CF;
          overflow: hidden;
        }

        .modern-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modern-product-card:hover .modern-card-img {
          transform: scale(1.05);
        }

        /* Top-Left Badges */
        .modern-badge-wrap {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
        }

        .modern-card-badge {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 4px 8px;
          border-radius: 4px;
          line-height: 1;
        }

        .modern-card-badge.badge-flash {
          background: #1B211A;
          color: #A3D39C;
        }

        .modern-card-badge.badge-bestseller {
          background: #EAD7A5;
          color: #382A12;
        }

        .modern-card-badge.badge-default {
          background: #1B211A;
          color: #FFFFFF;
        }

        /* Top-Right Wishlist Button */
        .modern-wishlist-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FAF4E8;
          border: 1px solid rgba(197, 165, 114, 0.35);
          box-shadow: 0 2px 8px rgba(140, 105, 50, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 3;
          color: #222222;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .modern-wishlist-btn:hover {
          transform: scale(1.1);
          background: #F3E7CF;
          border-color: #C5A572;
        }

        .modern-wishlist-btn.is-active {
          color: #E05353;
        }

        /* Hover Quick Add overlay */
        .modern-quick-add {
          position: absolute;
          bottom: 10px;
          left: 12px;
          right: 12px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          z-index: 3;
          pointer-events: none;
        }

        .modern-product-card:hover .modern-quick-add {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .modern-quick-add-btn {
          width: 100%;
          padding: 8px 12px;
          background: rgba(27, 33, 26, 0.92);
          backdrop-filter: blur(8px);
          border: none;
          color: #FFFFFF;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: 11px;
          font-weight: 600;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .modern-quick-add-btn:hover {
          background: #382A12;
        }

        /* Info Section */
        .modern-card-info {
          padding: 15px 16px 16px 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          background: #FAF5EB;
          border-top: 1px solid rgba(197, 165, 114, 0.16);
        }

        .modern-info-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .modern-product-title {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: 14.5px;
          font-weight: 600;
          color: #1A1A1A;
          line-height: 1.3;
          margin: 0;
          transition: color 0.2s ease;
          flex-grow: 1;
        }

        .modern-product-card:hover .modern-product-title {
          color: #8C6F3D;
        }

        .modern-price-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
          text-align: right;
        }

        .modern-current-price {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: 14.5px;
          font-weight: 700;
          color: #1A1A1A;
          line-height: 1.2;
        }

        .modern-original-price {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: 11.5px;
          color: #8C8C8C;
          text-decoration: line-through;
          margin-top: 2px;
          line-height: 1;
        }

        .modern-product-subtitle {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: 12px;
          color: #737373;
          margin-top: 4px;
          line-height: 1.4;
          font-weight: 400;
        }

        .modern-rating-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 13px;
          font-size: 12px;
        }

        .modern-rating-star {
          color: #9E7D47;
          font-size: 12px;
          line-height: 1;
        }

        .modern-rating-val {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: 12px;
          font-weight: 700;
          color: #222222;
          line-height: 1;
        }

        .modern-reviews-count {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: 12px;
          color: #767676;
          font-weight: 400;
          line-height: 1;
        }
      `}</style>
    </div>
  );
};
