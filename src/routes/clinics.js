const express = require('express')
const uniqid = require('uniqid')
const fs = require('fs')
const router = express.Router()

const Clinic = require('../models/Clinic')

router.get('/', (req, res) => {
  Clinic.find({}).exec(function(error, Doctors){
    if (error)
      res.send(error)
    res.send({data: Doctors })
  });
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
      postal_code: req.body.postal_code,
    }).save()
    .then(data => res.send({ text: "success", data: data }))
    .then(err => res.send({ text: "error", data: err }))
  });
  // ---------------------------------------------------------------------------
})

router.get('/:id', (req, res) => {
  Clinic.findOne({ id: req.params.id }).then(data => {
    res.send({ text: 'success', data: data })
  })
})

router.put('/:id', (req, res) => {
  Clinic.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Clinic.findOne({_id:req.params.id}).then(function(error, Doctors){
    if(error)
      res.send(error)
    res.send({data:Doctors});
    });
  });
})

router.delete('/:id', (req, res) => {
  Clinic.findByIdAndRemove({_id:req.params.id}).then(function(data){
    if(error)
      res.send(error)
    res.send({data:data});
  });
})

module.exports = router
