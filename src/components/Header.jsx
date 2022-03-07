import React from 'react'
import { logout } from '../firebase-config'

const Header = ({ user }) => {
  return (
    <div className="h-60 bg-primary">
      <div className="container mx-auto px-24 pt-10">
        <div className="flex justify-between">
          <div className="text-3xl font-semibold">Chat Web</div>
          {user && (
            <div>
              <button
                className="uppercase bg-white text-primary rounded shadow px-2 py-1"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
