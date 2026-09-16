import React from 'react';

// Icon only version (for sidebar when collapsed, favicon, small spaces)
export const NenPayIcon = ({ size = 40, animated = false }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 60 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="nenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066ff" />
        <stop offset="100%" stopColor="#00d4ff" />
      </linearGradient>
      <linearGradient id="nenGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0052cc" />
        <stop offset="100%" stopColor="#0099cc" />
      </linearGradient>
    </defs>
    
    {/* Rounded square background */}
    <rect 
      x="2" 
      y="2" 
      width="56" 
      height="56" 
      rx="16" 
      fill="url(#nenGradient)"
    />
    
    {/* Stylized "N" formed by an arrow/path */}
    <path 
      d="M18 44 L18 20 L42 40 L42 16" 
      stroke="white" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Upward arrow tip indicating growth/finance */}
    <path 
      d="M36 16 L42 16 L42 22" 
      stroke="white" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Accent dot */}
    {animated && (
      <circle cx="46" cy="46" r="3" fill="white" opacity="0.9">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    )}
  </svg>
);

// Full logo with wordmark (icon + "NenPay" text)
export const NenPayLogo = ({ size = 40, textColor = '#ffffff', showTagline = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <NenPayIcon size={size} animated={true} />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{
        color: textColor,
        fontSize: size * 0.6,
        fontWeight: '800',
        letterSpacing: '-0.5px',
        lineHeight: '1',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <span style={{ color: '#0066ff' }}>Nen</span>Pay
      </span>
      {showTagline && (
        <span style={{
          color: textColor,
          fontSize: size * 0.22,
          opacity: 0.6,
          marginTop: '4px',
          fontWeight: '500',
          letterSpacing: '0.5px',
        }}>
          BANKING MADE SIMPLE
        </span>
      )}
    </div>
  </div>
);

// Compact icon (for collapsed sidebar)
export const NenPayCompact = ({ size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 60 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="nenCompact" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066ff" />
        <stop offset="100%" stopColor="#00d4ff" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="56" height="56" rx="16" fill="url(#nenCompact)" />
    <path 
      d="M18 44 L18 20 L42 40 L42 16" 
      stroke="white" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M36 16 L42 16 L42 22" 
      stroke="white" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Favicon version (very small)
export const NenPayFavicon = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 60 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="nenFav" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066ff" />
        <stop offset="100%" stopColor="#00d4ff" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="56" height="56" rx="16" fill="url(#nenFav)" />
    <path 
      d="M18 44 L18 20 L42 40 L42 16" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M36 16 L42 16 L42 22" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default NenPayLogo;