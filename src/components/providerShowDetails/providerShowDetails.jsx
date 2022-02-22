import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {url} from '../../backend'

const deleteShow = (e, id) => {
    e.preventDefault();
    axios.delete(url+'/provider/shows/'+id, {
        headers: {
            authorization: 'Bearer '+localStorage.getItem('ProviderToken')
        }
    }).then((response)=>{
        console.log(response.data)
        window.location.href='/provider/dashboard'
    }).catch((err)=>{
        console.log('Error in deleting show.',err)
        alert('Please try again later.')
    })
}

const ProviderShowDetails = () => {
    const { id } = useParams();
    const [content, setContent] = useState()
    const [showDetails, setShowDetails] = useState()
    useEffect(()=>{
        if(localStorage.getItem('ProviderToken')===null || localStorage.getItem('ProviderToken')==='none') {
            alert('Please sign in again')
            window.location.href='/provider/login'
        } else {
            axios.get(url+'/provider/shows/'+id, {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('ProviderToken')
                }
            }).then((response)=>{
                console.log(response.data)
                const arr = response.data.show.hallBookings.map((obj)=>{
                    const arr = obj.begTime.split(/[:T -.]/)
                    return (
                        <div className="col-lg-4" key={obj.id}>
                            <div className="card ml-2 mt-2">
                                <div className="card-body">
                                    <h6 className="card-title">Date: {arr[2]}/{arr[1]}/{arr[0]}</h6>
                                    <h6 className='card-title'>Time: {arr[3]}:{arr[4]}:{arr[5]}</h6>
                                    <p className="card-text">Hall Number: {obj.hallNumber}</p>
                                    <button className="btn btn-primary">See Bookings</button>
                                </div>
                            </div>
                        </div>
                    )
                })
                setContent(arr)
                setShowDetails(<>
                        <div className='form-group'>
                            <button className='btn btn-danger float-end' onClick={(e, id=response.data.show.id)=>deleteShow(e, id)}>Delete</button>
                        </div>
                        <div>
                            <div className='pt-3' style={{position:'absolute', left:'270px'}}>
                                <h2>Show Name: {response.data.show.name}</h2>
                                <h4>Description: {response.data.show.info}</h4>
                                <h5>Duration: {response.data.show.duration.hours}:{response.data.show.duration.minutes}:{response.data.show.duration.seconds}</h5>
                                <h5>Rated: {response.data.show.rated}</h5>
                                <h5>Ratings: {response.data.show.ratings}</h5>
                            </div>
                            <div style={{display:'inline-block'}}>
                                <img className='pt-0 mt-0' src={require('../../assets/clapper.jpeg')} alt="clapper" style={{borderRadius:'50%', height:'250px', display:'inline-block'}} />
                            </div>
                        </div>
                </>)
            }).catch((err) => {
                console.log('Error in fetching show details', err) 
                alert('Please try again later')
            })
        }
    },[id])
  return (<>
    <div className="modal-body">
        <h1 className='text-center'>Show Info</h1>
        {showDetails}
    </div>
    <hr />
    <div className='container'>
        <h1 className="text-center">Slots Available</h1>
        <div className="row">
            {content}
        </div>
    </div>
    </>)
}

export default ProviderShowDetails