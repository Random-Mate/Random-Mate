const express = require('express')
const router = express.Router()
const Profile = require('../models/User.model')

// Aquí los endpoints

router.get('/:id', (req, res) => {
  const profileId = req.params.id
  Profile.findById(profileId)
    .then(profile => res.render('profile/profile', {
      profile
    }))
    .catch(err => console.log("Error consultando la BBDD: ", err))
})
router.get('/edit/:id', (req, res) => {
  const profileId = req.params.id
  Profile.findById(profileId)
    .then(profile => res.render('profile/edit-profile', { prof: profile }))
    .catch(err => console.log('error!!', err))

})
router.post('/edit', (req, res) => {

  const { name, age, description, imgPath, imgName } = req.body
  const profileId = req.params.profileId
  console.log(req.user._id)
  Profile.findByIdAndUpdate(req.user._id, { name, age, description, imgPath, imgName }, { new: true })
    .then(user => {
      console.log(user)
      res.redirect('/profile')
    })
    .catch(err => console.log('error!!', err))
})

// Editar usuario: renderizar formulario
router.get('/edit', (req, res) => {
  const profileId = req.query.profileId
  profile.findById(profileId)
    .then(profile => res.render('profile/edit-profile', { prof: profile }))
    .catch(err => console.log('error!!', err))
})


// Editar libro: enviar formulario
// router.post('/edit/:id', (req, res) => {
//   const { name, age, description, imgPath, imgName } = req.body
//   const profileId = req.query.profileId

//   console.log()
//   Profile.findByIdAndUpdate(profileId, { name, age, description, imgPath, imgName })
//     .then(res.redirect('/profile/profile'))
//     .catch(err => console.log('error!!', err))

// })






module.exports = router