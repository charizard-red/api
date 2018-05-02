const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()

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

module.exports = router
