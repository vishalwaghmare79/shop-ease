import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'remixicon/fonts/remixicon.css'
import './App.css';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Header from './components/Common/Header';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App