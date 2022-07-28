import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      // main: '#e67e22',
      main: '#000',
    },
    secondary: {
        main: '#e67e22'
    },
    info: {
        main: '#0984e3'
    },
    success: {
        main: '#55efc4'
    },
    error: {
        main: '#d63031'
    },
    star: {
      main: '#ff6b6b'
    },
  },

  button: {
      primary: {
          main: 'black',
      }
  }
});