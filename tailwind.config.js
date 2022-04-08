module.exports = {
  purge: ["index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        headline: "Poppins, sans-serif",
      }, 
    },
  },
  variants: {
    
    extend: {
      backgroundColor:["active"],
    },
  },
  plugins: [],
}
