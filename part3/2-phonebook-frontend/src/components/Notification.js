import React from 'react'

const Notification = ({ message, dismissHandler }) => {

  //The notification is "hidden" when the message is null, i like it! 
  if (message.text === null) {
    return null
  }

  return (
    <div className={message.isError ? 'notification error' : 'notification'}>
      <div>{message.text}</div>
      <button onClick={dismissHandler}>X</button>
    </div>
  )
}

export default Notification

