/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/scripts/**/*.{html,js}",
    "./src/pages/**/*.{html,js}",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
