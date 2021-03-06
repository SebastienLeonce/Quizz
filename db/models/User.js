var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username   : {type: String, required: true, unique: true},
    password   : {type: String, required: true},
    signup_date: {type: Date, default: Date.now},
  }
);

module.exports = mongoose.model('User', UserSchema);