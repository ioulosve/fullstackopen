require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

//MongoDB Models
const Note = require('./models/note')
const { response } = require('express')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json()) // Is a MIDDLEWARE needed to trasform json POST requests to Javascript objects.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

// Get app info
app.get('/info', (req,res) => {
  Note.find({}).then(notes => {
    res.send(`
    <div>
      <p>Notes has ${notes.length} notes</p>
      <p>${new Date().toString()}</p>
    </div>
  `)
  })
})

// Get all notes
app.get('/api/notes', (req,res) => {
  // Search in the DB
  Note.find({}).then(notes => {
    //this calls the toJSON method in Mongoose
    res.json(notes)
  })  
})

// Get a single note
app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id

  Note.findById(id).then(note => {
    res.json(note)
  })

  // if(!note) {
  //   res.status(404).end()
  //   console.log(`Note with id ${id} not found`)
  //   return
  // }
})

// Create a new note
app.post('/api/notes', (req, res) => {
  const body = req.body

  if(!body.content) {
    return res.status(400).json({
      error: 'Content is missing'
    })
  }
  
  // note a is MongoDB Note object
  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
})

// Delete a note
app.delete('/api/notes/:id', (req,res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)

  if(!note) {
    res.status(404).end()
    console.log(`Note to delete with id ${id} not found`)
    return
  }
  
  notes = notes.filter(n => n.id !== id)
  res.status(200).json({
    message: `Note with id ${id} deleted.`
  })
})

// Modify a note
app.put('/api/notes/:id', (req,res) => {
  //check if note to update exists
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)

  if(!note) {
    res.status(404).end()
    console.log(`Note to update with id ${id} not found`)
    return
  }
  
  //update it
  const body = req.body
  note.important = body.important //does it update it also in the list? yes

  //return updated note
  res.status(200).json(note);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
