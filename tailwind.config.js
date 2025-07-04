/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Updated Primary Colors - Charcoal Gray and Yellow Theme
        'primary': '#FFC600', // Yellow accent
        'primary-50': '#FFFBF0', // Very light yellow
        'primary-100': '#FFF3D1', // Light yellow
        'primary-200': '#FFE5A3', // Medium light yellow
        'primary-300': '#FFD775', // Medium yellow
        'primary-400': '#FFD54F', // Bright yellow
        'primary-500': '#FFC600', // Main yellow accent
        'primary-600': '#E6B200', // Darker yellow
        'primary-700': '#CC9E00', // Dark yellow
        'primary-800': '#B38A00', // Very dark yellow
        'primary-900': '#996600', // Deepest yellow
        'primary-foreground': '#1E1E1E', // Charcoal text

        // Secondary Colors - Charcoal Gray
        'secondary': '#1E1E1E', // Main charcoal
        'secondary-50': '#F5F5F5', // Light background
        'secondary-100': '#E0E0E0', // Light gray
        'secondary-200': '#CCCCCC', // Medium light gray
        'secondary-300': '#B3B3B3', // Medium gray
        'secondary-400': '#999999', // Darker gray
        'secondary-500': '#666666', // Dark gray
        'secondary-600': '#4A4A4A', // Very dark gray
        'secondary-700': '#2A2A2A', // Dark surface
        'secondary-800': '#1E1E1E', // Main charcoal
        'secondary-900': '#0F0F0F', // Deepest charcoal
        'secondary-foreground': '#E0E0E0', // Light text

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
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.2' }],
        'h2': ['2rem', { lineHeight: '1.2' }],
        'h3': ['1.5rem', { lineHeight: '1.2' }],
        'body': ['1rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'base': '8px',
        'golden': 'calc(8px * 1.618)',
        'golden2': 'calc(8px * 1.618 * 1.618)',
        'golden3': 'calc(8px * 1.618 * 1.618 * 1.618)',
        'small': 'calc(8px * 0.618)',
        'tiny': 'calc(8px * 0.382)',
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
        "sons-prophets-light": {
          "primary": "#FFC600", // Yellow accent
          "primary-focus": "#E6B200", // Darker yellow
          "primary-content": "#1E1E1E", // Charcoal text
          "secondary": "#1E1E1E", // Charcoal
          "secondary-focus": "#0F0F0F", // Darker charcoal
          "secondary-content": "#E0E0E0", // Light text
          "accent": "#FFEB99", // Light yellow
          "accent-focus": "#FFD54F", // Medium yellow
          "accent-content": "#1E1E1E", // Charcoal text
          "neutral": "#F5F5F5", // Light neutral
          "neutral-focus": "#E0E0E0", // Medium neutral
          "neutral-content": "#1E1E1E", // Charcoal text
          "base-100": "#F5F5F5", // Main background
          "base-200": "#FFFFFF", // Card background
          "base-300": "#E0E0E0", // Input background
          "base-content": "#1E1E1E", // Main text
          "info": "#3B82F6", // Blue info
          "info-content": "#FFFFFF", // White text
          "success": "#10B981", // Green success
          "success-content": "#FFFFFF", // White text
          "warning": "#F59E0B", // Orange warning
          "warning-content": "#FFFFFF", // White text
          "error": "#EF4444", // Red error
          "error-content": "#FFFFFF", // White text
          "--rounded-box": "12px",
          "--rounded-btn": "8px",
          "--rounded-badge": "4px",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-text-case": "normal",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "8px",
        },
      },
      {
        "sons-prophets-dark": {
          "primary": "#FFD54F", // Brighter yellow for dark mode
          "primary-focus": "#FFC600", // Yellow accent
          "primary-content": "#1E1E1E", // Charcoal text
          "secondary": "#2A2A2A", // Dark surface
          "secondary-focus": "#1E1E1E", // Darker surface
          "secondary-content": "#E0E0E0", // Light text
          "accent": "#3A3A3A", // Dark accent
          "accent-focus": "#4A4A4A", // Lighter dark accent
          "accent-content": "#E0E0E0", // Light text
          "neutral": "#1E1E1E", // Dark neutral
          "neutral-focus": "#0F0F0F", // Darker neutral
          "neutral-content": "#E0E0E0", // Light text
          "base-100": "#1E1E1E", // Main dark background
          "base-200": "#2A2A2A", // Card dark background
          "base-300": "#3A3A3A", // Input dark background
          "base-content": "#E0E0E0", // Light text
          "info": "#60A5FA", // Lighter blue for dark mode
          "info-content": "#1E1E1E", // Dark text
          "success": "#34D399", // Lighter green for dark mode
          "success-content": "#1E1E1E", // Dark text
          "warning": "#FBBF24", // Lighter orange for dark mode
          "warning-content": "#1E1E1E", // Dark text
          "error": "#F87171", // Lighter red for dark mode
          "error-content": "#1E1E1E", // Dark text
          "--rounded-box": "12px",
          "--rounded-btn": "8px",
          "--rounded-badge": "4px",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-text-case": "normal",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "8px",
        },
      },
    ],
  },
}