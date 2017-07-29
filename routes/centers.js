var express = require('express');
var router = express.Router();

router.get('/:centerId', function(req, res, next) {
  res.render('center-detail');
});

module.exports = router;
