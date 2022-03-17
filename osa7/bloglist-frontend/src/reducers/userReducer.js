import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data.user
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: { user },
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(showNotification('Logged in!', 5))
    } catch (e) {
      console.log(e)
      dispatch(showNotification('Wrong username or password!', 5))
    }
  }
}

export const checkForLoggedInUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }
}

export default userReducer
