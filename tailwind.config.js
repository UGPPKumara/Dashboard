/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add the new color palette here
      colors: {
        blue: {
          1: '#e6f4ff',
          2: '#bae0ff',
          3: '#91caff',
          4: '#69b1ff',
          5: '#4096ff',
          6: '#1677ff', // This is our  color
          7: '#0958d9',
          8: '#003eb3',
          9: '#002c8c',
          10: '#001d66',
        }
      }
    },
  },
  plugins: [],
}