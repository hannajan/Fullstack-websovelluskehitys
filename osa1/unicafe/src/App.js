import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button> 

const StatisticsLine = ({ text, value }) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + bad + neutral
  let average = good + (bad * -1)
  if(sum !== 0) {average = average / sum}
  const positive = sum === 0 ? '0%' : (good / sum * 100) + '%'

  if(sum === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
       <table>     
        <StatisticsLine text='good' value={good}/>
        <StatisticsLine text='neutral' value={neutral}/>
        <StatisticsLine text='bad' value={bad}/>
        <StatisticsLine text='all' value={sum}/>
        <StatisticsLine text='average' value={average}/>
        <StatisticsLine text='positive' value={positive}/>
      </table>    
    </div>

 
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad , setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <Header text='statistics'/>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
