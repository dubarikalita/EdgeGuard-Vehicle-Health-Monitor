/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#00FF88',
        dark: '#0A0A0A',
        grayish: '#1A1A1A',
      },
    },
  },
  plugins: [],
};
