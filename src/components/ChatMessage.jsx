import React from 'react'

const ChatMessage = ({ message, currentUser }) => {
  const { text, photoURL, createdAt, uid } = message
  return (
    <div className={`flex ${currentUser?.uid === uid ? 'justify-end' : ''}`}>
      <div className="flex flex-row items-end my-2 space-x-2">
        <div className="bg-black text-white pt-2 pb-1 px-2 rounded-xl w-fit max-w-lg flex-wrap">
          <img src={photoURL} alt="" />
          <p>{text}</p>
          <div className="text-tiny text-gray ml-8 text-right">
            {createdAt &&
              new Date(createdAt.seconds * 1000).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
