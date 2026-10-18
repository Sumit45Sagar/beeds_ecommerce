import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, User, Menu, X, Sparkles } from 'lucide-react';

export const Header = () => {
  const { currentPage, navigateTo, totalItemsCount, wishlist, setCartOpen, user, logout } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (key) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 140);
  };

  const navLinksLeft = [
    {
      id: 'crystals',
      label: 'Crystals',
      page: 'crystals',
      dropdown: {
        categoryTitle: 'CRYSTALS',
        links: [
          { label: 'Zodiac Bracelets', page: 'zodiac' },
          { label: 'Numerology Bracelets', page: 'crystals' },
          { label: 'Customize Your Bracelet', page: 'studio' },
        ],
        bottomLink: { label: 'All crystals →', page: 'crystals' }
      }
    },
    {
      id: 'rudraksha',
      label: 'Rudraksha',
      page: 'rudraksha',
      dropdown: {
        categoryTitle: 'RUDRAKSHA',
        links: [
          { label: '5 Mukhi Himalayan Beads', page: 'rudraksha' },
          { label: 'High-Altitude Seeds', page: 'rudraksha' },
          { label: 'Vedic Protection Malas', page: 'rudraksha' },
        ],
        bottomLink: { label: 'All rudraksha →', page: 'rudraksha' }
      }
    },
    {
      id: 'gemstones',
      label: 'Gemstones',
      page: 'gemstones',
      dropdown: {
        categoryTitle: 'GEMSTONES',
        links: [
          { label: 'Burmese Natural Jade', page: 'gemstones' },
          { label: 'Lapis Lazuli & Opal', page: 'gemstones' },
          { label: 'Navratna Planetary Gems', page: 'gemstones' },
        ],
        bottomLink: { label: 'All gemstones →', page: 'gemstones' }
      }
    },
    {
      id: 'customization',
      label: 'Customization',
      page: 'studio',
      dropdown: {
        categoryTitle: 'THE ATELIER',
        links: [
          { label: 'Compose by Intention', page: 'studio' },
          { label: 'Custom Bead by Bead', page: 'studio' },
          { label: 'Wrist Millimeter Sizing', page: 'studio' },
        ],
        bottomLink: { label: 'Open studio atelier →', page: 'studio' }
      }
    }
  ];

  const navLinksRight = [
    {
      id: 'collections',
      label: 'Collections',
      page: 'collections',
      dropdown: {
        categoryTitle: 'COLLECTIONS',
        links: [
          { label: 'Best sellers', page: 'collections' },
          { label: 'New arrivals', page: 'collections' },
          { label: 'Trending', page: 'collections' },
          { label: 'Featured', page: 'collections' },
          { label: 'Under ₹999', page: 'collections' },
          { label: 'Premium Collection', page: 'collections' },
          { label: 'Under ₹2000', page: 'collections' },
          { label: 'Atelier edit', page: 'studio' },
          { label: 'Gift Collection', page: 'collections' },
          { label: 'Healing Collection', page: 'crystals' },
        ],
        bottomLink: { label: 'All collections →', page: 'collections' }
      }
    },
    {
      id: 'shop-all',
      label: 'Shop All',
      page: 'shop-all'
    },
    {
      id: 'journal',
      label: 'Journal',
      page: 'journal'
    }
  ];

  return (
    <header className="header-nav">
      {/* Top Banner Notice - Hidden on Studio Customization flow per Figma designs */}
      {currentPage !== 'studio' && (
        <div style={{
          background: '#0E0717',
          borderBottom: '1px solid rgba(197, 165, 114, 0.15)',
          padding: '7px 16px',
          fontSize: '10px',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#C5A572',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <span>Consecrated in sacred temples & hand-strung within 48 hours</span>
          <span style={{ color: 'rgba(197, 165, 114, 0.4)' }}>·</span>
          <span>Complimentary dispatch above ₹999</span>
        </div>
      )}

      <div className="container-custom" style={{ height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Left Nav (Desktop) with Interactive Hover Dropdown */}
        <nav style={{ display: 'none' }} className="desktop-nav-left">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '30px', listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinksLeft.map(item => {
              const isActive = currentPage === item.page;
              const isHovered = activeDropdown === item.id;
              const showDropdown = isHovered && item.dropdown;

              return (
                <li
                  key={item.id}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => navigateTo(item.page)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isHovered || isActive ? '#FFFFFF' : '#D1CBD6',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      padding: '16px 0',
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    <span>{item.label}</span>
                    {/* Active / Hover Gold Underline */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: '#D9AE4F',
                        transform: isHovered || isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </button>

                  {/* Dropdown Menu Panel (Exact match to screenshot) */}
                  {item.dropdown && (
                    <div
                      className={`header-dropdown-menu ${showDropdown ? 'is-open' : ''}`}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        paddingTop: '4px',
                        zIndex: 100,
                        minWidth: '240px',
                        pointerEvents: showDropdown ? 'auto' : 'none',
                        opacity: showDropdown ? 1 : 0,
                        transform: showDropdown ? 'translateY(0)' : 'translateY(6px)',
                        transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      <div
                        style={{
                          background: '#110D18',
                          border: '1px solid rgba(217, 174, 79, 0.2)',
                          borderRadius: '8px',
                          padding: '24px 26px',
                          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.8)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px'
                        }}
                      >
                        {/* Gold Category Eyebrow Header */}
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#D9AE4F',
                            marginBottom: '4px'
                          }}
                        >
                          {item.dropdown.categoryTitle}
                        </div>

                        {/* Sub-links */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {item.dropdown.links.map((sub, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                navigateTo(sub.page);
                                setActiveDropdown(null);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#EDE8E1',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '14px',
                                fontWeight: 400,
                                textAlign: 'left',
                                padding: '3px 0',
                                cursor: 'pointer',
                                transition: 'color 0.15s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>

                        {/* Bottom Gold Underlined Link */}
                        {item.dropdown.bottomLink && (
                          <div style={{ paddingTop: '8px', marginTop: '4px' }}>
                            <button
                              onClick={() => {
                                navigateTo(item.dropdown.bottomLink.page);
                                setActiveDropdown(null);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#EDE8E1',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '14px',
                                fontWeight: 500,
                                textAlign: 'left',
                                padding: 0,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                borderBottom: '1.5px solid #D9AE4F',
                                paddingBottom: '3px',
                                transition: 'color 0.15s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                            >
                              {item.dropdown.bottomLink.label}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#C5A572',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center'
          }}
          className="mobile-toggle"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Center Brand Emblem & Logo */}
        <div
          onClick={() => navigateTo('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {/* Authentic Brand Emblem */}
          <img
            src="/assets/kuber-logo-transparent.png"
            alt="Kuberstones Logo"
            style={{
              height: '42px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 2px 10px rgba(197, 165, 114, 0.45))',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />

          {/* Wordmark */}
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

        {/* Right Nav (Desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <nav style={{ display: 'none' }} className="desktop-nav-right">
            <ul style={{ display: 'flex', alignItems: 'center', gap: '28px', listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinksRight.map(item => {
                const isActive = currentPage === item.page;
                const isHovered = activeDropdown === item.id;
                const showDropdown = isHovered && item.dropdown;

                return (
                  <li
                    key={item.id}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => navigateTo(item.page)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: isHovered || isActive ? '#FFFFFF' : '#D1CBD6',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        padding: '16px 0',
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      <span>{item.label}</span>
                      {/* Active / Hover Gold Underline */}
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: '#D9AE4F',
                          transform: isHovered || isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                    </button>

                    {/* Dropdown Menu Panel (Exact Match to Collections Screenshot) */}
                    {item.dropdown && (
                      <div
                        className={`header-dropdown-menu ${showDropdown ? 'is-open' : ''}`}
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          paddingTop: '4px',
                          zIndex: 100,
                          minWidth: '240px',
                          pointerEvents: showDropdown ? 'auto' : 'none',
                          opacity: showDropdown ? 1 : 0,
                          transform: showDropdown ? 'translateY(0)' : 'translateY(6px)',
                          transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        <div
                          style={{
                            background: '#110D18',
                            border: '1px solid rgba(217, 174, 79, 0.2)',
                            borderRadius: '8px',
                            padding: '24px 26px',
                            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                          }}
                        >
                          {/* Gold Category Eyebrow Header */}
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              color: '#D9AE4F',
                              marginBottom: '2px'
                            }}
                          >
                            {item.dropdown.categoryTitle}
                          </div>

                          {/* Sub-links */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                            {item.dropdown.links.map((sub, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  navigateTo(sub.page);
                                  setActiveDropdown(null);
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#EDE8E1',
                                  fontFamily: 'var(--font-sans)',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  textAlign: 'left',
                                  padding: '2px 0',
                                  cursor: 'pointer',
                                  transition: 'color 0.15s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>

                          {/* Bottom Gold Underlined Link */}
                          {item.dropdown.bottomLink && (
                            <div style={{ paddingTop: '6px', marginTop: '4px' }}>
                              <button
                                onClick={() => {
                                  navigateTo(item.dropdown.bottomLink.page);
                                  setActiveDropdown(null);
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#EDE8E1',
                                  fontFamily: 'var(--font-sans)',
                                  fontSize: '14px',
                                  fontWeight: 500,
                                  textAlign: 'left',
                                  padding: 0,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  borderBottom: '1.5px solid #D9AE4F',
                                  paddingBottom: '3px',
                                  transition: 'color 0.15s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                              >
                                {item.dropdown.bottomLink.label}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Icon Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 'wishlist' ? '#C5A572' : '#A8A39D',
                cursor: 'pointer',
                position: 'relative',
                padding: '6px'
              }}
              title="Sacred Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} fill={wishlist.length > 0 ? 'rgba(197, 165, 114, 0.25)' : 'none'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  background: '#C5A572',
                  color: '#0A0908',
                  fontSize: '9px',
                  fontWeight: 700,
                  width: '14px',
                  height: '14px',
                  borderRadius: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Bag / Cart */}
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#A8A39D',
                cursor: 'pointer',
                position: 'relative',
                padding: '6px'
              }}
              title="Your Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItemsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  background: '#C5A572',
                  color: '#0A0908',
                  fontSize: '9px',
                  fontWeight: 700,
                  width: '14px',
                  height: '14px',
                  borderRadius: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Account with Luxury Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleMouseEnter('account')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => navigateTo(user ? 'account' : 'login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: (currentPage === 'account' || currentPage === 'login' || currentPage === 'signup' || activeDropdown === 'account') ? '#C5A572' : '#A8A39D',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  position: 'relative',
                  transition: 'color 0.2s ease'
                }}
                title={user ? `Sanctuary: ${user.name}` : "Sanctuary Member Access"}
                aria-label="User Account"
              >
                <User size={18} strokeWidth={1.5} />
                {user && (
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#D9AE4F',
                    boxShadow: '0 0 8px #D9AE4F',
                    position: 'absolute',
                    top: '4px',
                    right: '4px'
                  }} />
                )}
              </button>

              {/* Account Dropdown Panel (Identical Luxury Styling to Collections) */}
              <div
                className={`header-dropdown-menu ${activeDropdown === 'account' ? 'is-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('account')}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  paddingTop: '6px',
                  zIndex: 100,
                  minWidth: '240px',
                  pointerEvents: activeDropdown === 'account' ? 'auto' : 'none',
                  opacity: activeDropdown === 'account' ? 1 : 0,
                  transform: activeDropdown === 'account' ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div
                  style={{
                    background: '#110D18',
                    border: '1px solid rgba(217, 174, 79, 0.25)',
                    borderRadius: '8px',
                    padding: '22px 24px',
                    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  {/* Category Eyebrow */}
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#D9AE4F',
                    paddingBottom: '2px'
                  }}>
                    {user ? 'SANCTUARY MEMBER' : 'SANCTUARY ACCESS'}
                  </div>

                  {user ? (
                    <>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', paddingBottom: '4px', borderBottom: '1px solid rgba(217, 174, 79, 0.15)' }}>
                        Namaste, {user.name}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                          onClick={() => {
                            navigateTo('account');
                            setActiveDropdown(null);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EDE8E1',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '14px',
                            fontWeight: 400,
                            textAlign: 'left',
                            padding: '2px 0',
                            cursor: 'pointer',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                        >
                          My Sacred Orders
                        </button>

                        <button
                          onClick={() => {
                            navigateTo('account');
                            setActiveDropdown(null);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EDE8E1',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '14px',
                            fontWeight: 400,
                            textAlign: 'left',
                            padding: '2px 0',
                            cursor: 'pointer',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                        >
                          Consecration Certificates
                        </button>

                        <button
                          onClick={() => {
                            navigateTo('account');
                            setActiveDropdown(null);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EDE8E1',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '14px',
                            fontWeight: 400,
                            textAlign: 'left',
                            padding: '2px 0',
                            cursor: 'pointer',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                        >
                          Vedic Astrological Profile
                        </button>
                      </div>

                      <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(217, 174, 79, 0.15)', marginTop: '4px' }}>
                        <button
                          onClick={() => {
                            logout();
                            setActiveDropdown(null);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#D9AE4F',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '13px',
                            fontWeight: 500,
                            textAlign: 'left',
                            padding: 0,
                            cursor: 'pointer',
                            borderBottom: '1px solid #D9AE4F',
                            paddingBottom: '2px'
                          }}
                        >
                          Sign Out of Sanctuary →
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                          onClick={() => {
                            navigateTo('login');
                            setActiveDropdown(null);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EDE8E1',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '14px',
                            fontWeight: 400,
                            textAlign: 'left',
                            padding: '2px 0',
                            cursor: 'pointer',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                        >
                          Sign In
                        </button>

                        <button
                          onClick={() => {
                            navigateTo('signup');
                            setActiveDropdown(null);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EDE8E1',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '14px',
                            fontWeight: 400,
                            textAlign: 'left',
                            padding: '2px 0',
                            cursor: 'pointer',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                        >
                          Create Sanctuary Account
                        </button>

                        <button
                          onClick={() => {
                            navigateTo('login');
                            setActiveDropdown(null);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#AAA3AF',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '13px',
                            fontWeight: 400,
                            textAlign: 'left',
                            padding: '2px 0',
                            cursor: 'pointer',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#EDE8E1'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#AAA3AF'}
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(217, 174, 79, 0.15)', marginTop: '4px' }}>
                        <button
                          onClick={() => {
                            navigateTo('signup');
                            setActiveDropdown(null);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EDE8E1',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '13px',
                            fontWeight: 500,
                            textAlign: 'left',
                            padding: 0,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            borderBottom: '1.5px solid #D9AE4F',
                            paddingBottom: '2px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                        >
                          Join Abundance Circle →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(18, 9, 30, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(197, 165, 114, 0.15)',
          padding: '24px 24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px', paddingBottom: '16px', borderBottom: '1px solid rgba(197, 165, 114, 0.15)' }}>
            <img src="/assets/kuber-logo-transparent.png" alt="Kuberstones" style={{ height: '34px', width: 'auto' }} />
            <span style={{ fontFamily: 'var(--font-brand)', fontSize: '15px', letterSpacing: '0.22em', color: '#F4F1EC', textTransform: 'uppercase' }}>KUBERSTONES</span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[...navLinksLeft, ...navLinksRight].map(item => (
              <li key={item.page}>
                <button
                  onClick={() => {
                    navigateTo(item.page);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentPage === item.page ? '#C5A572' : '#F4F1EC',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 0',
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Access */}
          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(197, 165, 114, 0.2)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {user ? (
              <button
                onClick={() => {
                  navigateTo('account');
                  setMobileMenuOpen(false);
                }}
                className="btn-gold"
                style={{ width: '100%', padding: '12px', fontSize: '11px', letterSpacing: '0.14em' }}
              >
                Namaste, {user.name} · Sanctuary Account
              </button>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => {
                    navigateTo('login');
                    setMobileMenuOpen(false);
                  }}
                  className="btn-gold"
                  style={{ padding: '10px', fontSize: '11px', letterSpacing: '0.12em' }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigateTo('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="btn-outline"
                  style={{ padding: '10px', fontSize: '11px', letterSpacing: '0.12em' }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-left { display: block !important; }
          .desktop-nav-right { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
