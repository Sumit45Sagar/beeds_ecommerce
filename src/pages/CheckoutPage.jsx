import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, CheckCircle2, Sparkles, Tag, Check, X, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage = () => {
  const {
    rawSubtotal,
    offerDiscount,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    gst,
    finalTotal,
    cart,
    setCartOpen,
    navigateTo,
    showToast
  } = useShop();

  // Coupon Input State
  const [couponInput, setCouponInput] = useState('');
  const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);

  // Address State (faithful to screenshot: Home - 12 Test Lane, Jaipur, Rajasthan, 302001)
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Home',
      line1: '12 Test Lane',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
      country: 'India',
      phone: '+91 9876543210'
    }
  ]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    label: 'Home',
    line1: '',
    city: '',
    state: '',
    pincode: '',
    phone: '+91 '
  });

  // Payment Method: 'cod' (selected by default in Figma) or 'upi'
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const currentAddress = addresses[selectedAddressIndex] || addresses[0];

  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddressForm.line1 || !newAddressForm.city || !newAddressForm.pincode) {
      showToast('Please fill all address fields', 'muted');
      return;
    }
    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newAddressForm.label || 'Home',
      line1: newAddressForm.line1,
      city: newAddressForm.city,
      state: newAddressForm.state || 'Rajasthan',
      pincode: newAddressForm.pincode,
      country: 'India',
      phone: newAddressForm.phone || '+91 9876543210'
    };
    setAddresses([newAddr, ...addresses]);
    setSelectedAddressIndex(0);
    setIsAddressModalOpen(false);
    showToast('✨ Delivery address updated!', 'gold');
  };

  const handlePlaceOrder = () => {
    const generatedId = `KB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F5DC93', '#D9AE4F', '#C39AF0', '#7B43B8']
    });

    showToast(`Order #${generatedId} consecrated & placed!`, 'gold');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(191, 0, 255, 0.35), transparent 75%), radial-gradient(circle 600px at 85% 30%, rgba(160, 0, 255, 0.22), transparent), radial-gradient(circle 500px at 10% 65%, rgba(191, 0, 255, 0.16), transparent), linear-gradient(180deg, #320054 0%, #200038 35%, #130022 75%, #0B0014 100%)',
      color: '#EDE8E1',
      paddingTop: '36px',
      paddingBottom: '96px',
      fontFamily: 'var(--font-sans)'
    }}>
      <div className="container-custom" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Main 2-Column Checkout Layout (Faithful to Figma) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 440px',
          gap: '56px',
          alignItems: 'start'
        }} className="checkout-main-grid">

          {/* LEFT COLUMN: Items List */}
          <div style={{ minWidth: 0 }}>
            {cart.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '64px 20px',
                background: '#120B1A',
                border: '1px solid rgba(217, 174, 79, 0.18)',
                borderRadius: '6px'
              }}>
                <img
                  src="/assets/kuber-logo-transparent.png"
                  alt="Kuberstones"
                  style={{ width: '64px', margin: '0 auto 16px', display: 'block' }}
                />
                <h3 style={{ fontFamily: 'var(--font-brand)', color: '#EDE8E1', marginBottom: '8px' }}>Your Bag is Empty</h3>
                <p style={{ fontSize: '13px', color: '#AAA3AF', marginBottom: '24px' }}>Choose your sacred intention and return to checkout.</p>
                <button
                  onClick={() => navigateTo('shop-all')}
                  className="btn-gold"
                  style={{ padding: '12px 28px' }}
                >
                  Explore Catalogue
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                {cart.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      padding: '24px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    {/* Item Thumbnail */}
                    <div style={{
                      width: '96px',
                      height: '96px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      background: '#140D1E',
                      flexShrink: 0,
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Item Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{
                        fontSize: '10.5px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#D9AE4F',
                        display: 'block',
                        marginBottom: '6px'
                      }}>
                        {item.category || 'CRYSTALS'}
                      </span>
                      <h4 style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#EDE8E1',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        letterSpacing: '0.01em'
                      }}>
                        {item.name}
                      </h4>

                      {/* Bottom row: Qty on left, Price & "ABOUT 5 DAYS" on right */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '18px'
                      }}>
                        <span style={{ fontSize: '13px', color: '#9E98A6' }}>
                          Qty {item.qty}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                          <span style={{
                            fontSize: '15.5px',
                            fontWeight: 600,
                            color: '#EDE8E1'
                          }}>
                            ₹{(item.price * item.qty).toLocaleString('en-IN')}
                          </span>
                          <span style={{
                            fontSize: '9.5px',
                            fontWeight: 500,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#8E8896'
                          }}>
                            ABOUT 5 DAYS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: The Side Panel Box (Exact Figma design) */}
          <div style={{
            background: '#120B1A',
            border: '1px solid rgba(217, 174, 79, 0.18)',
            borderRadius: '6px',
            padding: '28px 24px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7)',
            position: 'sticky',
            top: '32px'
          }}>

            {/* BLOCK 1: DELIVERY TO */}
            <div>
              <span style={{
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#D9AE4F',
                display: 'block',
                marginBottom: '10px'
              }}>
                DELIVERY TO
              </span>

              {/* Selector Box */}
              <div
                onClick={() => setIsAddressModalOpen(true)}
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '4px',
                  padding: '11px 14px',
                  color: '#EDE8E1',
                  fontSize: '13px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(217, 174, 79, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)'}
                title="Click to change or add address"
              >
                {currentAddress.label} – {currentAddress.line1}, {currentAddress.city}, {currentAddress.state}, {currentAddress.pincode}
              </div>

              {/* Address Details */}
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#EDE8E1', letterSpacing: '0.04em' }}>
                  {currentAddress.label.toUpperCase()}
                </div>
                <div style={{ fontSize: '12px', color: '#AAA3AF', marginTop: '3px', lineHeight: 1.4 }}>
                  {currentAddress.line1}, {currentAddress.city}, {currentAddress.state}, {currentAddress.pincode}, India
                </div>
                <div style={{ fontSize: '12px', color: '#AAA3AF', marginTop: '2px' }}>
                  Contact:{currentAddress.phone}
                </div>
              </div>

              {/* Add New Address Button */}
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                style={{
                  width: '100%',
                  marginTop: '14px',
                  padding: '10px',
                  background: 'transparent',
                  border: '1px solid rgba(217, 174, 79, 0.25)',
                  borderRadius: '4px',
                  color: '#EDE8E1',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D9AE4F';
                  e.currentTarget.style.background = 'rgba(217, 174, 79, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(217, 174, 79, 0.25)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Add new address
              </button>
            </div>

            {/* BLOCK 2: APPLY COUPON */}
            <div style={{ marginTop: '26px' }}>
              <span style={{
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#D9AE4F',
                display: 'block',
                marginBottom: '10px'
              }}>
                APPLY COUPON
              </span>

              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'rgba(10, 6, 16, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '4px',
                      padding: '10px 14px',
                      color: '#EDE8E1',
                      fontSize: '12.5px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#D9AE4F'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.14)'}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(217, 174, 79, 0.35)',
                      borderRadius: '4px',
                      padding: '0 22px',
                      color: '#EDE8E1',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#D9AE4F';
                      e.currentTarget.style.background = 'rgba(217, 174, 79, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(217, 174, 79, 0.35)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(52, 211, 153, 0.08)',
                  border: '1px solid rgba(52, 211, 153, 0.35)',
                  borderRadius: '4px',
                  padding: '8px 12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={14} color="#34D399" />
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#34D399', letterSpacing: '0.08em' }}>
                        {appliedCoupon.code}
                      </span>
                      <span style={{ fontSize: '11px', color: '#AAA3AF', marginLeft: '6px' }}>
                        · {appliedCoupon.label}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    style={{ background: 'none', border: 'none', color: '#AAA3AF', cursor: 'pointer', padding: '2px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#AAA3AF'}
                    title="Remove coupon"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Sub-bar: 3 eligible · 3 coupons & SEE ALL */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '10px',
                fontSize: '11.5px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D9AE4F' }}>
                  <Tag size={12} color="#D9AE4F" />
                  <span>3 eligible · 3 coupons</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCouponsModalOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#D9AE4F',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  SEE ALL
                </button>
              </div>
            </div>

            {/* BLOCK 3: SUMMARY */}
            <div style={{ marginTop: '26px' }}>
              <span style={{
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#D9AE4F',
                display: 'block',
                marginBottom: '14px'
              }}>
                SUMMARY
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#AAA3AF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Item total</span>
                  <span style={{ color: '#EDE8E1' }}>₹{rawSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {offerDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#EDE8E1' }}>
                    <span>Offer (Pair two strands)</span>
                    <span style={{ color: '#EDE8E1' }}>-₹{offerDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {appliedCoupon && couponDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34D399', fontWeight: 500 }}>
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery</span>
                  <span style={{ color: '#AAA3AF', fontSize: '12.5px' }}>Free · Free shipping over ₹999</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GST</span>
                  <span style={{ color: '#EDE8E1' }}>₹{gst.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Total row with divider */}
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '15px', color: '#EDE8E1' }}>Total</span>
                <span style={{ fontSize: '24px', fontWeight: 600, color: '#EDE8E1' }}>
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* BLOCK 4: CHOOSE PAYMENT */}
            <div style={{ marginTop: '26px' }}>
              <span style={{
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#D9AE4F',
                display: 'block',
                marginBottom: '12px'
              }}>
                CHOOSE PAYMENT
              </span>

              {/* Payment Option: Cash on delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                style={{
                  padding: '13px 16px',
                  borderRadius: '4px',
                  border: paymentMethod === 'cod' ? '1px solid #D9AE4F' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: paymentMethod === 'cod' ? 'rgba(217, 174, 79, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                  color: '#EDE8E1',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                  transition: 'all 0.2s'
                }}
              >
                Cash on delivery
              </div>

              {/* Payment Option: UPI */}
              <div
                onClick={() => setPaymentMethod('upi')}
                style={{
                  padding: '13px 16px',
                  borderRadius: '4px',
                  border: paymentMethod === 'upi' ? '1px solid #D9AE4F' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: paymentMethod === 'upi' ? 'rgba(217, 174, 79, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                  color: '#EDE8E1',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                UPI
              </div>

              {/* Place Order CTA Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '14px 0',
                  background: 'linear-gradient(180deg, #E6C87C 0%, #C4983E 100%)',
                  color: '#12091E',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(217, 174, 79, 0.25)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.08)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Place order
              </button>

              {/* Links Footer */}
              <div style={{ marginTop: '22px', textAlign: 'center' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '28px',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}>
                  <button
                    type="button"
                    onClick={() => setCartOpen(true)}
                    style={{ background: 'none', border: 'none', color: '#D9AE4F', fontWeight: 500, cursor: 'pointer', padding: 0 }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#F5DC93'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D9AE4F'}
                  >
                    BACK TO BAG
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('home')}
                    style={{ background: 'none', border: 'none', color: '#D9AE4F', fontWeight: 500, cursor: 'pointer', padding: 0 }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#F5DC93'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D9AE4F'}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => navigateTo('wishlist')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D9AE4F',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      padding: 0
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#F5DC93'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D9AE4F'}
                  >
                    WISHLIST
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: ADD / EDIT ADDRESS MODAL
         ========================================================================= */}
      {isAddressModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 3, 10, 0.8)',
          backdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setIsAddressModalOpen(false)}>
          <div style={{
            background: '#120B1A',
            border: '1px solid rgba(217, 174, 79, 0.3)',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '480px',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '18px', color: '#EDE8E1', margin: 0 }}>
                DELIVERY ADDRESS
              </h3>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#AAA3AF', cursor: 'pointer', padding: 0 }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#AAA3AF', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
                  Address Label (e.g. Home, Office)
                </label>
                <input
                  type="text"
                  value={newAddressForm.label}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, label: e.target.value })}
                  style={{ width: '100%', background: '#0A0612', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '10px 12px', color: '#EDE8E1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#AAA3AF', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 12 Test Lane, Civil Lines"
                  value={newAddressForm.line1}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, line1: e.target.value })}
                  style={{ width: '100%', background: '#0A0612', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '10px 12px', color: '#EDE8E1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#AAA3AF', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jaipur"
                    value={newAddressForm.city}
                    onChange={(e) => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                    style={{ width: '100%', background: '#0A0612', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '10px 12px', color: '#EDE8E1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#AAA3AF', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="302001"
                    value={newAddressForm.pincode}
                    onChange={(e) => setNewAddressForm({ ...newAddressForm, pincode: e.target.value })}
                    style={{ width: '100%', background: '#0A0612', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '10px 12px', color: '#EDE8E1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#AAA3AF', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={newAddressForm.phone}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, phone: e.target.value })}
                  style={{ width: '100%', background: '#0A0612', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '10px 12px', color: '#EDE8E1', fontSize: '13px' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  padding: '13px',
                  background: 'linear-gradient(180deg, #E6C87C 0%, #C4983E 100%)',
                  color: '#12091E',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Save & Deliver Here
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: 3 ELIGIBLE COUPONS POPUP ("SEE ALL")
         ========================================================================= */}
      {isCouponsModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 3, 10, 0.8)',
          backdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setIsCouponsModalOpen(false)}>
          <div style={{
            background: '#120B1A',
            border: '1px solid rgba(217, 174, 79, 0.3)',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '460px',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#D9AE4F', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  AVAILABLE OFFERS
                </span>
                <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '18px', color: '#EDE8E1', margin: '4px 0 0' }}>
                  3 Sacred Coupons
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCouponsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#AAA3AF', cursor: 'pointer', padding: 0 }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                {
                  code: 'KUBER10',
                  title: '10% Sacred Blessing',
                  desc: 'Save 10% on your entire sacred order without minimum cart requirement.'
                },
                {
                  code: 'ABUNDANCE',
                  title: '₹500 Abundance Gift',
                  desc: 'Flat ₹500 off on consecrated orders above ₹1,500.'
                },
                {
                  code: 'VEDIC15',
                  title: '15% Temple Blessing',
                  desc: 'Save 15% on authentic temple-energized malas and crystal talismans.'
                }
              ].map((c) => {
                const isCurrent = appliedCoupon?.code === c.code;
                return (
                  <div
                    key={c.code}
                    style={{
                      border: isCurrent ? '1px solid #34D399' : '1px solid rgba(217, 174, 79, 0.22)',
                      background: isCurrent ? 'rgba(52, 211, 153, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '6px',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          background: 'rgba(217, 174, 79, 0.15)',
                          border: '1px solid rgba(217, 174, 79, 0.3)',
                          padding: '2px 8px',
                          borderRadius: '3px',
                          color: '#F5DC93',
                          fontSize: '12px',
                          fontWeight: 700,
                          letterSpacing: '0.08em'
                        }}>
                          {c.code}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#EDE8E1' }}>
                          {c.title}
                        </span>
                      </div>
                      <p style={{ fontSize: '11.5px', color: '#AAA3AF', margin: '6px 0 0', lineHeight: 1.4 }}>
                        {c.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (isCurrent) {
                          removeCoupon();
                        } else {
                          applyCoupon(c.code);
                          setIsCouponsModalOpen(false);
                        }
                      }}
                      style={{
                        background: isCurrent ? 'transparent' : 'linear-gradient(180deg, #E6C87C 0%, #C4983E 100%)',
                        color: isCurrent ? '#EF4444' : '#12091E',
                        border: isCurrent ? '1px solid #EF4444' : 'none',
                        padding: '7px 14px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {isCurrent ? 'Remove' : 'Apply'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: ORDER SUCCESS CONSECRATION SCREEN
         ========================================================================= */}
      {orderPlaced && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 3, 10, 0.88)',
          backdropFilter: 'blur(16px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#120B1A',
            border: '1px solid rgba(217, 174, 79, 0.35)',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '520px',
            padding: '36px 32px',
            textAlign: 'center',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(217, 174, 79, 0.12)',
              border: '1px solid rgba(217, 174, 79, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#D9AE4F'
            }}>
              <CheckCircle2 size={32} />
            </div>

            <span style={{ fontSize: '11px', color: '#D9AE4F', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              SANCTIFIED ORDER CONFIRMED
            </span>

            <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: '24px', color: '#EDE8E1', margin: '8px 0 12px' }}>
              Consecration In Progress
            </h2>

            <p style={{ fontSize: '13.5px', color: '#AAA3AF', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 20px' }}>
              Your sacred pieces are being energized on the marble altar in Rishikesh. We will dispatch via insured courier within 48 hours.
            </p>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(217, 174, 79, 0.2)',
              borderRadius: '6px',
              padding: '14px 18px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '12px', color: '#AAA3AF' }}>Order Reference</span>
              <strong style={{ fontSize: '14px', color: '#F5DC93', letterSpacing: '0.08em' }}>{orderId}</strong>
            </div>

            <button
              type="button"
              onClick={() => {
                setOrderPlaced(false);
                navigateTo('home');
              }}
              style={{
                width: '100%',
                padding: '14px 0',
                background: 'linear-gradient(180deg, #E6C87C 0%, #C4983E 100%)',
                color: '#12091E',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Return to Sanctuary
            </button>
          </div>
        </div>
      )}

      {/* Responsive Style Overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .checkout-main-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};
