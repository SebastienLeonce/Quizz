const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

module.exports = {
  query: (text, params, cb) => pool.query(text, params, (err, res) => {
    cb(err, res);
  }),
}