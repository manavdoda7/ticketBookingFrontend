import React, { useEffect, useState } from 'react'
import '../fontawesome/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {url} from '../../backend'


const couch = (<span className='m-2' style={{ fontSize:'30px'}}><FontAwesomeIcon icon={['fas', 'couch']} /></span>)

let arr = []
const CreateBooking = () => {
    const id = useParams().id
    const [showDetails, setShowDetails] = useState()
    const [content, setContent] = useState()
    function select(e, id) {
        e.preventDefault();
        if(arr[id]===0) {
            arr[id]=1
            document.getElementById(id).style.color='green'
        } else {
            arr[id]=0
            document.getElementById(id).style.color='#aaa'
        }
        console.log(arr)
    }
    function book(e) {
        e.preventDefault()
        let booked = []
        for(let i=0;i<arr.length;i++) if(arr[i]===1) booked.push(i+1)
        console.log(booked)
        if(localStorage.getItem('UserToken')===null || localStorage.getItem('UserToken')==='none'){
            alert('Please sign in again.')
            window.location.href='/user/login'
        } else {
            axios.post(url+'/user/shows/slots/'+id, {
                seats:booked
            }, {
                headers:{
                    authorization: 'Bearer '+localStorage.getItem('UserToken')
                }
            }).then((response)=>{
                if(response.data.success===true) {
                    alert('Tickets Booked')
                    window.location.href = '/user/createbooking/'+id
                } else {
                    alert(response.data.message)
                }
            }).catch((err)=>{
                console.log('Error in booking', err)
                alert('Please try again after sometime.')
            })
        }
    }
    useEffect(()=>{
        axios.get(url+'/user/shows/slots/'+id)
        .then((response)=>{
            console.log(response.data)
            let seats = response.data.seatsAvailability
            let timings = response.data.showInfo.begTime.split(/[T:\s.-]/)
            setShowDetails(<>
                <div>
                    <div className='pt-3' style={{position:'absolute', left:'270px'}}>
                        <h2>Show Name: {response.data.showInfo.show.name}</h2>
                        <h4>Timings: {timings[2]}/{timings[1]}/{timings[0]} {timings[3]}:{timings[4]}:{timings[5]}</h4>
                        <h5>Hall Number: {response.data.showInfo.hallNumber}</h5>
                        <h5>Available Seats: {response.data.showInfo.availableSeats}</h5>
                        <h5>Duration: {response.data.showInfo.show.duration.hours}:{response.data.showInfo.show.duration.minutes}:{response.data.showInfo.show.duration.seconds}</h5>
                    </div>
                    <div style={{display:'inline-block'}}>
                        <img className='pt-0 mt-0' src={require('../../assets/clapper.jpeg')} alt="clapper" style={{borderRadius:'50%', height:'250px', display:'inline-block'}} />
                    </div>
                </div>
            </>)
            for(let i=0;i<seats.length;i++) {
                arr.push(0)
                if(seats[i]===0) seats[i]=<button style={{color:'#333'}} id={i} className='btn'>{couch}</button>
                else seats[i]=<button className='btn' style={{color:'#aaa'}} id={i} onClick={(e, id=i)=>select(e, id)}> {couch}</button>
            }
            let matrix = []
            for(let i=0;i<seats.length;i++) {
                matrix.push(seats[i])
                if((i+1)%11===0) matrix.push(<div/>)
            }
            setContent(matrix)
        }).catch((err)=>{
            console.log(err)
        })
    },[id])
    return (<>
        <div className="modal-body">
            <h1 className='text-center'>Show Info</h1>
            {showDetails}
        </div>
        <hr />
        <div className='container mx-auto'>
            <h1 className="text-center">Seat Matrix</h1>
            <div className='container text-center'>
                {content}
            </div>
        </div>
            <div className='container text-center'>
                <button className='btn btn-success btn-lg text-center' onClick={(e)=>book(e)} >Book</button>
            </div>
    </>)
}

export default CreateBooking