import React, { useState, useEffect } from 'react';
import Country from './components/Country'
import axios from 'axios'

const Error = ({message}) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

const CountriesList = ({countries, setFilter, filter}) => {

  if(filter === '') {
    return (
      <div>
        <Error message="Please write something"/>
      </div>
    )
  }
  if(countries.length === 0) {
    return (
      <div>
        <Error message="No matches"/>
      </div>
    )
  }
  if(countries.length === 1) {
    return(
      <Country country={countries[0]} />
    )
  }
  if(countries.length > 10) {
    return (
      <div>
        <Error message="Too many matches, specify another filter"/>
      </div>
    )
  } else {
    return (
      <div>
        {countries.map((country) => 
          <div key={country.alpha2Code}>
            <span>{country.name}</span>
            <button onClick={() => setFilter(country.name)}>show</button>
          </div>
        )}
      </div>
    )
  }
}

const App = () => {

  const [filter, setFilter ] = useState('')
  const [countries, setCountries ] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])

  const handleInputCountry = (event) => {
    setFilter(event.target.value)
  }
  
  //non settare lo stato countries per il filtro!
  const filteredCountries = filter.length === 1 ? 
    countries : 
    countries.filter(c => c.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleInputCountry}/>
      </div>
      <div>
        <CountriesList countries={filteredCountries} filter={filter} setFilter={setFilter}/>
      </div>
    </div>
  );
}

export default App;
