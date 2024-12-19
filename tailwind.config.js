/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'primary-pink': '#FF0381',
        'prilmary-yellow': '#FBBC05',
        'primary-blue': '#4285F4',
        'primary-red': '#EA4335',
        'primary-black': '#3B3B3D',
        'background-color': '#F4F3F1',
        'primary-white': '#FCFBFC',
      },
    },
  },
  plugins: [],
};
