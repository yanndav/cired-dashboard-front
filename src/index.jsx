import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import { createGlobalStyle } from "styled-components";

import reportWebVitals from "./reportWebVitals";

const Body = createGlobalStyle`
/* @import url("https://fonts.googleapis.com/css2?family=Urbanist&display=swap"); */
  body {
  margin: 0;
  font-size: 16px;
  font-family: "Urbanist", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 100%;
}
*{  font-family: "Urbanist", sans-serif;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <Body />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
