import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_BLOGS':
    return action.data.blogs
  case 'APPEND_BLOGS':
    return state.concat(action.data.blog)
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

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export default blogsReducer