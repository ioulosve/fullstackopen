import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const App = (props) => {

  // State hooks
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0])

  // Button Handlers
  const handleRandomAnectode = () => {
    const randomNumber = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(randomNumber)
  }

  const handleVoteButton = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const indexOfMostVotedAnectode = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anectode of the day</h1>
      {props.anecdotes[selected]}
      <br></br>
      <div>has {points[selected]} votes</div>
      <Button handler={handleVoteButton} text="vote"/>
      <Button handler={handleRandomAnectode} text="next anectode"/>
      
      <h1>Anectode with the most votes</h1>
      {props.anecdotes[indexOfMostVotedAnectode]}
      <div>has {points[indexOfMostVotedAnectode]} votes</div>

    </div>
  )
}

const anecdotes = [
  'if it huts, do it more often',
  'adding manpower to a late software project makes it later!',
  'premature optimization is the root of all evil!!!!!!',
  'perché sono tutti su Patreon?'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));


