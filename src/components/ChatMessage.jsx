import React from 'react'

const ChatMessage = ({ message, currentUser }) => {
  const { text, photoURL } = message
  const messageClass = ''
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="" />
      <p>{text}</p>
    </div>
  )
}

export default ChatMessage
