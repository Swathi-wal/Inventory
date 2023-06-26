import React from 'react'
//if any error occured in routing 
import {useRouteError} from 'react-router-dom'
const ErrorPage = () => {
    let error=useRouteError()
  return (
    <div className='text-center'>ErrorPage
    <h2 className='text-warning'>{error.statusText}</h2>
    <h2 className='text-danger'>{error.data}</h2>
    </div>
  )
}

export default ErrorPage
