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
import { Provider } from "react-redux";
import { useStore } from "../store";
import { ProvideAuth } from "../hooks/use-auth";

const App = (props) => {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

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