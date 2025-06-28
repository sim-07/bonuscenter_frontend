import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
      dark: '#388e3c'
    },
    grey: {
      100: '#f9f9f9',
      200: '#eeeeee',
    },
  },
});

export default theme;