import React from 'react'
import DeleteAccount from './DeleteAccount'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'

export const Settings = () => {

  return (
    <div>
       <h1 className="mb-14 text-3xl font-medium text-[#6670f6]">
        Edit Profile
      </h1>
      <EditProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
    </div>
  )
}
