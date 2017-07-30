var express = require('express');
var _ = require('lodash');
var router = express.Router();

// Data
var users = require('../api/users.json');
var reviews = require('../api/reviews.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId', function(req, res, next) {
  var userId = _.toNumber(req.params.userId);
  var user = _.find(users, {id: userId});

  // Fetch reviews
  var reviewsForUser = _.filter(reviews, {targetType: 'user', targetId: user.id});
  var hydratedReviews = _.map(reviewsForUser, function(review) {
    var reviewUser = _.find(users, {id: review.userId});
    return _.assign({}, review, {target: user, user: reviewUser});
  });

  res.render('user-detail', {
    user: user,
    reviews: hydratedReviews
  });
});

router.get('/:userId/feedback', function(req, res, next) {
  var userId = _.toNumber(req.params.userId);
  var user = _.find(users, {id: userId});

  res.render('user-feedback', {
    user: user
  });
});

module.exports = router;
