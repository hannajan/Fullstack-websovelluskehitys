const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data.text
  case 'RESET_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  }
}

export const setNotification = (text) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { text },
  }
}

export const showNotification = (text, seconds) => {
  return dispatch => {
    dispatch(setNotification(text))
    setTimeout(() => {
      dispatch(resetNotification())
    }, seconds * 1000)
  }
}

export default notificationReducer
