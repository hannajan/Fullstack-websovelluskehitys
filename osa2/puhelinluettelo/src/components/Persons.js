import React from 'react'

const Persons = ({ persons, filter }) => {
  const toShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    return(
    <ul>
        {toShow.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </ul>
  )
}

export default Persons