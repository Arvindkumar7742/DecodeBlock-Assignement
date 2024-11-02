import React from 'react'
import DeleteAccount from './DeleteAccount'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'

export const Settings = () => {

  return (
    <div>
       <h1 className="mb-14 text-3xl font-medium text-indigo-500">
        Edit Profile
      </h1>
      <EditProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
    </div>
  )
}
