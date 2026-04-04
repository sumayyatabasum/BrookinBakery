/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ["Lato", "sans-serif"],
      },
      colors: {
        cream: "#FDF6EE",
        blush: "#F2C4C4",
        mocha: "#7B4F3A",
        caramel: "#C68B59",
      },
    },
  },
  plugins: [],
};
