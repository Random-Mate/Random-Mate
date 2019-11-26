const express = require('express')
const router = express.Router()
const Profile = require('../models/User.model')

// Aquí los endpoints
// router.get('/:id', (req, res) => {
//   Profile.findById(profileId)
//     .populate('profile')
//     .then(theProfile => res.render('profile/profile', { comment:Profile }))
//     .catch(err => console.log(err))
// })


router.get('/:id', (req, res) =>{
  const profileId = req.params.id
  Profile.findById(profileId)
    .then(profile => res.render('profile/profile', {
      comment : profile
    }))
    .catch(err => console.log("Error consultando la BBDD: ", err))
})
router.get('/edit', (req, res) => {
  const profileId = req.query.profileId
  Profile.findById(profileId)
    .then(profile => res.render('profile/edit.profile', profile))
    .catch(err => console.log('error!!', err))
})
router.post('/edit', (req, res) => {
  const { name , age, description, imgPath , imgName } = req.body
  const profileId = req.query.profileId
  Profile.findByIdAndUpdate(profileId, { name, age , imgPath ,imgName, description})
    .then(res.redirect('/profile/profile'))
    .catch(err => console.log('error!!', err))
})







module.exports = router