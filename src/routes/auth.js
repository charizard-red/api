const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Users = require('../models/Users')
const jwt_token = require('../middlewares/jwt-token')

router.get('/login', jwt_token, (req, res) => {
  res.send(req.auth)
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  let token = jwt.sign({ user: req.user }, process.env.JWT_SECRET)
  res.send({ token, data: req.user })
})

router.post('/login/complete', jwt_token, (req, res) => {
  Users.update({ _id: req.auth._id }, { $set: {
    data_complete: true,
    data: {
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      birth: req.body.birth
    }
  }}).then(data => {
    res.send(data)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router
