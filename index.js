import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import session from 'express-session';

const app = express();

// TOP TEN MIDDLEWARES

// sessions 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

// 0. logging - allows us to log requests
app.use((req, res, next) => {
    // console.log(`${req.method} ${req.path}`)
    console.log(req.sessionID)
    next()
})

// 1. morgan - allows us to log requests
// app.use(morgan('dev'))

// 2. morgan - write logs to a file
var accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

// 3. CORS - allows us to send requests from different domains
app.use(cors({
    origin: "http://localhost:3000" // or your netlify domain
}))

// 4. express.json - allows us to read the body of the request
app.use(express.json())

// 5. express.urlencoded - allows us to read form data  
app.use(express.urlencoded({ extended: true }))

// 6. express.static - allows us to serve static files
app.use(express.static('public'))


// error handling middleware
app.use((err, req, res, next) => {
    console.log(err)
    // TODO: log this error to file with morgan somehow
    accessLogStream.write(` ${req.method} ${req.path} ${err.message} \n`)
    res.status(500).send('Something broke!')
})

app.get("/test", (req, res) => {
    console.log(req.sessionID)
    res.status(200).end()
})

// JWT

// templating system??

// authentication???

// authentication??? OKTA, 0auth, passport, etc.


app.get("/data", (req, res) => {
    res.json({hello:"world"})
})
app.post("/login", (req, res) => {
//    User.find({user:req.body.username, password:req.body.password})
   res.json("congrats your logged in")
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})