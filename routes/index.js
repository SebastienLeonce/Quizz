var express = require('express');
var router = express.Router();

const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM test_table', [], (err, data) => {
    res.render('index', { title: 'Express', data: data.rows[0].name });
  });
});

module.exports = router;
