// Functions returning functions, the factory pattern.

import React, { useState } from 'react' 
import ReactDOM from 'react-dom'

const App = (props) => {
  const [value, setValue] = useState(10)

  // Hello(param) is a function that accepts a parameter and returns a function.
  // This can be used to generate funcyions that behave differently based on the parameter
  // passed on the factory function.

  const hello = (who) => {
    return () => {console.log('hello', who)} 
  }
  
  // We can use the factory pattern to create handler to set the state!
  const setToValue = (value) => {
    return () => setValue(value)
  }
  

  // Here we are using function calls as event handler just because the call returns a function!
  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>      
      <button onClick={hello('function')}>button</button>

      <button onClick={setToValue(1000)}>mille</button>
      <button onClick={setToValue(0)}>zero</button>
      <button onClick={setToValue(value + 1)}>incrementa</button>    
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))