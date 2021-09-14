import React from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => 
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
)

const Course = ({ course }) => {

  return(
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App  = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Add part to course',
        exercises: 5,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App