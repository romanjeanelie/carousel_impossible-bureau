import { useState, useEffect, useContext, createContext } from "react";
import { size } from "../styles/GlobalStyles";
const viewportContext = createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const tabletBreakPoint = size.tablet;
  const mobileBreakPoint = size.mobile;
  const isTablet = width > mobileBreakPoint && width < tabletBreakPoint;
  const isMobile = width < mobileBreakPoint;
  const isPortrait = height > width;
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height, isMobile, isTablet, isPortrait }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  /* We can use the "useContext" Hook to acccess a context from within
     another Hook, remember, Hooks are composable! */
  const { width, height, isMobile, isTablet, isPortrait } = useContext(viewportContext);
  return { width, height, isMobile, isTablet, isPortrait };
};

export { ViewportProvider, useViewport };
