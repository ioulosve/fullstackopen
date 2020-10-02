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

  const [country, setCountry ] = useState('')
  const [countries, setCountries ] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data.map((countryEl) => {return {name: countryEl.name, id: countryEl.alpha2Code}}))
    })
  },[])

  const handleInputCountry = (event) => {
    setCountry(event.target.value)
    const filteredCountries = countries.filter(c => c.name.toUpperCase().includes(country.toUpperCase()))
    setCountries(filteredCountries)
  }

  return (
    <div>
      <div>find countries <input value={country} onChange={handleInputCountry}/></div>
      <div>{ country === '' ? <Error message="Please write something"/> : 
                              <CountriesList countries={countries}/>}
      </div>
    </div>
  );
}

export default App;
