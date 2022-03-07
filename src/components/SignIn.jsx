import React, { useState } from 'react'
import { logInWithEmailAndPassword } from '../firebase-config'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('test123')

  const loginUser = async () => {
    await logInWithEmailAndPassword(email, password)
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-primary text-white px-4 py-2 rounded shadow w-2/6 max-w-2/6">
          <div className="text-3xl font-bold text-center">
            Sign-in to start chat
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="px-4 py-2 rounded border border-primary text-black"
              type="email"
              name="email"
              placeholder="john@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Password</label>
            <input
              className="px-4 py-2 rounded border border-primary text-black"
              type="password"
              name="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={loginUser}
              className="w-full px-4 py-1 rounded bg-white text-primary text-lg font-bold my-6"
            >
              Login
            </button>
          </div>
          <hr />
          <div className="my-2 uppercase">
            Use one of the credentials to login
          </div>
          <div>
            <ul className="list-disc list-inside">
              <li>testuser1@gmail.com</li>
              <li>testuser2@gmail.com</li>
              <li>testuser3@gmail.com</li>
              <li>testuser4@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
