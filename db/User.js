const UserModel = require('./models/User.js');

module.exports = class User {        
    constructor(username, password, cb) {
        UserModel.create({
            username: username,
            password: password
        }, function (err, user) {
            console.log(err)
            cb(err, user);
        });
    }
    
    
    static login(username, password, cb) {
        UserModel.findOne({ 
            username: username, 
            password: password }, function (err, user) {
            cb(err, user);
        });
    }
};
