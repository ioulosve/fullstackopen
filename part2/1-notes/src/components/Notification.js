import React from 'react'

const Notification = ({ message, dismissHandler }) => {

  //The notification is "hidden" when the message is null, i like it! 
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      <p>{message}</p>
      <button onClick={dismissHandler}>X</button>
    </div>
  )
}

export default Notification

