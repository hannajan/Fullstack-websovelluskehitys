import { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, Button, FormControl, InputLabel, Input } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
      likes: 0,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box component='div' className="formDiv" m={2}>
      <Typography variant='h6'>Create new</Typography>
      <form onSubmit={addBlog}>
        <FormControl>
          <InputLabel htmlFor='title'>title</InputLabel>
          <Input
            id='title'
            value={title}
            placeholder='write title here'
            onChange={({ target }) => setTitle(target.value)}>
          </Input>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='author'>author</InputLabel>
          <Input
            id='author'
            value={author}
            placeholder="write author here"
            onChange={({ target }) => setAuthor(target.value)}></Input>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='url'>url</InputLabel>
          <Input
            id='url'
            value={url}
            placeholder="write url here"
            onChange={({ target }) => setUrl(target.value)}></Input>
        </FormControl>
        <Button id="submit-button" type="submit" variant='contained'>
          create
        </Button>
      </form>
    </Box>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
