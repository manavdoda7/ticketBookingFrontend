import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './dashboard.css'
import {url} from '../../backend'
import { Link } from 'react-router-dom'

const fetchShowDetails = (e, id, type) => {
    e.preventDefault()
    window.location.href='/'+type+'/shows/'+id
}

const Dashboard = ({type}) => {
    const [showsList, setShowsList] = useState('Loading')
    useEffect(()=>{
        if(localStorage.getItem(type+'Token')!==null && localStorage.getItem(type+'Token')!=='none') {
            // console.log(localStorage.getItem('ProviderToken'))
            axios.get(url+'/'+type+'/shows', {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem(type+'Token')
                }
            }).then((response)=>{
                console.log(response.data)
                const cards = response.data.shows.map((show)=>{
                    return (
                        <li className="cards_item" key={show.id}>
                            <div className="card">
                                <div className="card_image"><img className='card_img' alt='movie' src={require('../../assets/cinema.jpeg')} /></div>
                                <div className="card_content">
                                <h2 className="card_title">{show.name}</h2>
                                <p className="card_text">{show.info}</p>
                                <h6>Rated: {show.rated}</h6>
                                <h6>Ratings: {show.ratings}</h6>
                                <h6>Duration: {show.duration.hours}:{show.duration.minutes}:{show.duration.seconds}</h6>
                                <button onClick={(e, id=show.id)=>fetchShowDetails(e, id, type)} className="btn card_btn">Show Complete Info</button>
                                </div>
                            </div>
                        </li>
                    )
                })
                setShowsList(cards)
            }).catch((err)=>{
                console.log('Error in fetching shows', err)
                alert('Please try again')
            })
        } else {
            alert('Please sign in again.')
            window.location.href="/"+type+"/login"
        }
    },[])
        let createButton = ''
        if(type==='Provider') {
            <div className='form-group'>
                <Link to='/provider/createshow' className='btn btn-outline-dark float-end'>Create Show</Link>
            </div>
        }
  return (
    <section>
        <div className="main mt-3">
        {createButton}
        <h1 className='text-center'>{type} Dashboard</h1>
        <ul className="cards">
            {showsList}
        </ul>
        </div>
    </section>
  )
}

export default Dashboard