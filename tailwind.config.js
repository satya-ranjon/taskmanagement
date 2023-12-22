/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f28b8b",
        // primary: "#f5baba",
        secondary: "#2e3cb6",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        loto: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
