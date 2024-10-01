/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'bg-primary': '#4E25BE',
        'bg-secondary': '#B41DEB',
        'bg-primary-opacity': '#4e25be42',
        'text-primary': '#0D003F',
        'text-secondary': '#F9F7FF',
        'text-primary-opacity': '#0d003f42',
        'color-primary': '#2990FF',
        'color-secondary': '#FF7424',
        'dark-primary': '#1c2128',
        'dark-secondary': '#2d333b',
        'dark-text-primary': '#adbac7',
        'dark-text-secondary': '#444c56',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
