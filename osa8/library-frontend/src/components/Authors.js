import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR)

  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  if(!props.show) return null

  if(result.loading) return <div>loading...</div>

  const authors = result.data.allAuthors
  const authorNames = authors.map(a => {
    return { value: a.name, label: a.name }
  }
      
    )

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo: Number(birthyear)}})

    setName('')
    setBirthyear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
      <div>
        name <Select
          defaultValue={authorNames[0]}
          options={authorNames} 
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      
      <div>
        born <input value={birthyear}
          onChange={({ target }) => setBirthyear(target.value)}/>
      </div>
      <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
