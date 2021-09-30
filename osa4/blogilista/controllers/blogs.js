const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if(!request.body.title || !request.body.url) {
    response.status(400).send({ error: 'title or url missing' })
  } else {
  let blog = new Blog(request.body)

  if(!blog.likes) blog.likes = 0 

  const result = await blog.save()
  response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  } catch(e) {
    response.status(400).json({ error: 'invalid id' })
  }
})

module.exports = blogsRouter