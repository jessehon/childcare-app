var express = require('express');
var router = express.Router();

// Data
var users = require('../api/users.json');
var centers = require('../api/centers.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Little Play Space' });
});

router.get('/browse', function(req, res, next) {
  res.render('browse', {
    users: users,
    centers: centers,
  });
});

module.exports = router;
