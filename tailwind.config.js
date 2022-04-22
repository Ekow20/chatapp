module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    extend: { backgroundColor: ["dark"], textColor: ["dark"] },
  },
  theme: {
    minWidth: {
      6: "70px",
    },
    extend: {},
  },
  plugins: [],
};
