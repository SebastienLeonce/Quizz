var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('socket_admin');
});

module.exports = router;
