import React, { useState } from 'react'
import { logInWithEmailAndPassword } from '../firebase-config'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('test123')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  const loginUser = async () => {
    if (!email) {
      setEmailError('Please select the correct email')
      return
    }
    if (!password) return
    setLoading(true)
    await logInWithEmailAndPassword(email, password)
    setLoading(false)
  }

  return (
    <div className="container mx-auto min-h-fit h-full">
      <div className="text-3xl pt-24 text-primary text-center font-bold">
        Sign-in to start chat
      </div>
      <div className="mx-auto w-1/3">
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <select
            className={`px-4 w-full py-4 rounded border bg-white ${
              emailError ? 'border-red' : 'border-primary'
            } text-black`}
            defaultValue="selectAnEmail"
            name="email"
            placeholder="john@doe.com"
            onChange={(e) => {
              setEmail(e.target.value)
              if (!e.target.value) {
                setEmailError('Please select the correct email')
              } else {
                setEmailError('')
              }
            }}
          >
            <option disabled value="selectAnEmail">
              Select an email
            </option>
            <option value="testuser1@gmail.com">Test User 1</option>
            <option value="testuser2@gmail.com">Test User 2</option>
            <option value="testuser3@gmail.com">Test User 3</option>
            <option value="testuser4@gmail.com">Test User 4</option>
          </select>
          <span className="text-red font-semibold text-xs">{emailError}</span>
        </div>
        <div className="mb-2">
          <label className="pt-4" htmlFor="email">
            Password
          </label>
          <input
            className={`px-4 py-3 w-full rounded border text-black ${
              passwordError ? 'border-red' : 'border-primary'
            } text-black`}
            type="password"
            name="password"
            placeholder="*******"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (e.target.value !== 'test123') {
                setPasswordError('Please enter test123 as password')
              } else if (e.target.value === 'test123') {
                setPasswordError('')
              }
            }}
          />
          <span className="text-red font-semibold text-xs">
            {passwordError}
          </span>
        </div>

        <button
          onClick={loginUser}
          className="w-full px-4 h-12  rounded bg-primary text-white text-lg font-bold my-6 flex justify-center items-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Login'
          )}
        </button>
      </div>
    </div>
  )
}

export default SignIn
