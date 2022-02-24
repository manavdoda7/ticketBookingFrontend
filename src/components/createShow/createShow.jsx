import Input from '../input/input'
import Button from '../button/button'
import axios from 'axios'
import React, { useState } from 'react'
import {url} from '../../backend'
const img = require('../../assets/movie.jpg')
let name, info, rated, ratings, duration, slots

const createShow = (e) => {
  e.preventDefault()
  let halls = []
  let timings = []
  for(let i=0;i<slots;i++) {
    halls.push(document.getElementById('hall'+i).value)
    timings.push(document.getElementById('time'+i).value)
  }
  axios.post(url+'/provider/shows', {
    name, info, rated, ratings, duration,halls, timings
  },{
    headers: {
      authorization: 'Bearer '+localStorage.getItem('ProviderToken')
  }
  }).then((response)=>{
    if(response.data.success===true) {
      alert('Show Created')
      window.location.href = '/provider/dashboard'
    } else {
      alert(response.data.message)
      window.location.href='/provider/createshow'
    }
  }).catch((err)=>{
    console.log(err)
    console.log('Please try again later.')
  })
}

const CreateShow = () => {
  const [slotDetails, setSlotDetails] = useState()
  function submitHandler(e) {
    e.preventDefault()
    name = document.getElementById('name').value
    info = document.getElementById('info').value    
    rated = document.getElementById('rated').value
    ratings = document.getElementById('ratings').value
    duration = document.getElementById('duration').value
    slots = document.getElementById('slots').value
    document.getElementById('detailsForm').style.display='none'
    let arr = []
    for(let i=0;i<slots;i++) {
      arr.push(
          <div className='mb-3' key={i}>
            <span className="input-group-text">Hall Number and Begining Time</span>
        <div className="input-group">
          <input type='number' id={'hall'+(i)} className='form-control' required/>
          <input type='datetime-local' step='1' id={'time'+(i)} className='form-control' required/>
        </div>
          </div>)
    }
    const form = (
      <form onSubmit={(e)=>createShow(e)}>
        <h1>Slots Details</h1>
        {arr}
        <Button type="submit" value="Add show" classes={"btn btn-primary mx-1"} />
      </form>
    )
    setSlotDetails(form)
  }
  let detailsForm = (
    <form id='detailsForm' onSubmit={(e)=>submitHandler(e)}>
      <h1>New Show Creation</h1>
      <Input label="Name" type="text" id="name" />
      <div className="mb-3">
        <label htmlFor='Info' className="form-label">Info</label>
        <textarea className='form-control' id='info' required />
      </div>
      <Input label="Rated" type="text" id="rated" />
      <div className="mb-3">
        <label htmlFor='ratings' className="form-label">Ratings</label>
        <input type='number' step='0.1' className="form-control" id='ratings' required />
      </div>
      <div className="mb-3">
        <label htmlFor='Duration' className="form-label">Duration</label>
        <input type='time' step='1' className="form-control" id='duration' required />
      </div>
      <div className="mb-3">
        <label htmlFor='Number of Slots' className="form-label">Number of slots</label>
        <input type='number' step='1' className="form-control" min='1' id='slots' required />
      </div>
      <Button type="submit" value="Add slots" classes={"btn btn-primary mx-1"} />
    </form>
  )
  return (
    <section className="vh100" style={{background:'#F4F4F5'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{borderRadius: "1rem"}} >
              <div className="row g-0">
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    {detailsForm}
                    {slotDetails}
                  </div>
                </div>
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={img} alt="login form" className="img-fluid" style={{borderRadius:'0 1rem 1rem 0'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateShow