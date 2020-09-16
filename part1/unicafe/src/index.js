import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
  return (<button onClick={handleClick}>
    {text}
  </button>)
}

const Statistic = ({text, value}) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
)

const Statistics = ({votes}) => {
  
  if(votes.good === 0 && votes.neutral === 0 && votes.bad === 0) {
    return (
      <div>
        No feedbacks given
      </div>
    )
  }
  
  const total = votes.good + votes.neutral + votes.bad
  const avg = ((votes.good*1) + (votes.neutral*0) + (votes.bad*-1)) / total 
  const posPerc = (votes.good / total ) * 100 
  
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good"     value={votes.good}   />
          <Statistic text="neutral"  value={votes.neutral}/>
          <Statistic text="bad"      value={votes.bad}    />
          <Statistic text="all "     value={total}        />
          <Statistic text="average"  value={avg}          />
          <Statistic text="positive" value={posPerc+"%"}  />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlerFactory = (vote, voteFunction) => {
    return () => { voteFunction(vote + 1) }
  }

  return(
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handlerFactory(good, setGood)} text="good"/>
      <Button handleClick={handlerFactory(neutral, setNeutral)} text="neutral"/>
      <Button handleClick={handlerFactory(bad, setBad)} text="bad"/>
      <Statistics votes={{good: good, neutral: neutral, bad: bad}}/>
    </div>
  )


}

ReactDOM.render(<App />, document.getElementById('root'));


