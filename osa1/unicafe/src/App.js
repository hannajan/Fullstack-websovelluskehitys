import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button> 

const Statistics = ({ header, good, neutral, bad }) => {
  return (
    <div>
      <Header text={header}/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
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
      <Statistics 
        header='statistics'
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
