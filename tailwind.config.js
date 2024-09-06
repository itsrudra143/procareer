/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      screens: {
        xs: { min: "320px", max: "639px" },
        sm: { min: "640px", max: "767px" },
        md: { min: "768px", max: "1023px" },
        lg: { min: "1024px" },
      },
      fontFamily: {
        ysabeauoffice: ["YsabeauOffice", "sans-serif"],
      },
    },
  },
  plugins: [],
};
