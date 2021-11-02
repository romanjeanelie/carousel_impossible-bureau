import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

import Home from "./pages/Home";
import Webglcarousel from "./pages/WebglCarousel";
import ClassicCarousel from "./pages/ClassicCarousel";

import { useViewport } from "./hooks/Viewport";

const theme = {
  colors: {
    white: "#F2F2E5",
    black: "#0e0d0d",
  },
  fonts: {
    main: "Lato, sans-serif",
    detail: "Times New Roman, Times, serif",
  },
};

function App() {
  const location = useLocation();
  const { isPortrait } = useViewport();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AnimatePresence exitBeforeEnter>
        {isPortrait && (
          <div className="page rotate">
            <p>please rotate your device</p>
          </div>
        )}
        {!isPortrait && (
          <Switch location={location} key={location.key}>
            <Route path="/" component={Home} exact />
            <Route path="/WebglCarousel" component={Webglcarousel} />
            <Route path="/ClassicCarousel" component={ClassicCarousel} />
          </Switch>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
