const express = require('express')
const router = express.Router()
const Park = require('../models/park.model')

// Aquí los endpoints

//mandar el formulario para añadir un parque
router.get('/new', (req, res) => res.render('parks/new-park'))


//añadir
router.post('/new', (req, res) => {

  // router.post('/new', (req, res) => {
  const {
    name,
    description,
    active,
  } = req.body
  Park.create({
    name,
    description,
    active
  })
    .then(res.redirect('/'))
    .catch(err => console.log('error!!', err))
})

module.exports = router