/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF5E9', // Main background
        beige: '#FAEBCE', // Secondary background
        mandai: {
          green: '#003400', // Mandai Green
          dark: '#1F1E1D', // Mandai Dark Gray
        },
        black: '#000000',
        white: '#FFFFFF',
        text: {
          main: '#000000',
          dark: '#1F1E1D',
        },
        primary: {
          DEFAULT: '#003400',
          light: '#FAF5E9',
          accent: '#FAEBCE',
        },
        secondary: {
          DEFAULT: '#FAEBCE',
        },
      },
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'sans': ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 