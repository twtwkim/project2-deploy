/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors:{
        brand: '#FF0000',
      },
      keyframes:{
        blink:{
          '0%, 100%': {opacity:1, color:'black'},
          '50%' : {opacity:0.3, color:'gray'},
        }
      },
      animation:{
        blink: 'blink 3s step-start infinite',
      }
    },
  },
  plugins: [],
}

