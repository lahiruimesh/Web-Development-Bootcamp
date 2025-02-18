import React from 'react';
import { useState } from 'react'
import './App.css'
import logo from './assets/react.svg'

const a = 12;
const b = "Kamal";
function App() {
  return (
    <>
      <div>
        <h1 className='h'>Hello {b} !!!</h1>
        <h3>I am {a} years old.</h3>
        <img src= {logo} alt="logo" />
        <p>This is a paragraph.</p>
        <p>My lucky number is {Math.floor(Math.random() * 34)}</p>
      </div>
    </>
  )
}

export default App;
