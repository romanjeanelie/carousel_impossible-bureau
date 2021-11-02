import { createGlobalStyle } from "styled-components";
import "./reset.css";

const size = {
  mobile: 768,
  tablet: 1024,
};

const device = {
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
};

const GlobalStyles = createGlobalStyle`
*,
*:after,
*:before {
  box-sizing: border-box;
}

html {
  font-size: calc(100vw / 1920 * 10);
  line-height: 1;

  @media ${device.mobile} {
      font-size: calc(100vw / 710 * 10);
  }
}

body {
  font-family: Lato, sans-serif;
  background-color: #F2F2E5;
  overflow: hidden;
}

a {
  color: inherit;
  outline: none;
  text-decoration: none;
}

button {
  background: transparent;
  border: transparent;
  cursor: pointer;
}

.page {
    position: fixed;
    width: 100%;
    height: 100%; 
}

.rotate{
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2rem;
  }
}

`;

export { GlobalStyles, device, size };
