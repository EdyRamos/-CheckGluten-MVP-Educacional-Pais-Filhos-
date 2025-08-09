/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'app-gradient': 'linear-gradient(to bottom, #4F9DDE, #FFFFFF)',
      },
      colors: {
        primary: '#4F9DDE',   // azul claro (confiança)
        secondary: '#FFD166', // amarelo (energia)
        success: '#06D6A0',   // verde (segurança)
        danger: '#EF476F',    // vermelho (alerta)
        neutral: {
          900: '#333333',     // cinza escuro (texto)
          50: '#FFFFFF',      // branco (fundo)
        },
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive'],
        body: ['Inter', 'Nunito', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
