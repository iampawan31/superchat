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
    <div className="">
      <div className="">
        <div>
          {messages &&
            messages.map((msg) => {
              return <ChatMessage key={msg.id} message={msg} />
            })}
          <span ref={dummy}></span>
        </div>
        <div className="">
          <form onSubmit={sendMessage} method="post" className="flex">
            <input
              className="flex flex-grow"
              type="text"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
