const Room = require('../models/Room');
const User = require('../models/User')

exports.room_create = function (req, res, next) {
    let room = new Room(
        {
            title: req.body.title
        }
    )
    User.findOne({email: req.headers.email}, (err, user) => {
      if(err) {
        return res.status(400).send('Cannot Create Room')
      }
      user.rooms.push(room.id)
      user.save()
      room.save()
      res.status(200).send(room)
    })
};

exports.room_details = function (req, res, next) {
    Room
      .findById(req.params.id)
      .populate('players')
      .exec((err, room) => {
        if(err) {
          return res.status(400).send('Cannot Get Room Details')
        }
        res.status(200).send(room)
      })
};

exports.room_update = function (req, res, next) {
    Room.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, room) {
        if (err) return next(err);
        res.send('Room updated.');
    });
};

exports.room_delete = function (req, res, next) {
    Room.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
