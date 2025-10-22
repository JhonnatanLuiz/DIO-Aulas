/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./tailwind_aula.html",
    "./**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4',
        secondary: '#8b5cf6',
      }
    },
  },
  plugins: [],
}