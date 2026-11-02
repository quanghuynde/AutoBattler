export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        army: { DEFAULT: '#183448', 600: '#1f4259', 700: '#132a3a', 800: '#0f202d', 900: '#0a1620' },
        flag: { DEFAULT: '#C83B3B', 600: '#a92f2f' },
        gold: { DEFAULT: '#D8AD62', 300: '#e8cd97', 600: '#b98d42' },
        paper: { DEFAULT: '#F0EBDD', 200: '#e4dcc6', 300: '#d3c8aa' },
        ink: { DEFAULT: '#242A30', 600: '#3a424a', 400: '#6b747c' },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'system-ui', 'sans-serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
};
