import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter, setCounter] = useState(15)
  
  const addValue = () => {
    if(counter === 20) {
      return;
    }
    setCounter(counter+=1);
  };

  const decreaseValue = () => {
    if(counter === 0) {
      return;
    }
    setCounter(counter-=1);
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value: {counter}</h2>

      <button 
      onClick={addValue}
      >Add value {counter}</button>
      <br />
      <button 
      onClick={decreaseValue}
      >Decrease value {counter}</button>
    </>
  )
}

export default App
