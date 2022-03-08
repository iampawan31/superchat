import React from 'react'
import { logout } from '../firebase-config'

const MobileHeader = ({ user }) => {
  return (
    <div className="md:hidden bg-primary flex justify-between content-center py-2 px-2">
      <div className="text-lg">Web Chat</div>
      {user && (
        <button
          onClick={logout}
          className="bg-white text-primary px-2 py-1 rounded"
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default MobileHeader
