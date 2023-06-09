if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


// Importing Libraies that we installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const mongoose = require("mongoose");
const userRoute = require("./routes/user-routes");
const port = process.env.PORT
require('./db/db')



app.use(express.json())
app.use(userRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})