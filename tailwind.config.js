const path = require("path");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    path.resolve(__dirname, "./pages/**/*.{js,ts,jsx,tsx}"),
    path.resolve(__dirname, "./components/**/*.{js,ts,jsx,tsx}"),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
