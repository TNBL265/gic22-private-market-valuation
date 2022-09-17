/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // "./src/pages/**/*.{js,ts,jsx,tsx}",
    // "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      TTFirs: ["TTFirsNeue"],
    },
    extend: {
      boxShadow: {
        popUps: "0 0.0625rem 3.125rem 0 rgb(0 0 0 / 20%)",
      },

      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff", // !important
        "my-blue": {
          1: "#0032A1",
          2: "#7096EA",
          3: "#92B2F8",
        },
        "my-gray": {
          1: "#393939",
          2: "#AAA6A6",
          3: "#6D6D6D",
          4: "#F2F2F2",
          5: "#F6F6F6",
        },
        "my-green": {
          1: "#0DB14F",
          2: "#53F88B",
        },
        "my-red": {
          1: "#EC0039",
        },
        orange: {
          1: "#FFC700",
        },
      },
      zIndex: {
        100: "100",
        "-1": "-1",
        "-999": "-999",
        999: "999",
      },
      height: {
        "i-20": "calc(100% - 5rem)",
        "i-16": "calc(100% - 4rem)",
      },
      animation: {
        "slide-show": "slideee 75s linear infinite",
      },
      keyframes: {
        slideee: {
          // '0%': { transform: 'translateX(-100%)' },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
      },
    },
  },
  plugins: [],

  important: true,
};
