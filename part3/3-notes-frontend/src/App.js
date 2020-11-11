import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

// This code is just for theory purpose.

const App = () => {

  // Lo stato è un proprietà privata di un componente. Sopravvive al re-rendering del componente.
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({text:'', isImportant:false})
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null) 

  // Effects are executed immediately after rendering or when certain values have changed (second parameter)
  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        // a call to a state-updating function triggers the re-rendering of the component.
        // this means that the function of component const App = () => {...} gets executed.
        setNotes(initialNotes)
      })
  }, []) //this empty array is a parameter of useEffect that specifies how ofter the effect is run

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    //this prevents the default action of submitting a form of HTML5 which causes the page to reload. 
    event.preventDefault()
    const noteObject =  {
      //id is missing because we want the server to assign an id to the note
      content: newNote.text,
      date: new Date().toISOString(),
      important: newNote.isImportant
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote({isImportant: false, text:''}) // this just reset the input field
      })
  }

  const handleNoteChange = (event) => {
    setNewNote({...newNote, text:event.target.value})
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    /* DON'T DO
       note.important = !note.important 
       THIS MODIFIES A STATE VARIABLE! (notes)
    */
    const changedNote = { ...note, important:!note.important }
    
    //HTTP PUT exchanges an existing resource with a new one.
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        // the server returns the new note in response.data
        // ALWAYS UPDATE THE FRONTEND WITH DATA FROM THE SERVER!
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      //Error handling! :D
      .catch(error => {
        setErrorMessage(`the note '${note.content}' was already deleted from the server`)
        setTimeout(() => setErrorMessage(null), 5000)

        setNotes(notes.filter(n => n.id !== id)) //all notes that are not this one
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} dismissHandler={() => setErrorMessage(null)}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important only' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note,i) => 
          <Note key={i} 
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
                />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote.text}
          onChange={handleNoteChange}  
        />
        <button type="submit">save</button><span> is important?</span>
        <input type="checkbox" checked={newNote.isImportant} onChange={(event) => {setNewNote({...newNote, isImportant: event.target.checked})}}></input>
      </form>
    </div>
  )
}

export default App