import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='container text-center mt-5'>
        <h1 className='display-1'>404</h1>
        <p className='lead'>Page Not Found</p>
        <Link to="/" className='btn btn-primary'>Go back to Home</Link>
    </div>
  )
}

export default NotFound