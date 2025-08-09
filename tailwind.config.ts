/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'app-gradient': 'linear-gradient(to bottom, #4F9DDE, #FFFFFF)',
      },
    },
  },
  plugins: [],
}
