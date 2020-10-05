import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const loadDataFromDB = () => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  //useEffect fires after every completed render
  useEffect(loadDataFromDB, [])

  const resetUI = () => {
    setNewName('')
    setNewNumber('')
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    const newPerson = {name: newName, number: newNumber}

    if(persons.some(person => person.name === newPerson.name)){
      if(window.confirm(`${newPerson.name} is already in the phonebook. Update it?`)){
        const id = persons.find(p => p.name === newPerson.name).id
        personsService
          .update(id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : updatedPerson ))
          })
      }
      return
    }

    
    // save to DB and update UI
    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson)) 
        resetUI()
      })
      .catch(error => {
        alert('Cannot save because server is unreachable')
      })
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    let nameToSearch = event.target.value
    if(nameToSearch === '') {
      loadDataFromDB()
    } else {
      let filteredPersons = persons.filter(person => 
        person.name.toUpperCase().includes(nameToSearch.toUpperCase()))
      setPersons(filteredPersons)
    }
  }

  const personDeleteHandler = (id) => {
    if(window.confirm(`Delete ${persons.find(p => p.id === id).name} ?`)){
      personsService
      .destroy(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter handler={handleNameFilter}/>
      <h2>Add a new</h2>
        <PersonForm 
          handleSubmit={addNewPerson}
          newName={newName}
          newNumber={newNumber}
          handleNewName={handleNewName}
          handleNewNumber={handleNewNumber}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} deleteHandler={personDeleteHandler}/>
    </div>
  )
}

export default App