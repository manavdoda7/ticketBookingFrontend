import Input from '../input/input'
import Button from '../button/button'
import axios from 'axios'
import React, { useState } from 'react'
const img = require('../../assets/movie.jpg')


const CreateShow = () => {
    const [form, setForm] = useState(detailsForm)
    function submitHandler(e) {
        e.preventDefault()
        let name = document.getElementById('name').value
        let info = document.getElementById('info').value    
        let rated = document.getElementById('rated').value
        let ratings = document.getElementById('ratings').value
        let duration = document.getElementById('duration').value
        let slots = document.getElementById('slots').value
        
    }
    let detailsForm = (
        <form onSubmit={(e)=>submitHandler(e)}>
                          <h1>New Show Creation</h1>
                          <Input label="Name" type="text" id="name" />
                          <div className="mb-3">
                            <label htmlFor='Info' className="form-label">Info</label>
                            <textarea className='form-control' id='info' />
                          </div>
                          <Input label="Rated" type="text" id="rated" />
                          <div className="mb-3">
                            <label htmlFor='ratings' className="form-label">Ratings</label>
                            <input type='number' step='0.1' className="form-control" id='ratings' />
                          </div>
                          <div className="mb-3">
                            <label htmlFor='Duration' className="form-label">Duration</label>
                            <input type='time' step='1' className="form-control" id='duration' />
                          </div>
                          <Input label="Number of Slots" type="number" id="slots" />
                          <Button type="submit" value="Add show" classes={"btn btn-primary mx-1"} />
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
                    {form}
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