const db = require("../db");

module.exports = (io, socket) => {
    const createUser = (username, password, cb) => {
      // ...
    }
  
    socket.on("user:create", createUser);
  }