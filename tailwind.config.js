/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#8B4513', // saddle-brown
        'primary-50': '#FDF8F5', // very light brown
        'primary-100': '#F5E6D3', // light brown
        'primary-200': '#E6C2A6', // medium light brown
        'primary-300': '#D4A574', // medium brown
        'primary-400': '#B8824A', // darker brown
        'primary-500': '#8B4513', // saddle-brown
        'primary-600': '#7A3D11', // darker saddle-brown
        'primary-700': '#68350F', // very dark brown
        'primary-800': '#562C0D', // extremely dark brown
        'primary-900': '#45240B', // deepest brown
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#2F4F4F', // dark-slate-gray
        'secondary-50': '#F7F8F8', // very light gray
        'secondary-100': '#E8EBEB', // light gray
        'secondary-200': '#D1D7D7', // medium light gray
        'secondary-300': '#B0BABA', // medium gray
        'secondary-400': '#8A9999', // darker gray
        'secondary-500': '#647777', // dark gray
        'secondary-600': '#4A5F5F', // darker slate
        'secondary-700': '#2F4F4F', // dark-slate-gray
        'secondary-800': '#253F3F', // very dark slate
        'secondary-900': '#1C2F2F', // deepest slate
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#CD853F', // peru/golden-sand
        'accent-50': '#FDF9F5', // very light sand
        'accent-100': '#F7E6D1', // light sand
        'accent-200': '#EFCCA3', // medium light sand
        'accent-300': '#E5B175', // medium sand
        'accent-400': '#D99B52', // darker sand
        'accent-500': '#CD853F', // peru/golden-sand
        'accent-600': '#B87236', // darker peru
        'accent-700': '#A3602D', // dark peru
        'accent-800': '#8E4F25', // very dark peru
        'accent-900': '#79401E', // deepest peru
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FEFEFE', // soft-off-white
        'surface': '#F8F6F3', // warm-neutral
        'card': '#FFFFFF', // white
        'popover': '#FFFFFF', // white
        'border': '#E5E5E5', // light-gray
        'input': '#FFFFFF', // white

        // Text Colors
        'text-primary': '#2C2C2C', // rich-charcoal
        'text-secondary': '#6B6B6B', // medium-gray
        'text-muted': '#9CA3AF', // gray-400
        'foreground': '#2C2C2C', // rich-charcoal

        // State Colors
        'success': '#228B22', // forest-green
        'success-50': '#F0F9F0', // very light green
        'success-100': '#D4F4D4', // light green
        'success-200': '#A8E8A8', // medium light green
        'success-300': '#7CDB7C', // medium green
        'success-400': '#50CE50', // bright green
        'success-500': '#228B22', // forest-green
        'success-600': '#1E7A1E', // darker forest
        'success-700': '#1A691A', // dark forest
        'success-800': '#165816', // very dark forest
        'success-900': '#124712', // deepest forest
        'success-foreground': '#FFFFFF', // white

        'warning': '#DAA520', // goldenrod
        'warning-50': '#FEFBF3', // very light gold
        'warning-100': '#FDF4D7', // light gold
        'warning-200': '#FBE8AF', // medium light gold
        'warning-300': '#F8DC87', // medium gold
        'warning-400': '#F4D05F', // bright gold
        'warning-500': '#DAA520', // goldenrod
        'warning-600': '#C4941D', // darker goldenrod
        'warning-700': '#AE831A', // dark goldenrod
        'warning-800': '#987217', // very dark goldenrod
        'warning-900': '#826114', // deepest goldenrod
        'warning-foreground': '#FFFFFF', // white

        'error': '#B22222', // fire-brick/deep-red
        'error-50': '#FDF2F2', // very light red
        'error-100': '#FBE2E2', // light red
        'error-200': '#F7C5C5', // medium light red
        'error-300': '#F3A8A8', // medium red
        'error-400': '#EF8B8B', // bright red
        'error-500': '#DC2626', // red-600
        'error-600': '#B22222', // fire-brick/deep-red
        'error-700': '#991B1B', // red-800
        'error-800': '#7F1D1D', // red-900
        'error-900': '#651818', // deepest red
        'error-foreground': '#FFFFFF', // white

        // Destructive (alias for error)
        'destructive': '#B22222', // fire-brick/deep-red
        'destructive-foreground': '#FFFFFF', // white

        // Muted Colors
        'muted': '#F8F6F3', // warm-neutral
        'muted-foreground': '#6B6B6B', // medium-gray

        // Ring Colors
        'ring': '#8B4513', // saddle-brown
      },
      fontFamily: {
        'heading': ['Crimson Text', 'serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-light': '300',
        'body-normal': '400',
        'body-semibold': '600',
        'caption-normal': '400',
        'data-normal': '400',
      },
      boxShadow: {
        'soft-sm': '0 2px 4px rgba(139, 69, 19, 0.1)',
        'soft-md': '0 4px 8px rgba(139, 69, 19, 0.15)',
        'soft-lg': '0 8px 16px rgba(139, 69, 19, 0.2)',
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
        '1300': '1300',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}
