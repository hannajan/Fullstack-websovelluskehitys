import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'initial notification',
    reducers: {
        setNotification(state, action) {
            const message = action.payload
            return message
        }
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer