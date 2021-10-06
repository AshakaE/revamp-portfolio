module.exports = {
  mode: "jit",
  purge: ["./**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryLight: "#3747E5",
        primary: "#1C2AAF",
        primaryDark: "#0E1879",
        textLight: "#D1D6FE",
        textBg: "#2B37BD",
        textDark: "#5C6086",
        bodyDark: "#E9ECFF",
      },
      fontFamily: {
        head: ["poppins"],
        body: ["noto sans"],
      },
      boxShadow: {
        scoop: "0 -50px 0 0 #1C2AAF",
        troop: "0 50px 0 0 #D1D6FE",
        droop: "0 50px 0 0 #FFFFFF",
      },
      borderRadius: {
        "4xl": "3.5rem",
        "5xl": "4rem",
        "6xl": "4.5rem",
        "7xl": "5rem",
      },
      transitionTimingFunction: {
        "menu-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      boxShadow: {
        inner: "inset 0 0 7px 0 rgba(0, 0, 0, 0.7)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
