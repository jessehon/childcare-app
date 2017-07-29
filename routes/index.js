var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Child Space' });
});

router.get('/browse', function(req, res, next) {
  res.render('browse', {});
});

module.exports = router;
