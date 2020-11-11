const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
//Ill'use a docker image of mongodb. Start the container with start-mongo.sh script.
const url =  `mongodb://mongoadmin:${password}@0.0.0.0:27017/note-app?retryWrites=true&authSource=admin`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

//Define a Schema
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

// define a Model
const Note = mongoose.model('Note', noteSchema) //mongoose will create a collection with the plural of the Model name.

const note = new Note({
  content: 'Not important note',
  date: new Date(),
  important: false
})

// Those below are two operation on the db. Notice that they are callbacks, they will be called immediately and its not sure who will return first!

note.save().then(result => {
  console.log('note saved')

  //if the connection is not closed, the program will never finish its execution
  mongoose.connection.close()
})

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})