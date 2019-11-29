const express = require('express')
const router = express.Router()

const Plans = require('../models/plans.model')
const Profile = require('../models/User.model')

router.get('/:id', (req, res) => {
  const idUser = req.params.id
  let isLoggedOut = req.user === undefined;
  Plans.find()

    .then(allPlans => res.render('plans/plans', {
      isLoggedOut,
      userID: req.user._id,
      user: req.user,
      plans: allPlans,
      user: idUser
    }));

})

router.post('/:id', (req, res) => {
  const user = req.user._id
  const planId = req.params.id
  console.log(`Este es el ID del plan ${planId}`)
  console.log(`Este es el ID del user ${user}`)

  let isLoggedOut = req.user === undefined;
  let userD = {}

  Profile.findById(user)
    .then(details => {
      userD = {
        _id: details._id,
        name: details.name
      }


      Plans.findById(planId)
        .then(plan => {
          let atending = plan.atending
          console.log(atending.includes(userD._id))

          if (!atending.includes(userD)) {


            // console.log(atending)
            atending.push(userD)
            Plans.findByIdAndUpdate(planId, {
              atending
            }, {
              new: true
            }).then(resPlan => console.log(resPlan)).catch(err => console.log(err))
          }



          // res.render('plans/plans')

        })
        .catch(err => console.log(err))




    })
})
router.get('/newPlan/:id', (req, res) => {
  console.log(req.params)
  let isLoggedOut = req.user === undefined;
  res.render('plans/createPlan', {
    isLoggedOut,
    userID: req.user._id,
    user: req.user,

  })
})

router.post('/newPlan/:id', (req, res) => {
  const {
    title,
    plan,
    date,
    description,
    location
  } = req.body
  const author = req.user._id
  console.log(author)

  if (!title || !plan || !description || !location || !date) {
    res.render("plans/createPlan", {
      message: "Please enter all the fields"
    });
    return;
  }

  Plans.create({
      title,
      plan,
      date,
      description,
      location,
      author
    })
    .then(x => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/join/:id', (req, res) => {

  let isLoggedOut = req.user === undefined;
  res.render('plans/joinPlan', {
    isLoggedOut,
    userID: req.user._id,
    user: req.user
  })
})

router.post('/join/:id', (req, res) => {
  const plan = req.body
   let isLoggedOut = req.user === undefined;
  Plans.find(plan)
    .then(allMatches => res.render('plans/joinPlan', {
      plans: allMatches, isLoggedOut,
        userID: req.user._id,
        user: req.user
    }))
    .catch(err => console.log(err))

})
router.get('/details/:id', (req, res) => {
  const planId = req.params.id

  let isLoggedOut = req.user === undefined;
  Plans.findById(planId)
    .then(plan => {
      let people = plan.atending.length+1
      res.render('plans/map', {
      map: plan,
      people:people,
      isLoggedOut,
      userID: req.user._id,
      user: req.user
    })})
    .catch(err => console.log("Error consultando la BBDD: ", err))

})



router.get('/myPlans/:id', (req, res) => {
  const planId = req.params.id
  let isLoggedOut = req.user === undefined;
  Plans.find({
      author: planId
    })
    .then(plans => res.render('plans/myPlan', {
      plan: plans,
      isLoggedOut,
      userID: req.user._id,
      user: req.user
    }))
    .catch(err => console.log('error!!', err))
})



module.exports = router;