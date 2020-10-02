import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const loadDataFromDB = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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

    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already in the phonebook.`)
      return
    }

    const newPerson = {name: newName, number: newNumber}
    setPersons(persons.concat(newPerson))
    resetUI()
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
        <Persons persons={persons}/>
    </div>
  )
}

export default App