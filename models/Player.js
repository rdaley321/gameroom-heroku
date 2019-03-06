const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  handle: {type: String, required: true},
  nickname: {type: String, required: true},
  stats: {type: {}}
})

module.exports = mongoose.model('Player', playerSchema);
