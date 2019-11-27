const express = require('express')
const router = express.Router()

const Plans = require('../models/plans.model')


router.get('/', (req, res) => {
  Plans.find()
    .then(allPlans =>res.render('plans/plans',{plans:allPlans}))
})
// router.post('/plans', (req, res) => {
//   const { title, author , activity , atending , date , description , location } = req.body
//   Plans.create({ title , author , activity , atending , date , description , location})
//     .then(newPlan)
//     .catch(err => console.log(err))
// })
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

router.get('/api', (req, res, next) => {
  Plans.find()
    .then(allPlans => res.status(200).json({
      plans: allPlans
    }))
    .catch(err => next(err))
});


router.get('/api/:id', (req, res, next) => {
  let plansId = req.params.id;
  Plans.findById(plansId)
    .then(idPlans => res.status(200).json({
      place: idPlans
    }))
});
router.get('/details/:id', (req, res) => {
  const plansId = req.params.id
  Plans.findById(plansId)
    .then(plans => res.render('places/placeDetails', {
      places: plans
    }))
    .catch(err => console.log("Error consultando la BBDD: ", err))
});
module.exports = router;
