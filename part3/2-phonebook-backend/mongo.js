const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

//Ill'use a docker image of mongodb. Start the container with start-mongo.sh script.
const url =  `mongodb://mongoadmin:${password}@0.0.0.0:27017/phonebook-app?retryWrites=true&authSource=admin`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

//Define a Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

// define a Model (based on the schema)
const Person = mongoose.model('Person', personSchema)

// node mongo.js password name number
if (process.argv.length == 5) {
  
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  
  person
    .save()
    .then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

// node mongo.js password
if(process.argv.length == 3) {
  Person
  .find({})
  .then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
