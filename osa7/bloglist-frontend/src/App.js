import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { showNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state)

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
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
    window.localStorage.clear()
    setUser(null)
    dispatch(showNotification('Logged out!', 5))
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))

      dispatch(showNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        5
      ))
    } catch (e) {
      console.log(e)
      dispatch(showNotification(
        'Blog could not be added. Title, author and url are required!',
        5
      ))
    }
  }

  const likeBlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    const returnedBlog = await blogService.update({ id: blog.id, updatedBlog })
    const updatedBlogsArray = await blogs
      .map((b) => (blog.id === b.id ? returnedBlog : b))
      .sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogsArray)
  }

  const removeBlog = async ({ id }) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((b) => b.id !== id))
    } catch (e) {
      console.log(e)
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
          handleLike={likeBlog}
          user={user}
          handleRemove={removeBlog}
        />
      ))}
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )
}

export default App
