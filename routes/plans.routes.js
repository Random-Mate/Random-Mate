const express = require('express')
const router = express.Router()

const Plans = require('../models/plans.model')


router.get('/', (req, res) => res.render('plans/plans'))
router.post('/plans', (req, res) => {
  const { title, author , activity , atending , date , description , location } = req.body
  Plans.create({ title , author , activity , atending , date , description , location})
    .then(newPlan)
    .catch(err => console.log(err))
})
module.exports = router;