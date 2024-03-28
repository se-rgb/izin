import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import * as bootstrap from 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import ScrollToTop from "../js/components/scrollToTop.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
