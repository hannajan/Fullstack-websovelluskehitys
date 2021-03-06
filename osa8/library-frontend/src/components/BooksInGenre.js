import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const BooksInGenre = ({ genre }) => {
    const result = useQuery(ALL_BOOKS, {
      variables: { genre }
    })
  
  if(result.loading) return <div>loading...</div>
  const books = result.data.allBooks

  return (
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
  )
}

export default BooksInGenre