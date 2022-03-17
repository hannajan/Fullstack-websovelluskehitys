import Logout from './Logout'
import { Link } from 'react-router-dom'

const Menu = (user) => {
  const style = {
    backgroundColor: 'grey',
    padding: 10,
    marginBottom: 5
  }

  const padding = {
    padding: 5
  }
  return (
    <div style={style}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to='/users'>users</Link> {user ? <Logout /> : null}
    </div>
  )
}

export default Menu
