let express = require('express');
let dotenv = require('dotenv')
dotenv.config() // ✅ add this to load environment variables from .env file

require("./config/db") // ✅ add this for MongoDB connection
require("./config/redis"); // ✅ add this for Redis connection

let interviewRoute = require("./routes/interviewRoute") // ✅ add this for interview routes

let app = express()
app.use(express.json())

app.use("/api/interviews", interviewRoute) // ✅ add this to use interview routes with the base path /api/interviews

app.get("/", (req, res, next) => {
    try {
        res.send("Welcome to server")
    } catch (error) {
        next(error)
    }
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})