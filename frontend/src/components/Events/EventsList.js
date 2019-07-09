import React from 'react'
import EventListItem from './EventsListItem'
import './EventsList.css'
const EventsList = ({events,userId,onViewDetail}) => {

    return (
        <ul className="events__list">
            {events.map((event) => {
                return <EventListItem key={event._id} event={event} userId={userId} onViewDetail={onViewDetail} />
            })}
        </ul>
       
    )

}

export default EventsList