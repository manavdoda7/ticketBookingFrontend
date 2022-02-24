import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {url} from '../../backend'

const ProviderBookings = () => {
    const [table, setTable] = useState(<div className='text-center'>No entries to show</div>)
    const id = useParams().id
    useEffect(()=>{
        if(localStorage.getItem('ProviderToken')===null || localStorage.getItem('ProviderToken')==='none') {
            alert('Please Sign in again')
            window.location.href = '/provider/login'
        }
        axios.get(url+'/provider/shows/slot/'+id, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('ProviderToken')
            }
        }).then((response)=>{
            console.log(response.data)
            let entries = response.data.bookings.reverse().map((booking)=>{
                return (
                    <tr key={booking.id}>
                        <th scope="row">{booking.id}</th>
                        <td>{booking.client.firstName} {booking.client.lastName}</td>
                        <td>{booking.seat}</td>
                        <td>{booking.client.email}</td>
                        <td>{booking.client.mobile}</td>
                    </tr>
                )
            })
            if(entries.length===0) entries = (<div className='text-center'>No entries to show</div>)
            setTable(entries)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
  return (<>
    <h1 className='text-center mt-3'>Bookings List</h1>
    <div className='container mt-2'>
        <div className='table-responsive'>
        <table className="table table-sm">
  <thead>
    <tr>
      <th scope="col">Booking ID</th>
      <th scope="col">Name</th>
      <th scope="col">Seat Number</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
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

export default ProviderBookings;