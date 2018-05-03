const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

const jwt_token = require('../middlewares/jwt-token')

router.get('/', (req,res) => {
  Order.find({}).exec(function(error, Orders){
    if (error) return res.send(error)
    res.send({data: Orders})
  });
});

router.get('/:id', (req,res) => {
  Order.findOne({_id:req.params.id}).exec(function(error, data){
    if (error) return res.send(error)
    res.send({data: data})
  });
});

router.post('/', jwt_token, (req,res) => {
  if(req.auth.data_complete==false) return res.send({ test: 'error', msg: 'User data is not complete' })
  Order.create({
    user_id: req.user_id,
    specialist: req.body.specialist
  }).then(function(error, Orders){
    if(error)
      res.send(error);
    res.send({data:resources});
  });
});

router.put('/:id', (req,res) => {
  Order.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(data){
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
