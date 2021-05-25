const io = require( "socket.io" )();
const socketapi = {
    io: io
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