const express = require('express')
const uniqid = require('uniqid')
const fs = require('fs')
const router = express.Router()

const Clinic = require('../models/Clinic')
const jwt_token = require('../middlewares/jwt-token')

router.get('/', (req, res) => {
  Clinic.find({ verified: true }).populate('doctors').exec(function(error, data){
    if (error) return res.send({ text: 'error', msg: error })
    res.send({data: data })
  });
})

router.post('/', jwt_token, (req, res) => {
  // function getName(mime){
  //   if(mime == 'image/png') return '.png'
  //   if(mime == 'image/jpeg') return '.jpg'
  // }
  // let image_id = uniqid("clinic-")
  // let filename = image_id + getName(req.photo.icon.mimetype)
  new Clinic({
    user_id: req.user_id,
    title: req.body.title,
    photo: req.body.photo,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    postal_code: req.body.postal_code,
  }).save()
  .then(data => {
    res.send({ text: "success", data: data })
  })
  .catch(err => res.send({ text: "error", msg: err }))
  // ---------------------------------------------------------------------------
})

router.post('/:id', (req, res) => {
  Clinic.findByIdAndUpdate({ _id: req.params.id }, {
    verified: true
  }).then(data => {
    res.send({ data: data })
  }).catch(err => {
    res.send({ text: 'error', msg: err })
  })
})

router.get('/:id', (req, res) => {
  Clinic.findOne({ _id: req.params.id }).then(data => {
    res.send({ text: 'success', data: data })
  })
})

router.put('/:id', (req, res) => {
  Clinic.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Clinic.findOne({_id:req.params.id}).then(function(data, error){
    if(error) return res.send(error)
    res.send({data:data});
    });
  });
})

router.delete('/:id', (req, res) => {
  Clinic.findByIdAndRemove({_id:req.params.id}).then(function(data, error){
    if(error) return res.send(error)
    res.send({data:data});
  });
})

module.exports = router
