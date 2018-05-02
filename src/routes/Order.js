const express = require('express');
const Order = require('../models/Orders');
const router = express.Router();

router.get('/', (req,res) => {
  Order.find({}).exec((error, resources) => {
    if (error)
      res.send(error)
    res.send({data: resources})
  })
});

router.post('/', (req,res) => {
  Order.create(req.body).then(function(Orders){
    res.send(Orders);
  });
});

router.put('/:id', (req,res) => {
  res.send('')
});

router.delete('/:id', (req,res) => {
  res.send()
});

module.exports = router;
