/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
    'packages/renderer/src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'abyss',
      'bumble-bee',
      'caramellate',
      'dark',
      'dim',
      'fantasy',
      'light',
      'night',
      'retro',
      'slik',
      'sunset',
      'water',
      'winter',
    ],
    darkTheme: 'dark',
  },
};
