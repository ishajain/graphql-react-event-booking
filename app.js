import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import graphqlschema from './graphql/schema'
import graphqlresolver from './graphql/resolvers'
import mongoose from 'mongoose'
import isAuth from './middlewares/isAuth'
const app = express()
app.use(bodyParser.json())

app.use(isAuth) // Allow the middleware with every request

app.use('/graphql', graphqlHttp({
    schema: graphqlschema,
    rootValue : graphqlresolver,
    graphiql:true
}))

const PORT = process.env.PORT || 9000

mongoose.connect(process.env.MONGODB_URL).then(
    app.listen(PORT,() => {
        console.log(`App is listening to port ${PORT}`)
    })
).catch(error=>console.log(error))
