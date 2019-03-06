const UserController = require('../controllers/userController');
const RoomController = require('../controllers/roomController')
const PlayerController = require('../controllers/playerController')
const Authentication = require('../controllers/authentication')
const express = require('express')

// passport is middleware in order to check tokens in the header of incoming requests
const passport = require('../services/passport')

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

module.exports = (app) => {
  app.post('/api/user/signup', Authentication.signup)
  app.post('/api/user/signin', requireSignin, Authentication.signin)

  // this is just a test route that does not require any authorization
  // a sanity check if you will lol
  app.get('/api/test-noauth', (req, res) => {
    res.send({msg: 'oh herrrrrrro!'})
  })

  // this test route is behind authentication so you can use this to test if your authorization header is correct on the frontend.
  app.get('/api/test', requireAuth, (req, res) => {
    res.status(200).send({msg: 'Authenticated'})
  })

  app.patch('/api/players/update/:id', PlayerController.player_update)
  app.post('/api/players', PlayerController.player_create)
  app.delete('/api/players/:id', PlayerController.player_delete)

  app.get('/api/rooms/:id', RoomController.room_details)
  app.post('/api/rooms', requireAuth, RoomController.room_create)

  app.get('/api/users/rooms', requireAuth, UserController.getRooms)
  app.get('/api/users', UserController.readAll)
  app.get('/api/finduser', UserController.find_user)
  app.use(express.static('public'))
}
