import React from 'react'
import CreateProduct from '../seller/CreateProduct'
import LeftNavbar from '../leftnavbar/LeftNavbar'
import { Outlet } from 'react-router-dom'
const SellerDashboard = () => {
  return (
    <div>
        <p>SellerDashboard</p>
        <div className='container'>
      <LeftNavbar/>
        </div> 
    </div>
  )
}

export default SellerDashboard
