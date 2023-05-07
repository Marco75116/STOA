import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Providers from "./Providers";
import Routes from "./Routes";

import Header from "../components/Header/Header";

const App = () => {
  return (
    <Providers>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Header />
        <Routes />
      </Router>
    </Providers>
  );
};

export default App;
