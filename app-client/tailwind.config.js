/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['synthwave'],
  },
};
