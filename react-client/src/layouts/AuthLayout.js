import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className='authLayoutContainer'>
        <Outlet/>
    </div>
  )
}

export default AuthLayout