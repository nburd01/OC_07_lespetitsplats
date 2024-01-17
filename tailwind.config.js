/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/scripts/**/*.{html,js}",
    "./src/data/**/*.{html,js}",
    "./src/css/**/*.{html,js,css}",
    "./public/css/**/*.{html,js,css}",
    "./index.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('../../src/assets/images/home.jpeg')",
      },
    },
    // colors: {
    //   customYellow: "#FFD15B",
    // },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "2.5rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
      anton: ['"Anton"', "sans-serif"],
      manrope: ['"Manrope"', "sans-serif"],
    },
  },
  plugins: [],
};
