import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogsReducer'
import {
  Container,
  Button,
  Typography,
  FormControl,
  Input,
  InputAdornment,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TableRow,
  TableCell,
} from '@mui/material'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import AddCommentIcon from '@mui/icons-material/AddComment'

const Blog = ({ blog }) => {
  return (
    <TableRow>
      <TableCell>
        <Button component={Link} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Button>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
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
    <>
      <Container component="div" sx={{ mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {blog.title} {blog.author}
        </Typography>
        <Button
          href={`https://${blog.url}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ p: 0 }}
        >
          {blog.url}
        </Button>
        <Typography sx={{ mt: 1, mb: 3 }}>
          {blog.likes} likes{' '}
          <Button
            variant="contained"
            size="small"
            onClick={() => dispatch(likeBlog(blog))}
          >
            like
          </Button>
        </Typography>
        <Typography>
          <em>added by</em> {blog.user.name}
        </Typography>
      </Container>
      <Container sx={{ mt: 2, borderTop: 'solid', borderWidth: 1.5 }}>
        <Typography variant="h6">comments</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Input
              id="add-comment"
              value={comment}
              startAdornment={
                <InputAdornment position="start">
                  <AddCommentIcon />
                </InputAdornment>
              }
              onChange={({ target }) => setComment(target.value)}
            ></Input>
          </FormControl>
          <Button type="submit" variant="outlined" size="small">
            add comment
          </Button>
        </form>
        <Box sx={{ bgcolor: 'background.paper' }}>
          <List sx={{ mt: 3 }}>
            {blog.comments.map((comment) => (
              <ListItem key={comment} disablePadding sx={{ mb: 1 }}>
                <ListItemIcon>
                  <ModeCommentIcon />
                </ListItemIcon>
                <ListItemText primary={comment} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </>
  )
}

export default Blog
