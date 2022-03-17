import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
import Notification from './components/Notification'
import Users, { UserView } from './components/UsersList'

import { initializeBlogs } from './reducers/blogsReducer'
import { checkForLoggedInUser } from './reducers/userReducer'
import { BlogView } from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkForLoggedInUser())
  }, [dispatch])

  return (
    <div>
      <Notification text={notification} />
      {user ? <Logout /> : null }
      <Routes>
        <Route path='/users/:id' element={<UserView />} />
        <Route path='/blogs/:id' element={<BlogView />} />
        <Route path='/users' element={<Users />} />
        <Route path="/" element={user ? <Home /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App
