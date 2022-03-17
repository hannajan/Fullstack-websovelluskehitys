import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, Typography, Container } from '@mui/material'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(showNotification('Logged out!', 5))
  }

  if (!user) return null

  return (
    <Container align='right' component='span' sx={{ p: '1em' }}>
      <Typography fontSize={12} component="div" mb={1}>{user.name} logged in</Typography>
      <Button variant='contained' onClick={handleLogout}>logout</Button>
    </Container >
  )
}

export default Logout
