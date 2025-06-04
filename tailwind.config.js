/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9C2A2A',
        secondary: '#af7df5',
        accent: '#9C2A2A',
        background: '#F4F4F4',
        textColor: '#4D3328',
      },
      fontFamily: {
        sans: ['League Spartan', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};