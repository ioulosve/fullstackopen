const express = require('express')
const app = express()

app.use(express.json()) // needed to trasform json POST requests to Javascript objects.

// This is a middleware function, it takes 3 arguments
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger) // custom middleware function declared below

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

const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => n.id)) 
    : 0
  return maxId + 1
}

/**** Routes ****/
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

app.post('/api/notes', (request, response) => {
  const body = request.body // without the app.use(express.json()), this will be undefined.
  
  /* We cannot rely on what the client is sending to create the new note.
  /  We have to check that the request is correct and get only the necessary fields
  /  discarding all the others.  
  */

  // check req correctness
  if(!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // get only body.content and body.important. 
  // IMP: NON é il CLIENT che crea l'oggetto nota ma è il SERVER!!
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)
  response.json(note)
})

app.delete('/api/notes/:id', (req,res) => {
  console.log('gne')
  const id = Number(req.params.id)
  console.log(id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end() //204 means 'no content'
})


/*** Before-routes middlewares */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error:'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
