var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId', function(req, res, next) {
  res.render('user-detail');
});

router.get('/:userId/feedback', function(req, res, next) {
  res.render('user-feedback');
});

module.exports = router;
