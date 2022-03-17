import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(showNotification('Logged out!', 5))
  }

  if(!user) return null

  return (
    <span>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </span>
  )
}

export default Logout
