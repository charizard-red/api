const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

const jwt_token = require('../middlewares/jwt-token')

router.get('/', (req,res) => {
  Order.find({})
  .then(data => {
    res.send(data)
  }).catch(err => res.send(err))
});

router.get('/:id', (req,res) => {
  Order.find({clinic_id: req.params.id})
  .exec(function(error, data){
    if (error) return res.send(error)
    res.send({data: data})
  });
});

router.post('/', jwt_token, (req,res) => {
  if(req.auth.data_complete==false) return res.send({ test: 'error', msg: 'User data is not complete' })
  Order.create({
    user_id: req.auth,
    doctor_id: req.body.doctor_id,
    clinic_id: req.body.clinic_id,
    day: req.body.day,
    accept: false
  }).then(data => {
    res.send({data:data});
  }).catch(err => res.send({text: 'error', msg: err }))
});

router.put('/:id', (req,res) => {
  Order.findByIdAndUpdate({_id:req.params.id}, {
    accept: true
  }).then(function(data){
    Order.findOne({_id:req.params.id}).then(function(error, Orders){
    if(error) return res.send(error)
    res.send({data:Orders});
    });
  });
});

router.delete('/:id', (req,res) => {
  Order.findByIdAndRemove({_id:req.params.id}).then(function(Orders){
    if(error) return res.send(error)
    res.send({data: Orders});
  });
});

module.exports = router;
