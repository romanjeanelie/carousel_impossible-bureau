import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { ViewportProvider } from "./hooks/Viewport";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ViewportProvider>
        <App />
      </ViewportProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
