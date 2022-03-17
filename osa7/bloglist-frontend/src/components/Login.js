import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
      dispatch(showNotification('Logged in!', 5))
    } catch (e) {
      console.log(e)
      dispatch(showNotification('Wrong username or password!', 5))
    }
  }

  return (
    <div>
      <h2>Login to application</h2>
      {loginForm()}
    </div>
  )
}

export default Login