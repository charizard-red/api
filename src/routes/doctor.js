const express = require('express');
const Doctor = require('../models/Doctors');
const router = express.Router();

router.get('/', (req,res) => {
  Doctor.find({}).exec(function(error, Doctors){
    if (error)
      res.send(error)
    res.send({data: Doctors })
  });
});

router.get('/:id', (req,res) => {
  Doctor.findOne({_id:req.params.id}).exec(function(error, Doctors ){
    if (error)
      res.send(error)
    res.send({data: Doctors})
  });
});

router.post('/', (req,res) => {
  Doctor.create(req.body).then(function(error, Doctors){
    if(error)
      res.send(error);
    res.send({data:Doctors});
  });
});

router.put('/:id', (req,res) => {
  Doctor.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Doctor.findOne({_id:req.params.id}).then(function(error, Doctors){
    if(error)
      res.send(error)
    res.send({data:Doctors});
    });
  });
});

router.delete('/:id', (req,res) => {
  Doctor.findByIdAndRemove({_id:req.params.id}).then(function(Doctors){
    if(error)
      res.send(error)
    res.send({data:Doctors});
  });
});

module.exports = router;
