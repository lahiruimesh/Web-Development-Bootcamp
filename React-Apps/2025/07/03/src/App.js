import React from 'react';
import logo from './logo.svg';

function App() {

  const name = "Lahiru Imesh";
  const age = 25;
  const university = "University of Moratuwa";
  const image = "https://picsum.photos/200/200";

  return (
    <div>
      <h1>Hello Users !</h1>
      <h3>I am { name }</h3>
      <h3>I am { age } years old</h3>
      <h3>I am studying at { university }</h3>
      <h3>My lucky number is {Math.floor(Math.random() * 10) }</h3>
      <h3>My lucky number is {age + Math.floor(Math.random() * 10) }</h3>
      <img src='https://picsum.photos/200/200' />
      <img src = { image + '?grayscale'} />
      <img src = { logo } />
    </div>
  );
}

export default App;
