/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{jsx,js}","./components/**/*.{jsx,js}"],
  theme: {
    fontFamily:{ 
    poppins: ['Kalam', 'cursive'],
    },

    extend: {
      colors: {
        rose: {
          100: "#FED7D7",
          200: "#FEB2B2",
          300: "#FC8181",
          400: "#F56565",
          500: "#E53E3E",
          600: "#C53030",
          700: "#9B2C2C",
          800: "#822727",
          900: "#63171B",
        },
      },
    }, 
    },
  plugins: [],
}
