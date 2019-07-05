import bcrypt from 'bcryptjs'
import Event from '../../models/Event'
import User from '../../models/User'

const userDetailsById =  async userId =>{
    try{
        const user =  await User.findById(userId)
        return {...user._doc,_id:user.id, createdEvents:eventsById.bind(this,user._doc.createdEvents)}
    }
    catch{error => {throw error}}

}

const eventsById = async eventsId => {
    try{
        const events = await Event.find({_id:{$in : eventsId}});
        return events.map(event =>  ({...event._doc,_id:event.id, creator:userDetailsById.bind(this,event._doc.creator)}))
    } 
    catch{error => {throw error}}
}
  

module.exports = {
    
    createUser : async (args) => {
        try{
            const existingUser = await User.findOne({email : args.userInput.email });
            if(existingUser) throw new Error("User already exists!!")
            const hashedPassword = await bcrypt.hash(args.userInput.password,12);
            const user = new User({
                email: args.userInput.email,
                password:hashedPassword
            })
            const newUser = await user.save(); 
            return {...newUser._doc,password:null,_id:newUser.id}
        }
        catch{error => {throw error}}
    },
    users : async () => {
        try {
            const users = await User.find();
            if(!users) throw new Error("No users found!!")
            return users.map(user => ({ ...user._doc,_id:user._id,createdEvents:eventsById.bind(this,user._doc.createdEvents)}))
        }
        catch{error => {throw error}}
                        
    },
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
            const event = await event.save()
            createdEvent = {...event,_id:event.id,creator:userDetailsById.bind(this,event._doc.creator)}
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
        return events.map(event => ({...event._doc, _id: event.id,creator:userDetailsById.bind(this,event._doc.creator)}))
        }      
        catch{error => {throw error}}
                        
    }
}