import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const containsName = persons.find((person) => person.name === newName) ? true : false

  const updateNumber = (person) => {
    const updatedPerson = {...person, number: newNumber}
    personService
      .update(person.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      })
      .catch((error) => {
        setMessageType('error')
        setMessage(`${person.name} was already deleted from server`)
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 3000)
      })
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    if(containsName) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        updateNumber(person)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setMessageType('confirm')
          setMessage(`Added ${createdPerson.name}`)
          setTimeout(() => {
            setMessage(null)
            setMessageType('')
          }, 3000)
      })
    }
  }

  const deletePerson = (event) => {
    const id = Number(event.target.value)
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personToDelete.name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessageType('confirm')
          setMessage(`${personToDelete.name} was deleted`)

          setTimeout(() => {
            setMessage(null)
            setMessageType('')
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        filter={filter}
        handleClick={deletePerson}
        />
    </div>
  )

}

export default App