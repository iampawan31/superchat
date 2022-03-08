import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useRef, useState, useEffect } from 'react'
import { db } from '../firebase-config'
import ChatMessage from './ChatMessage'

const ChatRoom = ({ messages, currentUser }) => {
  const dummy = useRef()
  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    const { uid, photoURL } = currentUser

    await addDoc(collection(db, 'messages'), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    })

    setFormValue('')
  }

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="relative h-full">
      <div className="px-4 pb-14 h-full overflow-y-auto flex flex-col">
        {messages &&
          messages.map((msg) => {
            return (
              <ChatMessage
                key={msg.id}
                currentUser={currentUser}
                message={msg}
              />
            )
          })}
        <span ref={dummy}></span>
      </div>
      <div className="absolute w-full pt-4 bottom-0 left-0 right-0">
        <div onSubmit={sendMessage} className="flex">
          <input
            className="w-full border-t-2 rounded-bl px-2 py-2 text-primary border-primary"
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-primary px-2 py-2 rounded-br text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
