var express = require('express');
var _ = require('lodash');
var router = express.Router();

// Data
var users = require('../api/users.json');
var centers = require('../api/centers.json');
var reviews = require('../api/reviews.json');

router.get('/:centerId', function(req, res, next) {
  var centerId = _.toNumber(req.params.centerId);
  var center = _.find(centers, {id: centerId});

  // Fetch reviews
  var reviewsForCenter = _.filter(reviews, {targetType: 'center', targetId: center.id});
  var hydratedReviews = _.map(reviewsForCenter, function(review) {
    var reviewUser = _.find(users, {id: review.userId});
    return _.assign({}, review, {target: center, user: reviewUser});
  });

  res.render('center-detail', {
    center: center,
    reviews: hydratedReviews
  });
});

router.get('/:centerId/contact', function(req, res, next) {
  var centerId = _.toNumber(req.params.centerId);
  var center = _.find(centers, {id: centerId});

  res.render('center-contact', {
    center: center,
  });
});


module.exports = router;
