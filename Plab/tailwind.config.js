/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['NotoSansKR-VariableFont_wght'],
        'yeon-sung': ['YeonSung-Regular'],
      },
    },
  },
  plugins: [],
}

