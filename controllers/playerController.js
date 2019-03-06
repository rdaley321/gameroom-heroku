const Player = require('../models/Player');
const Room = require('../models/Room')

exports.player_create = function (req, res, next) {
    let player = new Player(
        {
            handle: req.body.handle,
            nickname: req.body.nickname,
            stats: req.body.stats
        }
    );

    Room.findById(req.headers.room_id, (err, room) => {
        if(err) return res.status(400).send('Cannot Update Room with this Player.')
        room.players.push(player)
        room.save()
        player.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send(player)
        })
    });
};

exports.player_details = function (req, res, next) {
    Player.findById(req.params.id, function (err, player) {
        if (err) return next(err);
        res.send(player);
    })
};

exports.player_update = function (req, res, next) {
    Player.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, player) {
        if (err) return next(err);
        res.send('Player updated.');
    });
};

exports.player_delete = function (req, res, next) {
    Player.findById(req.params.id, function (err, player) {
        if(err) return res.status(400).send('Cannot delete Player from this room.')
      Room.findById(req.headers.room_id, (err, room) => {
          if(err) return res.status(400).send('Cannot delete Player from this room.')
          room.players.pull(player)
          room.save()
      });
    })
    Player.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
