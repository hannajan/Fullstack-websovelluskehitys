import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { showNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs, likeBlog, removeBlog } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { checkForLoggedInUser, loginUser, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkForLoggedInUser())
  }, [dispatch])

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

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(showNotification('Logged out!', 5))
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(newBlog))
      dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
    } catch (e) {
      if(e.message === 'Request failed with status code 401') {
        dispatch(showNotification('Unauthorized request. Try signing in again.', 5))
      } else {
        dispatch(showNotification('Blog could not be added. Title, author and url are required!', 5))
      }
    }
  }

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

  if (user === null) {
    return (
      <div>
        <Notification text={notification} />
        <h2>Login to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification text={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => dispatch(likeBlog(blog))}
          user={user}
          handleRemove={() => dispatch(removeBlog(blog.id))}
        />
      ))}
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
    </div>
  )
}

export default App
