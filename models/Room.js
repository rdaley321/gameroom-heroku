const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: {type: String, required: true},
  players: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } ]
})

module.exports = mongoose.model('Room', roomSchema);
