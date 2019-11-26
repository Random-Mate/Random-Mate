require('dotenv').config()
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");

const express = require('express')
const app = express()

// DB, middlewares, locals & debug
const mongoose = require('./configs/mongoose.config')
require('./configs/middlewares.config')(app)
require('./configs/preprocessor.config')(app)
require('./configs/debug.config')


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);


// Base URL's
app.use('/', require('./routes/index.routes'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/plans', require('./routes/plans.routes'))
app.use('/profile', require('./routes/profile.routes'))


module.exports = app;