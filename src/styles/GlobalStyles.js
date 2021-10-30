import { createGlobalStyle } from "styled-components";
import "./reset.css";

const GlobalStyles = createGlobalStyle`
*,
*:after,
*:before {
  box-sizing: border-box;
}

html {
  font-size: calc(100vw / 1920 * 10);
  line-height: 1;
}

body {
  font-family: Poppins;
  background-color: #F2F2E5;
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

.page{
    position: fixed;
    width: 100%;
    height: 100%; 
}

`;

export default GlobalStyles;
