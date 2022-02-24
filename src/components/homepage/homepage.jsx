import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
        <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Movie Ticket Booking App</h1>
        <p class="col-md-8 fs-4">An app where you can book tickets for a show and at the same time provide services for the same</p>
        <Link class="btn btn-primary btn-lg m-2" to='/user/register'>Register a new user</Link>
        <Link class="btn btn-primary btn-lg m-2" to='/user/login'>Login as a user</Link>
        <Link class="btn btn-primary btn-lg m-2" to='/provider/register'>Register as a Provider</Link>
        <Link class="btn btn-primary btn-lg m-2" to='/provider/login'>Login as a provider</Link>
      </div>
    </div>
    </div>
  )
}

export default Homepage