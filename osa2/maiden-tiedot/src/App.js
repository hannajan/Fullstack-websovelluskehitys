import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleChange}/>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        capital {country.capital}
        <br></br>
        population {country.population}
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="flag of country" width="150" />
      </div>
    </div>
  )
}



const Countries = ({ filter, countries, setFilter}) => {
  let toShow = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  const handleClick = (event) => {
    toShow = countries.find((country) => country.name === event.target.value)
    setFilter(toShow.name)
  }

  if (toShow.length === 1){
    return (
      <Country country={toShow[0]} />
      )
  } else if(toShow.length < 11) {
    return (
      <div>
        {toShow.map((country) => 
          <p key={country.alpha3Code}>{country.name}<button onClick={handleClick} value={country.name}>show</button></p>)
        }
      </div>
    )
  } else {
    return <p>Too many matches, specify another filter</p>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilterChange} />
      {countries.length ? 
        <Countries filter={filter} countries={countries} setFilter={setFilter}/>
        : <p>not found</p>
      }
    </div>
  )
}

export default App
