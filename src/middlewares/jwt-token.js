const Users = require('../models/Users')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const header = req.headers["authorization"]
  if(typeof header !== "undefined"){
    let token = header.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if(!err){
        Users.findOne({ _id: data.user }).then(data_user => {
          if(data_user == null) return res.send({ text: 'error', msg: 'User is not exist' })
          req.auth = {
            username: data_user.username,
            email: data_user.email,
            admin: data_user.admin,
            data: {
              gender: data_user.data.gender,
              phone: data_user.data.phone,
              address: data_user.data.address,
              birth: data_user.data.birth,
            }
          }
          req.user_id = data_user._id
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
