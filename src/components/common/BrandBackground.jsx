import React from 'react';

/**
 * BrandBackground — Technical Cybernetic "DA" (Disan Alam) Brand Architecture
 * Daylight Studio Alabaster Mint & Cyber Emerald (#F4F8F7, #0E7C66, #10B981, #14181B)
 * Pure Vector SVG for 4K / Retina infinite fidelity, zero raster artifacts, and zero network load.
 */
const BrandBackground = () => {
  return (
    <div className="site-brand-background" aria-hidden="true">
      <svg 
        viewBox="0 0 1440 900" 
        preserveAspectRatio="xMidYMid slice" 
        className="brand-bg-svg"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Technical Dot Matrix */}
          <pattern id="brandDotGrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1" fill="rgba(20, 143, 119, 0.12)" />
          </pattern>

          {/* Daylight Studio Radial Glow Orbs */}
          <radialGradient id="centerMintGlow" cx="50%" cy="50%" r="45%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#0E7C66" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#F4F8F7" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="topRightGlow" cx="85%" cy="15%" r="35%">
            <stop offset="0%" stopColor="#0E7C66" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#F4F8F7" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="bottomLeftGlow" cx="15%" cy="85%" r="35%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F4F8F7" stopOpacity="0" />
          </radialGradient>

          {/* Gradients for DA Crest and Circuit Paths */}
          <linearGradient id="daGradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E7C66" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#0E7C66" stopOpacity="0.22" />
          </linearGradient>

          <linearGradient id="daInnerFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#0E7C66" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#F4F8F7" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E7C66" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        {/* 1. Ambient Glow Layers */}
        <rect width="1440" height="900" fill="url(#centerMintGlow)" />
        <rect width="1440" height="900" fill="url(#topRightGlow)" />
        <rect width="1440" height="900" fill="url(#bottomLeftGlow)" />

        {/* 2. Technical Dot Matrix Grid */}
        <rect width="1440" height="900" fill="url(#brandDotGrid)" />

        {/* 3. Technical Coordinate Crosshairs & Framing */}
        <g stroke="rgba(20, 143, 119, 0.20)" strokeWidth="1">
          {/* Corner Reticles */}
          <path d="M 40 60 H 60 M 40 60 V 40" />
          <path d="M 1400 60 H 1380 M 1400 60 V 40" />
          <path d="M 40 840 H 60 M 40 840 V 860" />
          <path d="M 1400 840 H 1380 M 1400 840 V 860" />
          {/* Center Axis Reticles */}
          <line x1="720" y1="30" x2="720" y2="60" strokeDasharray="2 4" />
          <line x1="720" y1="840" x2="720" y2="870" strokeDasharray="2 4" />
          <line x1="30" y1="450" x2="60" y2="450" strokeDasharray="2 4" />
          <line x1="1380" y1="450" x2="1410" y2="450" strokeDasharray="2 4" />
        </g>

        {/* 4. Cyber Circuit Traces across background (Connecting to Center Crest) */}
        <g stroke="url(#circuitGrad)" strokeWidth="1.2" fill="none">
          {/* Top Left Incoming Line towards Page Section Title */}
          <path d="M -20 148 H 110" />
          {/* Sub-branch dropping down and routing safely around title text */}
          <path d="M 65 148 V 230 L 115 280 H 260 L 315 335 H 480 L 530 380 H 600" />
          <path d="M -20 280 H 160 L 210 330 H 380" strokeDasharray="4 4" className="circuit-stream" />
          {/* Bottom Left Bus */}
          <path d="M -20 720 H 300 L 360 660 H 520 L 570 610 H 620" />
          <path d="M 120 920 V 820 L 180 760 H 380 L 440 700" strokeDasharray="5 5" className="circuit-stream" />
          {/* Top Right Bus */}
          <path d="M 840 250 H 910 L 960 200 H 1330 L 1380 140 H 1460" />
          <path d="M 1020 340 H 1200 L 1260 280 H 1460" strokeDasharray="4 4" className="circuit-stream" />
          {/* Bottom Right Bus */}
          <path d="M 820 610 H 870 L 920 660 H 1080 L 1140 720 H 1460" />
          <path d="M 1000 700 L 1060 760 H 1260 L 1320 820 V 920" strokeDasharray="5 5" className="circuit-stream" />
        </g>

        {/* Dynamic Electric Data Pulses Traveling along Circuit Traces */}
        <g fill="none">
          <path d="M -20 148 H 110" className="circuit-pulse-line pulse-left-top" />
          <path d="M 65 148 V 230 L 115 280 H 260 L 315 335 H 480 L 530 380 H 600" className="circuit-pulse-line pulse-left-mid" />
          <path d="M -20 720 H 300 L 360 660 H 520 L 570 610 H 620" className="circuit-pulse-line pulse-left-bot" />
          <path d="M 1460 140 H 1380 L 1330 200 H 960 L 910 250 H 840" className="circuit-pulse-line pulse-right-top" />
          <path d="M 1460 720 H 1140 L 1080 660 H 920 L 870 610 H 820" className="circuit-pulse-line pulse-right-bot" />
        </g>

        {/* Glowing Cyber Nodes (Teal Dots with Pure Hardware-Accelerated CSS Glow) */}
        <g>
          {/* Terminal glowing node at the end of incoming line right before Section Title */}
          <circle cx="110" cy="148" r="4" fill="#10B981" className="cyber-node node-pulse-1" />
          <circle cx="110" cy="148" r="4" fill="none" stroke="#10B981" className="cyber-node-ripple" />
          <circle cx="65" cy="148" r="2.5" fill="#0E7C66" className="cyber-node node-pulse-2" />
          <circle cx="260" cy="280" r="3.5" fill="#10B981" className="cyber-node node-pulse-3" />
          <circle cx="480" cy="335" r="3.5" fill="#10B981" className="cyber-node node-pulse-4" />
          <circle cx="210" cy="330" r="3" fill="#0E7C66" className="cyber-node node-pulse-2" />
          <circle cx="360" cy="660" r="3.5" fill="#10B981" className="cyber-node node-pulse-5" />
          <circle cx="570" cy="610" r="4" fill="#10B981" className="cyber-node node-pulse-1" />
          <circle cx="960" cy="200" r="3.5" fill="#10B981" className="cyber-node node-pulse-3" />
          <circle cx="910" cy="250" r="4" fill="#10B981" className="cyber-node node-pulse-4" />
          <circle cx="870" cy="610" r="4" fill="#10B981" className="cyber-node node-pulse-2" />
          <circle cx="1140" cy="720" r="3.5" fill="#10B981" className="cyber-node node-pulse-5" />
        </g>

        {/* 5. ICONIC 'DA' ARCHITECTURAL BRAND CREST (CENTERPIECE) - Hexagon Visible with Sleek Hologram Wireframe */}
        <g transform="translate(720, 440)">
          {/* Outer Hexagonal Cyber Shield Halo - Clearly Visible as Hologram Frame */}
          <polygon 
            points="0,-230 200,-115 200,115 0,230 -200,115 -200,-115" 
            fill="url(#daInnerFill)" 
            stroke="rgba(20, 143, 119, 0.28)" 
            strokeWidth="1.6" 
            strokeDasharray="10 5" 
          />

          {/* Concentric Technical Precision Rings */}
          <circle cx="0" cy="0" r="205" stroke="rgba(20, 143, 119, 0.14)" strokeWidth="1" />
          <circle cx="0" cy="0" r="165" stroke="rgba(16, 185, 129, 0.18)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="130" stroke="rgba(20, 143, 119, 0.12)" strokeWidth="1" />

          {/* Compass Ticks on Ring */}
          <line x1="0" y1="-170" x2="0" y2="-160" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="0" y1="170" x2="0" y2="160" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="-170" y1="0" x2="-160" y2="0" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="170" y1="0" x2="160" y2="0" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />

          {/* ==============================================
               REFINED SLEEK 'DA' HOLOGRAPHIC WIREFRAME
               (Reduced Boldness: Fine 2px Blueprint Lines)
               ============================================== */}
          
          {/* Letter 'D': Stencil Architectural Hexagonal Spine */}
          <path 
            d="M -125,-95 H -35 L 35,-25 V 25 L -35,95 H -125 Z" 
            fill="rgba(16, 185, 129, 0.02)" 
            stroke="url(#daGradStroke)" 
            strokeWidth="2" 
            strokeLinejoin="round" 
          />

          {/* D Inner Counter Cutout */}
          <path 
            d="M -85,-55 H -30 L 10,-15 V 15 L -30,55 H -85 Z" 
            fill="none" 
            stroke="rgba(20, 143, 119, 0.20)" 
            strokeWidth="1.2" 
            strokeLinejoin="round" 
          />

          {/* Letter 'A': Dynamic Forward Chevron Intersecting D */}
          <path 
            d="M 10,95 L 80,-95 L 150,95" 
            fill="none" 
            stroke="url(#daGradStroke)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Interlocking Cyber Crossbar connecting D and A through the core */}
          <line x1="-30" y1="0" x2="125" y2="0" stroke="rgba(16, 185, 129, 0.45)" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Center Micro Cyber Padlock / Core Node inside A */}
          <g transform="translate(80, 0)">
            <circle cx="0" cy="0" r="3.5" fill="#10B981" className="cyber-node node-pulse-1" />
            <circle cx="0" cy="0" r="6" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
          </g>
          <circle cx="-30" cy="0" r="2.5" fill="#0E7C66" className="cyber-node node-pulse-3" />
          <circle cx="125" cy="0" r="2.5" fill="#0E7C66" className="cyber-node node-pulse-2" />
          <circle cx="80" cy="-95" r="3.5" fill="#10B981" className="cyber-node node-pulse-4" />

          {/* Brand Typography & Technical Telemetry Labels - Subtle Ambient Backdrop */}
          <text x="0" y="148" textAnchor="middle" fill="#0E7C66" fontSize="13.5" fontFamily="sans-serif" fontWeight="800" letterSpacing="0.30em" opacity="0.32">DISAN ALAM</text>
          <text x="0" y="167" textAnchor="middle" fill="#0E7C66" fontSize="9.5" fontFamily="monospace" fontWeight="600" letterSpacing="0.20em" opacity="0.25">CYBERSECURITY // ARCHITECTURE</text>
          
          <text x="-195" y="-195" fill="#0E7C66" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.14em" opacity="0.28">SYS.ID // DA-CORE-v2.6</text>
          <text x="80" y="210" fill="#0E7C66" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.14em" opacity="0.28">AUTH: 0xDA_SEC_TOKEN</text>
        </g>
      </svg>
    </div>
  );
};

export default React.memo(BrandBackground);
