module.exports = (pool) => {
    return class User {        
        constructor(username, password) {
            this.username = username;
            this.password = password;
        }
    
        save(cb) {
            pool.query(`
            INSERT INTO accounts (username, password) 
            VALUES($1, $2)
            RETURNING user_id`, [
                this.username, 
                this.password
            ], (err, res) => {
                if (err) {
                    cb(err);
                } else {
                    this.user_id = res.rows[0].user_id;
                    cb(err, this);
                }
            });
        }

        static getUser(id, cb) {
            return new this();
        }

        static login(username, password, cb) {
            pool.query(`
            SELECT user_id, username FROM accounts 
            WHERE username = $1 AND password = $2`, [
                username, 
                password
            ], (err, res) => {
                if (err) {
                    console.log(err)
                    cb(err)
                } else if (!res.rows[0]) {
                    cb("Username or password invalid");
                } else {
                    cb(err, res.rows[0]);
                }
            });
        }
    };
};

/* EXAMPLE
let usr1 = new db.user("tataaaa", "toti");
usr1.save((err, res) => {
    console.log(err, res);
});

db.user.login("john", "doe", (err, res) => {
    console.log(err, res);
  });
*/