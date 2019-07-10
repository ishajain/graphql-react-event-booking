import React from 'react'
import './EventsListItem.css'


const EventListItem = ({event:{title},event:{price}, event:{_id} ,event:{date},event:{creator: {_id : creatorId}},userId,onViewDetail}) => {
    return (
         <li  className="events__list-item">
        <div>
          <h1>{title}</h1>
          <h2>
            ${price} - {new Date(date).toLocaleDateString()}
          </h2>
        </div>
        <div>
         {userId === creatorId ? <p>You are the owner of this event</p> : <button className="btn" onClick={() => onViewDetail(_id)}>View Details</button>}
        </div>
      </li>
)

} 

export default EventListItem