import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import session from 'express-session';
import {
    emailRouter, 
    userRouter, 
} from './routes/index.js';
import isAuthorized from './middlewares/isAuthorized.js';

const app = express();

// 0. sessions
// sessions are a representation of a client's relationship 
// with the server. This middleware will give each user a unique "sessionID"
// that will be used to identify the user's session. When a website automatically
// recognises you, it's because you already have a sessionID created by the server.
// eg. authentication systems rely on sessions to automatically log you in.
// like when facebook, netflix etc. know who you are when you visit their websites.
// sessions can also be used to store general info like cart, wishlist, language preferences etc.
// sessions are stored in memory, so they are lost when the server restarts.
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

// 1. this custom middleware just logs the user's session ID 
app.use((req, res, next) => {
    console.log(req.sessionID, req.session.userId)
    next()
})

// 2. morgan - a common package for logging API request information
app.use(morgan('dev'))

// 3. morgan - morgan can also logs to a file - in this case to "access.log"
var accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

// 4. CORS - allows us to send requests from different webpages 
// on different domains. if our frontend is on 3000 and our backend is on 8080
// we need to enable CORS so the frontend can send requests to our backend
app.use(cors({
    origin: "http://localhost:3000" // or your netlify domain
}))

// 5. express.json - allows us to read the JSON body of a request
// and store it in req.body
app.use(express.json())

// 6. express.urlencoded - allows us to read any "HTML form data" body of a request
// and store it in req.body
app.use(express.urlencoded({ extended: true }))

// 7. express.static - allows us to serve static files ( in this case from public folder )
// this is how websites load their own CSS, JS, images etc. from a static public foler in the server. 
app.use(express.static('public'))




// // 9. authorization middleware - standard pattern 
    // // public routes - you don't need to be logged in for these
    // app.use('/api/users', userRouter)

    // // protected routes - you need to be logged in for these
    // app.use('/api/email', isAuthorized, emailRouter)

// 10. authorization middleware - breakpoint pattern ( i made this name up :P )
// with the breakpoint pattern we declare all public routes,
// then drop in an auth middleware, and any routes after that will need authentication

// public... 
app.use('/api/users', userRouter)

// here's our auth breakpoint middleware - everything after, a user must be logged in.
app.use(isAuthorized);

app.use('/api/emails', emailRouter)

// 8. custom error handling middleware
// any error that is thrown in the middlewares will be caught here
app.use((err, req, res, next) => {
    accessLogStream.write(` ${req.method} ${req.path} ${err.message} \n`)
    console.log(err)
    res.status(500).send(err.message)
})
// JWT

// templating system??

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})