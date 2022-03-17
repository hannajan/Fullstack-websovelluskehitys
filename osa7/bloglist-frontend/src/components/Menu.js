import Logout from './Logout'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, MenuItem, Typography } from '@mui/material'

const Menu = (user) => {
  /*   const style = {
    backgroundColor: 'grey',
    padding: 10,
    marginBottom: 5
  } */

  return (
    <AppBar position="static">
      <Toolbar>
        <MenuItem key="blogs" component={Link} to="/">
          <Typography textAlign="center" fontSize={20}>Blogs</Typography>
        </MenuItem>
        <MenuItem key="users" component={Link} to="/users">
          <Typography textAlign="center" fontSize={20}>Users</Typography>
        </MenuItem>
        {user ? <Logout /> : null }
      </Toolbar>
    </AppBar>
  )
}

export default Menu
