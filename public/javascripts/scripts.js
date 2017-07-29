$(function() {
  $('.rating-select').barrating({
    theme: 'fontawesome-stars-o',
    showSelectedRating: false,
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
