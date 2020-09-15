// Passing state to child components and refactoring

import React, { useState } from 'react' 
import ReactDOM from 'react-dom'

// Display the value of the counter
const Display = ({counter}) => <div>{counter}</div>


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

  // A good practice is to place the state as up as possibile in the components hierarchy.
  // This way, the child components can share the same state.
  const [ counter, setCounter ] = useState(0)

  //don't forget that setCounter causes the re-rendering!
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="+"/>
      <Button handleClick={decreaseByOne} text="-"/>
      <Button handleClick={setToZero} text="reset"/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))