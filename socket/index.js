const io = require( "socket.io" )();
const { instrument } = require("@socket.io/admin-ui");

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

io.on( "connection", function( socket ) {
    socket.on("hello", (arg) => {
        socket.emit("hello", arg);
    });

    socket.on('hi', (cb) => {
        cb("hola");
    });
});

module.exports = socketapi;