import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

// This code is just for theory purpose.

const App = () => {

  // Lo stato è un proprietà privata di un componente. Sopravvive al re-rendering del componente.
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({text:'', isImportant:false})
  const [showAll, setShowAll] = useState(true)

  // Effects are executed immediately after rendering or when certain values have changed (second parameter)
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        // a call to a state-updating function triggers the re-rendering of the component.
        // this means that the function of component const App = () => {...} gets executed.
        setNotes(response.data)
      })
  }, []) //this empty array is a parameter of useEffect that specifies how ofter the effect is run

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    //this prevents the default action of submitting a form of HTML5 which causes the page to reload. 
    event.preventDefault()
    const noteObject =  {
      id: notes.length +1,
      content: newNote.text,
      date: new Date().toISOString(),
      important: newNote.isImportant
    }

    //remember that with have to use concat insted of push because we cannot mutate the state directly but make a copy of it.
    setNotes(notes.concat(noteObject))
    setNewNote({isImportant: false, text:''}) // this just reset the input field
  }

  const handleNoteChange = (event) => {
    setNewNote({...newNote, text:event.target.value})
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote.text}
          onChange={handleNoteChange}  
        />
        <button type="submit">save</button>
        is important?
        <input type="checkbox" checked={newNote.isImportant} onChange={(event) => {setNewNote({...newNote, isImportant: event.target.checked})}}></input>
      </form>
    </div>
  )
}

export default App