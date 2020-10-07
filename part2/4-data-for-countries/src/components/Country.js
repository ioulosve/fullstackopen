import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country, weather}) => {
  if(!weather) {
    return null
  }

  return(
    <div>
      <h2>Weather in {country.capital}</h2>
      <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon"></img>
      <div>
        <b>Temperature:</b><span> {weather.main.temp} °C</span>
      </div>
      <div>
        <b>Description:</b><span> {weather.weather[0].description}</span>
      </div>
    </div>
  )
}

const Country = ({country}) => {

  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`

  useEffect(() => {
    axios
    .get(url)
    .then(response => {
      setWeather(response.data)
    })
  },[])

  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(lang => 
          <li key={lang.iso639_1}>{lang.name}</li>
        )}
      </ul>
      <img src={country.flag} width="400" alt="the country flag"/>
      <Weather country={country} weather={weather} />
    </div>
  )
}

export default Country