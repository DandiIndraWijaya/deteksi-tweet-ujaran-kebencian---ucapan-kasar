import { createTheme } from '@material-ui/core';

const theme = createTheme({
  font: ['Poppins', 'sans-serif'],
  palette: {
    primary: {
      main: '#1DA1F2',
    },
    secondary: {
      main: '#429970',
      grey: '#727272',
      300: '#7bedad',
    },
    grey: {
      light: '#E8E8E8',
    },
    text: {
      main: '#000',
      secondary: '#727272',
      white: '#fff',
      blue: '#64a0e0',
      link: '#00a0db',
    },
  },
  typography: {
  },
});

export default theme;
