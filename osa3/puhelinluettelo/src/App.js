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
  const [message, setMessage] = useState({
    text: null,
    type: null
  })

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

  const containsName = () => {
    const person = persons.find(p => p.name === newName)
    return person ? true : false
  }

  const updateNumber = (person) => {
    const updatedPerson = {...person, number: newNumber}
    personService
      .update(person.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setMessage({text: error.message, type: 'error'})
        setTimeout(() => {
          setMessage({text: null, type: null})
        }, 3000)
      })
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    if(containsName()) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
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
          setMessage({ text: `Added ${createdPerson.name}`, type: 'confirm' })
          setTimeout(() => {
            setMessage({ text: null, type: null})
          }, 3000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setMessage({ text: error.response.data.error, type: 'error' })
        setTimeout(() => {
          setMessage({ text: null, type: null})
        }, 5000)
        

      })
    }
  }

  const deletePerson = (event) => {
    const id = event.target.value
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personToDelete.name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage({ text: `${personToDelete.name} was deleted`, type: 'confirm'})

          setTimeout(() => {
            setMessage({ text: null, type: null})
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} type={message.type} />
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