import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Error = ({message}) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

const CountriesList = ({countries}) => (
  <div>
    {countries.map((country) => 
      <p key={country.id}>{country.name}</p>
    )}
  </div>
)

const App = () => {

  const [filter, setFilter ] = useState('')
  const [countries, setCountries ] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data.map((countryEl) => {return {name: countryEl.name, id: countryEl.alpha2Code}}))
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
      <div>find countries <input value={filter} onChange={handleInputCountry}/></div>
      <div>{ filter === '' ? <Error message="Please write something"/> : 
                              <CountriesList countries={filteredCountries}/>}
      </div>
    </div>
  );
}

export default App;
