/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F9DDE',
        secondary: '#FFD166',
        success: '#06D6A0',
        danger: '#EF476F',
        neutral: {
          900: '#333333',
          50: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive'],
        body: ['Inter', 'Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

