const express = require('express')
const router = express.Router()
const Profile = require('../models/user.model')

// Aquí los endpoints


router.get('/profile', (req, res) =>{
  const profileId = req.params.id
  Profile.findById(profileId)
    .then(profile => res.render('/profile/profile', {
      profile
    }))
    .catch(err => console.log("Error consultando la BBDD: ", err))
})
router.get('/edit', (req, res) => {
  const profileId = req.query.placeId
  Profile.findById(placeId)
    .then(profile => res.render('profile/editprofile', profile))
    .catch(err => console.log('error!!', err))
})
router.post('/edit', (req, res) => {
  const { name , age, photo, description } = req.body
  const profileId = req.query.profileId
  Profile.findByIdAndUpdate(profileId, { name, age , photo , description})
    .then(res.redirect('/profile/profile'))
    .catch(err => console.log('error!!', err))
})







module.exports = router