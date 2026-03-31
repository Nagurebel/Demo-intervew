let express = require('express');
let dotenv = require('dotenv')
dotenv.config()
require("./config/db")
let interviewRoute = require("./routes/interviewRoute")

let app = express()
app.use(express.json())

app.use("/api/interviews", interviewRoute)

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