import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotificationMessage(state, action) {
          return action.payload
        },
        resetNotification(state, action) {
            return null
        }
    }
})

export const { setNotificationMessage, resetNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
      dispatch(resetNotification())  
    }, seconds * 1000)
  }   
}
export default notificationSlice.reducer