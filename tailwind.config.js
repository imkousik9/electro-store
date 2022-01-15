module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      logo: ['Bebas Neue', 'cursive']
    },
    extend: {
      boxShadow: {
        custom:
          '0 0 0 1px rgb(53 72 91 / 14%), 0 2.75px 2.21px rgb(0 0 0 / 7%), 0 6.65px 5.32px rgb(0 0 0 / 4%), 0 12.5px 10px rgb(0 0 0 / 3%), 0 22px 18px rgb(0 0 0 / 3%), 0 42px 33.4px rgb(0 0 0 / 2%), 0 100px 80px rgb(0 0 0 / 2%)',
        'custom-2':
          '0 1px 15px rgb(27 31 35 / 15%), 0 0 1px rgb(106 115 125 / 35%)'
      }
    }
  },
  plugins: []
};
