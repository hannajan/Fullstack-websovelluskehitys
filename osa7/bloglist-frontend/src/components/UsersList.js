import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializeUsersList } from '../reducers/usersListReducer'
import { useParams, Link } from 'react-router-dom'


const User = ({ user }) => {
  return (
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsersList())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map(user => <User key={user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  )
}

export const UserView = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(user => user.id === id)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsersList())
  }, [dispatch])

  if(!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default Users
