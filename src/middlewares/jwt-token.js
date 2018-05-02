const Users = require('../models/Users')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const header = req.headers["authorization"]
  if(typeof header !== "undefined"){
    let token = header.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if(!err){
        Users.findOne(data.user).then(data_user => {
          req.auth = data_user
          next()
        }).catch(err => res.send({ text: 'error', msg: err }))
      } else {
        res.status(403)
      }
    })
  } else {
    res.status(403)
  }
}
