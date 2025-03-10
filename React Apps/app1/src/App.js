import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from './Components/Cards';
import './App.css';
import Data from './Components/Data';
import ProductDetails from './Components/ProductDetails';

function App() {
  return (
    <Router>
      <h1>Welcome ....</h1>
      <Routes>
      <Route path="/" element={<Card />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
