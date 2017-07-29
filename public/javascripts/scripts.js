$(function() {

  _.each($('.rating-select'), function(elm) {
    var $elm = $(elm);
    var currentRating = $elm.data('current-rating');

    $elm.barrating({
      theme: 'fontawesome-stars-o',
      showSelectedRating: false,
      initialRating: currentRating,
    });
  });

  $('#feedback-form').submit( function (event) {
    event.preventDefault();

    swal(
      {
        title: "Awesome!",
        type: "success",
        text: "Can't wait to see you again",
      }
    );
  });
});
