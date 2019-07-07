import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import graphqlschema from './graphql/schema'
import graphqlresolver from './graphql/resolvers'
import mongoose from 'mongoose'
import isAuth from './middlewares/isAuth'
const app = express()
app.use(bodyParser.json())

//CORS Middleware
app.use((req,res,next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,OPTIONS")
    res.setHeader('Access-Control-Allow-Headers',"Content-Type, Authorization")
    if(req.method === 'OPTIONS') return res.sendStatus(200)
    next()
})

app.use(isAuth) // Allow the middleware with every request

app.use('/graphql', graphqlHttp({
    schema: graphqlschema,
    rootValue : graphqlresolver,
    graphiql:true
}))

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL).then(
    app.listen(PORT,() => {
        console.log(`App is listening to port ${PORT}`)
    })
).catch(error=>console.log(error))
