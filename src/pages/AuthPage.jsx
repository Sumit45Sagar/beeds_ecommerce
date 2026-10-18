import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  Calendar,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Package,
  Award,
  Compass,
  KeyRound
} from 'lucide-react';

export const AuthPage = ({ mode: initialMode = 'login' }) => {
  const { navigateTo, user, login, signup, logout, showToast, wishlist } = useShop();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup' | 'account' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeAccountTab, setActiveAccountTab] = useState('orders');
  const [forgotSent, setForgotSent] = useState(false);

  // Sync mode with prop changes
  useEffect(() => {
    if (initialMode === 'account' && !user) {
      setMode('login');
    } else {
      setMode(initialMode);
    }
  }, [initialMode, user]);

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
    rememberMe: true
  });

  // Signup Form State
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: true,
    receiveVedicAlerts: true
  });

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');

  // Password Strength Calculation
  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'transparent' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Gentle', color: '#E06A6A' };
    if (score === 2) return { score: 2, label: 'Moderate', color: '#D9AE4F' };
    if (score === 3) return { score: 3, label: 'Sacred & Strong', color: '#88C999' };
    return { score: 4, label: 'Impenetrable Aura', color: '#C5A572' };
  };

  const passwordStrength = calculatePasswordStrength(signupForm.password);

  // Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.identifier || !loginForm.password) {
      showToast('Please enter your email and password', 'muted');
      return;
    }

    const success = login({
      email: loginForm.identifier,
      password: loginForm.password,
      rememberMe: loginForm.rememberMe
    });

    if (success) {
      navigateTo('account');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupForm.fullName || !signupForm.email || !signupForm.password) {
      showToast('Please fill all required sanctuary credentials', 'muted');
      return;
    }
    if (signupForm.password.length < 6) {
      showToast('Password should be at least 6 characters', 'muted');
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      showToast('Passwords do not match. Please verify.', 'muted');
      return;
    }
    if (!signupForm.agreedToTerms) {
      showToast('Please accept the House Rules & Sanctuary Charter', 'muted');
      return;
    }

    const newUser = signup({
      name: signupForm.fullName,
      email: signupForm.email,
      phone: signupForm.phone,
      birthDate: signupForm.birthDate,
      password: signupForm.password,
      receiveVedicAlerts: signupForm.receiveVedicAlerts
    });

    if (newUser) {
      navigateTo('account');
    }
  };

  const handleQuickDemoFill = (e) => {
    e.preventDefault();
    setLoginForm({
      identifier: 'devendra.sharma@kuberstones.in',
      password: 'RoyalConsecrated2026!',
      rememberMe: true
    });
    showToast('Demo sanctuary credentials pre-filled', 'gold');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please provide your email address', 'muted');
      return;
    }
    setForgotSent(true);
    showToast('A sacred reset link has been dispatched to your email', 'gold');
  };

  // -------------------------------------------------------------
  // VIEW: LOGGED IN SANCTUARY MEMBER PORTAL
  // -------------------------------------------------------------
  if (user && (mode === 'account' || initialMode === 'account')) {
    return (
      <div style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(217, 174, 79, 0.08) 0%, #07050B 70%)',
        minHeight: '85vh',
        padding: '56px 0 96px',
        color: '#F4F1EC'
      }}>
        <div className="container-custom">
          {/* Breadcrumbs */}
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
            <span style={{ color: '#D9AE4F', fontWeight: 500 }}>Sanctuary Account</span>
          </div>

          {/* Member Hero Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 15, 29, 0.95) 0%, rgba(10, 8, 15, 0.98) 100%)',
            border: '1px solid rgba(217, 174, 79, 0.28)',
            borderRadius: '12px',
            padding: '36px 36px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}>
              {/* Profile Identity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ECC26A 0%, #C5A572 60%, #8E7345 100%)',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 24px rgba(217, 174, 79, 0.35)'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: '#0D0A14',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-brand)',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#ECC26A'
                  }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'K'}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#D9AE4F',
                      background: 'rgba(217, 174, 79, 0.12)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      border: '1px solid rgba(217, 174, 79, 0.25)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Sparkles size={11} /> {user.memberTier || 'Abundance Circle Patron'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#AAA3AF' }}>· Member since {user.memberSince || '2026'}</span>
                  </div>
                  <h1 style={{
                    fontFamily: 'var(--font-brand)',
                    fontSize: 'clamp(24px, 3.5vw, 32px)',
                    fontWeight: 700,
                    color: '#EDE8E1',
                    margin: 0,
                    letterSpacing: '0.02em'
                  }}>
                    Namaste, {user.name}
                  </h1>
                  <p style={{ fontSize: '13px', color: '#AAA3AF', margin: '4px 0 0' }}>
                    {user.email} {user.phone && `· ${user.phone}`}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigateTo('studio')}
                  className="btn-gold"
                  style={{
                    padding: '12px 22px',
                    fontSize: '11px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Sparkles size={14} /> Design In Atelier
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigateTo('home');
                  }}
                  className="btn-outline"
                  style={{
                    padding: '11px 18px',
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(217, 174, 79, 0.15)'
            }}>
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#AAA3AF', textTransform: 'uppercase' }}>Consecrated Pieces</span>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#EDE8E1', fontFamily: 'var(--font-brand)', marginTop: '2px' }}>
                  {user.orders ? user.orders.length : 2}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#AAA3AF', textTransform: 'uppercase' }}>Sacred Wishlist</span>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#D9AE4F', fontFamily: 'var(--font-brand)', marginTop: '2px' }}>
                  {wishlist.length} saved
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#AAA3AF', textTransform: 'uppercase' }}>Astrological Attunement</span>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#EDE8E1', fontFamily: 'var(--font-brand)', marginTop: '4px' }}>
                  {user.zodiacSign || 'Leo / Simha (Sun Prana)'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#AAA3AF', textTransform: 'uppercase' }}>Consecration Seal</span>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#88C999', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <ShieldCheck size={16} /> Verified Sanctum
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            gap: '12px',
            borderBottom: '1px solid rgba(217, 174, 79, 0.2)',
            paddingBottom: '12px',
            marginBottom: '36px',
            overflowX: 'auto'
          }}>
            {[
              { id: 'orders', label: 'Sacred Orders', icon: Package },
              { id: 'certificates', label: 'Consecration Certificates', icon: Award },
              { id: 'vedic', label: 'Vedic Guidance', icon: Compass },
              { id: 'profile', label: 'Personal Dossier', icon: User }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeAccountTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAccountTab(tab.id)}
                  style={{
                    background: isActive ? 'rgba(217, 174, 79, 0.12)' : 'transparent',
                    border: isActive ? '1px solid #D9AE4F' : '1px solid rgba(217, 174, 79, 0.15)',
                    borderRadius: '6px',
                    padding: '10px 18px',
                    color: isActive ? '#FFFFFF' : '#AAA3AF',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={15} color={isActive ? '#D9AE4F' : '#AAA3AF'} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: SACRED ORDERS */}
          {activeAccountTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                {
                  orderId: 'KS-2026-98412',
                  date: 'October 14, 2026',
                  status: 'In Temple Consecration',
                  statusColor: '#D9AE4F',
                  items: [
                    {
                      name: 'Five Mukhi Himalayan Rudraksha Mala',
                      spec: '108 Beads · Gold-tone consecration cap · Nepal Grade AAA',
                      price: '₹2,499',
                      image: '/assets/01home_img_7.jpg'
                    }
                  ],
                  total: '₹2,574 (Incl. GST)',
                  trackingNumber: 'BLUEDART-889214710'
                },
                {
                  orderId: 'KS-2026-78104',
                  date: 'September 28, 2026',
                  status: 'Delivered With Sacred Tilak',
                  statusColor: '#88C999',
                  items: [
                    {
                      name: 'Heart Line Rose Quartz Strand',
                      spec: 'Madagascar Grade A Quartz · 16 cm (M)',
                      price: '₹2,499',
                      image: '/assets/01home_img_4.jpg'
                    },
                    {
                      name: 'Amethyst Calm Strand',
                      spec: 'Brazilian Raw Purple Amethyst · 16 cm (M)',
                      price: '₹2,499',
                      image: '/assets/bag-desktop1440_img_2.jpg'
                    }
                  ],
                  total: '₹4,916 (Offer applied)',
                  trackingNumber: 'DELHIVERY-99238120'
                }
              ].map(order => (
                <div
                  key={order.orderId}
                  style={{
                    background: '#0D0A14',
                    border: '1px solid rgba(217, 174, 79, 0.22)',
                    borderRadius: '8px',
                    padding: '24px 28px',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(217, 174, 79, 0.15)',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-brand)', fontSize: '15px', fontWeight: 700, color: '#EDE8E1' }}>
                        {order.orderId}
                      </span>
                      <span style={{ fontSize: '13px', color: '#AAA3AF' }}>Placed on {order.date}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: order.statusColor,
                        display: 'inline-block'
                      }} />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: order.statusColor, letterSpacing: '0.04em' }}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            border: '1px solid rgba(217, 174, 79, 0.2)'
                          }}
                        />
                        <div style={{ flexGrow: 1 }}>
                          <h4 style={{ fontFamily: 'var(--font-brand)', fontSize: '15px', color: '#EDE8E1', margin: '0 0 4px' }}>
                            {item.name}
                          </h4>
                          <p style={{ fontSize: '12px', color: '#AAA3AF', margin: 0 }}>
                            {item.spec}
                          </p>
                        </div>
                        <div>
                          <span style={{ fontSize: '15px', fontWeight: 600, color: '#D9AE4F' }}>
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(217, 174, 79, 0.12)',
                    gap: '12px',
                    fontSize: '13px'
                  }}>
                    <div>
                      <span style={{ color: '#AAA3AF' }}>Total: </span>
                      <strong style={{ color: '#EDE8E1' }}>{order.total}</strong>
                      <span style={{ color: '#AAA3AF', marginLeft: '12px' }}>· Tracking: {order.trackingNumber}</span>
                    </div>

                    <button
                      onClick={() => showToast(`Dispatched via courier: Tracking number ${order.trackingNumber}`, 'gold')}
                      style={{
                        background: 'rgba(217, 174, 79, 0.1)',
                        border: '1px solid rgba(217, 174, 79, 0.3)',
                        borderRadius: '4px',
                        color: '#D9AE4F',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}
                    >
                      Track Parcel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: CERTIFICATES */}
          {activeAccountTab === 'certificates' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {[
                {
                  certId: 'KS-CERT-99201',
                  item: 'Five Mukhi Himalayan Rudraksha',
                  stoneOrigin: 'Mustang Foothills, Nepal (High Altitude)',
                  priest: 'Pandit Radheshyam Shastri',
                  temple: 'Pashupatinath Consecration Sanctuary',
                  date: 'October 14, 2026',
                  frequency: 'Shiva Prana · Throat & Heart Chakras'
                },
                {
                  certId: 'KS-CERT-88410',
                  item: 'Heart Line Natural Rose Quartz',
                  stoneOrigin: 'Fianarantsoa Pegmatite, Madagascar',
                  priest: 'Acharya V. K. Nambiar',
                  temple: 'Jaipur Sacred Mineral Sanctum',
                  date: 'September 28, 2026',
                  frequency: 'Anahata Chakra · Unconditional Love'
                }
              ].map(cert => (
                <div
                  key={cert.certId}
                  style={{
                    background: 'linear-gradient(135deg, #130E1B 0%, #0A0810 100%)',
                    border: '1px solid rgba(217, 174, 79, 0.35)',
                    borderRadius: '8px',
                    padding: '30px 26px',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D9AE4F', fontWeight: 600 }}>
                      OFFICIAL CONSECRATION DECREE
                    </span>
                    <Award size={20} color="#D9AE4F" />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '18px', color: '#EDE8E1', margin: '0 0 6px' }}>
                    {cert.item}
                  </h3>
                  <div style={{ fontSize: '11px', color: '#D9AE4F', letterSpacing: '0.08em', marginBottom: '16px' }}>
                    CERTIFICATE NO: {cert.certId}
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#AAA3AF',
                    lineHeight: 1.7,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '16px 0',
                    borderTop: '1px solid rgba(217, 174, 79, 0.15)',
                    borderBottom: '1px solid rgba(217, 174, 79, 0.15)',
                    marginBottom: '20px'
                  }}>
                    <div><strong style={{ color: '#EDE8E1' }}>Geological Origin:</strong> {cert.stoneOrigin}</div>
                    <div><strong style={{ color: '#EDE8E1' }}>Attuned Frequency:</strong> {cert.frequency}</div>
                    <div><strong style={{ color: '#EDE8E1' }}>Consecrated By:</strong> {cert.priest}</div>
                    <div><strong style={{ color: '#EDE8E1' }}>Sanctuary:</strong> {cert.temple}</div>
                    <div><strong style={{ color: '#EDE8E1' }}>Ritual Date:</strong> {cert.date}</div>
                  </div>

                  <button
                    onClick={() => showToast(`Digital seal for ${cert.certId} archived`, 'gold')}
                    className="btn-outline"
                    style={{ width: '100%', padding: '10px', fontSize: '11px', letterSpacing: '0.12em' }}
                  >
                    Download Consecration Certificate
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: VEDIC PROFILE */}
          {activeAccountTab === 'vedic' && (
            <div style={{
              background: '#0D0A14',
              border: '1px solid rgba(217, 174, 79, 0.25)',
              borderRadius: '8px',
              padding: '36px 32px'
            }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D9AE4F', fontWeight: 600 }}>
                NATAL PLANETARY HARMONY
              </span>
              <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '24px', color: '#EDE8E1', margin: '8px 0 16px' }}>
                Your Astrological Gemstone Matrix
              </h3>
              <p style={{ fontSize: '14px', color: '#AAA3AF', lineHeight: 1.7, marginBottom: '28px', maxWidth: '780px' }}>
                Calculated according to Vedic astrological principles. Consecrated natural minerals focus solar prana and counteract astral friction.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(217, 174, 79, 0.2)', padding: '20px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#D9AE4F', letterSpacing: '0.1em' }}>NATAL STONE</span>
                  <h4 style={{ fontFamily: 'var(--font-brand)', fontSize: '17px', color: '#EDE8E1', margin: '6px 0 4px' }}>Ruby & Tiger Eye</h4>
                  <p style={{ fontSize: '12px', color: '#AAA3AF', margin: 0 }}>Amplifies vitality and leadership aura.</p>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(217, 174, 79, 0.2)', padding: '20px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#D9AE4F', letterSpacing: '0.1em' }}>SACRED BEAD</span>
                  <h4 style={{ fontFamily: 'var(--font-brand)', fontSize: '17px', color: '#EDE8E1', margin: '6px 0 4px' }}>5-Mukhi Rudraksha</h4>
                  <p style={{ fontSize: '12px', color: '#AAA3AF', margin: 0 }}>Brings mental tranquility and divine shield.</p>
                </div>
              </div>

              <button
                onClick={() => navigateTo('studio')}
                className="btn-gold"
                style={{ padding: '12px 24px', fontSize: '11px', letterSpacing: '0.14em' }}
              >
                <Sparkles size={14} /> Open Custom Atelier For This Matrix
              </button>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeAccountTab === 'profile' && (
            <div style={{
              background: '#0D0A14',
              border: '1px solid rgba(217, 174, 79, 0.25)',
              borderRadius: '8px',
              padding: '36px 32px'
            }}>
              <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '20px', color: '#EDE8E1', marginBottom: '24px' }}>
                Sanctuary Member Dossier
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '680px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#AAA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" value={user.name} readOnly style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(217,174,79,0.2)', padding: '12px', color: '#EDE8E1', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#AAA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>Email</label>
                  <input type="text" value={user.email} readOnly style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(217,174,79,0.2)', padding: '12px', color: '#EDE8E1', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: FORGOT PASSWORD FLOW
  // -------------------------------------------------------------
  if (mode === 'forgot') {
    return (
      <div style={{
        background: '#07050B',
        minHeight: 'calc(100vh - 110px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          maxWidth: '460px',
          width: '100%',
          background: '#0D0A14',
          border: '1px solid rgba(217, 174, 79, 0.3)',
          borderRadius: '10px',
          padding: '40px 36px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img
              src="/assets/kuber-logo-transparent.png"
              alt="Kuberstones"
              style={{ height: '54px', width: 'auto', margin: '0 auto 16px', display: 'block' }}
            />
            <span style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#D9AE4F', fontWeight: 600 }}>
              RECOVER SANCTUARY ACCESS
            </span>
            <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: '24px', color: '#EDE8E1', margin: '8px 0 6px' }}>
              Reset Your <span className="gold-italic">Key</span>
            </h2>
            <p style={{ fontSize: '13px', color: '#AAA3AF', lineHeight: 1.6 }}>
              Enter your email to receive a sacred password reset instruction.
            </p>
          </div>

          {forgotSent ? (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(217, 174, 79, 0.15)',
                border: '1px solid #D9AE4F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#D9AE4F'
              }}>
                <CheckCircle2 size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '17px', color: '#EDE8E1', margin: '0 0 8px' }}>
                Instructions Dispatched
              </h3>
              <p style={{ fontSize: '13px', color: '#AAA3AF', lineHeight: 1.6, marginBottom: '24px' }}>
                Check your inbox at <strong style={{ color: '#EDE8E1' }}>{forgotEmail}</strong>.
              </p>
              <button
                onClick={() => {
                  setForgotSent(false);
                  setMode('login');
                }}
                className="btn-gold"
                style={{ width: '100%', padding: '13px', fontSize: '11px', letterSpacing: '0.14em' }}
              >
                Return To Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#AAA3AF', display: 'block', marginBottom: '8px' }}>
                  Member Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#C5A572" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    placeholder="sanctuary@kuberstones.in"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(217, 174, 79, 0.25)',
                      borderRadius: '4px',
                      padding: '12px 14px 12px 42px',
                      color: '#EDE8E1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-gold"
                style={{ width: '100%', padding: '13px', fontSize: '11px', letterSpacing: '0.16em' }}
              >
                Send Sacred Reset Link
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#AAA3AF',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '4px'
                }}
              >
                ← Back to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: SPLIT SCREEN SIGN IN & CREATE ACCOUNT (EXACT FIGMA REFINED)
  // -------------------------------------------------------------
  const isLogin = mode === 'login';

  return (
    <div className="auth-split-layout" style={{
      minHeight: 'calc(100vh - 110px)',
      background: '#07050B',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
      position: 'relative'
    }}>
      {/* ========================================================
          LEFT COLUMN: LUXURY ATMOSPHERIC EDITORIAL IMAGE
         ======================================================== */}
      <div
        className="auth-split-image-panel"
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 48px',
          minHeight: '620px',
          background: '#07050B'
        }}
      >
        {/* Background Editorial Image */}
        <img
          src="/assets/auth-hero-split.jpg"
          alt="Consecrated Kuberstones Atelier Crystal Bracelets"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.92) contrast(1.05)'
          }}
        />

        {/* Cinematic Vignette & Dissolve Overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(7, 5, 11, 0.96) 0%, rgba(7, 5, 11, 0.45) 42%, rgba(7, 5, 11, 0.15) 70%, rgba(7, 5, 11, 0.35) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Right Edge Seamless Dissolve into Form Panel */}
        <div className="auth-split-edge-fade" style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '180px',
          background: 'linear-gradient(to right, transparent 0%, rgba(7, 5, 11, 0.7) 50%, #07050B 100%)',
          pointerEvents: 'none'
        }} />

        {/* Top Floating Badge */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(10, 8, 15, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(217, 174, 79, 0.28)',
            padding: '7px 14px',
            borderRadius: '4px',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#D9AE4F',
            fontWeight: 600
          }}>
            <Sparkles size={12} /> CONSECRATED HIMALAYAN ATELIER
          </div>
        </div>

        {/* Bottom Left Editorial Content (Matching Screenshot with Luxury Polish) */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '480px' }}>
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: '#D9AE4F',
            fontWeight: 600,
            display: 'block',
            marginBottom: '6px'
          }}>
            THE ATELIER
          </span>

          <h2 style={{
            fontFamily: 'var(--font-brand)',
            fontSize: 'clamp(36px, 4.5vw, 52px)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#EDE8E1',
            margin: '0 0 14px',
            lineHeight: 1.1
          }}>
            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </h2>

          <p style={{
            fontSize: '15px',
            color: '#C7C2BA',
            lineHeight: 1.6,
            marginBottom: '24px'
          }}>
            {isLogin
              ? 'One account for the store and the atelier. Your bag and wishlist travel with you.'
              : 'Initiate your sacred membership. Enjoy personalized Vedic natal readings, temple attunement, and rare harvest allocations.'}
          </p>

          <button
            onClick={() => setMode(isLogin ? 'signup' : 'login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#EDE8E1',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 500,
              padding: 0,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: '1.5px solid #D9AE4F',
              paddingBottom: '3px',
              transition: 'color 0.2s ease, border-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#EDE8E1';
              e.currentTarget.style.borderColor = '#D9AE4F';
            }}
          >
            {isLogin ? 'Create account →' : 'Already have an account? Sign in →'}
          </button>
        </div>
      </div>

      {/* ========================================================
          RIGHT COLUMN: REFINED LUXURY FORM PANEL
         ======================================================== */}
      <div style={{
        background: '#07050B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '56px 48px',
        position: 'relative'
      }}>
        {/* Subtle Ambient Gold Glow in Top-Right */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(217, 174, 79, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: isLogin ? '430px' : '480px', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <span style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#D9AE4F',
              fontWeight: 600,
              display: 'block',
              marginBottom: '8px'
            }}>
              {isLogin ? 'WELCOME BACK' : 'PATRON INITIATION'}
            </span>

            {/* <h1 style={{
              fontFamily: 'var(--font-brand)',
              fontSize: 'clamp(28px, 3.2vw, 36px)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#EDE8E1',
              margin: '0 0 8px',
              lineHeight: 1.15
            }}>
              {isLogin ? 'ENTER THE HOUSE.' : 'JOIN THE HOUSE.'}
            </h1> */}

            {/* <p style={{ fontSize: '13px', color: '#AAA3AF', margin: 0 }}>
              {isLogin
                ? 'Sign in to access your consecrated orders and private atelier.'
                : 'Create your sanctuary profile for priority temple consecrations.'}
            </p> */}
          </div>

          {/* ========================================================
              FORM: SIGN IN (EXACT TO REFERENCE, REFINED)
             ======================================================== */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* EMAIL */}
              <div>
                <label style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#AAA3AF',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  EMAIL OR MOBILE
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={loginForm.identifier}
                  onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                  placeholder="name@kuberstones.in"
                  required
                  style={{
                    width: '100%',
                    background: '#0D0A14',
                    border: '1px solid rgba(217, 174, 79, 0.22)',
                    borderRadius: '2px',
                    padding: '14px 16px',
                    color: '#EDE8E1',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#D9AE4F';
                    e.target.style.boxShadow = '0 0 0 1px rgba(217, 174, 79, 0.35)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(217, 174, 79, 0.22)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#AAA3AF'
                  }}>
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#AAA3AF',
                      fontSize: '11px',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#D9AE4F'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#AAA3AF'}
                  >
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••••••"
                    required
                    style={{
                      width: '100%',
                      background: '#0D0A14',
                      border: '1px solid rgba(217, 174, 79, 0.22)',
                      borderRadius: '2px',
                      padding: '14px 44px 14px 16px',
                      color: '#EDE8E1',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D9AE4F';
                      e.target.style.boxShadow = '0 0 0 1px rgba(217, 174, 79, 0.35)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(217, 174, 79, 0.22)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '12px',
                      background: 'none',
                      border: 'none',
                      color: '#AAA3AF',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '9px', cursor: 'pointer', fontSize: '12px', color: '#AAA3AF' }}>
                <input
                  type="checkbox"
                  checked={loginForm.rememberMe}
                  onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                  style={{ accentColor: '#D9AE4F', width: '15px', height: '15px' }}
                />
                <span>Remember me on this consecrated device</span>
              </label>

              {/* PRIMARY SIGN IN BUTTON (EXACT TO REFERENCE) */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ECC26A 0%, #D9AE4F 50%, #B88E38 100%)',
                  color: '#0A0810',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '14px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(217, 174, 79, 0.3)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(217, 174, 79, 0.42)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 174, 79, 0.3)';
                }}
              >
                Sign in
              </button>

              {/* LINK BELOW BUTTON (EXACT TO REFERENCE) */}
              <div style={{ textAlign: 'center', fontSize: '13px', color: '#AAA3AF', marginTop: '2px' }}>
                New here?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#EDE8E1',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: 0
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#D9AE4F'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                >
                  Create an account
                </button>
              </div>

              {/* QUICK DEMO HELPER PILL */}
              <button
                type="button"
                onClick={handleQuickDemoFill}
                style={{
                  background: 'rgba(217, 174, 79, 0.08)',
                  border: '1px dashed rgba(217, 174, 79, 0.32)',
                  borderRadius: '4px',
                  color: '#D9AE4F',
                  padding: '9px 14px',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '4px'
                }}
              >
                <KeyRound size={13} /> Fill Demo Patron Credentials
              </button>

              {/* SOCIAL LOGINS */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                margin: '8px 0 2px',
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#6E6A74'
              }}>
                <span style={{ flexGrow: 1, height: '1px', background: 'rgba(217, 174, 79, 0.12)' }} />
                <span>OR SIGN IN WITH</span>
                <span style={{ flexGrow: 1, height: '1px', background: 'rgba(217, 174, 79, 0.12)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    login({ email: 'aarav.patron@gmail.com', name: 'Aarav Singhania' });
                    navigateTo('account');
                  }}
                  className="btn-outline"
                  style={{
                    padding: '11px',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() => {
                    login({ email: 'patron.apple@icloud.com', name: 'Devendra Sharma' });
                    navigateTo('account');
                  }}
                  className="btn-outline"
                  style={{
                    padding: '11px',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.8 1.45-.6.7-.1.14 1.84.02 3 1.07-.05 2.12-.55 2.79-1.35z" />
                  </svg>
                  Apple ID
                </button>
              </div>
            </form>
          ) : (
            /* ========================================================
                FORM: CREATE ACCOUNT (SIGN UP)
               ======================================================== */
            <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Full Name */}
              <div>
                <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAA3AF', display: 'block', marginBottom: '6px' }}>
                  FULL NAME *
                </label>
                <input
                  type="text"
                  value={signupForm.fullName}
                  onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                  placeholder="e.g. Maharani Gayatri / Devendra Sharma"
                  required
                  style={{
                    width: '100%',
                    background: '#0D0A14',
                    border: '1px solid rgba(217, 174, 79, 0.22)',
                    borderRadius: '2px',
                    padding: '13px 14px',
                    color: '#EDE8E1',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Email & Phone in 2 Columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAA3AF', display: 'block', marginBottom: '6px' }}>
                    SACRED EMAIL *
                  </label>
                  <input
                    type="email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    placeholder="name@domain.com"
                    required
                    style={{
                      width: '100%',
                      background: '#0D0A14',
                      border: '1px solid rgba(217, 174, 79, 0.22)',
                      borderRadius: '2px',
                      padding: '13px 14px',
                      color: '#EDE8E1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAA3AF', display: 'block', marginBottom: '6px' }}>
                    PHONE (+91)
                  </label>
                  <input
                    type="tel"
                    value={signupForm.phone}
                    onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                    placeholder="+91 98201 XXXXX"
                    style={{
                      width: '100%',
                      background: '#0D0A14',
                      border: '1px solid rgba(217, 174, 79, 0.22)',
                      borderRadius: '2px',
                      padding: '13px 14px',
                      color: '#EDE8E1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Date of Birth for Vedic Astrological Blessings */}
              <div>
                <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAA3AF', display: 'block', marginBottom: '6px' }}>
                  DATE OF BIRTH (FOR NATAL GEMSTONE BLESSING)
                </label>
                <input
                  type="date"
                  value={signupForm.birthDate}
                  onChange={(e) => setSignupForm({ ...signupForm, birthDate: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#0D0A14',
                    border: '1px solid rgba(217, 174, 79, 0.22)',
                    borderRadius: '2px',
                    padding: '12px 14px',
                    color: '#EDE8E1',
                    fontSize: '14px',
                    outline: 'none',
                    colorScheme: 'dark'
                  }}
                />
              </div>

              {/* Passwords */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAA3AF', display: 'block', marginBottom: '6px' }}>
                    PASSWORD *
                  </label>
                  <input
                    type="password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    placeholder="Min 6 characters"
                    required
                    style={{
                      width: '100%',
                      background: '#0D0A14',
                      border: '1px solid rgba(217, 174, 79, 0.22)',
                      borderRadius: '2px',
                      padding: '13px 14px',
                      color: '#EDE8E1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAA3AF', display: 'block', marginBottom: '6px' }}>
                    CONFIRM PASSWORD *
                  </label>
                  <input
                    type="password"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    required
                    style={{
                      width: '100%',
                      background: '#0D0A14',
                      border: '1px solid rgba(217, 174, 79, 0.22)',
                      borderRadius: '2px',
                      padding: '13px 14px',
                      color: '#EDE8E1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Password Strength Meter */}
              {signupForm.password && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#AAA3AF' }}>Aura Security</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', height: '3px' }}>
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        style={{
                          flexGrow: 1,
                          borderRadius: '2px',
                          background: step <= passwordStrength.score ? passwordStrength.color : 'rgba(255, 255, 255, 0.08)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Terms Checkbox */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#AAA3AF', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  checked={signupForm.agreedToTerms}
                  onChange={(e) => setSignupForm({ ...signupForm, agreedToTerms: e.target.checked })}
                  required
                  style={{ accentColor: '#D9AE4F', width: '15px', height: '15px', marginTop: '2px' }}
                />
                <span>I accept the House Rules & Sacred Privacy Charter.</span>
              </label>

              {/* PRIMARY CREATE ACCOUNT BUTTON */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ECC26A 0%, #D9AE4F 50%, #B88E38 100%)',
                  color: '#0A0810',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '14px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(217, 174, 79, 0.3)',
                  marginTop: '6px'
                }}
              >
                Create Account
              </button>

              <div style={{ textAlign: 'center', fontSize: '13px', color: '#AAA3AF' }}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#EDE8E1',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: 0
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#D9AE4F'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#EDE8E1'}
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Responsive Stacking CSS */}
      <style>{`
        @media (max-width: 960px) {
          .auth-split-layout {
            grid-template-columns: 1fr !important;
          }
          .auth-split-image-panel {
            min-height: 380px !important;
            padding: 32px 24px !important;
          }
          .auth-split-edge-fade {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
