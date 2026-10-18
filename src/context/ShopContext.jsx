import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { ATELIER_PURPOSES, SIZES } from '../data/atelier';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Navigation Routing with Hash Support
  const getInitialPage = () => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'bag') return 'home';
      if (hash) return hash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [selectedProductId, setSelectedProductId] = useState('heart-line-rose');
  const [cartOpen, setCartOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#bag' || window.location.search.includes('cart=open');
    }
    return false;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'bag') {
        setCartOpen(true);
      } else if (hash) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Cart with initial items matching Figma designs
  const [cart, setCart] = useState([
    {
      id: 'cart-1',
      productId: 'five-mukhi-rudraksha',
      name: 'Five Mukhi Rudraksha Bracelet',
      category: 'Rudraksha',
      stone: 'Nepal Rudraksha • Gold-tone clasp',
      price: 1299,
      image: '/assets/checkout_figma_img_0.jpeg',
      qty: 1,
      size: 'M · 16 cm'
    },
    {
      id: 'cart-2',
      productId: 'heart-line-rose',
      name: 'Heart Line Rose Bracelet',
      category: 'Crystals',
      stone: 'Rose Quartz • Gold-tone clasp',
      price: 1499,
      image: '/assets/checkout_figma_img_1.jpeg',
      qty: 1,
      size: 'M · 16 cm'
    },
    {
      id: 'cart-3',
      productId: 'life-path-8',
      name: 'Life Path 8 Numerology Strand',
      category: 'Crystals',
      stone: 'Pyrite & Tiger Eye • Gold-tone clasp',
      price: 2199,
      image: '/assets/checkout_figma_img_2.jpeg',
      qty: 1,
      size: 'M · 16 cm'
    }
  ]);

  // Wishlist
  const [wishlist, setWishlist] = useState(['heart-line-rose', 'life-path-8']);

  // Notifications
  const [toast, setToast] = useState(null);

  // Authentication State with localStorage persistence
  const [user, setUser] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('kuberstones_user');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read user from localStorage', e);
    }
    return null;
  });

  const login = ({ email, password, rememberMe = true, name = null }) => {
    // Generate clean display name if not explicitly provided
    const derivedName = name || (email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
    const userData = {
      id: `usr-${Date.now()}`,
      name: derivedName,
      email,
      phone: '+91 98201 44820',
      memberTier: 'Abundance Circle Patron',
      memberSince: '2026',
      zodiacSign: 'Leo / Simha (Sun Prana)',
      address: '402, Royal Palms, Golf Course Road, Gurugram, HR 122002',
      orders: [
        {
          orderId: 'KS-2026-98412',
          date: 'October 14, 2026',
          status: 'In Temple Consecration',
          total: '₹2,574',
          trackingNumber: 'BLUEDART-889214710'
        },
        {
          orderId: 'KS-2026-78104',
          date: 'September 28, 2026',
          status: 'Delivered With Sacred Tilak',
          total: '₹4,916',
          trackingNumber: 'DELHIVERY-99238120'
        }
      ]
    };

    setUser(userData);
    if (rememberMe && typeof window !== 'undefined') {
      try {
        localStorage.setItem('kuberstones_user', JSON.stringify(userData));
      } catch (err) {}
    }
    showToast(`Welcome back to the Sanctuary, ${derivedName}`, 'gold');
    return userData;
  };

  const signup = ({ name, email, phone, birthDate, password, receiveVedicAlerts = true }) => {
    const userData = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || '+91 98201 00000',
      birthDate,
      memberTier: 'Abundance Circle Initiate',
      memberSince: '2026',
      zodiacSign: 'Vedic Natal Attunement In Progress',
      address: 'Registered Sanctuary Residence',
      orders: [],
      receiveVedicAlerts
    };

    setUser(userData);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('kuberstones_user', JSON.stringify(userData));
      } catch (err) {}
    }
    showToast(`Sacred initiation complete. Welcome to Kuberstones, ${name}!`, 'gold');
    return userData;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('kuberstones_user');
      } catch (err) {}
    }
    showToast('You have safely exited the Sanctuary', 'muted');
  };

  const updateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('kuberstones_user', JSON.stringify(updated));
        } catch (err) {}
      }
      return updated;
    });
    showToast('Sanctuary preferences updated', 'gold');
  };

  // Custom Atelier Studio state
  const [studioStep, setStudioStep] = useState(1);
  const [selectedPurpose, setSelectedPurpose] = useState(ATELIER_PURPOSES[0]);
  const [customSize, setCustomSize] = useState(SIZES[1]); // M 16cm
  const [strandBeads, setStrandBeads] = useState(ATELIER_PURPOSES[0].defaultComposition);

  // When purpose changes, update default composition
  useEffect(() => {
    if (selectedPurpose) {
      setStrandBeads(selectedPurpose.defaultComposition);
    }
  }, [selectedPurpose]);

  const showToast = (message, type = 'gold') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const navigateTo = (page, productId = null) => {
    setCurrentPage(page);
    if (productId) setSelectedProductId(productId);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, size = 'M · 16 cm', stone = null, qty = 1) => {
    const existingIndex = cart.findIndex(
      item => item.productId === product.id && item.size === size && item.stone === (stone || product.stones?.[0])
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].qty += qty;
      setCart(updated);
    } else {
      const newItem = {
        id: `cart-${Date.now()}`,
        productId: product.id,
        name: product.name,
        category: product.category,
        stone: stone || product.stones?.[0] || 'Standard Spec',
        price: product.price,
        image: product.image,
        qty,
        size
      };
      setCart([newItem, ...cart]);
    }

    showToast(`Added ${product.name} to your bag`);
    setCartOpen(true);
  };

  const addCustomStrandToCart = (purpose, composition, size, price) => {
    const newItem = {
      id: `custom-${Date.now()}`,
      productId: `custom-${purpose.id}`,
      name: `${purpose.title} Custom Strand`,
      category: 'The Atelier',
      stone: `${purpose.suggestedBeads.primary} & ${purpose.suggestedBeads.secondary}`,
      price,
      image: purpose.image,
      qty: 1,
      size: size.label,
      isCustom: true,
      customDetails: {
        purpose: purpose.title,
        composition,
        size: size.label,
        beadsCount: size.beadCount
      }
    };

    setCart([newItem, ...cart]);
    showToast(`Your bespoke ${purpose.title} strand added to bag!`);
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showToast('Piece removed from bag', 'muted');
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Removed from sacred wishlist', 'muted');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Saved to sacred wishlist', 'gold');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Coupon State & Verification
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('coupon')?.toUpperCase();
      if (code === 'KUBER10') return { code: 'KUBER10', type: 'percent', value: 10, label: '10% Sacred Blessing' };
      if (code === 'ABUNDANCE') return { code: 'ABUNDANCE', type: 'flat', value: 500, label: '₹500 Abundance Gift' };
    }
    return null;
  });

  const applyCoupon = (codeStr) => {
    if (!codeStr || !codeStr.trim()) {
      showToast('Please enter a coupon code', 'muted');
      return { success: false, message: 'Please enter a coupon code' };
    }
    const cleanCode = codeStr.trim().toUpperCase();

    const COUPONS = {
      'KUBER10': { type: 'percent', value: 10, label: '10% Sacred Blessing' },
      'KUBER20': { type: 'percent', value: 20, label: '20% Divine Abundance' },
      'SACRED20': { type: 'percent', value: 20, label: '20% Sacred Initiation' },
      'VEDIC15': { type: 'percent', value: 15, label: '15% Vedic Temple Blessing' },
      'ABUNDANCE': { type: 'flat', value: 500, minOrder: 1500, label: '₹500 Abundance Gift' },
      'LUNAR': { type: 'flat', value: 300, minOrder: 1000, label: '₹300 Lunar Dispatch' },
      'FIRSTORDER': { type: 'percent', value: 10, label: '10% Welcome Gift' }
    };

    const coupon = COUPONS[cleanCode];
    if (!coupon) {
      showToast('Invalid coupon code. Try KUBER10 or ABUNDANCE', 'muted');
      return { success: false, message: 'Invalid code. Try KUBER10, ABUNDANCE, or VEDIC15' };
    }

    if (coupon.minOrder && rawSubtotal < coupon.minOrder) {
      showToast(`Minimum order of ₹${coupon.minOrder.toLocaleString('en-IN')} required for ${cleanCode}`, 'muted');
      return { success: false, message: `Minimum order ₹${coupon.minOrder.toLocaleString('en-IN')} required` };
    }

    setAppliedCoupon({ code: cleanCode, ...coupon });
    showToast(`✨ Coupon ${cleanCode} applied!`, 'gold');
    return { success: true, code: cleanCode };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'muted');
  };

  // Cart Calculations (Faithful to Figma math with coupon discount support)
  const rawSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const offerDiscount = cart.length >= 2 ? 224 : 0;

  let couponDiscount = 0;
  if (appliedCoupon && rawSubtotal > 0) {
    if (appliedCoupon.type === 'percent') {
      couponDiscount = Math.round((rawSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      couponDiscount = Math.min(rawSubtotal, appliedCoupon.value);
    }
  }

  const taxable = Math.max(0, rawSubtotal - offerDiscount - couponDiscount);
  const gst = Math.round(taxable * 0.03); // 3% jewellery GST
  const finalTotal = taxable + gst;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <ShopContext.Provider value={{
      currentPage,
      setCurrentPage,
      selectedProductId,
      setSelectedProductId,
      navigateTo,
      cart,
      addToCart,
      addCustomStrandToCart,
      removeFromCart,
      updateQty,
      cartOpen,
      setCartOpen,
      wishlist,
      toggleWishlist,
      isInWishlist,
      rawSubtotal,
      offerDiscount,
      appliedCoupon,
      couponDiscount,
      applyCoupon,
      removeCoupon,
      gst,
      finalTotal,
      totalItemsCount,
      toast,
      showToast,
      // Authentication & Sanctuary Member state
      user,
      login,
      signup,
      logout,
      updateUser,
      // Studio state
      studioStep,
      setStudioStep,
      selectedPurpose,
      setSelectedPurpose,
      customSize,
      setCustomSize,
      strandBeads,
      setStrandBeads
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
