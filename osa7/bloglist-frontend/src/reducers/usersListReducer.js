import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersListSlice = createSlice({
  name: 'usersList',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = usersListSlice.actions

export const initializeUsersList = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}
export default usersListSlice.reducer
