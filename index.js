const express = require('express')
const passport = require('passport')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config()
mongoose.connect('mongodb://localhost/doctor')
mongoose.Promise = global.Promise;
require('./src/config/passport')

const app = express()

app.use(cors())
app.use(passport.initialize())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

app.use('/auth', require('./src/routes/auth'))
app.use('/order', require('./src/routes/Order'))
app.use('/doctors', require('./src/routes/Doctor'))

app.listen(process.env.PORT || 8000, () => console.log('listening on port 8000'))
