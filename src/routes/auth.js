const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Users = require('../models/Users')
const jwt_token = require('../middlewares/jwt-token')

router.get('/', jwt_token, (req, res) => {
  res.send(req.auth)
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  if(req.user.data_complete){
    let token = jwt.sign({ user: req.user }, process.env.JWT_SECRET)
    res.send({ token, data: req.user })
  } else {
    res.send("DATA BLOM KOMPLIT")
  }
})

router.post('/login/complete', jwt_token, (req, res) => {
  new_data = {
    username: req.body.username,
    email: req.body.email,
    data_complete: true,
    data: {
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      birth: req.body.birth
    }
  }
  Users.update({ _id: req.user_id }, { $set: new_data }).then(data => {
    Users.findOne({ _id: req.user_id }).then(data => {
      let token = jwt.sign({ user: new_data }, process.env.JWT_SECRET)
      res.send({ token, data: new_data })
    })
  }).catch(err => {
    res.send(err)
  })
})

router.post('/login', (req, res) => {
  Users.findOne({
    email: req.body.email,
    password: req.body.password
  }).then(data => {
    if(data==null){
      res.send({ text: 'error', msg: 'User data is not exist' })
    } else {
      let token = jwt.sign({ user: data }, process.env.JWT_SECRET)
      res.send({ token, data })
    }
  }).catch(err => res.send({ text: 'error', msg: err }))
})

router.post('/register', (req, res) => {
  Users.findOne({ email: req.body.email }).then(data => {
    if(data!==null){
      res.send({ text: 'error', msg: 'User already exist' })
    } else {
      new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        data_complete: true,
        data: {
          gender: req.body.gender,
          phone: req.body.phone,
          address: req.body.address,
          birth: req.body.birth
        }
      }).save().then(data => {
        res.send(data)
      }).catch(err => {
        res.send(err)
      })
    }
  }).catch(err => res.send({ text: 'error', msg: err }))
})

module.exports = router
