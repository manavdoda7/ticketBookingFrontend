import React from 'react'
import Input from '../input/input'
import Button from '../button/button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {url} from '../../backend'
const img = require('../../assets/movie.jpg')
const registerForm = () => {
    function submitHandler(e) {
        e.preventDefault();
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let firstName = document.getElementById('firstName').value
        let lastName = document.getElementById('lastName').value
        let organisation = document.getElementById('organisation').value
        let halls = document.getElementById('halls').value
        let arr = []
        for(var i=0;i<halls;i++) arr.push(prompt(`Enter seat capacity of hall ${i+1}`))
        axios.post(url+'/authenticate/provider/register', {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            organisation:organisation,
            halls: halls,
            hallsCapacity:arr
        }).then((response)=>{
            if(response.data.success===true) {
                alert('User registered.')
                window.location.href = "http://localhost:3000/provider/login";
            } else {
                alert(response.data.message)
            }
        }).catch((err)=>{
            console.log('erorrrrrrrr', err)
            alert('Please try again after sometime.')
        })
    }
  return (
    <section className="vh100" style={{background:'#F4F4F5'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{borderRadius: "1rem"}} >
              <div className="row g-0">
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={submitHandler}>
                      <h1>Provider Register</h1>
                      <Input label="Email" type="email" id="email" />
                      <Input label="Password" type="password" id="password" />
                      <Input label="First Name" type="text" id="firstName" />
                      <Input label="Last Name" type="text" id="lastName" />
                      <Input label="Organisation" type="text" id="organisation" />
                      <Input label="Halls" type="number" id="halls" />
                      <Button type="submit" value="Register" classes={"btn btn-primary mx-1"} />
                      <Link type="submit" value="Login" to='/provider/login' className="btn btn-outline-dark mx-1" >Login</Link>
                    </form>
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

export default registerForm