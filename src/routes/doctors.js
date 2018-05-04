const express = require('express');
const Doctor = require('../models/Doctors');
const router = express.Router();

router.get('/', (req,res) => {
  Doctor.find({}).exec(function(error, data){
    if (error)
      res.send(error)
    res.send({data: data })
  });
});

router.get('/:id', (req,res) => {
  Doctor.findOne({_id:req.params.id}).exec(function(error, data ){
    if (error)
      res.send(error)
    res.send({data: data})
  });
});

router.post('/', (req,res) => {
  Doctor.create(req.body).then(function(error, data){
    if(error)
      res.send(error);
    res.send({data:data});
  });
});

router.put('/:id', (req,res) => {
  Doctor.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Doctor.findOne({_id:req.params.id}).then(function(error, data){
    if(error)
      res.send(error)
    res.send({data:data});
    });
  });
});

router.delete('/:id', (req,res) => {
  Doctor.findByIdAndRemove({_id:req.params.id}).then(function(data){
    if(error)
      res.send(error)
    res.send({data:data});
  });
});

module.exports = router;
