import blogsService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlogs(state, action) {
      console.log('here', action.payload)
      state.push(action.payload)
    },
    incrementBlogLikes(state, action) {
      const blog = action.payload
      console.log(blog)
      const likedBlog = { ...blog, likes: blog.likes + 1 }
      return state.map(b => b.id !== blog.id ? b : likedBlog).sort((a, b) => b.likes - a.likes)
    },
    removeBlogFromArray(state, action) {
      const id = action.payload.id
      return state.filter(blog => blog.id !== id)
    },
    appendBlogComments(state, action) {
      const id = action.payload.id
      const comment = action.payload.comment
      const blog = state.find(blog => blog.id === id)
      blog.comments = blog.comments.concat(comment)
      state.map(b => b.id !== id ? b : blog)
    }
  }
})

export const { setBlogs, appendBlogs, incrementBlogLikes, removeBlogFromArray, appendBlogComments } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogsService.create(blog)
    dispatch(appendBlogs(returnedBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogsService.update({ id: blog.id, updatedBlog })
    dispatch(incrementBlogLikes(blog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogsService.remove(id)
    dispatch(removeBlogFromArray(id))
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    await blogsService.addComment(id, comment)
    dispatch(appendBlogComments({
      id,
      comment
    }))
  }
}

export default blogsSlice.reducer