import express from 'express';
import cors from 'cors';

const app = express();

// TOP TEN MIDDLEWARES


// 0. logging - allows us to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

// 1. CORS - allows us to send requests from different domains
app.use(cors())

// 2. express.json - allows us to read the body of the request
app.use(express.json())

// 3. express.urlencoded - allows us to read the body of the request
app.use(express.urlencoded({ extended: true }))

// 4. express.static - allows us to serve static files
app.use(express.static('public'))



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})