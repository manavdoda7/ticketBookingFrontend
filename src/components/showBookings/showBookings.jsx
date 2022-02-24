import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {url} from '../../backend'
import { Link } from 'react-router-dom'

const ShowBookings = () => {
    const [table, setTable] = useState(<div className='text-center'>No entries to show</div>)
    useEffect(()=>{
        if(localStorage.getItem('UserToken')===null || localStorage.getItem('UserToken')==='none') {
            alert('Please Sign in again')
            window.location.href = '/user/login'
        }
        axios.get(url+'/user/bookings', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('UserToken')
            }
        }).then((response)=>{
            console.log(response.data)
            let entries = response.data.bookings.reverse().map((booking)=>{
                let timing = booking.hallBooking.begTime.split(/[T:. -]/)
                let timestamp = timing[2]+'/'+timing[1]+'/'+timing[0]+' '+timing[3]+':'+timing[4]+':'+timing[5]
                return (
                    <tr>
                        <th scope="row">{booking.id}</th>
                        <td>{booking.show.name}</td>
                        <td>{booking.seat}</td>
                        <td>{timestamp}</td>
                        <td>{booking.hallBooking.hallNumber}</td>
                    </tr>
                )
            })
            if(entries.length===0) entries = (<div className='text-center'>No entries to show</div>)
            setTable(entries)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
  return (<>
    <div className='container mt-3'>
  <div className='form-group'>
                <Link to='/user/dashboard' className='btn btn-outline-dark float-end'>Back to dashboard</Link>
            </div>
    <h1 className='text-center mb-2'>Bookings List</h1>
        <div className='table-responsive'>
        <table className="table table-sm">
  <thead>
    <tr>
      <th scope="col">Booking ID</th>
      <th scope="col">Show Name</th>
      <th scope="col">Seat Number</th>
      <th scope="col">Begining Time</th>
      <th scope="col">Hall Number</th>
    </tr>
  </thead>
  <tbody>
    {table}
  </tbody>
</table>
    </div>
    </div>
    </>)
}

export default ShowBookings;