const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('get all clinic')
})

router.post('/', (req, res) => {
  res.send('add a clinic')
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
