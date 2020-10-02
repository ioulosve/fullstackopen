import React from 'react'

const Header = (props) => (
  <div>
    <h2>{props.title}</h2>
  </div>
)

const Part = (props) => (
  <div>
    <p>
      {props.title} {props.exercises}
    </p>
  </div>
)

const Content = (props) => {
  return(
    <div>
      {props.parts.map(part => 
        <Part key={part.id} title={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Total = (props) => {
  
  const reducer = (accumulator, currentValue) => {
    // the reducer function must return an object with a "exercises" property because it used as the accumulator in the next iterations!
    return {exercises: accumulator.exercises + currentValue.exercises} 
  }

  const sum = props.parts.reduce(reducer)

  return (
    <>
      <b>Number of exercises: {sum.exercises} </b>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course