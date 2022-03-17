import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'

import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from '@mui/material'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <FormControl>
        <InputLabel htmlFor="form-username">username</InputLabel>
        <Input
          id="form-username"
          onChange={({ target }) => setUsername(target.value)}
        ></Input>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="form-password">password</InputLabel>
        <Input
          id="form-password"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        ></Input>
      </FormControl>
      <Button type="submit">login</Button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container sx={{ m: 2 }}>
      <Typography variant="h4" textAlign="left" sx={{ p: 2 }}>
        Login to application
      </Typography>
      {loginForm()}
    </Container>
  )
}

export default Login
