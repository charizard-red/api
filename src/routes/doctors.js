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
  new Doctor({
    name: req.body.name,
    time: req.body.time,
    cost: req.body.cost,
    specialist: req.body.specialist,
    clinic: req.body.clinic
  }).save()
  .then(data => {
    Clinic.findByIdAndUpdate({ _id: req.body.clinic }, {
      $push: { doctors: data._id }
    }).then(data_clinic => {
      res.send({ data: data });
    }).catch(err => res.send({ text: 'error', msg: err }))
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
