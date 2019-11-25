require('dotenv').config()

const express = require('express')
const app = express()

// DB, middlewares, locals & debug
require('./configs/mongoose.config')
require('./configs/middlewares.config')(app)
require('./configs/preprocessor.config')(app) 
require('./configs/debug.config')

// Base URL's
app.use('/', require('./routes/index.routes'))
app.use('/auth', require('./routes/auth.routes'))


module.exports = app