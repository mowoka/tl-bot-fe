/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        primary: ["'Poppins'", 'sans-serif'],
      },
      colors:{
        primary:'#D8D9CF',
        secondary:'#EDEDED',
        pink:'#FF8787',
        red: '#E26868',
      }
    },
  },
  plugins: [],
}
