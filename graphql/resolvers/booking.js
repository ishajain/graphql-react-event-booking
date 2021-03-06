import Booking from '../../models/Booking'
import Event from '../../models/Event'

import { dateToString} from '../../helpers/date'
import  { userDetailsById, eventById, transformEvent} from './helper'

const transformBooking = booking => {
    return {...booking._doc,
            _id:booking.id,
            user: userDetailsById.bind(this,booking._doc.user),
            event:eventById.bind(this,booking._doc.event),
            createdAt:dateToString(booking._doc.createdAt),
            updatedAt:dateToString(booking._doc.updatedAt)
    }      
}

module.exports = {
    bookings: async (args,req) => {
        try{
            if(!req.isAuth) throw new Error("UnAuthorized User, Please login first")
            const bookings = await Booking.find()
            return bookings.map(booking => transformBooking(booking))
        }
        catch{error => {throw error}}

    },

    bookEvent : async (args,req) => {
        try{
            if(!req.isAuth) throw new Error("UnAuthorized User, Please login first")
            const event = await Event.findById({_id:args.eventId})
            const booking = new Booking({
                
                event : event,
                user: req.userId
            })
            const savedBooking = await booking.save()
            
            return transformBooking(savedBooking)
            
        }
        catch{error => {throw error}} 
    },

    cancelBooking : async (args,req) => {
        try{
            if(!req.isAuth) throw new Error("UnAuthorized User, Please login first")
           const eventOfBooking = await Booking.findById(args.bookingId).populate('event')
           const event = transformEvent(eventOfBooking.event)
           await Booking.deleteOne({_id: args.bookingId})
           return event
        }
        catch{error => {throw error}} 
    }
}