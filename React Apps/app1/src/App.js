import React from "react";
import Card from './Components/Cards';
import './App.css';
import Data from './Components/Data';
function App() {
  return (
    <div>
      <h1 className="top">Welcome ...</h1>
      <Card data={ Data }/>
      
  </div>
  );
}

export default App;
