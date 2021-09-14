import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleChange}/>
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState([])


  useEffect(() => {  
    const params = {
    access_key: api_key,
    query: country.capital
  }
    axios
     .get('http://api.weatherstack.com/current', {params})
     .then(response => {
       setWeather(response.data)
     })
  }, [country.capital])

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
        <h2>Weather in {country.capital}</h2>
        {weather.length !== 0 ?
          <div>
            <strong>temperature: </strong>{weather.current.temperature} Celsius
            <br></br>
            <img src={weather.current.weather_icons[0]} alt="weather icon" width="50" />
            <br></br>
            <strong>wind: </strong>{weather.current.wind_speed} mph direction {weather.current.wind_dir}
          </div>        
        :
          <div></div>
        }
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
