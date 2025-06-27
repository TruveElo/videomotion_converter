/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // blue-800
        'primary-foreground': '#FFFFFF', // white
        
        // Secondary Colors
        'secondary': '#64748B', // slate-500
        'secondary-foreground': '#FFFFFF', // white
        
        // Accent Colors
        'accent': '#0EA5E9', // sky-500
        'accent-foreground': '#FFFFFF', // white
        
        // Background Colors
        'background': '#F8FAFC', // slate-50
        'surface': '#FFFFFF', // white
        
        // Text Colors
        'text-primary': '#0F172A', // slate-900
        'text-secondary': '#475569', // slate-600
        
        // Status Colors
        'success': '#059669', // emerald-600
        'success-foreground': '#FFFFFF', // white
        'warning': '#D97706', // amber-600
        'warning-foreground': '#FFFFFF', // white
        'error': '#DC2626', // red-600
        'error-foreground': '#FFFFFF', // white
        
        // Border Colors
        'border': '#E2E8F0', // slate-200
        'border-muted': '#F1F5F9', // slate-100
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-medium': '500',
        'heading-semibold': '600',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-normal': '400',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevated': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'floating': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 200ms ease-out',
        'slide-in-right': 'slide-in-right 200ms ease-out',
        'spring': 'spring 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.5',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
        },
        'pulse-dot': {
          '0%, 100%': {
            opacity: '0.7',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.2)',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'slide-in-right': {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
        'spring': {
          '0%': {
            transform: 'scale(0.8)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      zIndex: {
        'header': '40',
        'mobile-overlay': '40',
        'mobile-menu': '50',
        'dropdown': '60',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}