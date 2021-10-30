import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

import Home from "./pages/Home";
import WebglCarrousel from "./pages/WebglCarrousel";

const theme = {
  colors: {
    white: "#F2F2E5",
    black: "#080808",
  },
  fonts: {
    main: "Arial, Helvetica, sans-serif",
    detail: "Times New Roman, Times, serif",
  },
};

function App() {
  let location = useLocation();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route path="/" component={Home} exact />
            <Route path="/WebglCarrousel" component={WebglCarrousel} />
          </Switch>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;
