const crypto   = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const db = require("../db");

module.exports = (sessionStore) => {
    return (socket, next) => {
        const sessionID = socket.handshake.auth.sessionID;
        if (sessionID) {
        const session = sessionStore.findSession(sessionID);
            if (session) {
                socket.sessionID = sessionID;
                socket.userID = session.userID;
                socket.username = session.username;
                return next();
            }
        }
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("invalid username"));
        }

        const password = socket.handshake.auth.password;
        if (!password) {
            return next(new Error("invalid password"));
        }

        db.user.login(username, password, (err, res) => {
            if (err) {
                return next(new Error("invalid user"));
            } else {
                socket.sessionID = [...sessionStore.sessions.entries()]
                    .filter((x) => x[1].userID == res.user_id)
                    .map(([k]) => k)[0] || randomId();
                socket.userID = res.user_id;
                socket.username = username;
                next();
            }
        });
    }
}