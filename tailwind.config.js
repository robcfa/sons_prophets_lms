/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      spacing: {
        gold: '1.618rem'
      },
      colors: {
        // Fix: Use proper color value references instead of CSS variables in Tailwind config
        'brand-primary': '#FFC600',
        
        // Updated Primary Colors - Charcoal Gray and Yellow Theme
        'primary': {
          DEFAULT: '#FFC600',
          50: '#FFFBF0',
          100: '#FFF3D1',
          200: '#FFE5A3',
          300: '#FFD775',
          400: '#FFD54F',
          500: '#FFC600',
          600: '#E6B200',
          700: '#CC9E00',
          800: '#B38A00',
          900: '#996600',
          foreground: '#1E1E1E'
        },

        // Secondary Colors - Charcoal Gray
        'secondary': {
          DEFAULT: '#1E1E1E',
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#666666',
          600: '#4A4A4A',
          700: '#2A2A2A',
          800: '#1E1E1E',
          900: '#0F0F0F',
          foreground: '#E0E0E0'
        },

        // Fix spacing system to use proper calc() syntax
        spacing: {
          'golden': 'calc(8px * 1.618)',
          'golden2': 'calc(8px * 1.618 * 1.618)',
          'golden3': 'calc(8px * 1.618 * 1.618 * 1.618)',
          'base': '8px',
          'small': 'calc(8px * 0.618)',
          'tiny': 'calc(8px * 0.382)',
        },

        // Accent Colors - Supporting Yellow Tones
        'accent': '#FFEB99', // Light yellow accent
        'accent-50': '#FFFEF7', // Very light cream
        'accent-100': '#FFF9E6', // Light cream
        'accent-200': '#FFF3CC', // Medium cream
        'accent-300': '#FFEB99', // Light yellow accent
        'accent-400': '#FFE066', // Medium yellow
        'accent-500': '#FFD54F', // Bright yellow
        'accent-600': '#FFC600', // Main yellow
        'accent-700': '#E6B200', // Darker yellow
        'accent-800': '#CC9E00', // Dark yellow
        'accent-900': '#996600', // Deepest yellow
        'accent-foreground': '#1E1E1E', // Charcoal text

        // Background Colors
        'background': '#F5F5F5', // Light mode background
        'surface': '#FFFFFF', // Light mode surface
        'card': '#FFFFFF', // Light mode card
        'popover': '#FFFFFF', // Light mode popover
        'border': '#DDDDDD', // Light mode border
        'input': '#FFFFFF', // Light mode input

        // Text Colors
        'text-primary': '#1E1E1E', // Main text
        'text-secondary': '#4A4A4A', // Secondary text
        'text-muted': '#B3B3B3', // Muted text
        'foreground': '#1E1E1E', // Main foreground

        // State Colors
        'success': '#10B981', // Green success
        'success-50': '#ECFDF5',
        'success-100': '#D1FAE5',
        'success-200': '#A7F3D0',
        'success-300': '#6EE7B7',
        'success-400': '#34D399',
        'success-500': '#10B981',
        'success-600': '#059669',
        'success-700': '#047857',
        'success-800': '#065F46',
        'success-900': '#064E3B',
        'success-foreground': '#FFFFFF',

        'warning': '#F59E0B', // Orange warning
        'warning-50': '#FFFBEB',
        'warning-100': '#FEF3C7',
        'warning-200': '#FDE68A',
        'warning-300': '#FCD34D',
        'warning-400': '#FBBF24',
        'warning-500': '#F59E0B',
        'warning-600': '#D97706',
        'warning-700': '#B45309',
        'warning-800': '#92400E',
        'warning-900': '#78350F',
        'warning-foreground': '#FFFFFF',

        'error': '#EF4444', // Red error
        'error-50': '#FEF2F2',
        'error-100': '#FEE2E2',
        'error-200': '#FECACA',
        'error-300': '#FCA5A5',
        'error-400': '#F87171',
        'error-500': '#EF4444',
        'error-600': '#DC2626',
        'error-700': '#B91C1C',
        'error-800': '#991B1B',
        'error-900': '#7F1D1D',
        'error-foreground': '#FFFFFF',

        // Destructive (alias for error)
        'destructive': '#EF4444',
        'destructive-foreground': '#FFFFFF',

        // Muted Colors
        'muted': '#F5F5F5',
        'muted-foreground': '#6B7280',

        // Ring Colors
        'ring': '#FFC600',
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Roboto', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      gap: {
        'golden': 'calc(1rem * 1.618)',
        'base': '8px',
        'small': 'calc(8px * 0.618)',
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.2' }],
        'h2': ['2rem', { lineHeight: '1.2' }],
        'h3': ['1.5rem', { lineHeight: '1.2' }],
        'body': ['1rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'soft-sm': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'soft-md': '0 4px 8px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'soft-xl': '0 12px 24px rgba(0, 0, 0, 0.15)',
        'dark-sm': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 8px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 8px 16px rgba(0, 0, 0, 0.4)',
        'dark-xl': '0 12px 24px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.2s ease-out',
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '200': '200ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        'sons-prophets-light': {
          'base-100': '#FCFBFA',
          primary: '#5D1451',
          secondary: '#F59E0B',
          accent: '#F59E0B',
          neutral: '#FFFBF2',
          'border': '#5D1451',
          'input': '#F9FAFB',
          '--rounded-box': '0.5rem',
        },
      },
      {
        'sons-prophets-dark': {
          'base-100': '#111827',
          primary: '#C4A484',
          secondary: '#F5CB5C',
          accent: '#F5CB5C',
          neutral: '#1F2937',
          'border': '#374151',
          'input': '#374151',
          '--rounded-box': '0.5rem',
        },
      },
    ],
  },
}