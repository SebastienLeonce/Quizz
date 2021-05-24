const io = require( "socket.io" )();
const socketapi = {
    io: io
};

io.on( "connection", function( socket ) {
    console.log(`new connection ${socket.id}`);
    socket.emit('test', 'coucou');
    
    socket.on('test', (msg) => {
        console.log(msg);
    });
});

module.exports = socketapi;