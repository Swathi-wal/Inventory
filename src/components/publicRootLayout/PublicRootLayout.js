import React from 'react'
import {Outlet} from 'react-router-dom'
const PublicRootLayout = () => {
  return (
    <div>
      <Outlet/>
    </div>

  )
}

export default PublicRootLayout
