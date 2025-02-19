import React from 'react';
import { useState } from 'react'
import './App.css'
import logo from './assets/react.svg'
import Greeting from './Greeting';
//import x , {Double,Triple} from './Maths'
import {Sum, Sub, Mul, Div} from './Maths'

function App() {
  return (
    <>
      <div>
        <Greeting />
        <h2>{Sum(2, 5)}</h2>
        <h2>{Sub(9, 6)}</h2>
        <h2>{Mul(9, 3)}</h2>
        <h2>{Div(12, 3)}</h2>
      </div>
    </>
  )
}

export default App;
