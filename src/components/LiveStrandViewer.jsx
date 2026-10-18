import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  RotateCw,
  Sparkles,
  Eye,
  ShieldCheck,
  Compass,
  Layers,
  Sun,
  Flame,
  Moon,
  Info,
  Maximize2
} from 'lucide-react';

/**
 * Procedural Realistic Gemstone Bead Gradient Generator
 */
const getBeadGradients = (color, id) => {
  // Return unique gradient IDs and stops for rich crystalline depth
  return {
    gradId: `grad-bead-${id}`,
    specularId: `spec-bead-${id}`,
    color
  };
};

export const LiveStrandViewer = ({
  crystals = [],
  charm = { id: 'om', name: 'OM', glyph: 'ॐ' },
  viewMode = 'front', // 'front' | 'wrist'
  onViewModeChange,
  rotation = 0,
  onRotate,
  beadSize = '8mm',
  title = '',
  purposeTitle = '',
  threadName = '',
  totalBeadCount = 18,
  totalPrice = 0,
  compact = true
}) => {
  const [internalRotation, setInternalRotation] = useState(rotation);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [hoveredBead, setHoveredBead] = useState(null);
  const [lightingMode, setLightingMode] = useState('candlelight'); // 'candlelight' | 'daylight' | 'obsidian'
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  const startXRef = useRef(0);
  const startRotRef = useRef(0);
  const autoSpinRef = useRef(null);

  // Synchronize incoming rotation
  useEffect(() => {
    if (rotation !== undefined && !isDragging) {
      setInternalRotation(rotation);
    }
  }, [rotation, isDragging]);

  // Auto-spin animation loop
  useEffect(() => {
    if (isAutoSpinning) {
      autoSpinRef.current = setInterval(() => {
        setInternalRotation(prev => {
          const next = (prev + 0.6) % 360;
          if (onRotate) onRotate(next);
          return next;
        });
      }, 30);
    } else {
      if (autoSpinRef.current) clearInterval(autoSpinRef.current);
    }
    return () => {
      if (autoSpinRef.current) clearInterval(autoSpinRef.current);
    };
  }, [isAutoSpinning, onRotate]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    startXRef.current = e.clientX;
    startRotRef.current = internalRotation;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    const newRot = (startRotRef.current + delta * 0.8) % 360;
    setInternalRotation(newRot);
    if (onRotate) onRotate(newRot);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Expand active crystals into an ordered array of individual beads for the 3D ring
  const activeCrystals = useMemo(() => {
    return crystals.filter(c => c.active !== false);
  }, [crystals]);

  const totalBeadsList = useMemo(() => {
    const list = [];
    activeCrystals.forEach(crystal => {
      const count = crystal.count || 1;
      for (let i = 0; i < count; i++) {
        list.push({
          ...crystal,
          instanceKey: `${crystal.id}-${i}`
        });
      }
    });
    return list;
  }, [activeCrystals]);

  // Total bead count
  const beadCount = totalBeadsList.length || 18;

  // Compute 3D ring coordinates for each bead
  // We place beads on a tilted ellipse (perspective 3D foreshortening)
  const beadsWithPositions = useMemo(() => {
    const cx = 130;
    const cy = 130;
    const rx = 82; // horizontal radius
    const ry = 62; // vertical radius for 3D tilt

    const stepAngle = (2 * Math.PI) / beadCount;
    const rotRad = (internalRotation * Math.PI) / 180;

    return totalBeadsList.map((bead, index) => {
      const angle = index * stepAngle + rotRad;
      // Normal coordinates
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);

      // Z-depth: sin(angle) gives -1 (back) to +1 (front)
      // Front beads (sin > 0) are closer and lower, back beads (sin < 0) are further and higher
      const z = Math.sin(angle);
      // Perspective scale factor: 0.82 to 1.18
      const scale = 0.82 + ((z + 1) / 2) * 0.36;
      const opacity = 0.65 + ((z + 1) / 2) * 0.35;
      const r = (beadSize === '10mm' ? 10.5 : 9) * scale;

      return {
        ...bead,
        index,
        x,
        y,
        z,
        r,
        scale,
        opacity,
        angle
      };
    }).sort((a, b) => a.z - b.z); // Render back beads first (painter's algorithm)
  }, [totalBeadsList, beadCount, internalRotation, beadSize]);

  // Lighting aura gradients
  const lightingStyles = {
    candlelight: {
      ambientGlow: 'radial-gradient(ellipse at 50% 30%, rgba(245, 185, 75, 0.16) 0%, rgba(200, 120, 30, 0.05) 50%, transparent 75%)',
      vitrineShadow: '0 28px 70px rgba(0, 0, 0, 0.9), 0 0 45px rgba(217, 174, 79, 0.15)',
      spotlightColor: 'rgba(255, 214, 138, 0.22)'
    },
    daylight: {
      ambientGlow: 'radial-gradient(ellipse at 50% 20%, rgba(220, 240, 255, 0.14) 0%, rgba(180, 210, 240, 0.04) 50%, transparent 75%)',
      vitrineShadow: '0 28px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(180, 220, 255, 0.1)',
      spotlightColor: 'rgba(240, 248, 255, 0.22)'
    },
    obsidian: {
      ambientGlow: 'radial-gradient(ellipse at 50% 50%, rgba(130, 80, 220, 0.12) 0%, rgba(70, 30, 140, 0.04) 55%, transparent 75%)',
      vitrineShadow: '0 28px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(140, 90, 255, 0.12)',
      spotlightColor: 'rgba(180, 140, 255, 0.18)'
    }
  };

  const currentLighting = lightingStyles[lightingMode] || lightingStyles.candlelight;

  if (compact) {
    return (
      <div
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          position: 'relative'
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'relative'
          }}
        >
          {viewMode === 'wrist' ? (
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/assets/14studio3birth_img_6.jpg"
                alt="Strand on the wrist"
                style={{
                  maxWidth: '92%',
                  maxHeight: '195px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.95))'
                }}
              />
            </div>
          ) : (
            <div style={{ position: 'relative', width: '215px', height: '215px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Drop shadow */}
              <div style={{
                position: 'absolute',
                bottom: '26px',
                width: '150px',
                height: '28px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 80%)',
                filter: 'blur(5px)',
                pointerEvents: 'none'
              }} />

              {/* Astrolabe rings */}
              <div style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '1px dashed rgba(217, 174, 79, 0.18)',
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                width: '175px',
                height: '175px',
                borderRadius: '50%',
                border: '1px solid rgba(217, 174, 79, 0.08)',
                pointerEvents: 'none'
              }} />

              {/* SVG 3D Shaded Gemstone Strand */}
              <svg
                width="215"
                height="215"
                viewBox="0 0 260 260"
                style={{
                  filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.9))',
                  overflow: 'visible',
                  pointerEvents: 'auto'
                }}
              >
                <defs>
                  <path
                    id="strand-path-compact"
                    d="M 48,130 A 82,62 0 1,1 212,130 A 82,62 0 1,1 48,130"
                    fill="none"
                    stroke="#D9AE4F"
                    strokeWidth="1.2"
                    strokeDasharray="2 3"
                    opacity="0.3"
                  />

                  {activeCrystals.map((crystal) => {
                    const c = crystal.color || '#E8B4B8';
                    return (
                      <radialGradient
                        key={`bead-grad-comp-${crystal.id}`}
                        id={`bead-grad-comp-${crystal.id}`}
                        cx="32%"
                        cy="28%"
                        r="65%"
                      >
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                        <stop offset="18%" stopColor={c} stopOpacity="1" />
                        <stop offset="65%" stopColor={c} stopOpacity="0.95" />
                        <stop offset="92%" stopColor="#0B0912" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                      </radialGradient>
                    );
                  })}

                  <linearGradient id="gold-clasp-grad-comp" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2A3" />
                    <stop offset="35%" stopColor="#D9AE4F" />
                    <stop offset="70%" stopColor="#996E25" />
                    <stop offset="100%" stopColor="#573C0E" />
                  </linearGradient>

                  <radialGradient id="specular-gleam-comp" cx="30%" cy="25%" r="45%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <use href="#strand-path-compact" />

                {beadsWithPositions.map((b) => (
                  <g key={b.instanceKey}>
                    <circle
                      cx={b.x}
                      cy={b.y + b.r * 0.25}
                      r={b.r * 0.95}
                      fill="rgba(0, 0, 0, 0.45)"
                      filter="blur(2px)"
                    />
                    <circle
                      cx={b.x}
                      cy={b.y}
                      r={b.r}
                      fill={`url(#bead-grad-comp-${b.id})`}
                      stroke="rgba(217, 174, 79, 0.35)"
                      strokeWidth={0.6}
                      opacity={b.opacity}
                    />
                    <ellipse
                      cx={b.x - b.r * 0.28}
                      cy={b.y - b.r * 0.32}
                      rx={b.r * 0.35}
                      ry={b.r * 0.22}
                      transform={`rotate(-25 ${b.x - b.r * 0.28} ${b.y - b.r * 0.32})`}
                      fill="url(#specular-gleam-comp)"
                      opacity={b.opacity * 0.95}
                      pointerEvents="none"
                    />
                  </g>
                ))}

                {(() => {
                  const claspX = 130;
                  const claspY = 192;
                  const claspR = 10;
                  const hasCharm = charm && charm.id !== 'none';

                  return (
                    <g>
                      <circle cx={claspX} cy={claspY + 3} r={claspR} fill="rgba(0,0,0,0.6)" filter="blur(2px)" />
                      <circle
                        cx={claspX}
                        cy={claspY}
                        r={claspR}
                        fill="url(#gold-clasp-grad-comp)"
                        stroke="#FFF8DC"
                        strokeWidth="0.8"
                      />
                      <ellipse
                        cx={claspX - 3}
                        cy={claspY - 3}
                        rx="3.5"
                        ry="2"
                        transform={`rotate(-30 ${claspX - 3} ${claspY - 3})`}
                        fill="#FFFFFF"
                        opacity="0.8"
                      />

                      {hasCharm && (
                        <g transform={`translate(${claspX}, ${claspY + claspR + 4})`}>
                          <line x1="0" y1="-4" x2="0" y2="4" stroke="#D9AE4F" strokeWidth="1.5" />
                          <circle cx="0" cy="4" r="2.5" fill="none" stroke="#D9AE4F" strokeWidth="1" />
                          <circle cx="0" cy="18" r="14" fill="rgba(0, 0, 0, 0.4)" filter="blur(3px)" />
                          <circle
                            cx="0"
                            cy="16"
                            r="13"
                            fill="url(#gold-clasp-grad-comp)"
                            stroke="#FFF8DC"
                            strokeWidth="1"
                          />
                          <circle
                            cx="0"
                            cy="16"
                            r="11"
                            fill="none"
                            stroke="rgba(0, 0, 0, 0.25)"
                            strokeWidth="0.8"
                            strokeDasharray="1.5 1.5"
                          />
                          <text
                            x="0"
                            y="20.5"
                            textAnchor="middle"
                            fill="#3A2809"
                            fontSize="13"
                            fontWeight="bold"
                            fontFamily="serif"
                          >
                            {charm.glyph || 'ॐ'}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })()}
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'linear-gradient(170deg, rgba(20, 16, 28, 0.92) 0%, rgba(10, 8, 15, 0.98) 100%)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(217, 174, 79, 0.32)',
        borderRadius: '14px',
        padding: '16px 18px',
        position: 'relative',
        boxShadow: currentLighting.vitrineShadow,
        userSelect: 'none',
        overflow: 'hidden',
        transition: 'box-shadow 0.5s ease'
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Ambient Vitrine Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          left: '10%',
          right: '10%',
          height: '240px',
          background: currentLighting.ambientGlow,
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'background 0.5s ease'
        }}
      />

      {/* Haute Joaillerie Guilloché Corner Filigrees */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', width: '12px', height: '12px', borderTop: '1.5px solid #D9AE4F', borderLeft: '1.5px solid #D9AE4F', pointerEvents: 'none', zIndex: 3 }} />
      <div style={{ position: 'absolute', top: '10px', right: '10px', width: '12px', height: '12px', borderTop: '1.5px solid #D9AE4F', borderRight: '1.5px solid #D9AE4F', pointerEvents: 'none', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '12px', height: '12px', borderBottom: '1.5px solid #D9AE4F', borderLeft: '1.5px solid #D9AE4F', pointerEvents: 'none', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '12px', height: '12px', borderBottom: '1.5px solid #D9AE4F', borderRight: '1.5px solid #D9AE4F', pointerEvents: 'none', zIndex: 3 }} />

      {/* Top Controls Bar: Atelier Vitrine Status & Perspective Switches */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', position: 'relative', zIndex: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#D9AE4F',
            boxShadow: '0 0 10px #D9AE4F',
            display: 'inline-block'
          }} />
          <span style={{
            fontFamily: 'var(--font-brand)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#EDE8E1'
          }}>
            ATELIER VITRINE
          </span>
          <span style={{
            fontSize: '10px',
            color: '#D9AE4F',
            background: 'rgba(217, 174, 79, 0.12)',
            padding: '2px 6px',
            borderRadius: '3px',
            border: '1px solid rgba(217, 174, 79, 0.25)',
            letterSpacing: '0.1em'
          }}>
            360° LIVE
          </span>
        </div>

        {/* View Mode & Lighting Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Lighting Mode Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(10, 8, 14, 0.7)',
            border: '1px solid rgba(217, 174, 79, 0.2)',
            borderRadius: '4px',
            padding: '2px'
          }}>
            <button
              type="button"
              onClick={() => setLightingMode('candlelight')}
              title="Temple Candlelight"
              style={{
                background: lightingMode === 'candlelight' ? 'rgba(217, 174, 79, 0.25)' : 'transparent',
                border: 'none',
                color: lightingMode === 'candlelight' ? '#ECC26A' : '#75716B',
                padding: '4px 6px',
                borderRadius: '3px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Flame size={12} />
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('daylight')}
              title="Atelier Daylight"
              style={{
                background: lightingMode === 'daylight' ? 'rgba(217, 174, 79, 0.25)' : 'transparent',
                border: 'none',
                color: lightingMode === 'daylight' ? '#ECC26A' : '#75716B',
                padding: '4px 6px',
                borderRadius: '3px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Sun size={12} />
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('obsidian')}
              title="Midnight Obsidian"
              style={{
                background: lightingMode === 'obsidian' ? 'rgba(217, 174, 79, 0.25)' : 'transparent',
                border: 'none',
                color: lightingMode === 'obsidian' ? '#ECC26A' : '#75716B',
                padding: '4px 6px',
                borderRadius: '3px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Moon size={12} />
            </button>
          </div>

          {/* Vitrine vs Wrist Perspectives */}
          <div style={{
            display: 'flex',
            background: 'rgba(10, 8, 14, 0.7)',
            border: '1px solid rgba(217, 174, 79, 0.2)',
            borderRadius: '4px',
            padding: '2px'
          }}>
            <button
              type="button"
              onClick={() => onViewModeChange && onViewModeChange('front')}
              style={{
                background: viewMode === 'front' ? 'linear-gradient(135deg, #ECC26A 0%, #D9AE4F 100%)' : 'transparent',
                color: viewMode === 'front' ? '#0A0810' : '#AAA3AF',
                border: 'none',
                borderRadius: '3px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.06em'
              }}
            >
              Vitrine
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange && onViewModeChange('wrist')}
              style={{
                background: viewMode === 'wrist' ? 'linear-gradient(135deg, #ECC26A 0%, #D9AE4F 100%)' : 'transparent',
                color: viewMode === 'wrist' ? '#0A0810' : '#AAA3AF',
                border: 'none',
                borderRadius: '3px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.06em'
              }}
            >
              Wrist
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Interactive Showcase Pedestal */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          height: '225px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '10px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(22, 17, 30, 0.9) 0%, rgba(7, 5, 10, 0.98) 75%)',
          border: '1px solid rgba(217, 174, 79, 0.16)',
          boxShadow: 'inset 0 0 35px rgba(0, 0, 0, 0.8)'
        }}
      >
        {viewMode === 'wrist' ? (
          /* Realistic On-Wrist Specimen View */
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/assets/14studio3birth_img_6.jpg"
              alt="Strand on the wrist"
              style={{
                maxWidth: '92%',
                maxHeight: '195px',
                objectFit: 'contain',
                borderRadius: '8px',
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.95))'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '12px',
              fontSize: '9px',
              color: '#D9AE4F',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'rgba(10, 8, 15, 0.88)',
              padding: '4px 10px',
              borderRadius: '3px',
              border: '1px solid rgba(217, 174, 79, 0.25)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D9AE4F' }} />
              Wrist Scale · 6.5" Fit
            </div>
          </div>
        ) : (
          /* High-Fidelity 3D Interactive Gemstone Strand */
          <div style={{ position: 'relative', width: '215px', height: '215px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Cast Velvet Drop Shadow Beneath Strand */}
            <div style={{
              position: 'absolute',
              bottom: '26px',
              width: '150px',
              height: '28px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 80%)',
              filter: 'blur(5px)',
              pointerEvents: 'none'
            }} />

            {/* Sacred Compass Astrolabe Rings */}
            <div style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '1px dashed rgba(217, 174, 79, 0.18)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              width: '175px',
              height: '175px',
              borderRadius: '50%',
              border: '1px solid rgba(217, 174, 79, 0.08)',
              pointerEvents: 'none'
            }} />

            {/* SVG 3D Shaded Gemstone Strand */}
            <svg
              width="215"
              height="215"
              viewBox="0 0 260 260"
              style={{ overflow: 'visible', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.85))' }}
            >
              <defs>
                {/* Elastic Thread Guideline */}
                <ellipse
                  id="strand-path"
                  cx="130"
                  cy="130"
                  rx="82"
                  ry="62"
                  fill="none"
                  stroke="rgba(217, 174, 79, 0.28)"
                  strokeWidth="1.2"
                />

                {/* Dynamic Bead Gradients for each stone */}
                {activeCrystals.map(c => (
                  <radialGradient
                    key={c.id}
                    id={`bead-grad-${c.id}`}
                    cx="35%"
                    cy="30%"
                    r="68%"
                    fx="25%"
                    fy="20%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                    <stop offset="22%" stopColor={c.color} stopOpacity="0.95" />
                    <stop offset="70%" stopColor={c.color} stopOpacity="1" />
                    <stop offset="100%" stopColor="#0B0910" stopOpacity="0.95" />
                  </radialGradient>
                ))}

                {/* 18K Solid Gold Clasp Bead Gradient */}
                <radialGradient id="gold-clasp-grad" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFF8DC" />
                  <stop offset="25%" stopColor="#ECC26A" />
                  <stop offset="75%" stopColor="#B3862A" />
                  <stop offset="100%" stopColor="#4A340C" />
                </radialGradient>

                {/* Medallion Metallic Sheen */}
                <linearGradient id="medallion-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ECC26A" />
                  <stop offset="45%" stopColor="#FFF4D0" />
                  <stop offset="65%" stopColor="#D9AE4F" />
                  <stop offset="100%" stopColor="#8C661D" />
                </linearGradient>

                {/* Bead Specular Gleam Overlay */}
                <radialGradient id="specular-gleam" cx="30%" cy="25%" r="45%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Elastic Cord Underneath */}
              <use href="#strand-path" />

              {/* 3D Ordered Gemstone Beads */}
              {beadsWithPositions.map((b) => {
                const isHovered = hoveredBead?.instanceKey === b.instanceKey;
                return (
                  <g
                    key={b.instanceKey}
                    onMouseEnter={() => setHoveredBead(b)}
                    onMouseLeave={() => setHoveredBead(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Bead Contact Drop Shadow */}
                    <circle
                      cx={b.x}
                      cy={b.y + b.r * 0.25}
                      r={b.r * 0.95}
                      fill="rgba(0, 0, 0, 0.45)"
                      filter="blur(2px)"
                    />

                    {/* Main Shaded Gemstone Bead */}
                    <circle
                      cx={b.x}
                      cy={b.y}
                      r={b.r}
                      fill={`url(#bead-grad-${b.id})`}
                      stroke={isHovered ? '#FFFFFF' : 'rgba(217, 174, 79, 0.35)'}
                      strokeWidth={isHovered ? 1.5 : 0.6}
                      opacity={b.opacity}
                      style={{
                        transition: 'stroke 0.2s, stroke-width 0.2s'
                      }}
                    />

                    {/* Gloss Specular Reflection (Curved Oval Highlight) */}
                    <ellipse
                      cx={b.x - b.r * 0.28}
                      cy={b.y - b.r * 0.32}
                      rx={b.r * 0.35}
                      ry={b.r * 0.22}
                      transform={`rotate(-25 ${b.x - b.r * 0.28} ${b.y - b.r * 0.32})`}
                      fill="url(#specular-gleam)"
                      opacity={b.opacity * 0.95}
                      pointerEvents="none"
                    />

                    {/* Hover Illuminated Aureole */}
                    {isHovered && (
                      <circle
                        cx={b.x}
                        cy={b.y}
                        r={b.r + 4}
                        fill="none"
                        stroke="#D9AE4F"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                    )}
                  </g>
                );
              })}

              {/* Solid 18K Gold Clasp Bead & Hanging Medallion at Front (6 o'clock) */}
              {(() => {
                const claspX = 130;
                const claspY = 192;
                const claspR = 10;
                const hasCharm = charm && charm.id !== 'none';

                return (
                  <g style={{ cursor: 'pointer' }}>
                    {/* Clasp shadow */}
                    <circle cx={claspX} cy={claspY + 3} r={claspR} fill="rgba(0,0,0,0.6)" filter="blur(2px)" />

                    {/* 18K Gold Clasp Bead */}
                    <circle
                      cx={claspX}
                      cy={claspY}
                      r={claspR}
                      fill="url(#gold-clasp-grad)"
                      stroke="#FFF8DC"
                      strokeWidth="0.8"
                    />
                    {/* Clasp highlight */}
                    <ellipse
                      cx={claspX - 3}
                      cy={claspY - 3}
                      rx="3.5"
                      ry="2"
                      transform={`rotate(-30 ${claspX - 3} ${claspY - 3})`}
                      fill="#FFFFFF"
                      opacity="0.85"
                    />

                    {/* Hanging Charm Medallion */}
                    {hasCharm && (
                      <g
                        transform={`translate(${claspX}, ${claspY + 14}) rotate(${Math.sin((internalRotation * Math.PI) / 90) * 12})`}
                      >
                        {/* Connecting jump ring */}
                        <line x1="0" y1="-14" x2="0" y2="-4" stroke="#D9AE4F" strokeWidth="1.8" />
                        <circle cx="0" cy="-4" r="2.5" fill="none" stroke="#D9AE4F" strokeWidth="1" />

                        {/* Medallion disc shadow */}
                        <circle cx="0" cy="8" r="14" fill="rgba(0, 0, 0, 0.6)" filter="blur(3px)" />

                        {/* Medallion disc */}
                        <circle
                          cx="0"
                          cy="6"
                          r="13.5"
                          fill="url(#medallion-metal)"
                          stroke="#ECC26A"
                          strokeWidth="1.2"
                        />
                        {/* Inner beaded bezel ring */}
                        <circle
                          cx="0"
                          cy="6"
                          r="11"
                          fill="none"
                          stroke="#6B4F14"
                          strokeWidth="0.7"
                          strokeDasharray="1.5 1.5"
                        />

                        {/* Engraved Sanskrit Sacred Symbol */}
                        <text
                          x="0"
                          y="10.5"
                          textAnchor="middle"
                          fill="#3A2809"
                          fontSize="12"
                          fontWeight="bold"
                          fontFamily="serif"
                        >
                          {charm.glyph || 'ॐ'}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}
            </svg>

            {/* Glowing Golden Core Temple Spark */}
            <div style={{
              position: 'absolute',
              width: '75px',
              height: '75px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(217, 174, 79, 0.16) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
          </div>
        )}

        {/* Orbit & Rotate Quick Buttons */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 5
        }}>
          {/* Auto-Spin Orbit Toggle */}
          <button
            type="button"
            onClick={() => setIsAutoSpinning(prev => !prev)}
            title={isAutoSpinning ? "Pause Orbit" : "Auto-Spin 360°"}
            style={{
              background: isAutoSpinning ? 'linear-gradient(135deg, #ECC26A 0%, #D9AE4F 100%)' : 'rgba(10, 8, 15, 0.8)',
              border: '1px solid rgba(217, 174, 79, 0.3)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              color: isAutoSpinning ? '#0A0810' : '#D9AE4F',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              boxShadow: isAutoSpinning ? '0 0 10px #D9AE4F' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Compass size={13} className={isAutoSpinning ? "spin-pulse" : ""} />
          </button>

          {/* Step 45° Rotate */}
          <button
            type="button"
            onClick={() => {
              const nextRot = (internalRotation + 45) % 360;
              setInternalRotation(nextRot);
              if (onRotate) onRotate(nextRot);
            }}
            title="Step 45°"
            style={{
              background: 'rgba(10, 8, 15, 0.8)',
              border: '1px solid rgba(217, 174, 79, 0.3)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              color: '#D9AE4F',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(45deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          >
            <RotateCw size={13} />
          </button>
        </div>

        {/* Drag Guidance Toast at Bottom */}
        <div style={{
          position: 'absolute',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '8.5px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#AAA3AF',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: 'rgba(10, 8, 15, 0.75)',
          padding: '3px 10px',
          borderRadius: '20px',
          border: '1px solid rgba(217, 174, 79, 0.18)',
          pointerEvents: 'none',
          backdropFilter: 'blur(6px)',
          whiteSpace: 'nowrap'
        }}>
          <RotateCw size={9} color="#D9AE4F" />
          <span>DRAG TO ROTATE 360°</span>
        </div>
      </div>

      {/* Interactive Gemological Specimen Plaque (When hovering or clicking bead) */}
      {hoveredBead ? (
        <div style={{
          marginTop: '9px',
          background: 'linear-gradient(140deg, rgba(30, 22, 42, 0.95) 0%, rgba(14, 11, 20, 0.98) 100%)',
          border: '1px solid #D9AE4F',
          borderRadius: '7px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.2s ease',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: hoveredBead.color,
              boxShadow: `0 0 8px ${hoveredBead.color}`,
              border: '1px solid #FFFFFF'
            }} />
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#EDE8E1', letterSpacing: '0.04em' }}>
                {hoveredBead.name}
              </div>
              <div style={{ fontSize: '9.5px', color: '#D9AE4F', letterSpacing: '0.06em' }}>
                {hoveredBead.grade || 'Grade AAA Natural'}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10.5px', color: '#AAA3AF' }}>
              Hardness: <strong style={{ color: '#EDE8E1' }}>{hoveredBead.hardness || '7.0 Mohs'}</strong>
            </div>
            <div style={{ fontSize: '9.5px', color: '#27AE60' }}>
              Natural Certified
            </div>
          </div>
        </div>
      ) : (
        /* Gemstone Specimen Chips Strip */
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          marginTop: '9px',
          paddingTop: '7px',
          borderTop: '1px solid rgba(217, 174, 79, 0.16)'
        }}>
          {activeCrystals.map(c => (
            <div
              key={c.id}
              onMouseEnter={() => setHoveredBead(c)}
              onMouseLeave={() => setHoveredBead(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(217, 174, 79, 0.2)',
                borderRadius: '16px',
                padding: '4px 9px',
                fontSize: '10.5px',
                color: '#EDE8E1',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnterCapture={(e) => e.currentTarget.style.borderColor = '#D9AE4F'}
              onMouseLeaveCapture={(e) => e.currentTarget.style.borderColor = 'rgba(217, 174, 79, 0.2)'}
            >
              <span style={{
                width: '7.5px',
                height: '7.5px',
                borderRadius: '50%',
                background: c.color,
                boxShadow: `0 0 5px ${c.color}`
              }} />
              <span>{c.name}</span>
              <span style={{ color: '#D9AE4F', fontSize: '10px', fontWeight: 600 }}>×{c.count}</span>
            </div>
          ))}

          {charm && charm.id !== 'none' && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(217, 174, 79, 0.12)',
              border: '1px solid rgba(217, 174, 79, 0.35)',
              borderRadius: '16px',
              padding: '4px 9px',
              fontSize: '10.5px',
              color: '#ECC26A'
            }}>
              <span>{charm.glyph}</span>
              <span>{charm.name} Charm</span>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          INTEGRATED LIVE STRAND & PRICE SUMMARY (MATCHING REFERENCE)
         ======================================================== */}
      <div style={{
        marginTop: '8px',
        paddingTop: '8px',
        borderTop: '1px solid rgba(217, 174, 79, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2px'
        }}>
          <span style={{
            fontSize: '8.5px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#AAA3AF',
            fontWeight: 700
          }}>
            LIVE STRAND
          </span>
          <span style={{ fontSize: '10px', color: '#D9AE4F', fontWeight: 600 }}>
            {totalBeadCount} beads
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-brand)',
          fontSize: '14.5px',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '0.03em',
          lineHeight: 1.2
        }}>
          {title || 'Bespoke Talisman'}
        </div>

        {(purposeTitle || threadName) && (
          <div style={{
            fontSize: '11px',
            color: '#AAA3AF',
            marginTop: '2px',
            lineHeight: 1.2
          }}>
            {purposeTitle ? `${purposeTitle}` : ''}
            {purposeTitle && threadName ? ' · ' : ''}
            {threadName ? `${threadName}` : ''}
          </div>
        )}

        {/* Collapsible Price Breakdown */}
        <div style={{
          marginTop: '6px',
          paddingTop: '5px',
          borderTop: '1px solid rgba(217, 174, 79, 0.12)'
        }}>
          <button
            type="button"
            onClick={() => setShowPriceBreakdown(prev => !prev)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '9.5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#D9AE4F',
              fontWeight: 600
            }}
          >
            <span>PRICE BREAKDOWN</span>
            <span style={{ fontSize: '11px' }}>{showPriceBreakdown ? '−' : '+'}</span>
          </button>

          {showPriceBreakdown && (
            <div style={{
              marginTop: '5px',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              fontSize: '10px',
              color: '#AAA3AF'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Gemstone Beads ({totalBeadCount} beads):</span>
                <span style={{ color: '#EDE8E1' }}>
                  ₹{crystals.filter(c => c.active !== false).reduce((s, c) => s + ((c.count || 0) * (c.pricePerBead || 0)), 0).toFixed(2)}
                </span>
              </div>
              {charm && charm.id !== 'none' && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Charm Seal ({charm.name}):</span>
                  <span style={{ color: '#EDE8E1' }}>₹{(charm.price || 0).toFixed(2)}</span>
                </div>
              )}
              {threadName && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Core Threading:</span>
                  <span style={{ color: '#EDE8E1' }}>Included</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Total Row */}
        <div style={{
          marginTop: '7px',
          paddingTop: '6px',
          borderTop: '1px solid rgba(217, 174, 79, 0.2)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '9.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#AAA3AF' }}>
              Live total
            </span>
          </div>

          <div style={{
            fontFamily: 'var(--font-brand)',
            fontSize: '19px',
            fontWeight: 700,
            color: '#D9AE4F',
            letterSpacing: '0.02em'
          }}>
            ₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};
