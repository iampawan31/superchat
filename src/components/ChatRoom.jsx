import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
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
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className="container mx-auto max-w-3/6 w-3/6 flex justify-center bg-gray flex-col px-2 py-2 rounded shadow h-1/3  overflow-y-auto">
      <main className="h-48">
        {messages &&
          messages.map((msg) => {
            return <ChatMessage key={msg.id} message={msg} />
          })}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} method="post">
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default ChatRoom
