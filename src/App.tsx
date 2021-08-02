import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import { LinearModel } from './models/linear.model';

function App() {
  console.log('Hello TensorFlow');
  console.log(tf);
  const model = new LinearModel()
  const rest: any = []
  const aaa: number[] =  Array.from(new Array(1000).keys())
  aaa.forEach((item) => rest.push(item * 100));
  model.trainModel(aaa, rest).then((results) => {
    // console.log(results)
  })
  console.log(model)
  const prediction = model.predict(3)
  console.log(prediction)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
