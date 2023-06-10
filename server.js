if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


// Importing Libraies that we installed using npm
const express = require("express")
const app = express()
const path = require('path')
const bcrypt = require("bcrypt") // Importing bcrypt package
const mongoose = require("mongoose");
const userRoute = require("./routes/user-routes");
const questionRoute = require("./routes/question-routes");
const cors = require('cors')

const port = process.env.PORT
require('./db/db')


app.use(cors())
app.use(express.json())
app.use(userRoute)
app.use(questionRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})