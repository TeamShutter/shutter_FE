// import '../styles/globals.css'

// function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default App

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import "../styles/globals.css";
import Footer from "../components/footer";
import Header from "../components/header";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { ProvideAuth } from "../hooks/use-auth";
import { useEffect } from "react";

// declare global {
//   interface Window {
//     Kakao: any;
//   }
// }

const App = (props) => {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    window.Kakao.init("7df8535a03baaf68c31da7c6d6cfe798");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* <ProvideAuth> */}
      <Provider store={store}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
      {/* </ProvideAuth> */}
    </ThemeProvider>
  );
};

export default App;
