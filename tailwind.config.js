module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      primary: '#00a884',
      white: '#ffffff',
      gray: '#a9a9ac',
      black: '#000000',
      red: '#ff0000',
    },
    extend: {
      height: (theme) => ({
        'screen-75': '75vh',
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
        'screen-110': '110vh',
      }),
    },
  },
  plugins: [],
}
