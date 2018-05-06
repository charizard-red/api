const express = require('express');
const Doctor = require('../models/Doctors');
const Clinic = require('../models/Clinic');
const fs = require('fs');
const router = express.Router();

router.get('/', (req,res) => {
  Doctor.find({}).exec(function(error, data){
    if (error) return res.send(error)
    res.send({ data: data })
  });
});

router.get('/:id', (req,res) => {
  Doctor.findOne({_id:req.params.id}).exec(function(data, error ){
    if (error) return res.send(error)
    res.send({ data: data })
  });
});

router.post('/', (req,res) => {
  function getName(mime){
    if(mime == 'image/png') return '.png'
    if(mime == 'image/jpeg') return '.jpg'
  }
  let image_id = uniqid("doctor-")
  let filename = image_id + getName(req.files.icon.mimetype)
  new Clinic({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    specialist: req.body.specialist,
    clinic: req.body.clinic
  }).save()
  .then(data => {
    fs.writeFile('public/img/' + filename, req.files.icon.data, (err) => {
      if (err) return res.send({ text: 'error', msg: err })
      Clinic.findByIdAndUpdate({ _id: req.body.clinic }, {
        $push: { doctors: data._id }
      }).then(data_clinic => {
        res.send({ data: data });
      }).catch(err => res.send({ text: 'error', msg: err }))
    })
  })
  .catch(err => res.send({ text: "error", msg: err }))
  // ---------------------------------------------------------------------------
});

router.put('/:id', (req,res) => {
  Doctor.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Doctor.findOne({_id:req.params.id}).then(function(data, error){
    if(error) return res.send(error)
    res.send({ data: data});
    });
  });
});

router.delete('/:id', (req,res) => {
  Doctor.findByIdAndRemove({_id:req.params.id}).then(function(data, error){
    if(error) return res.send(error)
    Clinic.findByIdAndUpdate({ _id: data.clinic }, {
      $pull: { doctors: data._id }
    }).then(data_clinic => {
      res.send({ data: data });
    })
  });
});

module.exports = router;
