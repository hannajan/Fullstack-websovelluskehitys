import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const id = blog.id
    dispatch(addComment(id, comment))
    setComment('')
  }

  if (!blog) return null

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={`https://${blog.url}`} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}type='text'
        />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
