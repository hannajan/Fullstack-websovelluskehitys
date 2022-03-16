import blogsService from '../services/blogs'


const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_BLOGS':
    return action.data.blogs
  case 'APPEND_BLOGS':
    return state.concat(action.data.blog)
  case 'LIKE_BLOG': {
    const id = action.data.blog.id
    const blogToLike = state.find(blog => blog.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
    return state.map(blog => blog.id !== id ? blog : likedBlog).sort((a, b) => b.likes - a.likes)
  }
  case 'REMOVE_BLOG': {
    const id = action.data.id
    return state.filter(blog => blog.id !== id)
  }
  default:
    return state
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: { blogs }
  }
}

export const appendBlogs = (blog) => {
  return {
    type: 'APPEND_BLOGS',
    data: { blog }
  }
}

export const incrementBlogLikes = (blog) => {
  return {
    type: 'LIKE_BLOG',
    data: { blog }
  }
}

export const removeBlogFromArray = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: { id }
  }
}

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
    const returnedBlog = await blogsService.update({ id: blog.id, updatedBlog })
    dispatch(incrementBlogLikes(returnedBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogsService.remove(id)
    dispatch(removeBlogFromArray(id))
  }
}

export default blogsReducer