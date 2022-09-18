import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";

import "./index.scss";

// const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      {/* <Routes>
        <Route exact path="/"/>
      </Routes> */}
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
