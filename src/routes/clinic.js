const express = require('express')
const uniqid = require('uniqid')
const fs = require('fs')
const router = express.Router()

const Clinic = require('../models/Clinic')

router.get('/', (req, res) => {
  Clinic.find().then((data) => {
    res.send(data)
  }).catch(err => res.send({ text: 'error', msg: err }))
})

router.post('/', (req, res) => {
  //----------------------------------------------------------------------------
  function getName(mime){
    if(mime == 'image/png') return '.png'
    if(mime == 'image/jpeg') return '.jpg'
  }
  let image_id = uniqid("clinic")
  let filename = image_id + getName(req.files.icon.mimetype)
  fs.writeFile('public/img/' + filename, req.files.icon.data, (err) => {
    if (err) throw err;
    // -------------------------------------------------------------------------
    new Clinic({
      title: req.body.title,
      description: req.body.description,
      photo: filename,
      phone: req.body.phone,
      address: req.body.address,
      // services: req.body.services,
      postal_code: req.body.postal_code,
    }).save()
    .then(data => res.send({ text: "success", data: data }))
    .then(err => res.send({ text: "error", data: err }))
  });
  // ---------------------------------------------------------------------------
})

router.get('/:id', (req, res) => {
  res.send('get a clinic info')
})

router.put('/:id', (req, res) => {
  res.send('update a clinic')
})

router.delete('/:id', (req, res) => {
  res.send('delete a clinic')
})

module.exports = router
