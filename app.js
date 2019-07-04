import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import { buildSchema } from 'graphql'
const app = express()
const events  = []

app.use(bodyParser.json())

// app.get("*",(req,res) => {
//     res.send("Hello and welcome to GraphQL React app.")
// })

app.use('/graphql',graphqlHttp({
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
            return events
        },
        createEvent: (args) => {
            const event = {
                _id : Math.random().toString,
                title: args.eventType.title,
                description:args.eventType.description,
                price:+args.eventType.price,
                date:args.eventType.date
            }
            events.push(event)
            return event
        }
    },
    graphiql:true
}))

const PORT = process.env.PORT || 9000
app.listen(PORT,() => {
    console.log(`App is listening to port ${PORT}`)
})