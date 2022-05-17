import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";

import App from "./App";

if (process.env.NODE_ENV === "development") {
  if (window.location.pathname === "/react-shopping-cart") {
    window.location.pathname = "/react-shopping-cart/";
  } else {
    const { worker } = require("./mocks/browser");
    worker.start({
      serviceWorker: {
        url: "/react-shopping-cart/mockServiceWorker.js",
      },
    });
  }
}

const GlobalStyle = createGlobalStyle`
  body{  
     margin: 0; 
   }   
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
