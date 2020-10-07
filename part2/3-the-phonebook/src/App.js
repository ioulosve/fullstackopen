import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState({ text: null, isError: false })

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

  function showNotification(messageText, timeout, isError=false) {
    setMessage({text: messageText, isError: isError})
    if(timeout !== null) {
      setTimeout(() => setMessage({...message, text: null}), timeout)
    }
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
            showNotification(`${newPerson.name} updated.`, 3000)
          })
          .catch(error => {
            console.log(error)
            setPersons(persons.filter(p => p.id !== id))
            showNotification(`${newPerson.name} has already been removed from the server.`, 3000, true)
          })
      }
      return
    }

    
    // save to DB and update UI
    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`Added ${returnedPerson.name}`, 3000) 
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
    let pname = persons.find(p => p.id === id).name
    if(window.confirm(`Delete ${pname} ?`)){
      personsService
      .destroy(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`${pname} deleted.`, 3000)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} dismissHandler={() => setMessage(null)}/>
      <h2>Add a new</h2>
        <PersonForm 
          handleSubmit={addNewPerson}
          newName={newName}
          newNumber={newNumber}
          handleNewName={handleNewName}
          handleNewNumber={handleNewNumber}
        />
      <h2>Numbers</h2>
        <Filter handler={handleNameFilter}/>
        <Persons persons={persons} deleteHandler={personDeleteHandler}/>
    </div>
  )
}

export default App