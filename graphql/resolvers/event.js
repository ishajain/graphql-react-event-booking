import { transformEvent } from './helper'
import Event from '../../models/Event'
import User from '../../models/User'

module.exports = {
    createEvent: async(args) => {
    
        const event =  new Event({
            title: args.eventInput.title,
            description:args.eventInput.description,
            price:+args.eventInput.price,
            date:new Date(args.eventInput.date),
            creator: '5d1e0388357d8ca3bde8dccb'
        })
        let createdEvent;
        try{
            const result = await event.save()
            createdEvent = transformEvent(result)
            const creator = await User.findById('5d1e0388357d8ca3bde8dccb');
            if(!creator){
                    throw new Error("User does not exists!")
            }
            creator.createdEvents.push(event)
            const user = await creator.save()
            return createdEvent
        }
        catch{error => {throw error}}
        
    },
    events : async () => {
        try{
        const events = await Event.find();
        return events.map(event => transformEvent(event))
        }      
        catch{error => {throw error}}
                        
    }
}