import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#4caf50',
      dark: '#388e3c'
    },

    grey: {
      100: '#f9f9f9',
      200: '#eeeeee',
      300: '#b3b3b3ff',
      400: '#999999ff',
      700: '#313131ff',
      800: '#242424ff',
      900: '#212121',
    },

    background: {
      default: '#212121',
    },
  },
});

export default theme;