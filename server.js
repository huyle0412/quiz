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
const url ="mongodb+srv://lvdhuy:123789258@quiz.azb9ame.mongodb.net/?retryWrites=true&w=majority"


const connectionParams={
  
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

const User =require("./Model/user-model");


// initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
//     )
    initializePassport(
        passport,
       email => User.findOne({ email }),
       id => User.findById(id)
        );


app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))
//test
app.get("/", checkAuthenticated, (req,res)=>{
    res.render("index.ejs", { name: req.user.name });
})
//test
app.get("/login", checkNotAuthenticated, (req,res)=>{
    res.render("login.ejs");
})
// Configuring the register post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))


app.get("/register", checkNotAuthenticated, (req,res)=>{
    res.render("register.ejs");
})
app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      const user = new User({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
  
      await user.save(); // Lưu người dùng mới vào cơ sở dữ liệu
  
      console.log(user); // Hiển thị thông tin người dùng đã lưu trong console
      res.redirect("/login");
    } catch (e) {
      console.log(e);
      res.redirect("/register");
    }
  });

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

app.listen(3000)