const io = require( "socket.io" )();
const { instrument } = require("@socket.io/admin-ui");

const registerUserHandlers = require("./userHandler");

const socketapi = {
    io: io,
    options: {
        cors: {
          origin: ["https://admin.socket.io"]
        }
    },
    instrument: (io) => {
        instrument(io, {
            auth: false
        });
    }
};

const onConnection = (socket) => {
    registerUserHandlers(io, socket);
}
  
io.on("connection", onConnection);

module.exports = socketapi;