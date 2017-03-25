$(document).on('click', '#findPlaces', function(e) {
  $('#anchorInput').hide('slide', { direction: "up" }, 250);
  $('#anchorCaret').toggleClass('hidden', 250);
});

$(document).on('click', '#anchorBar h3', function(e) {
  $('#anchorInput').toggle('slide', { direction: "up" }, 250);
  $('#anchorCaret').toggleClass('hidden', 250);
});