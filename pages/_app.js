// import '../styles/globals.css'

// function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default App


import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import {theme} from "../theme";
import '../styles/globals.css';
import Footer from "../components/footer";
import Header from "../components/header";

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;