const express = require('express');
const Order = require('../models/Orders');
const router = express.Router();

router.get('/', (req,res) => {
  Order.find({}).exec(function(error, Orders){
    if (error)
      res.send(error)
    res.send({data: Orders})
  });
});

router.get('/:id', (req,res) => {
  Order.findOne({_id:req.params.id}).exec(function(error, Orders){
    if (error)
      res.send(error)
    res.send({data: Orders})
  });
});

router.post('/', (req,res) => {
  Order.create(req.body).then(function(error, Orders){
    if(error)
      res.send(error);
    res.send({data:resources});
  });
});

router.put('/:id', (req,res) => {
  Order.findByIdAndUpdate({_id:req.params.id},req.body).then(function(Orders){
    Order.findOne({_id:req.params.id}).then(function(error, Orders){
    if(error)
      res.send(error)
    res.send({data:Orders});
    });
  });
});

router.delete('/:id', (req,res) => {
  Order.findByIdAndRemove({_id:req.params.id}).then(function(Orders){
    if(error)
      res.send(error)
    res.send({data:Orders});
  });
});

module.exports = router;
