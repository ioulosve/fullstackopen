import React from 'react'

const Persons = ({persons, deleteHandler}) => (
  <ul>
    {persons.map(person =>
      <div key={person.id}>
        <li>{person.name} {person.number}</li>
        <button onClick={() => deleteHandler(person.id)}>delete</button>
      </div>
    )}
  </ul>
)

export default Persons