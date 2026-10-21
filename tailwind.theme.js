/** @type {import('tailwindcss').Config} */
// Alabaster Mint & Cyber Emerald Design Tokens for Tailwind CSS
// Master theme: Warm Alabaster canvas (#F4F8F7), Cyber Emerald accent (#0E7C66), Obsidian Charcoal (#14181B)
export const alabasterMintTheme = {
  extend: {
    colors: {
      alabaster: {
        base: '#F4F8F7',
        glowLight: '#FFFFFF',
        glowIce: '#E8F3F1',
        surface: 'rgba(255, 255, 255, 0.68)',
        inner: 'rgba(255, 255, 255, 0.88)',
        border: 'rgba(20, 143, 119, 0.16)',
        borderSubtle: 'rgba(20, 143, 119, 0.12)',
        shine: 'rgba(255, 255, 255, 0.95)',
      },
      cyberEmerald: {
        DEFAULT: '#0E7C66',
        hover: '#0A5C4C',
        muted: 'rgba(20, 143, 119, 0.18)',
        glow: 'rgba(14, 124, 102, 0.20)',
      },
      obsidian: {
        charcoal: '#14181B', // Primary headings
        border: '#14181B',
      },
      slateGraphite: {
        DEFAULT: '#4A5568', // Tagline & body text
        muted: '#718096',
      },
      mintPulse: {
        DEFAULT: '#10B981', // Status dot & active node glow
        glow: 'rgba(16, 185, 129, 0.25)',
      }
    },
    borderRadius: {
      'sm': '4px',
      'md': '6px',
      'lg': '8px',
      'card': '10px',
    },
    backdropBlur: {
      'glass': '20px',
    },
    boxShadow: {
      'glass': '0 20px 40px -15px rgba(14, 124, 102, 0.10), 0 4px 12px rgba(0, 0, 0, 0.03)',
      'glass-hover': '0 8px 20px rgba(16, 185, 129, 0.15)',
      'dot-glow': '0 0 8px #10B981',
    },
    transitionDuration: {
      'fast': '150ms',
    }
  }
};

export default alabasterMintTheme;
