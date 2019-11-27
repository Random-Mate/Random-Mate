const express = require('express')
const router = express.Router()
const Profile = require('../models/User.model')
const User = require('../models/User.model')
const multer = require('multer');
const uploadCloud = require('../configs/cloudinary.config');

// Aquí los endpoints

// router.get('/session/:id', (req, res) => {
//   const profileId = req.params.id
//   Profile.findById(profileId)
//     .then(profile => res.render('profile/session', {
//       profile
//     }))
//     .catch(err => console.log("Error consultando la BBDD: ", err))
// })

router.get('/:id', (req, res) => {
    let isLoggedOut = req.user === undefined;
    const profileId = req.params.id
    Profile.findById(profileId)
  .then(profile => res.render('profile/profile', { isLoggedOut, userID: req.user._id, user: req.user,profile}));
  
    
    //.catch(err => console.log("Error consultando la BBDD: ", err))
})
router.get('/edit/:id', (req, res) => {
  let isLoggedOut = req.user === undefined;
  const profileId = req.params.id
  Profile.findById(profileId)
    .then(profile => res.render('profile/edit-profile', { prof: profile,isLoggedOut, userID: req.user._id, user: req.user,profile }))
    .catch(err => console.log('error!!', err))

})
router.post('/edit', uploadCloud.single('imgPath'), (req, res) => {
  const { name, age, description } = req.body
  const imgPath = req.file.url
  const imgName = req.file.originalname

  const profileId = req.params.profileId
  console.log(req.user._id)
  Profile.findByIdAndUpdate(req.user._id, { name, age, description, imgPath, imgName }, { new: true })
    .then(user => {
      console.log(user)
      res.redirect('/profile')
    })
    .catch(err => console.log('error!!', err))
})

module.exports = router