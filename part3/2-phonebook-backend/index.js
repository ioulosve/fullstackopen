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

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "040-654321"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

const generateId = () => {
  let newId = 0

  // Fa cagare questa soluzione
  do {
    newId = Math.floor(Math.random() * Math.floor(999999))
  }
  while(persons.find(p => p.id === newId));
  
  return newId
}

app.get('/info', (req,res) => {
  res.send(`
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date().toString()}</p>
    </div>
  `)
})

app.get('/api/persons', (req,res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if(!person) {
    res.status(404).end()
    console.log(`Person with id ${id} not found`)
    return
  }

  res.json(person)

})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name) {
    return res.status(400).json({
      error: 'name is missing'
    })
  }

  if(!body.number) {
    return res.status(400).json({
      error: 'number is missing'
    })
  }

  if(persons.some(p => p.name === body.name)) {
    return res.status(400).json({
      error: `A person named ${body.name} already exists in the phonebook. Name must be unique.`
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if(!person) {
    res.status(404).end()
    console.log(`Person to delete with id ${id} not found`)
    return
  }
  
  persons = persons.filter(p => p.id !== id)
  res.status(200).json({
    message: `Person with id ${id} deleted.`
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
