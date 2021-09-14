import React, { useState } from 'react'

const Numbers = ({ persons, filter }) => {
  const toShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  return(
    <ul>
      {toShow.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231234'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const containsName = persons.find((person) => person.name === newName) ? true : false

  const addNewPerson = (event) => {
    event.preventDefault()
    if(containsName) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter}/>
    </div>
  )

}

export default App
