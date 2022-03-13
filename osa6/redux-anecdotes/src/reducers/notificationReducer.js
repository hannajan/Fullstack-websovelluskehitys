import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            const message = action.payload
            return message
        },
        resetNotification(state, action) {
            return null
        }
    }
})

export const { setNotification , resetNotification } = notificationSlice.actions
export default notificationSlice.reducer