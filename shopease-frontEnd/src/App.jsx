import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


function App() {
  return (
    <>
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
