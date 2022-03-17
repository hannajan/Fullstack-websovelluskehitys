import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializeUsersList } from '../reducers/usersListReducer'

const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
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

export default Users
