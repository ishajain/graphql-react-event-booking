import express from 'express'
import bodyParser from 'body-parser'
const app = express()

app.use(bodyParser.json())

app.get("*",(req,res) => {
    res.send("Hello and welcome to GraphQL React app.")
})

const PORT = process.env.PORT || 9000
app.listen(PORT,() => {
    console.log(`App is listening to port ${PORT}`)
})