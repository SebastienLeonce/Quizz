const db = require("../db");

module.exports = (io, socket) => {
    const createUser = (username, password, cb) => {
      // ...
    }
  
    const loginUser = (username, password, cb) => {
      db.user.login(username, password, (err, res) => {
        if (err) {
          cb(err);
        } else {
          cb(err, res);
        }
      });
    }
  
    socket.on("user:create", createUser);
    socket.on("user:login", loginUser);
  }