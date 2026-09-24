/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#FBF9F3",
          100: "#F5F0E4",
          200: "#ECE3CE",
          300: "#E0D4B4",
          400: "#CDBB8E",
        },
        stone: {
          400: "#B8AD91",
          500: "#8F866D",
        },
        pista: {
          50: "#F1F4EC",
          100: "#E2E9D6",
          200: "#C9D6B6",
          300: "#AEC495",
          400: "#93AE77",
          500: "#788F5C",
          600: "#5D7147",
          700: "#465536",
          800: "#333E28",
          900: "#22291B",
        },
        ink: {
          DEFAULT: "#2A2A24",
          soft: "#4A4A3F",
        },
        bronze: "#A8804F",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        container: "1360px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
