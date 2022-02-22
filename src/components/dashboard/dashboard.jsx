import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './dashboard.css'
import {url} from '../../backend'

const fetchShowDetails = (e, id) => {
    e.preventDefault()
    window.location.href='/provider/shows/'+id
}

const ProviderDashboard = () => {
    const [showsList, setShowsList] = useState('Loading')
    useEffect(()=>{
        if(localStorage.getItem('ProviderToken')!==null && localStorage.getItem('ProviderToken')!=='none') {
            // console.log(localStorage.getItem('ProviderToken'))
            axios.get(url+'/provider/shows', {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('ProviderToken')
                }
            }).then((response)=>{
                console.log(response.data.shows)
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
                                <button onClick={(e, id=show.id)=>fetchShowDetails(e, id)} className="btn card_btn">Show Complete Info</button>
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
            window.location.href="/provider/login"
        }
    },[])
        
  return (
    <section>
        <div className="main">
  <h1 className='text-center'>Provider Dashboard</h1>
  <ul className="cards">
    {showsList}
  </ul>
</div>
    </section>
  )
}

export default ProviderDashboard