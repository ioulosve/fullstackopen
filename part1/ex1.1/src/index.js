import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
)

const Part = (props) => (
  <div>
    <p>
      {props.part} {props.exercises}
    </p>
  </div>
)

const Content = (props) => (
  <div>
    <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
    <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
    <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
  </div>
)

const Total = (props) => {
  
  let total = 0

  // prefer lambda way of function definition
  props.parts.forEach(part => total += part.exercises)

  return (
    <>
      <p>Number of exercises: {total} </p>
    </>
  )
}

const App = () => {
  //use only const and let for variable definitions

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  //always pass entire arrays in components as props
  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))