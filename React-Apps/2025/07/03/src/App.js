import React from 'react';
//import logo from './logo.svg';
//import './App.css';

function App() {

  const date = new Date();
  const hours = date.getHours()

  let greeting;
  let color;

  if (hours < 12){
    greeting = "Morning";
    color = "red";
  } else if (hours < 18){
    greeting = "Afternoon";
    color = "green";
  } else {
    greeting = "Evening";
    color = "blue";
  }

  return (
    <div>
      <h1 style = {{color: color}}>Good {greeting}</h1>
    </div>
  );
}

export default App;
