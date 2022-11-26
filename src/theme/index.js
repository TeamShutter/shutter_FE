import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      // main: '#e67e22',
      main: "#000000",
    },
    secondary: {
      main: "#e67e22",
    },
    info: {
      main: "#0984e3",
    },
    success: {
      main: "#55efc4",
    },
    error: {
      main: "#d63031",
    },
    star: {
      main: "#ff6b6b",
    },
    hashtag: {
      main: "#09f",
      contrastText: "#fff",
    },
    blank: {
      main: "#f0f0f0",
    },
    selectall: {
      main: "#D3D3D3",
    },
  },

  button: {
    primary: {
      main: "black",
    },
    hashtag: {
      main: "#09f",
    },
  },
  "@global": {
    "*::-webkit-scrollbar": {
      display: "none",
    },
  },
});
