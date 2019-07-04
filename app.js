import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import { buildSchema } from 'graphql'
const app = express()


app.use(bodyParser.json())

// app.get("*",(req,res) => {
//     res.send("Hello and welcome to GraphQL React app.")
// })

app.use('/graphql',graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            events : [String!]!
        }
        type RootMutation{
            createEvent(name:String) : String
        }
        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue : {
        events : () => {
            return ["Yoga","Cooking","Cycling"]
        },
        createEvent: (args) => {
            return args.name
        }
    },
    graphiql:true
}))

const PORT = process.env.PORT || 9000
app.listen(PORT,() => {
    console.log(`App is listening to port ${PORT}`)
})