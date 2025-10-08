/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Colors
        primary: {
          DEFAULT: 'var(--color-primary)', // midnight-blue-950
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // midnight-blue-900
          foreground: 'var(--color-secondary-foreground)' // white
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // indigo-500
          foreground: 'var(--color-accent-foreground)' // white
        },
        
        // Background Colors
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // gray-800
        surface: 'var(--color-surface)', // white
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // gray-800
        },
        
        // Interactive Colors
        border: 'var(--color-border)', // black-10
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // indigo-500
        
        // Content Colors
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-50
          foreground: 'var(--color-muted-foreground)' // gray-500
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // gray-800
        },
        
        // Status Colors
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        
        // Text Colors
        'text-primary': 'var(--color-text-primary)', // gray-800
        'text-secondary': 'var(--color-text-secondary)', // gray-500
        
        // Glassmorphism
        'glass-backdrop': 'var(--glass-backdrop)', // white-10
        'glass-border': 'var(--glass-border)' // white-20
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace']
      },
      fontWeight: {
        'heading-semibold': '600',
        'heading-bold': '700',
        'heading-extrabold': '800',
        'body-normal': '400',
        'body-medium': '500',
        'data-medium': '500'
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px'
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px'
      },
      animation: {
        'ai-pulse': 'ai-pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'spring': 'spring 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'micro-feedback': 'micro-feedback 150ms cubic-bezier(0.4, 0, 0.2, 1)'
      },
      keyframes: {
        'ai-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'spring': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' }
        },
        'micro-feedback': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem'
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '999': '999',
        '1000': '1000'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}