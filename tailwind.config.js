/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "10px",
      // => @media (min-width: 10px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    colors: {
      main: "#5E3B97",
      second: "#4EC2CB",
      third: "#797979",
      fourth: "#D4D4D4",
      white: "#ffff",
      red: "#FF0000",
      gray: "808080",
    },
    extend: {},
  },
  plugins: [],
};
