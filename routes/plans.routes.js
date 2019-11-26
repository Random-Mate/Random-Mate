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
router.get('/newPlan', (req, res) => res.render('plans/createPlan'))
router.post('/newPlan', (req, res) => {
  const { title,plan,date,description,location } = req.body

  if (!title|| !plan || !description || !location||!date) {
    res.render("plans/createPlan", {
      message: "Please enter all the fields"
    });
    return;
  }
  Plans.create({title,plan,date,description,location})
    .then(x => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/join', (req,res)=>res.render('plans/joinPlan'))

router.post('/join',(req,res)=>{
    const plan = req.body
    Plans.find(plan)
        .then(allMatches => res.render('plans/joinPlan',{plans:allMatches}))
        .catch(err => console.log(err))

})
module.exports = router;
