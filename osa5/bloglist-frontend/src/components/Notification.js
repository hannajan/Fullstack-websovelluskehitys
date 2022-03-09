const Notification = ({ text }) => {
  if (text === null) {
    return null
  }

  return (
    <div className="message">
      {text}
    </div>
  )
}

export default Notification