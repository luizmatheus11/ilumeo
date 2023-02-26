/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#151F2B',
        "button-color": '#FE8A00',
        "input-color": '#1E2733',
        "text-color": "#F5F5F5"
      }
    },
  },
  plugins: [],
}
