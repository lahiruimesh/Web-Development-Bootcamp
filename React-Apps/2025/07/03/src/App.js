import React from 'react';
import Greeting from './components/greeting.jsx';
import Sum , { Sub } from './components/maths.jsx';
import Person from './components/person.jsx';
import person from './components/person.js';
//import logo from './logo.svg';
//import './App.css';


function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
      <Greeting />
      <p>Sum: {Sum(12, 34)}</p>
      <br />
      <p>Sub: {Sub(43, 17)}</p>
      <br />
      <Person
        name = "Sunil Shantha"
        age = { 45 }
        gender = "Male"
        phone = "0112324231"
      />

      <Person
        name = "Amal Dumal"
        age = { 21 }
        gender = "Male"
        phone = "011724255"
      />

      <Person
        name = {person[0].name}
        age = {person[0].age}
        gender = {person[0].gender}
        phone = {person[0].phone}
      />
      <br />
      <br />
    </div>
  );
}

export default App;
