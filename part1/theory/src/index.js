import React from 'react'
import ReactDOM from 'react-dom'

// a React component, an object that holds a function
const Hello = (props) => (
  <>
    <p>Ciao {props.name}, tu hai {props.age} anni</p>
  </>
)

// Component names must be Capitalized
const Footer = () => (
  <div>
    Greeting app created by <a href="https://github.com/giulioverazzo">Giulio Verazzo</a>
  </div>
)


//App is also a component (the main one), the lambda is written with more verbosity here
const App = () => {
  const name = 'Pietro'
  const age = 10

  return (
  <>
    <h1>Saluti</h1>
    <Hello name="Mario" age={26+10}/>
    <Hello name={name} age={age}/>
    <Footer />
  </>
)}

ReactDOM.render(<App />, document.getElementById('root'))