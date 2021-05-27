const io = require( "socket.io" )();
const { instrument } = require("@socket.io/admin-ui");
const sessionStore = new (require("./sessionStore"))();


const registerUserHandlers = require("./userHandler");
const sessionMiddleware = require('./sessionMiddleware')(sessionStore);

const onConnection = (socket) => {
    sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: true,
    });

    socket.emit("session", {
        sessionID: socket.sessionID,
        userID: socket.userID,
        username: socket.username,
    });

    socket.join(socket.userID);

    socket.on("disconnect", async () => {
        const matchingSockets = await io.in(socket.userID).allSockets();
        const isDisconnected = matchingSockets.size === 0;
        if (isDisconnected) {
          sessionStore.saveSession(socket.sessionID, {
            userID: socket.userID,
            username: socket.username,
            connected: false,
          });
        }
    });

    registerUserHandlers(io, socket);
}

io.use(sessionMiddleware);
  
io.on("connection", onConnection);

const socketapi = {
    io: io,
    instrument: (io) => {
        instrument(io, {
            auth: false
        });
    }
};

module.exports = socketapi;