import React from 'react'

const Subtitle = ({ text }) => <h2>{text}</h2>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => 
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>total of {total} exercises</strong></p>
}

const Course = ({ course }) => {
  return(
    <div>
      <Subtitle text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course