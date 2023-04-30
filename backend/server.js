const createError = require('http-errors')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport');
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
require('./models/User')
require('./models/Message')
require('./models/Log')
require('./config/passportConfig');
// Connecting with mongo db
mongoose
  .connect('mongodb://127.0.0.1:27017/mydatabase')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
// Setting up port with express js
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))

//message route
const messageRoute = require('../backend/routes/message.route')
app.use('/api/message', messageRoute)

//user route
const userRoute = require('../backend/routes/user.route')
app.use('/api/user', userRoute)

//user route
const logRoute = require('../backend/routes/log.route')
app.use('/api/log', logRoute)


// Create port
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
})
// error handler
app.use(function (err, req, res, next) {
  console.log(req);
  console.error(err.message) // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})