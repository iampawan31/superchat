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
import { auth, db } from './firebase-config'
import Header from './components/Header'
import MobileHeader from './components/MobileHeader'

const App = () => {
  const [user, setUser] = useState(null)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="h-screen min-h-fit bg-black text-white">
        <Header user={user} />
        <div className="flex justify-center">
          <div className="bg-white md:shadow md:rounded-lg min-h-screen md:min-h-fit md:w-2/3 md:-m-28 h-screen md:h-screen-75 container mx-auto">
            <MobileHeader user={user} />
            {user ? (
              <ChatRoom messages={messages} currentUser={user} />
            ) : (
              <SignIn />
            )}
          </div>
        </div>
        <div className="hidden md:block fixed bottom-0 left-0 right-0 text-center w-full">
          Pawan Kumar - {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}

export default App
