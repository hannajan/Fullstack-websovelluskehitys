import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  const result2 = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  if(result.loading || result2.loading) return <div>loading...</div>

  const books = result.data.allBooks
  const genres = result2.data.allGenres

  return (
    <div>
      <h2>books</h2>
      {genre ? <p>in genre <strong>{genre}</strong></p> : <strong>all genres</strong>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => 
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      )}<button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
