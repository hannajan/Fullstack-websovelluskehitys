import React from 'react'

const Persons = ({ persons, filter, handleClick}) => {
  const toShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    return(
    <ul>
        {toShow.map((person) => <p key={person.name}>{person.name} {person.number} <button onClick={handleClick} value={person.id}>delete</button></p>)}
    </ul>
  )
}

export default Persons