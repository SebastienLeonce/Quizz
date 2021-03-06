const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

const User = require('./User');

module.exports = {
  user : User,
}