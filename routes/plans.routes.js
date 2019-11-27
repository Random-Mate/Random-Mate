const express = require('express')
const router = express.Router()

const Plans = require('../models/plans.model')


router.get('/:id', (req, res) => {
  const idUser = req.params.id
  Plans.find()
    .then(allPlans =>res.render('plans/plans',{plans:allPlans,user:idUser}))
})
// router.post('/plans', (req, res) => {
//   const { title, author , activity , atending , date , description , location } = req.body
//   Plans.create({ title , author , activity , atending , date , description , location})
//     .then(newPlan)
//     .catch(err => console.log(err))
// })
router.get('/newPlan/:id', (req, res) => res.render('plans/createPlan'))

router.post('/newPlan/', (req, res) => {
  const author= req.params.id
  const { title, plan, date, description, location } = req.body
  console.log(author)

  if (!title|| !plan || !description || !location||!date) {
    res.render("plans/createPlan", {
      message: "Please enter all the fields"
    });
    return;
  }

  Plans.create({title,plan,date,description,location,author})
    .then(x => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/join/:id', (req,res)=>res.render('plans/joinPlan'))

router.post('/join/:id',(req,res)=>{
    const plan = req.body
    Plans.find(plan)
        .then(allMatches => res.render('plans/joinPlan',{plans:allMatches}))
        .catch(err => console.log(err))

})
router.get('/details/:id', (req, res) => {
  const planId = req.params.id
  Plans.findById(planId)
    .then(plan => res.render('plans/map', {
      map:plan
    }))
    .catch(err => console.log("Error consultando la BBDD: ", err))
    
})
  


router.get('/myPlans/:id', (req, res) => {
  const planId = req.params.id
  Plans.find({ atending : planId })
    .then(plans => res.render('plans/myPlan', { plan: plans }))
    .catch(err => console.log('error!!', err))
})
  module.exports = router;

router.get('/details/:id', (req, res) => {
  const plansId = req.params.id
  Plans.findById(plansId)
    .then(plans => res.render('places/placeDetails', {
      places: plans
    }))
    .catch(err => console.log("Error consultando la BBDD: ", err))
});
module.exports = router;
