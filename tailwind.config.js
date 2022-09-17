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
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',  // !important
      'allo': {
        100: '#88FFEE',  //!important
        200: '#4AF4DC', // !important
        300: '#3BDBC4 ', //!important
        400: '#06BAAD',  // !important
        500: '#00A89C',  // !important
        600: '#019C90 ',  //!important
        700: '#15756D ',  //!important
        800: '#00665E ', //!important
        900: '#003935 ',  //!important
      }
    },
    extend: {
      boxShadow: {
        popUps: "0 0.0625rem 3.125rem 0 rgb(0 0 0 / 20%)",
      },
      // colors: {
      //   "gray-dark": "#141414",
      //   "salmon-orange": "#FA5F3C",
      // },
      zIndex: {
        100: "100",
        "-1": "-1",
        "-999": "-999",
        999: "999",
      },
      height: {
        "i-20": "calc(100% - 5rem)",
        "i-16": "calc(100% - 4rem)"
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
