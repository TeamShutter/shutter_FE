// import '../styles/globals.css'

// function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default App


import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import {theme} from "../theme"

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;