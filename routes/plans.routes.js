const express = require('express')
const router = express.Router()

const Plans = require('../models/plans.model')


router.get('/plans', (req, res) => res.render('routes/plans.routes'))
router.post('/plans', (req, res) => {
  const { name, activities } = req.body
  Plans.create({ name, activities})
    .then(newPlan)
    .catch(err => console.log(err))
})
