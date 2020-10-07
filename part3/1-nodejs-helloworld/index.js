const express = require('express')
const app = express()

let notes = [
  { id: 1, 
    content: "HTML is easy", 
    date: "2019-05-30T17:30:31.098Z", 
    important: true 
  }, 
  { 
    id: 2, 
    content: "Browser can execute only Javascript", 
    date: "2019-05-30T18:39:34.091Z", 
    important: false 
  }, 
  { 
    id: 3, 
    content: "GET and POST are the most important methods of HTTP protocol", 
    date: "2019-05-30T19:20:14.298Z", 
    important: false 
  }
]

app.get('/', (req,res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)

  if(note) {
    res.json(note)
  } else {
    //if the resource requested doesn't exists, reply with 404
    res.status(404).end()
  }
})

app.delete('api/notes/:id', (req,res) => {
  console.log('gne')
  const id = Number(req.params.id)
  console.log(id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end() //204 means 'no content'
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
