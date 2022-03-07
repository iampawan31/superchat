import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import ChatRoom from './components/ChatRoom'
import SignIn from './components/SignIn'
import { auth, db, logout } from './firebase-config'

const App = () => {
  const [user, setUser] = useState(() => auth.currentUser)
  const [messages, setMessages] = useState([])
  const [initializing, setInitializing] = useState(true)

  const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(100))

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      setMessages(data)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
      if (initializing) {
        setInitializing(false)
      }
    })

    // Cleanup subscription
    return unsubscribe
  }, [initializing])

  return (
    <div className="App">
      <div className="h-full min-h-screen">
        {user ? (
          <ChatRoom messages={messages} currentUser={user} />
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  )
}

export default App
