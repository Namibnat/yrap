import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Router from "./Router";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div className="content">
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </div>
);

reportWebVitals();
