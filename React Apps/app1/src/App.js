import React from "react";
import { Card1, Card2 } from './Components/Cards';
import './App.css';
function App() {
  return (
    <div>
      <h1 className="top">Welcome ...</h1>
      <Card1 title="Title 01" content="lorem ipsam"/>
      <Card2 image="https://th.bing.com/th/id/OIP.kcpUQ1-yUtQcxsKDHM7WegAAAA?rs=1&pid=ImgDetMain"/>
  </div>
  );
}

export default App;
