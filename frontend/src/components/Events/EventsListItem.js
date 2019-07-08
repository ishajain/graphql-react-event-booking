import React from 'react'
import './EventsListItem.css'


const EventListItem = ({event:{title},event:{price},event:{description}, event:{date},event:{creator : {email,_id}},userId}) => {
    console.log("UserId:" + userId + "id:" + _id)
    return (
         <li  className="events__list-item">
        <div>
          <h1>{title}</h1>
          <h2>
            ${price} - {new Date(date).toLocaleDateString()}
          </h2>
        </div>
        <div>
         {userId === _id ? <p>You are the owner of this event</p> : <button className="btn" >View Details</button>}
        </div>
      </li>
)

} 

export default EventListItem