import User from '../../models/User'
import Event from '../../models/Event'

const userDetailsById =  async userId =>{
    try{
        const user =  await User.findById(userId)
        return transformUser(user)
    }
    catch{error => {throw error}}

}
const eventById = async eventId => {
    try{
        const event = await Event.findById(eventId)
        return transformEvent(event)
    } 
    catch{error => {throw error}}
}

const eventsById = async eventsId => {
    try{
        const events = await Event.find({_id:{$in : eventsId}});
        return events.map(event =>  transformEvent(event))
    } 
    catch{error => {throw error}}
}
const transformEvent = event => {
    return {...event._doc,_id:event.id, creator: userDetailsById.bind(this,event._doc.creator)}
}

const transformUser = user => {
    return {...user._doc,_id:user.id, createdEvents:eventsById.bind(this,user._doc.createdEvents)}
         
}


exports.userDetailsById = userDetailsById,
exports.eventById = eventById,
exports.eventsById = eventsById,
exports.transformEvent = transformEvent
exports.transformUser = transformUser

