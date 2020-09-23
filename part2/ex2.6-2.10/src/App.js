import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

let personsFromDb = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
]

const App = () => {
  const [ persons, setPersons ] = useState(personsFromDb)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
    personsFromDb.push(newPerson) //Update DB
    setPersons(personsFromDb) //Update UI
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
      setPersons(personsFromDb)
    } else {
      let filteredPersons = personsFromDb.filter(person => 
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