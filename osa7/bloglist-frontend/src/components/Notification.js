import { Alert } from '@mui/material'

const Notification = ({ text, severity = 'success' }) => {
  if (text === null) {
    return null
  }

  return (
    <div>
      <Alert severity={severity}>
        {text}
      </Alert></div>
  )
}

export default Notification
