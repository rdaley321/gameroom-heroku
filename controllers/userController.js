const User = require('../models/User.js')

// function to find all Users and send it to the frontend as JSON
exports.readAll = (request, response, next) => {
  User.find((err, users) => {
    if (err) {
      response.status(500).json({
        success: false,
        error: err
      })
    } else {
      response.status(200).json(users)
    }
  })
}

exports.find_user = (req,res,next) => {
  User.findOne({email: req.headers.email}, (err, user) => {
    if (err || user === null) {
      return res.status(500).send('Cannot find that user')
    }
    res.status(200).json(user)
})}

exports.getRooms = (req,res,next) => {
  User
    .findOne({email: req.headers.email})
    .populate('rooms')
    .exec((err, user) => {
          if (err) return next(err)
          res.status(200).send(user);
    })
}
