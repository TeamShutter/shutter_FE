import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fdcb6e',
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
    }
  },

  button: {
      primary: {
          main: 'black',
      }
  }
});