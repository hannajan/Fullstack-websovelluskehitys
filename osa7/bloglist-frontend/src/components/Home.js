import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { showNotification } from '../reducers/notificationReducer'
import { addBlog, likeBlog, removeBlog } from '../reducers/blogsReducer'
import {
  TableContainer,
  Typography,
  Paper,
  Table,
  TableBody,
} from '@mui/material'

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(newBlog))
      dispatch(
        showNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          5
        )
      )
    } catch (e) {
      if (e.message === 'Request failed with status code 401') {
        dispatch(
          showNotification('Unauthorized request. Try signing in again.', 5)
        )
      } else {
        dispatch(
          showNotification(
            'Blog could not be added. Title, author and url are required!',
            5
          )
        )
      }
    }
  }

  return (
    <div>
      <Typography variant="h4" color="inherit" sx={{ mb: 2 }}>
        Blogs
      </Typography>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={() => dispatch(likeBlog(blog))}
                user={user}
                handleRemove={() => dispatch(removeBlog(blog.id))}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home
