const crypto   = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const db = require("../db");

module.exports = (sessionStore) => {
    const login = (username, password, socket, next) => {
        db.user.login(username, password, (err, res) => {
            if (err || !res) {
                return next(new Error("invalid user"));
            } else {
                socket.sessionID = [...sessionStore.sessions.entries()]
                    .filter((x) => x[1].username == res.username)
                    .map(([k]) => k)[0] || randomId();
                socket.userID = res._id;
                socket.username = username;
                return next();
            }
        });
    }

    const signup = (username, password, socket, next) => {
        new db.user(username, password, (err, res) => {
            if (err) {
                return next(new Error(err));
            } else {
                return login(username, password, socket, next);
            }
        });
    }

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

        if (socket.handshake.auth.signup) {
            return signup(username, password, socket, next);
        } else {
            return login(username, password, socket, next);
        }
    }
}