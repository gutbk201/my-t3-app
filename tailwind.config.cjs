/** @type {import('tailwindcss').Config} */
const defaultColors = require("tailwindcss/colors");
const theme = {
  extend: {
    colors: {
      "white-main": defaultColors.slate["50"], //"text-slate-50"
      "main-a": defaultColors.purple["400"],
      "main-b": defaultColors.purple["800"],
    },
  },
};
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme,
  plugins: [],
};
