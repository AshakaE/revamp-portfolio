module.exports = {
  mode: 'jit',
  purge: ['./**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryLight: '#3747E5',
        primary: '#1C2AAF',
        textLight: '#D1D6FE',
        textDark: '#5C6086',
        bodyDark: '#E9ECFF',
      },
      fontFamily: {
        head: ['poppins'],
        body: ['noto-sans'],
      },
      boxShadow: {
        scoop: '0 50px 0 0 #1C2AAF',
      },
      borderRadius: {
        '4xl': '3.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
