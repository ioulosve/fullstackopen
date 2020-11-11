const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json()) // Is a MIDDLEWARE needed to trasform json POST requests to Javascript objects.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    },
    {
      id: 4,
      content: "new note",
      date: "2020-10-05T15:59:45.604Z",
      important: false
    },
    {
      id: 5,
      content: "mmm gne",
      date: "2020-10-05T15:59:57.341Z",
      important: false
    }
  ]

const generateId = () => {
  let newId = 0

  // Fa cagare questa soluzione
  do {
    newId = Math.floor(Math.random() * Math.floor(999999))
  }
  while(notes.find(n => n.id === newId));
  
  return newId
}

app.get('/info', (req,res) => {
  res.send(`
    <div>
      <p>Notes has ${notes.length} notes</p>
      <p>${new Date().toString()}</p>
    </div>
  `)
})

app.get('/api/notes', (req,res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)

  if(!note) {
    res.status(404).end()
    console.log(`Note with id ${id} not found`)
    return
  }

  res.json(note)

})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if(!body.content) {
    return res.status(400).json({
      error: 'Content is missing'
    })
  }
  
  const note = {
    id: generateId(),
    content: body.content,
    date: new Date().toISOString(),
    important: body.important
  }

  notes = notes.concat(note)
  res.json(note)
})

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
