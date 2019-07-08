import React from 'react'
import EventListItem from './EventsListItem'
import './EventsList.css'
const EventsList = ({events,userId}) => {

    return (
        <ul className="events__list">
            {events.map((event) => {
                console.log(event)
                return <EventListItem key={event._id} event={event} userId={userId}/>
            })}
        </ul>
       
    )

}

export default EventsList