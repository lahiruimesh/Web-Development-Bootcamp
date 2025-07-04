import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element = {<Login />}></Route>
        <Route path="/signup" element = {<Signup />}></Route>
      </Routes>
      </Router>
  );
}

export default App;
