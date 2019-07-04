import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import { buildSchema } from 'graphql'
import mongoose from 'mongoose'
import Event from './models/Event'
const app = express()

app.use(bodyParser.json())

// app.get("*",(req,res) => {
//     res.send("Hello and welcome to GraphQL React app.")
// })

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: String!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }




        type RootQuery {
            events : [Event!]!
        }
        type RootMutation{
            createEvent(eventType:EventInput) : Event
        }
        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue : {
        events : () => {
            return Event.find().then(
                    events => {
                       return events.map(event =>{
                            return {
                                ...event._doc, _id: event._doc._id.toString()
                            }
                        })
                    }
            ).catch(error => {
                throw error
            })
        },
        createEvent: (args) => {
        
            const event =  new Event({
                title: args.eventType.title,
                description:args.eventType.description,
                price:+args.eventType.price,
                date:new Date(args.eventType.date)
            })
            event
            .save()
            .then(
                result =>  {
                    console.log({...result._doc})
                    return {...result._doc}
                }
            )
            .catch(error => {
                res.status(422).send(error)
                throw error
            })

            return event
            
        }
    },
    graphiql:true
}))

const PORT = process.env.PORT || 9000

mongoose.connect(process.env.MONGODB_URL).then(
    app.listen(PORT,() => {
        console.log(`App is listening to port ${PORT}`)
    })
).catch(error=>console.log(error))
